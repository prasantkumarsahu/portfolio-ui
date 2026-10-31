// GitHub data for the activity section, fetched once at build time.
// Every request fails soft: the section shows what loaded and links to the profile.

export type ContributionDay = { date: string; level: 0 | 1 | 2 | 3 | 4; count: number };

export type ActivityItem = {
    kind: "push" | "create" | "pr" | "issue" | "release" | "star" | "fork" | "other";
    text: string;
    repo: string;
    repoUrl: string;
    /** Link for the item itself (a PR); falls back to the repo */
    url?: string;
    date: string;
};

export type GitHubData = {
    username: string;
    profileUrl: string;
    /** Weeks of 7 days (Sunday first), oldest first; empty if the calendar failed to load */
    weeks: (ContributionDay | null)[][];
    total: number;
    activeDays: number;
    longestStreak: number;
    currentStreak: number;
    publicRepos: number | null;
    activity: ActivityItem[];
};

const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "portfolio-build",
    // Optional: raises the API rate limit on shared build machines
    ...(import.meta.env.GITHUB_TOKEN ? { Authorization: `Bearer ${import.meta.env.GITHUB_TOKEN}` } : {}),
};

async function getText(url: string) {
    try {
        const res = await fetch(url, { headers: { "User-Agent": "portfolio-build" } });
        return res.ok ? await res.text() : null;
    } catch {
        return null;
    }
}

async function getJson<T>(url: string): Promise<T | null> {
    try {
        const res = await fetch(url, { headers });
        return res.ok ? ((await res.json()) as T) : null;
    } catch {
        return null;
    }
}

/** Parses the public contributions calendar (https://github.com/users/<name>/contributions). */
function parseCalendar(html: string) {
    const days: ContributionDay[] = [];
    const counts = new Map<string, number>();

    // Tooltips carry the count: "5 contributions on October 22nd." / "No contributions on ..."
    for (const [, id, label] of html.matchAll(/<tool-tip[^>]*for="([^"]+)"[^>]*>([^<]*)<\/tool-tip>/g)) {
        const n = /^(\d+) contribution/.exec(label.trim());
        counts.set(id, n ? Number(n[1]) : 0);
    }

    for (const [cell] of html.matchAll(/<td[^>]*ContributionCalendar-day[^>]*>/g)) {
        const date = /data-date="([^"]+)"/.exec(cell)?.[1];
        const level = Number(/data-level="(\d)"/.exec(cell)?.[1] ?? 0) as ContributionDay["level"];
        const id = /id="([^"]+)"/.exec(cell)?.[1] ?? "";
        if (date) days.push({ date, level, count: counts.get(id) ?? (level ? 1 : 0) });
    }

    days.sort((a, b) => a.date.localeCompare(b.date));
    return days;
}

/** Groups days into Sunday-first weeks, padding the first week so rows line up by weekday. */
function toWeeks(days: ContributionDay[]) {
    const weeks: (ContributionDay | null)[][] = [];
    let week: (ContributionDay | null)[] = [];

    days.forEach((day, i) => {
        const weekday = new Date(`${day.date}T00:00:00Z`).getUTCDay();
        if (i === 0) week = Array(weekday).fill(null);
        week.push(day);
        if (weekday === 6) {
            weeks.push(week);
            week = [];
        }
    });
    if (week.length) weeks.push(week);
    return weeks;
}

function longestStreak(days: ContributionDay[]) {
    let best = 0;
    let run = 0;
    for (const day of days) {
        run = day.count > 0 ? run + 1 : 0;
        best = Math.max(best, run);
    }
    return best;
}

/** Consecutive active days up to today; a quiet today doesn't break it until the day is over. */
function currentStreak(days: ContributionDay[]) {
    let i = days.length - 1;
    if (days[i]?.count === 0) i--;
    let run = 0;
    for (; i >= 0 && days[i].count > 0; i--) run++;
    return run;
}

type GitHubRepo = { name: string; full_name: string; html_url: string; created_at: string; pushed_at: string; default_branch: string; fork: boolean };

type GitHubEvent = {
    type: string;
    created_at: string;
    repo: { name: string };
    payload: {
        ref?: string | null;
        ref_type?: string;
        action?: string;
        size?: number | null;
        number?: number;
        pull_request?: { title?: string | null; url?: string };
        issue?: { title?: string };
        release?: { name?: string; tag_name?: string };
    };
};

function describe(event: GitHubEvent): Pick<ActivityItem, "kind" | "text"> | null {
    const { payload } = event;
    const branch = payload.ref?.replace("refs/heads/", "");

    switch (event.type) {
        case "PushEvent":
            return {
                kind: "push",
                text: payload.size ? `Pushed ${payload.size} commit${payload.size === 1 ? "" : "s"} to ${branch}` : `Pushed to ${branch}`,
            };
        // Branch create/delete is housekeeping noise; repos and tags are worth showing
        case "CreateEvent":
            if (payload.ref_type === "repository") return { kind: "create", text: "Created repository" };
            if (payload.ref_type === "tag") return { kind: "release", text: `Tagged ${payload.ref}` };
            return null;
        // Titles are no longer included in events; getGitHubData fills them in
        case "PullRequestEvent": {
            const verb = { merged: "Merged", closed: "Closed", reopened: "Reopened" }[payload.action ?? ""] ?? "Opened";
            return { kind: "pr", text: `${verb} PR #${payload.number ?? ""}` };
        }
        case "IssuesEvent":
            return { kind: "issue", text: `${payload.action === "closed" ? "Closed" : "Opened"} issue: ${payload.issue?.title ?? ""}`.trim() };
        case "ReleaseEvent":
            return { kind: "release", text: `Released ${payload.release?.name || payload.release?.tag_name}` };
        case "WatchEvent":
            return { kind: "star", text: "Starred" };
        case "ForkEvent":
            return { kind: "fork", text: "Forked" };
        default:
            return null;
    }
}

function listBranches(branches: string[]) {
    if (branches.length <= 3) return branches.join(branches.length === 2 ? " and " : ", ").replace(/, ([^,]*)$/, " and $1");
    return `${branches.slice(0, 2).join(", ")} and ${branches.length - 2} more branches`;
}

// The dev server re-renders on every request; cache so it doesn't use up the
// unauthenticated API limit (60 requests/hour). Production builds fetch once.
const cache = new Map<string, { at: number; data: Promise<GitHubData> }>();
const CACHE_MS = 10 * 60 * 1000;

export function getGitHubData(username: string): Promise<GitHubData> {
    const hit = cache.get(username);
    if (hit && Date.now() - hit.at < CACHE_MS) return hit.data;
    const data = loadGitHubData(username);
    cache.set(username, { at: Date.now(), data });
    return data;
}

async function loadGitHubData(username: string): Promise<GitHubData> {
    const [html, user, events, repos] = await Promise.all([
        getText(`https://github.com/users/${username}/contributions`),
        getJson<{ public_repos: number }>(`https://api.github.com/users/${username}`),
        getJson<GitHubEvent[]>(`https://api.github.com/users/${username}/events/public?per_page=100`),
        getJson<GitHubRepo[]>(`https://api.github.com/users/${username}/repos?sort=pushed&per_page=10`),
    ]);

    const days = html ? parseCalendar(html) : [];

    // Same-day pushes to one repo collapse into a single line listing the branches
    const activity: ActivityItem[] = [];
    const pushBranches = new Map<ActivityItem, string[]>();
    const prApi = new Map<ActivityItem, string>();
    for (const event of events ?? []) {
        const described = describe(event);
        if (!described) continue;

        const repo = event.repo.name.split("/")[1] ?? event.repo.name;
        const day = event.created_at.slice(0, 10);

        if (described.kind === "push") {
            const branch = event.payload.ref?.replace("refs/heads/", "") ?? "";
            const same = activity.find((a) => a.kind === "push" && a.repo === repo && a.date.slice(0, 10) === day);
            if (same) {
                const branches = pushBranches.get(same)!;
                if (!branches.includes(branch)) branches.push(branch);
                same.text = `Pushed to ${listBranches(branches)}`;
                continue;
            }
            const item = { ...described, repo, repoUrl: `https://github.com/${event.repo.name}`, date: event.created_at };
            pushBranches.set(item, [branch]);
            activity.push(item);
        } else if (described.kind === "pr") {
            // Events arrive newest first, so the first one seen per PR is its latest state
            const apiUrl = event.payload.pull_request?.url;
            if (activity.some((a) => a.kind === "pr" && a.repo === repo && a.text.endsWith(`#${event.payload.number}`))) continue;
            const item: ActivityItem = { ...described, repo, repoUrl: `https://github.com/${event.repo.name}`, date: event.created_at };
            if (apiUrl) prApi.set(item, apiUrl);
            activity.push(item);
        } else {
            activity.push({ ...described, repo, repoUrl: `https://github.com/${event.repo.name}`, date: event.created_at });
        }

        if (activity.length === 6) break;
    }

    // The events feed can lag GitHub by hours or days; fill the gap from the repos' own
    // creation and push times, with commit counts from the commits API
    const newestEvent = (events ?? []).reduce((max, e) => (e.created_at > max ? e.created_at : max), "");
    const recent = (repos ?? []).filter((repo) => !repo.fork && repo.pushed_at > newestEvent).slice(0, 6);
    const filled = await Promise.all(
        recent.map(async (repo) => {
            const items: ActivityItem[] = [];
            const base = { repo: repo.name, repoUrl: repo.html_url };
            const since = newestEvent && newestEvent > repo.created_at ? newestEvent : repo.created_at;
            const commits = await getJson<unknown[]>(
                `https://api.github.com/repos/${repo.full_name}/commits?author=${username}&since=${since}&per_page=100`,
            );
            const n = commits?.length ?? 0;
            items.push({
                ...base,
                kind: "push",
                text: n ? `Pushed ${n}${n === 100 ? "+" : ""} commit${n === 1 ? "" : "s"} to ${repo.default_branch}` : `Pushed to ${repo.default_branch}`,
                date: repo.pushed_at,
            });
            if (repo.created_at > newestEvent) items.push({ ...base, kind: "create", text: "Created repository", date: repo.created_at });
            return items;
        }),
    );
    activity.unshift(...filled.flat());
    activity.sort((a, b) => b.date.localeCompare(a.date));
    activity.splice(6);

    await Promise.all(
        [...prApi].map(async ([item, apiUrl]) => {
            const pr = await getJson<{ title: string; html_url: string }>(apiUrl);
            if (!pr) return;
            item.text = `${item.text}: ${pr.title}`;
            item.url = pr.html_url;
        }),
    );

    return {
        username,
        profileUrl: `https://github.com/${username}`,
        weeks: toWeeks(days),
        total: days.reduce((sum, day) => sum + day.count, 0),
        activeDays: days.filter((day) => day.count > 0).length,
        longestStreak: longestStreak(days),
        currentStreak: currentStreak(days),
        publicRepos: user?.public_repos ?? null,
        activity,
    };
}
