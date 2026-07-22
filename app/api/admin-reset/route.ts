import { NextRequest, NextResponse } from "next/server";
import { resetAllSections, describeDbError } from "@/lib/server/db";

export async function POST(request: NextRequest) {
  if (!process.env.ADMIN_RESET_PASSWORD) {
    return NextResponse.json({ error: "Reset belum dikonfigurasi" }, { status: 500 });
  }

  const body = await request.json().catch(() => null);
  const password = body?.password;
  if (!password || password !== process.env.ADMIN_RESET_PASSWORD) {
    return NextResponse.json({ error: "Password salah" }, { status: 401 });
  }

  try {
    await resetAllSections();
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Gagal reset state:", describeDbError(err));
    return NextResponse.json({ error: "Gagal reset" }, { status: 500 });
  }
}
