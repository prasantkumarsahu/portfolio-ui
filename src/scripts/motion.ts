// Page-wide interaction motion: scroll reveal, header scroll state, active nav link
// and the card spotlight. Styles live in global.css.

const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");

export const prefersReducedMotion = () => reducedMotion.matches;

function initReveal() {
    const targets = document.querySelectorAll<HTMLElement>("[data-reveal]");

    if (!("IntersectionObserver" in window) || prefersReducedMotion()) {
        targets.forEach((el) => el.classList.add("is-visible"));
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            for (const entry of entries) {
                if (!entry.isIntersecting) continue;
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    targets.forEach((el) => observer.observe(el));
}

function initHeader() {
    const header = document.querySelector<HTMLElement>("[data-header]");
    if (!header) return;

    const update = () => header.toggleAttribute("data-scrolled", window.scrollY > 8);
    update();
    window.addEventListener("scroll", update, { passive: true });
}

function initScrollSpy() {
    const links = new Map<string, HTMLAnchorElement[]>();
    document.querySelectorAll<HTMLAnchorElement>("[data-nav-link]").forEach((link) => {
        const id = link.hash.slice(1);
        links.set(id, [...(links.get(id) ?? []), link]);
    });

    const sections = [...links.keys()]
        .map((id) => document.getElementById(id))
        .filter((section): section is HTMLElement => section !== null);
    if (!sections.length) return;

    const setActive = (id: string | null) => {
        links.forEach((group, key) =>
            group.forEach((link) =>
                key === id ? link.setAttribute("aria-current", "true") : link.removeAttribute("aria-current"),
            ),
        );
    };

    // A section counts as current while it crosses a band near the top of the viewport
    const observer = new IntersectionObserver(
        (entries) => {
            for (const entry of entries) {
                if (entry.isIntersecting) setActive(entry.target.id);
            }
        },
        { rootMargin: "-30% 0px -60% 0px" },
    );

    sections.forEach((section) => observer.observe(section));

    // Clear the highlight when scrolled back above the first section
    window.addEventListener(
        "scroll",
        () => {
            if (sections[0].getBoundingClientRect().top > window.innerHeight * 0.3) setActive(null);
        },
        { passive: true },
    );
}

function initSpotlight() {
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    document.querySelectorAll<HTMLElement>("[data-spotlight]").forEach((card) => {
        card.addEventListener("pointermove", (event) => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
            card.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
        });
    });
}

/** Fade-and-rise a list of elements in, staggered (used when filters or tabs change). */
export function staggerIn(elements: Iterable<Element>, step = 50) {
    if (prefersReducedMotion()) return;

    let i = 0;
    for (const el of elements) {
        el.animate(
            [
                { opacity: 0, transform: "translateY(10px)" },
                { opacity: 1, transform: "none" },
            ],
            { duration: 450, delay: i++ * step, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "backwards" },
        );
    }
}

initReveal();
initHeader();
initScrollSpy();
initSpotlight();
