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
    setStatus("loading");
    setError("");

    const formData = new FormData(event.currentTarget);

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
      }),
    });

    const data = (await response.json()) as {
      whatsappUrl?: string;
      error?: string;
      whatsappDelivery?: {
        status: "sent" | "not_configured" | "failed";
      };
    };

    if (!response.ok || !data.whatsappUrl) {
      setStatus("error");
      setError(data.error ?? "Could not create WhatsApp message.");
      return;
    }

    window.open(data.whatsappUrl, "_blank", "noopener,noreferrer");
    setStatus("idle");
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Book this tour
          </h2>
          <p className="text-gray-600">
            Send your request directly to WhatsApp with all trip details included.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-4 bg-gray-100 p-5 md:p-6 rounded-xl"
        >
          <label className="text-sm font-medium text-gray-700">
            Name
            <input
              name="name"
              required
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
              placeholder="Your name"
            />
          </label>

          <label className="text-sm font-medium text-gray-700">
            WhatsApp or email
            <input
              name="contact"
              required
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
              placeholder="+996..."
            />
          </label>

          <label className="text-sm font-medium text-gray-700">
            Preferred date
            <input
              name="date"
              type="date"
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
            />
          </label>

          <label className="text-sm font-medium text-gray-700">
            Number of people
            <input
              name="people"
              type="number"
              min="1"
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
              placeholder="2"
            />
          </label>

          <label className="md:col-span-2 text-sm font-medium text-gray-700">
            Message
            <textarea
              name="message"
              rows={4}
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
              placeholder="Tell us about your travel plans"
            />
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
