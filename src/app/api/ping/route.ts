import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { PingLog } from "@/models/PingLog";

async function recordPing() {
  await connectToDatabase();
  const log = await PingLog.create({ triggeredAt: new Date() });
  return log;
}

export async function GET() {
  try {
    const log = await recordPing();
    return NextResponse.json({ success: true, data: log });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Failed to save ping" }, { status: 500 });
  }
}

export async function POST() {
  return GET();
}
