import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const TG = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}`;
const TG_FILE = `https://api.telegram.org/file/bot${process.env.TELEGRAM_BOT_TOKEN}`;

function getSupabase() {
  return createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

async function sendTelegramMessage(chatId: number, text: string) {
  await fetch(`${TG}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text }),
  });
}

async function downloadTelegramFile(
  fileId: string
): Promise<{ buffer: ArrayBuffer; path: string } | null> {
  const fileRes = await fetch(`${TG}/getFile?file_id=${fileId}`);
  const fileData = await fileRes.json();
  if (!fileData.ok) return null;

  const filePath = fileData.result.file_path as string;
  const download = await fetch(`${TG_FILE}/${filePath}`);
  if (!download.ok) return null;

  return { buffer: await download.arrayBuffer(), path: filePath };
}

export async function POST(request: Request) {
  try {
    const supabase = getSupabase();

    const update = await request.json();
    const message = update.message;
    if (!message) return NextResponse.json({ ok: true });

    // Only accept messages from YOU
    const senderId = String(message.from?.id ?? "");
    if (senderId !== process.env.TELEGRAM_ALLOWED_USER_ID) {
      return NextResponse.json({ ok: true });
    }

    const chatId = message.chat.id as number;

    let text = message.text || message.caption || "";
    let mediaUrl: string | null = null;
    let mediaType: string | null = null;

    // Photo: Telegram sends multiple sizes; last is largest
    if (message.photo?.length) {
      const largest = message.photo[message.photo.length - 1];
      const file = await downloadTelegramFile(largest.file_id);
      if (file) {
        const name = `photos/${Date.now()}.jpg`;
        const { error } = await supabase.storage
          .from("thoughts-media")
          .upload(name, file.buffer, { contentType: "image/jpeg" });
        if (error) {
          await sendTelegramMessage(chatId, `❌ image upload failed: ${error.message}`);
          return NextResponse.json({ ok: true });
        }
        mediaUrl = supabase.storage
          .from("thoughts-media")
          .getPublicUrl(name).data.publicUrl;
        mediaType = "image";
      }
    }

    // Video
    if (message.video) {
      const file = await downloadTelegramFile(message.video.file_id);
      if (file) {
        const ext = file.path.split(".").pop() || "mp4";
        const name = `videos/${Date.now()}.${ext}`;
        const { error } = await supabase.storage
          .from("thoughts-media")
          .upload(name, file.buffer, {
            contentType: message.video.mime_type || "video/mp4",
          });
        if (error) {
          await sendTelegramMessage(chatId, `❌ video upload failed: ${error.message}`);
          return NextResponse.json({ ok: true });
        }
        mediaUrl = supabase.storage
          .from("thoughts-media")
          .getPublicUrl(name).data.publicUrl;
        mediaType = "video";
      }
    }

    // Ignore empty updates (stickers, joins, etc.)
    if (!text && !mediaUrl) return NextResponse.json({ ok: true });

    const { error: insertError } = await supabase.from("thoughts").insert({
      text,
      media_url: mediaUrl,
      media_type: mediaType,
    });

    if (insertError) {
      await sendTelegramMessage(chatId, `❌ failed: ${insertError.message}`);
      return NextResponse.json({ ok: true });
    }

    await sendTelegramMessage(
      chatId,
      mediaUrl ? `✅ posted with ${mediaType}` : "✅ posted"
    );

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: true });
  }
}