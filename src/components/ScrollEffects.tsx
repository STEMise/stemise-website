import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const revealSelector = [
  ".page-hero-copy",
  ".hero-panel-enter",
  ".section-intro-animate",
  ".stagger-grid",
  ".stagger-stack",
  "[data-scroll-reveal]",
].join(", ");

const ScrollEffects = () => {
  const location = useLocation();

  useEffect(() => {
    const root = document.documentElement;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let rafId = 0;

    const updateScrollState = () => {
      rafId = 0;
      const maxScroll = Math.max(root.scrollHeight - window.innerHeight, 1);
      const progress = Math.min(window.scrollY / maxScroll, 1);
      root.style.setProperty("--scroll-progress", progress.toFixed(4));
    };

    const requestUpdate = () => {
      if (mediaQuery.matches) {
        root.style.setProperty("--scroll-progress", "0");
        return;
      }

      if (!rafId) {
        rafId = window.requestAnimationFrame(updateScrollState);
      }
    };

    root.classList.add("motion-ready");
    requestUpdate();

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    mediaQuery.addEventListener("change", requestUpdate);

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      mediaQuery.removeEventListener("change", requestUpdate);
    };
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const observedElements = new WeakSet<Element>();
    let scanFrameId = 0;
    let resetFrameId = 0;
    let fallbackTimer = 0;

    if (prefersReducedMotion) {
      const showFrameId = window.requestAnimationFrame(() => {
        document.querySelectorAll<HTMLElement>(revealSelector).forEach((element) => {
          element.classList.add("is-visible");
        });
      });

      return () => {
        window.cancelAnimationFrame(showFrameId);
      };
    }

    const collectTargets = () =>
      Array.from(document.querySelectorAll<HTMLElement>(revealSelector));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.16,
        rootMargin: "0px 0px -12% 0px",
      },
    );

    const scan = () => {
      scanFrameId = 0;
      collectTargets().forEach((element) => {
        if (observedElements.has(element)) return;
        observedElements.add(element);

        element.classList.remove("is-visible");
        const rect = element.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.84) {
          element.classList.add("is-visible");
          return;
        }

        observer.observe(element);
      });
    };

    const scheduleScan = () => {
      if (scanFrameId) return;
      scanFrameId = window.requestAnimationFrame(scan);
    };

    resetFrameId = window.requestAnimationFrame(() => {
      collectTargets().forEach((element) => element.classList.remove("is-visible"));
      scheduleScan();
    });

    const mutationObserver = new MutationObserver(() => {
      scheduleScan();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    fallbackTimer = window.setTimeout(() => {
      collectTargets().forEach((element) => element.classList.add("is-visible"));
    }, 1800);

    return () => {
      window.cancelAnimationFrame(resetFrameId);
      window.cancelAnimationFrame(scanFrameId);
      window.clearTimeout(fallbackTimer);
      mutationObserver.disconnect();
      observer.disconnect();
    };
  }, [location.pathname]);

  return null;
};

export default ScrollEffects;
