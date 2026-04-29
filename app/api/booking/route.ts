import { NextResponse } from "next/server";

const WHATSAPP_PHONE = "996703367477";

type BookingRequest = {
  tour?: string;
  name?: string;
  contact?: string;
  date?: string;
  people?: string;
  message?: string;
};

function clean(value: unknown) {
  return typeof value === "string" ? value.trim().slice(0, 500) : "";
}

export async function POST(request: Request) {
  const body = (await request.json()) as BookingRequest;

  const tour = clean(body.tour);
  const name = clean(body.name);
  const contact = clean(body.contact);
  const date = clean(body.date);
  const people = clean(body.people);
  const message = clean(body.message);

  if (!name || !contact || !tour) {
    return NextResponse.json(
      { error: "Name, contact and tour are required." },
      { status: 400 },
    );
  }

  const text = [
    "Hello Journey Kyrgyzstan!",
    "",
    `Tour: ${tour}`,
    `Name: ${name}`,
    `Contact: ${contact}`,
    date ? `Preferred date: ${date}` : "",
    people ? `People: ${people}` : "",
    message ? `Message: ${message}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;

  return NextResponse.json({ whatsappUrl });
}
