import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const update = await request.json();

    const message = update.message;
    if (!message?.text) return NextResponse.json({ ok: true });

    // Only accept messages from YOU
    const senderId = String(message.from?.id ?? "");
    if (senderId !== process.env.TELEGRAM_ALLOWED_USER_ID) {
      return NextResponse.json({ ok: true });
    }

    await supabase.from("thoughts").insert({ text: message.text });

    // Confirm back to you in Telegram
    await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: message.chat.id,
          text: "✅ posted",
        }),
      }
    );

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: true });
  }
}