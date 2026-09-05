import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  try {
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "donald.chou@gmail.com",
      subject: "🎉 恭喜！你即將完成所有課程積木",
      html: `
        <div style="font-family: -apple-system, Segoe UI, Roboto, Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 24px; background-color: #f4f4f5; border-radius: 12px;">
          <div style="background-color: #ffffff; border-radius: 8px; padding: 32px 24px; text-align: center;">
            <div style="font-size: 40px; margin-bottom: 8px;">🎉</div>
            <h1 style="font-size: 22px; color: #18181b; margin: 0 0 16px;">恭喜你！</h1>
            <p style="font-size: 16px; line-height: 1.7; color: #3f3f46; margin: 0 0 16px;">
              你的課程積木已經快要全部拼完了！<br />
              距離完成所有課程只剩最後幾步，繼續保持這個節奏，
              很快就能看到完整的成果 💪
            </p>
            <p style="font-size: 14px; color: #71717a; margin: 24px 0 0;">
              這封信由 cron-notify-practice 自動寄出
            </p>
            <p style="font-size: 12px; color: #a1a1aa; margin: 4px 0 0;">
              發送時間：${new Date().toLocaleString("zh-TW", { timeZone: "Asia/Taipei" })}
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error(error);
      return NextResponse.json({ success: false, error }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Failed to send email" }, { status: 500 });
  }
}
