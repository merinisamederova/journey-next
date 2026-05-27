"use client";

import { FormEvent, useState } from "react";

type BookingFormProps = {
  tour: string;
  tourSlug?: string;
};

type Status = "idle" | "loading" | "error";

export default function BookingForm({ tour, tourSlug }: BookingFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("loading");
    setError("");

    try {
      const formData = new FormData(form);

      const response = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tour,
          tourSlug,
          name: formData.get("name"),
          contact: formData.get("contact"),
          date: formData.get("date"),
          people: formData.get("people"),
          message: formData.get("message"),
          website: formData.get("website"),
        }),
      });

      const data = (await response.json()) as {
        whatsappUrl?: string;
        error?: string;
        whatsappDelivery?: {
          status: "sent" | "not_configured" | "failed" | "skipped_timeout";
        };
      };

      if (!response.ok || !data.whatsappUrl) {
        setStatus("error");
        setError(data.error ?? "Could not create WhatsApp message.");
        return;
      }

      window.location.assign(data.whatsappUrl);
      setStatus("idle");
    } catch {
      setStatus("error");
      setError("Could not open WhatsApp. Please try again.");
    }
  };

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-10">
          <p className="text-sm font-semibold uppercase tracking-wide text-green-700 mb-2">
            Request a booking
          </p>
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Book this tour
          </h2>
          <p className="text-gray-600">
            Send your request directly to WhatsApp with all trip details included.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-4 bg-gray-100 p-5 md:p-6 rounded-xl border border-gray-200"
        >
          <label className="text-sm font-medium text-gray-700">
            Name
            <input
              name="name"
              required
              className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-green-600"
              placeholder="Your name"
            />
          </label>

          <label className="text-sm font-medium text-gray-700">
            WhatsApp or email
            <input
              name="contact"
              required
              className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-green-600"
              placeholder="+996..."
            />
          </label>

          <label className="text-sm font-medium text-gray-700">
            Preferred date
            <input
              name="date"
              type="date"
              className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-green-600"
            />
          </label>

          <label className="text-sm font-medium text-gray-700">
            Number of people
            <input
              name="people"
              type="number"
              min="1"
              className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-green-600"
              placeholder="2"
            />
          </label>

          <label className="md:col-span-2 text-sm font-medium text-gray-700">
            Message
            <textarea
              name="message"
              rows={4}
              className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-green-600"
              placeholder="Tell us about your travel plans"
            />
          </label>

          <label className="hidden">
            Website
            <input name="website" tabIndex={-1} autoComplete="off" />
          </label>

          {error && (
            <p className="md:col-span-2 text-sm text-red-600">{error}</p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="md:col-span-2 rounded-xl bg-green-600 px-8 py-4 text-lg font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-green-400"
          >
            {status === "loading" ? "Preparing WhatsApp..." : "Send via WhatsApp"}
          </button>
        </form>
      </div>
    </section>
  );
}
