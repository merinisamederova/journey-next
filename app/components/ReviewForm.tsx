"use client";

import { FormEvent, useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function ReviewForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const response = await fetch("/api/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.get("name"),
        country: formData.get("country"),
        tour: formData.get("tour"),
        rating: formData.get("rating"),
        text: formData.get("text"),
      }),
    });

    const data = (await response.json()) as { error?: string };

    if (!response.ok) {
      setStatus("error");
      setError(data.error ?? "Could not submit review.");
      return;
    }

    form.reset();
    setStatus("success");
  };

  return (
    <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4 bg-gray-100 rounded-xl p-5 md:p-6">
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
        Country
        <input
          name="country"
          className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
          placeholder="Country"
        />
      </label>

      <label className="text-sm font-medium text-gray-700">
        Tour
        <input
          name="tour"
          className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
          placeholder="Kel-Suu, Song-Kul..."
        />
      </label>

      <label className="text-sm font-medium text-gray-700">
        Rating
        <select
          name="rating"
          defaultValue="5"
          className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
        >
          <option value="5">5 - Excellent</option>
          <option value="4">4 - Very good</option>
          <option value="3">3 - Good</option>
          <option value="2">2 - Fair</option>
          <option value="1">1 - Poor</option>
        </select>
      </label>

      <label className="md:col-span-2 text-sm font-medium text-gray-700">
        Review
        <textarea
          name="text"
          required
          rows={5}
          className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
          placeholder="Tell us about your journey"
        />
      </label>

      {status === "success" && (
        <p className="md:col-span-2 text-sm text-green-700">
          Thank you. Your review was submitted and will appear after approval.
        </p>
      )}

      {status === "error" && (
        <p className="md:col-span-2 text-sm text-red-600">{error}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="md:col-span-2 rounded-xl bg-green-600 px-8 py-4 text-lg font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-green-400"
      >
        {status === "loading" ? "Submitting..." : "Submit review"}
      </button>
    </form>
  );
}
