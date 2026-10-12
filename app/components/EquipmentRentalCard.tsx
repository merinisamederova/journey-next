"use client";

import {
  Armchair,
  ChevronDown,
  CircleGauge,
  Table2,
  TentTree,
} from "lucide-react";
import { useState } from "react";

const equipmentItems = [
  { label: "1 tent", icon: TentTree },
  { label: "2 sleeping bags", icon: TentTree },
  { label: "2 sleeping mats", icon: Table2 },
  { label: "2 pillows", icon: Armchair },
  { label: "2 chairs", icon: Armchair },
  { label: "2 pairs of trekking poles", icon: CircleGauge },
];

const individualEquipmentPrices = [
  { item: "2-person tent", price: "$10 / day" },
  { item: "Sleeping bag", price: "$5 / day" },
  { item: "Sleeping mat", price: "$2 / day" },
  { item: "Inflatable pillow", price: "$1 / day" },
  { item: "Camp chair", price: "$5 / day" },
  { item: "Trekking poles (pair)", price: "$5 / day" },
];

export default function EquipmentRentalCard() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <article className="rounded-2xl bg-gray-50 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl md:p-8">
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-700">
        <TentTree size={24} strokeWidth={1.8} />
      </div>
      <h2 className="mb-3 text-2xl font-bold text-gray-900">Equipment rental</h2>
      <p className="mb-5 leading-relaxed text-gray-600">
        Rent a full 2-person camping set or choose individual items for mountain
        routes and overnight stops.
      </p>

      <div className="mb-5 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl bg-white p-4">
          <p className="text-sm font-semibold text-gray-900">Full 2-person set</p>
          <p className="mt-2 text-2xl font-bold text-green-700">$30 / day</p>
          <p className="mt-1 text-xs text-gray-500">for 1-6 days</p>
        </div>
        <div className="rounded-xl bg-white p-4">
          <p className="text-sm font-semibold text-gray-900">Long rental rate</p>
          <p className="mt-2 text-2xl font-bold text-green-700">$25 / day</p>
          <p className="mt-1 text-xs text-gray-500">for 7+ days</p>
        </div>
      </div>

      <button
        type="button"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
        className="inline-flex w-full items-center justify-between rounded-xl bg-white px-4 py-3 text-sm font-semibold text-gray-900 transition hover:bg-green-50"
      >
        {isOpen ? "Hide details" : "Show details"}
        <ChevronDown
          size={18}
          strokeWidth={1.8}
          className={`transition ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="mt-5">
          <p className="mb-3 text-sm font-semibold text-gray-900">
            Full set includes
          </p>
          <div className="mb-5 grid gap-3 sm:grid-cols-2">
            {equipmentItems.map(({ label, icon: Icon }) => (
              <div
                key={label}
                className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 text-sm font-medium text-gray-800"
              >
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700">
                  <Icon size={18} strokeWidth={1.8} />
                </span>
                {label}
              </div>
            ))}
          </div>

          <p className="mb-3 text-sm font-semibold text-gray-900">
            Individual items
          </p>
          <div className="grid gap-3 text-sm text-gray-700">
            {individualEquipmentPrices.map(({ item, price }) => (
              <div
                key={item}
                className="flex items-center justify-between gap-4 rounded-xl bg-white px-4 py-3"
              >
                <span>{item}</span>
                <span className="shrink-0 font-semibold text-gray-900">
                  {price}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
