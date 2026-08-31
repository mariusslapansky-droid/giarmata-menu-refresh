import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Școala Gimnazială Giarmata – Meniu reorganizat" },
      {
        name: "description",
        content:
          "Noul aspect al meniului Școlii Gimnaziale Giarmata: 12 secțiuni pe două rânduri simetrice, cu submeniuri clare și versiune mobilă.",
      },
      { property: "og:title", content: "Școala Gimnazială Giarmata – Meniu reorganizat" },
      {
        property: "og:description",
        content: "Meniu principal cu 6 elemente pe rând, două rânduri simetrice și submeniuri.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="mx-auto max-w-7xl px-4 py-16">
        <section className="overflow-hidden rounded-3xl bg-[image:var(--gradient-brand)] px-6 py-14 text-primary-foreground shadow-[var(--shadow-soft)] sm:px-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] opacity-80">
            Împreună pentru viitorul copiilor
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            Școala Gimnazială Giarmata
          </h1>
          <p className="mt-4 max-w-2xl text-base opacity-90">
            Meniul principal a fost reorganizat: 12 secțiuni distribuite pe două rânduri simetrice,
            câte 6 pe rând, cu submeniuri la trecerea mouse-ului.
          </p>
        </section>

        <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ["Structură simetrică", "Două rânduri egale de câte 6 elemente, aliniate pe o grilă fixă."],
            ["Submeniuri clare", "Fiecare secțiune își deschide lista de pagini într-un panou curat."],
            ["Optim pe mobil", "Pe ecrane mici meniul devine listă pliabilă, ușor de parcurs."],
          ].map(([title, text]) => (
            <article
              key={title}
              className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] transition-transform duration-200 hover:-translate-y-1"
            >
              <h2 className="text-lg font-bold text-card-foreground">{title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{text}</p>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
