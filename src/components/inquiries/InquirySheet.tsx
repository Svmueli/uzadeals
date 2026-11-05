
"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, MessageCircle, Send } from "lucide-react";
import { Sheet } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { sendInquiry } from "@/lib/api";
import { normalizeKenyanPhone } from "@/lib/phone";

type InquirySheetProps = {
  open: boolean;
  onClose: () => void;
  listingId: string;
  listingTitle: string;
};

export default function InquirySheet({
  open,
  onClose,
  listingId,
  listingTitle,
}: InquirySheetProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function resetForm() {
    setName("");
    setPhone("");
    setMessage("");
    setWebsite("");
    setPhoneError("");
    setFormError("");
    setSubmitted(false);
  }

  function handleClose() {
    if (submitting) return;
    onClose();
    window.setTimeout(resetForm, 200);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");
    setPhoneError("");

    const normalizedPhone = normalizeKenyanPhone(phone);

    if (!normalizedPhone) {
      setPhoneError(
        "Enter a valid Kenyan mobile number, e.g. 0712345678 or +254712345678.",
      );
      return;
    }

    if (name.trim().length < 2) {
      setFormError("Please enter your name.");
      return;
    }

    if (message.trim().length < 10) {
      setFormError("Please write a message of at least 10 characters.");
      return;
    }

    setSubmitting(true);

    try {
      const result = await sendInquiry({
        listingId,
        name: name.trim(),
        phone: normalizedPhone,
        message: message.trim(),
        website,
      });

      if (!result.success) {
        setFormError(result.message || "Your message could not be sent.");
        return;
      }

      setSubmitted(true);
    } catch {
      setFormError(
        "We could not send your message just now. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Sheet
      open={open}
      onClose={handleClose}
      title={submitted ? "Message received" : "Contact the seller"}
      description={
        submitted
          ? "Your enquiry has been recorded in this demo."
          : `Ask the seller about ${listingTitle}.`
      }
    >
      <div className="max-h-[calc(100dvh-7rem)] overflow-y-auto overscroll-contain pb-[max(1rem,env(safe-area-inset-bottom))]">
        {submitted ? (
          <div className="py-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-leaf/10 text-leaf">
              <CheckCircle2 size={28} aria-hidden="true" />
            </div>
            <h3 className="mt-4 font-display text-xl font-bold text-ink">
              Enquiry sent
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink/65">
              Your message has been received. This is a demo flow; seller
              notifications are not connected yet.
            </p>
            <Button className="mt-6" fullWidth onClick={handleClose}>
              Done
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className="rounded-control bg-paper p-3">
              <div className="flex items-start gap-2">
                <MessageCircle
                  size={18}
                  className="mt-0.5 shrink-0 text-msitu"
                  aria-hidden="true"
                />
                <p className="text-sm leading-5 text-ink/70">
                  Ask about the asking price, financial records, what's
                  included or arranging a viewing.
                </p>
              </div>
            </div>

            <Input
              label="Your name"
              name="name"
              autoComplete="name"
              required
              minLength={2}
              maxLength={80}
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="e.g. Amina"
            />

            <Input
              label="Phone number"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              required
              value={phone}
              onChange={(event) => {
                setPhone(event.target.value);
                if (phoneError) setPhoneError("");
              }}
              placeholder="07xx xxx xxx or +254..."
              hint="Accepted: 07xx, 01xx, 254xxx or +254xxx."
              error={phoneError}
            />

            <label className="block text-sm font-semibold text-ink">
              Your message
              <textarea
                name="message"
                required
                minLength={10}
                maxLength={1200}
                rows={4}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Hello, I'm interested in this business. Could you share more details about..."
                className="mt-2 min-h-28 w-full resize-y rounded-control border border-border bg-white px-3 py-3 text-sm font-normal text-ink outline-none placeholder:text-ink/40 focus-visible:ring-2 focus-visible:ring-jua"
              />
              <span className="mt-1 block text-xs font-normal text-ink/50">
                {message.length}/1200 characters
              </span>
            </label>

            {/* Honeypot: hidden from people and assistive technology. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-[10000px] top-auto h-px w-px overflow-hidden"
            >
              <label htmlFor="inquiry-website">
                Leave this field empty
              </label>
              <input
                id="inquiry-website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(event) => setWebsite(event.target.value)}
              />
            </div>

            {formError && (
              <p
                role="alert"
                className="rounded-control bg-clay/10 px-3 py-2 text-sm text-clay"
              >
                {formError}
              </p>
            )}

            <div className="sticky bottom-0 border-t border-border bg-white pt-3">
              <Button
                type="submit"
                fullWidth
                size="lg"
                loading={submitting}
                disabled={submitting}
              >
                <Send size={16} aria-hidden="true" />
                Send enquiry
              </Button>
              <p className="mt-2 text-center text-xs leading-5 text-ink/50">
                Your number is shared with the seller as part of your
                enquiry. This demo does not send SMS messages.
              </p>
            </div>
          </form>
        )}
      </div>
    </Sheet>
  );
}
