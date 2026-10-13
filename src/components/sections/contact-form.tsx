"use client";

// Client Component: it keeps form state (errors, "sent") and handles the
// submit event, which only exists in the browser.

import { ChevronDown, CircleCheck } from "lucide-react";
import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

// The four services (same names as the Services section), plus an open option.
const serviceOptions = [
  "Custom Software Development",
  "Performance Optimization",
  "Security & Compliance",
  "Full Stack Solutions",
  "Something else",
];

type FieldName = "name" | "email" | "message";
type Errors = Partial<Record<FieldName, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// A conventional field: white, 1px border, clear focus ring. Visitors know how
// this looks, so nothing needs explaining.
// Font size 16px (text-base) on purpose: iOS Safari zooms into smaller inputs.
const fieldClasses =
  "w-full rounded-lg border border-line-strong bg-surface-raised px-3.5 text-base text-ink transition-[border-color,box-shadow] duration-200 placeholder:text-ink-muted hover:border-ink-muted focus-visible:border-accent focus-visible:ring-4 focus-visible:ring-accent/15 focus-visible:outline-none aria-invalid:border-danger-ink aria-invalid:focus-visible:ring-danger-ink/20";

const labelClasses = "mb-1.5 block text-sm font-medium text-ink";

function validate(data: FormData): Errors {
  const errors: Errors = {};
  if (!String(data.get("name") ?? "").trim()) {
    errors.name = "Please enter your name.";
  }
  if (!emailPattern.test(String(data.get("email") ?? "").trim())) {
    errors.email = "Enter a valid email address.";
  }
  if (!String(data.get("message") ?? "").trim()) {
    errors.message = "Tell us a little about your requirements.";
  }
  return errors;
}

function FieldError({ id, message }: { id: string; message?: string }) {
  // role="alert" makes screen readers announce the message when it appears.
  return message ? (
    <p id={id} role="alert" className="mt-1.5 text-sm font-medium text-danger-ink">
      {message}
    </p>
  ) : null;
}

export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    // Stop the browser's default full-page form submission.
    event.preventDefault();
    const form = event.currentTarget;
    const nextErrors = validate(new FormData(form));
    setErrors(nextErrors);

    const firstInvalid = (["name", "email", "message"] as const).find(
      (field) => nextErrors[field],
    );
    if (firstInvalid) {
      // Move focus to the first problem so keyboard and screen-reader users land on it.
      form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    // TODO: UI only for now. Nothing is sent anywhere yet. Once a backend is
    // chosen, send `new FormData(form)` here (a Server Action or an API route)
    // and only call setSent(true) after it succeeds.
    setSent(true);
  }

  if (sent) {
    return (
      <div role="status" className="flex flex-col items-center gap-4 py-8 text-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-accent-soft text-accent-ink">
          <CircleCheck aria-hidden="true" className="size-7" />
        </span>
        <h3 className="text-2xl font-semibold tracking-tight text-ink">Thank you for reaching out</h3>
        <p className="text-ink-body">Our team will be in touch.</p>
        <Button variant="secondary" onClick={() => setSent(false)}>
          Back to the form
        </Button>
      </div>
    );
  }

  return (
    // noValidate turns off the browser's own pop-up bubbles so our messages show instead.
    <form onSubmit={handleSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
      <div>
        <label htmlFor="contact-name" className={labelClasses}>
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
          className={cn(fieldClasses, "h-12")}
        />
        <FieldError id="contact-name-error" message={errors.name} />
      </div>

      <div>
        <label htmlFor="contact-email" className={labelClasses}>
          Email Address
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
          className={cn(fieldClasses, "h-12")}
        />
        <FieldError id="contact-email-error" message={errors.email} />
      </div>

      <div>
        <label htmlFor="contact-organisation" className={labelClasses}>
          Organisation <span className="font-normal text-ink-muted">(optional)</span>
        </label>
        <input
          id="contact-organisation"
          name="organisation"
          type="text"
          autoComplete="organization"
          className={cn(fieldClasses, "h-12")}
        />
      </div>

      <div>
        <label htmlFor="contact-service" className={labelClasses}>
          Service <span className="font-normal text-ink-muted">(optional)</span>
        </label>
        {/* A native <select>: every phone shows its own familiar picker. appearance-none
            removes the browser's arrow so we can draw our own chevron on top. */}
        <div className="relative">
          <select
            id="contact-service"
            name="service"
            defaultValue=""
            className={cn(fieldClasses, "h-12 cursor-pointer appearance-none pr-10")}
          >
            <option value="">Select a service</option>
            {serviceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <ChevronDown
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 right-3.5 size-4.5 -translate-y-1/2 text-ink-muted"
          />
        </div>
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="contact-message" className={labelClasses}>
          Tell us about your requirements
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          className={cn(fieldClasses, "resize-y py-3 leading-7")}
        />
        <FieldError id="contact-message-error" message={errors.message} />
      </div>

      <Button type="submit" size="lg" arrow className="w-full sm:col-span-2">
        Send Enquiry
      </Button>
    </form>
  );
}
