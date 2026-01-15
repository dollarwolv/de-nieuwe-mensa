import config from "@payload-config";
import { getPayload } from "payload";

export async function POST(req) {
  const payload = await getPayload({ config });

  const body = await req.json();

  try {
    const created = await payload.create({
      collection: "cateringRequests",
      data: {
        ...body,
        submittedAt: new Date(),
      },
      overrideAccess: true,
    });

    const email = await payload.sendEmail({
      to: "catering@denieuwemensa.nl",
      subject: `New catering request — ${body.name} ${"on " + body.eventDate ?? ""}`,
      text: `Beep-boop! New Catering Request:\n
       Name: ${body.name}\n
       E-mail address: ${body.email ?? "not specified"}\n
       Event Description: ${body.eventAbout ?? "not specified"}\n
       Event Date: ${body.eventDate ?? "not specified"}\n
       Event Time: ${body.eventTime ?? "not specified"}\n
       Location: ${body.location ?? "not specified"}\n
       Guest Count: ${body.guestCount ?? "not specified"}\n
       Dish Request: ${body.dishRequest === "default" ? "Dish of the day" : body.desiredDish}\n
       Remarks: ${body.remarks ?? "None"}\n\n
       Please respond within 2-3 business days. Thank you! Beep-boop.`,
    });

    return Response.json({ ok: true, created: true, id: created.id });
  } catch (error) {
    console.error(error);
    return Response.json(
      { ok: false, error: "Server error." },
      { status: 500 },
    );
  }
}
