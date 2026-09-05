import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { PingLog } from "@/models/PingLog";

async function recordPing() {
  await connectToDatabase();
  const log = await PingLog.create({ triggeredAt: new Date() });
  return log;
}

function isAuthorized(request: NextRequest) {
  const secret = request.headers.get("x-cron-secret");
  return Boolean(process.env.CRON_SECRET) && secret === process.env.CRON_SECRET;
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const log = await recordPing();
    return NextResponse.json({ success: true, data: log });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Failed to save ping" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  return GET(request);
}
