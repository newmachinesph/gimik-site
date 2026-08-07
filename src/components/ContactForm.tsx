"use client";

import { useState } from "react";
import { site } from "@/data/site";

type Errors = { name?: string; email?: string; message?: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** No backend is in scope (spec §5): validates client-side, then composes a
 *  mailto: draft. The button label says so plainly. */
export function ContactForm() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});

  function validate(): Errors {
    const next: Errors = {};
    if (!values.name.trim()) next.name = "Please add your name.";
    if (!values.email.trim()) next.email = "Please add your email.";
    else if (!EMAIL_RE.test(values.email))
      next.email = "That email doesn't look right.";
    if (!values.message.trim()) next.message = "Please write a message.";
    return next;
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    const subject = encodeURIComponent(`Hello from ${values.name}`);
    const body = encodeURIComponent(
      `${values.message}\n\n— ${values.name} (${values.email})`,
    );
    window.location.href = `mailto:${site.contactEmail}?subject=${subject}&body=${body}`;
  }

  const field =
    "w-full rounded-xl border border-rule bg-paper-sunk px-4 py-3 text-[16px] leading-normal placeholder:text-ink-muted/60";

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      <div>
        <label htmlFor="contact-name" className="mono-label block text-ink-muted">
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          className={`${field} mt-2`}
          value={values.name}
          onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
        />
        {errors.name && (
          <p id="contact-name-error" className="mt-2 text-[14px] text-orange-deep">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contact-email" className="mono-label block text-ink-muted">
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          className={`${field} mt-2`}
          value={values.email}
          onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
        />
        {errors.email && (
          <p id="contact-email-error" className="mt-2 text-[14px] text-orange-deep">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contact-message" className="mono-label block text-ink-muted">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          className={`${field} mt-2 resize-y`}
          value={values.message}
          onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
        />
        {errors.message && (
          <p id="contact-message-error" className="mt-2 text-[14px] text-orange-deep">
            {errors.message}
          </p>
        )}
      </div>

      <div className="pt-2">
        <button
          type="submit"
          className="min-h-[52px] rounded-full bg-ink px-8 text-[16px] font-semibold text-paper transition-transform duration-[160ms] hover:-translate-y-0.5"
        >
          Open in your mail app
        </button>
        <p className="mt-4 text-[14px] text-ink-muted">
          Or email{" "}
          <a
            href={`mailto:${site.contactEmail}`}
            className="font-medium text-orange-deep underline underline-offset-4"
          >
            {site.contactEmail}
          </a>{" "}
          directly.
        </p>
      </div>
    </form>
  );
}
