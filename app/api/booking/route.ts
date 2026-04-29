import { NextResponse } from "next/server";

const WHATSAPP_PHONE = "996703367477";
const WHATSAPP_GRAPH_VERSION = process.env.WHATSAPP_GRAPH_VERSION ?? "v25.0";

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

async function sendLeadToWhatsApp(text: string) {
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const managerPhone = process.env.WHATSAPP_MANAGER_PHONE ?? WHATSAPP_PHONE;

  if (!accessToken || !phoneNumberId || !managerPhone) {
    return {
      status: "not_configured",
    };
  }

  const response = await fetch(
    `https://graph.facebook.com/${WHATSAPP_GRAPH_VERSION}/${phoneNumberId}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: managerPhone,
        type: "text",
        text: {
          preview_url: false,
          body: text,
        },
      }),
    },
  );

  if (!response.ok) {
    const errorBody = await response.text();

    return {
      status: "failed",
      error: errorBody,
    };
  }

  return {
    status: "sent",
  };
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
  const whatsappDelivery = await sendLeadToWhatsApp(text);

  return NextResponse.json({ whatsappUrl, whatsappDelivery });
}
