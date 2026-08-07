import type { ReactNode } from "react";
import { SiteFooter } from "./SiteFooter";

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <>
      <main
        id="main-content"
        className="container-page"
        style={{
          paddingTop: "calc(var(--header-height) + clamp(48px, 8vw, 112px))",
          paddingBottom: "clamp(88px, 10vw, 152px)",
        }}
      >
        <div className="max-w-[60ch]">
          <p className="mono-label text-orange-deep">Draft — pending legal review</p>
          <h1
            className="display-head mt-4 font-semibold"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
          >
            {title}
          </h1>
          <p className="mono-label mt-6 text-ink-muted">Last updated {updated}</p>
          <div className="mt-12 space-y-8 text-[clamp(1rem,1vw,1.125rem)] leading-[1.65] [&_h2]:text-[1.35em] [&_h2]:font-semibold [&_h2]:tracking-[-0.01em] [&_p]:text-ink-muted [&_li]:text-ink-muted [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">
            {children}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
