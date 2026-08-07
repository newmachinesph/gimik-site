import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the Gora team.",
};

export default function ContactPage() {
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
        <div className="max-w-[560px]">
          <p className="mono-label text-orange-deep">Contact</p>
          <h1
            className="display-head mt-4 font-semibold"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
          >
            Say hello.
          </h1>
          <p className="mt-6 max-w-[46ch] text-[clamp(1rem,1vw,1.125rem)] leading-[1.65] text-ink-muted">
            Questions, ideas, or something on your list we should know about —
            we read everything.
          </p>
          <div className="mt-12">
            <ContactForm />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
