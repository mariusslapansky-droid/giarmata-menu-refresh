import { useState } from "react";
import { ChevronDown, Mail, Menu, X } from "lucide-react";

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

function DesktopItem({ item }: { item: MenuItem }) {
  return (
    <div className="group relative">
      <button className="flex h-full w-full items-center justify-center gap-1.5 rounded-lg px-3 py-3 text-center text-[0.8rem] font-semibold leading-tight text-foreground transition-colors duration-200 group-hover:bg-secondary group-hover:text-primary">
        <span className="line-clamp-2">{item.label}</span>
        {item.children && (
          <ChevronDown className="mt-0.5 size-3.5 shrink-0 opacity-60 transition-transform duration-200 group-hover:rotate-180" />
        )}
      </button>
      <span className="pointer-events-none absolute inset-x-3 -bottom-px h-0.5 origin-center scale-x-0 rounded-full bg-primary transition-transform duration-300 group-hover:scale-x-100" />
      {item.children && (
        <div className="invisible absolute left-1/2 top-full z-30 w-60 -translate-x-1/2 translate-y-1 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
          <ul className="mt-2 overflow-hidden rounded-xl border border-border bg-popover p-1.5 shadow-[var(--shadow-menu)]">
            {item.children.map((child) => (
              <li key={child}>
                <a
                  href="#"
                  className="block rounded-lg px-3 py-2 text-sm text-popover-foreground transition-colors hover:bg-secondary hover:text-primary"
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
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur">
      {/* Top bar */}
      <div className="bg-[image:var(--gradient-brand)] text-primary-foreground">
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:flex sm:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary-foreground/15 text-base font-black tracking-tight">
              SG
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium opacity-80">Școala Gimnazială</p>
              <p className="truncate text-lg font-extrabold leading-tight tracking-tight">Giarmata</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="mailto:secretariat@edugiarmata.ro"
              className="hidden items-center gap-2 text-sm font-medium opacity-90 transition-opacity hover:opacity-100 md:flex"
            >
              <Mail className="size-4 shrink-0" />
              secretariat@edugiarmata.ro
            </a>
            <span className="hidden rounded-full bg-primary-foreground/15 px-3 py-1 text-xs font-semibold lg:inline-block">
              PNRAȘ-PNRR 2022-2025
            </span>
            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Meniu"
              className="grid size-10 place-items-center rounded-lg bg-primary-foreground/15 lg:hidden"
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Desktop: 2 symmetric rows of 6 */}
      <nav className="mx-auto hidden max-w-7xl px-4 lg:block">
        {rows.map((row, i) => (
          <div
            key={i}
            className={`grid grid-cols-6 items-stretch ${i === 0 ? "border-b border-border/70" : ""}`}
          >
            {row.map((item) => (
              <DesktopItem key={item.label} item={item} />
            ))}
          </div>
        ))}
      </nav>

      {/* Mobile */}
      {mobileOpen && (
        <nav className="border-t border-border lg:hidden">
          <ul className="mx-auto max-w-7xl divide-y divide-border px-4">
            {MENU.map((item) => (
              <li key={item.label}>
                <button
                  onClick={() => setOpenGroup(openGroup === item.label ? null : item.label)}
                  className="flex w-full items-center justify-between gap-3 py-3 text-left text-sm font-semibold text-foreground"
                >
                  <span className="min-w-0">{item.label}</span>
                  {item.children && (
                    <ChevronDown
                      className={`size-4 shrink-0 opacity-60 transition-transform ${openGroup === item.label ? "rotate-180" : ""}`}
                    />
                  )}
                </button>
                {item.children && openGroup === item.label && (
                  <ul className="pb-3 pl-3">
                    {item.children.map((child) => (
                      <li key={child}>
                        <a href="#" className="block py-2 text-sm text-muted-foreground">
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
