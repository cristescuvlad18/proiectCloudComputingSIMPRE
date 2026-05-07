import { NextResponse } from "next/server";

import sgMail from "@sendgrid/mail";

sgMail.setApiKey(
  process.env.SENDGRID_API_KEY
);

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      name,
      email,
      subject,
      message,
    } = body;

    if (
      !name ||
      !email ||
      !subject ||
      !message
    ) {
      return NextResponse.json(
        {
          error: "Toate campurile sunt obligatorii",
        },
        { status: 400 }
      );
    }

    await sgMail.send({
      to: process.env.SENDGRID_TO_EMAIL,

      from:
        process.env.SENDGRID_FROM_EMAIL,

      replyTo: email,

      subject: `[Formular Feedback] ${subject}`,

      text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `,
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error.message ||
          "Emailul nu a fost trimis.",
      },
      { status: 500 }
    );
  }
}