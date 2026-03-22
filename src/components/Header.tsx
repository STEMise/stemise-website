import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { externalLinks } from "@/lib/site-data";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/kits", label: "Kits" },
  { to: "/curriculum", label: "Curriculum" },
  { to: "/get-involved", label: "Get Involved" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b-2 border-foreground/10 bg-white/96 backdrop-blur-xl">
      <div className="container">
        <div className="flex h-20 items-center justify-between gap-6">
          <Link to="/" className="flex items-center">
            <img src="/og-image-dark.png" alt="STEMise" className="h-12 w-auto" />
          </Link>

          <nav
            className="hidden items-center gap-3 rounded-full border-2 border-foreground bg-[#f5f7ff] px-4 py-2 lg:flex"
            aria-label="Primary"
          >
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-white text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Button variant="outline" asChild>
              <a href={externalLinks.volunteer} target="_blank" rel="noopener noreferrer">
                Volunteer
              </a>
            </Button>
            <Button asChild>
              <a href={externalLinks.donate} target="_blank" rel="noopener noreferrer">
                Donate
              </a>
            </Button>
          </div>

          <button
            type="button"
            className="inline-flex rounded-2xl border-2 border-foreground/10 bg-[#f5f7ff] p-2 text-foreground lg:hidden"
            onClick={() => setIsMenuOpen((current) => !current)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isMenuOpen ? (
        <div className="border-t border-border bg-white lg:hidden">
          <nav className="container py-5" aria-label="Mobile">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`rounded-2xl px-4 py-3 text-sm font-semibold ${
                      isActive ? "bg-secondary text-foreground" : "text-muted-foreground"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <Button variant="outline" asChild className="mt-2">
                <a
                  href={externalLinks.volunteer}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Volunteer
                </a>
              </Button>
              <Button asChild>
                <a
                  href={externalLinks.donate}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Donate
                </a>
              </Button>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
};

export default Header;
