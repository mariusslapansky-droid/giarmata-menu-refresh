import { useState } from "react";
import { ChevronDown, Globe, Mail, Menu, X } from "lucide-react";
import logoAsset from "@/assets/logo-giarmata.png.asset.json";

type MenuItem = {
  label: string;
  children?: string[];
};

const MENU: MenuItem[] = [
  { label: "Despre noi", children: ["Istoric", "Viziune și misiune", "Echipa", "Ofertă educațională"] },
  { label: "Documente instituționale", children: ["Regulament de organizare", "PDI", "Proceduri operaționale"] },
  { label: "Consiliul de administrație", children: ["Componență", "Hotărâri", "Convocatoare"] },
  { label: "Transparență – Legea 544/2001", children: ["Buletin informativ", "Solicitare informații", "Rapoarte anuale"] },
  { label: "Siguranța și prevenirea violenței", children: ["Plan de acțiune", "Anti-bullying", "Resurse utile"] },
  { label: "Elevi și părinți", children: ["Orar", "Burse", "Consiliul elevilor", "Asociația de părinți"] },
  { label: "Proiecte și activități", children: ["Erasmus+", "PNRAȘ-PNRR", "Activități extrașcolare"] },
  { label: "CEAC / Calitate", children: ["Componență CEAC", "RAEI", "Instrumente de evaluare"] },
  { label: "GDPR", children: ["Politica de confidențialitate", "Formulare", "Responsabil DPO"] },
  { label: "Achiziții / Transparență financiară", children: ["Plan anual de achiziții", "Bugete", "Execuție bugetară"] },
  { label: "Noutăți și anunțuri" },
  { label: "Contact" },
];

const LANGS = [
  { code: "RO", label: "Română" },
  { code: "EN", label: "English" },
];

function LanguageSelector({ tone = "light" }: { tone?: "light" | "dark" }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("RO");

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Selector de limbă"
        className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold tracking-wide transition-colors ${
          tone === "dark"
            ? "bg-primary-foreground/15 text-primary-foreground hover:bg-primary-foreground/25"
            : "border border-border bg-card text-foreground hover:border-primary hover:text-primary"
        }`}
      >
        <Globe className="size-3.5 shrink-0" />
        {active}
        <ChevronDown className={`size-3 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <ul className="absolute right-0 top-full z-40 mt-2 w-36 overflow-hidden rounded-xl border border-border bg-popover p-1.5 shadow-[var(--shadow-menu)]">
          {LANGS.map((lang) => (
            <li key={lang.code}>
              <button
                onClick={() => {
                  setActive(lang.code);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors hover:bg-secondary hover:text-primary ${
                  active === lang.code ? "font-semibold text-primary" : "text-popover-foreground"
                }`}
              >
                {lang.label}
                <span className="text-[0.65rem] font-bold opacity-60">{lang.code}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function NavPill({ item }: { item: MenuItem }) {
  return (
    <div className="group relative">
      <button className="flex h-14 w-full items-center justify-center gap-1.5 rounded-full border border-transparent px-3 text-center text-[0.78rem] font-semibold leading-tight text-primary-foreground/90 transition-all duration-200 group-hover:border-primary-foreground/25 group-hover:bg-primary-foreground/12 group-hover:text-primary-foreground">
        <span className="line-clamp-2">{item.label}</span>
        {item.children && (
          <ChevronDown className="size-3.5 shrink-0 opacity-70 transition-transform duration-200 group-hover:rotate-180" />
        )}
      </button>
      {item.children && (
        <div className="invisible absolute left-1/2 top-full z-30 w-60 -translate-x-1/2 translate-y-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
          <ul className="mt-1 overflow-hidden rounded-2xl border border-border bg-popover p-1.5 shadow-[var(--shadow-menu)]">
            {item.children.map((child) => (
              <li key={child}>
                <a
                  href="#"
                  className="block rounded-xl px-3 py-2 text-sm text-popover-foreground transition-colors hover:bg-secondary hover:text-primary"
                >
                  {child}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  const rows = [MENU.slice(0, 6), MENU.slice(6, 12)];

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* Identity bar */}
      <div className="border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:flex sm:justify-between">
          <a href="#" className="flex min-w-0 items-center gap-3">
            <img
              src={logoAsset.url}
              alt="Sigla Școlii Gimnaziale Giarmata"
              className="size-12 shrink-0 object-contain"
            />
            <span className="min-w-0">
              <span className="block truncate text-sm text-muted-foreground">Școala Gimnazială</span>
              <span className="block truncate text-lg font-extrabold leading-tight tracking-tight text-primary">
                Giarmata
              </span>
            </span>
          </a>
          <div className="flex items-center gap-3">
            <a
              href="mailto:secretariat@edugiarmata.ro"
              className="hidden items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-sm text-foreground transition-colors hover:border-primary hover:text-primary md:flex"
            >
              <Mail className="size-4 shrink-0" />
              secretariat@edugiarmata.ro
            </a>
            <LanguageSelector />
            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Meniu"
              className="grid size-10 place-items-center rounded-lg bg-primary text-primary-foreground lg:hidden"
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Desktop nav: dark brand band, 2 symmetric rows of 6 pills */}
      <nav className="hidden bg-[image:var(--gradient-brand)] shadow-[var(--shadow-soft)] lg:block">
        <div className="mx-auto max-w-7xl space-y-1 px-4 py-2">
          {rows.map((row, i) => (
            <div key={i} className="grid grid-cols-6 gap-1.5">
              {row.map((item) => (
                <NavPill key={item.label} item={item} />
              ))}
            </div>
          ))}
        </div>
      </nav>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="bg-[image:var(--gradient-brand)] lg:hidden">
          <ul className="mx-auto max-w-7xl divide-y divide-primary-foreground/15 px-4">
            {MENU.map((item) => (
              <li key={item.label}>
                <button
                  onClick={() => setOpenGroup(openGroup === item.label ? null : item.label)}
                  className="flex w-full items-center justify-between gap-3 py-3 text-left text-sm font-semibold text-primary-foreground"
                >
                  <span className="min-w-0">{item.label}</span>
                  {item.children && (
                    <ChevronDown
                      className={`size-4 shrink-0 opacity-70 transition-transform ${openGroup === item.label ? "rotate-180" : ""}`}
                    />
                  )}
                </button>
                {item.children && openGroup === item.label && (
                  <ul className="pb-3 pl-3">
                    {item.children.map((child) => (
                      <li key={child}>
                        <a href="#" className="block py-2 text-sm text-primary-foreground/80">
                          {child}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
