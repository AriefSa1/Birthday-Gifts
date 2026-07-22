import { NextRequest, NextResponse } from "next/server";
import { getSectionData, saveSectionData, describeDbError } from "@/lib/server/db";

const ALLOWED_SECTIONS = ["wish", "quiz", "bucketlist"];

export async function GET(request: NextRequest) {
  const section = request.nextUrl.searchParams.get("section");
  if (!section || !ALLOWED_SECTIONS.includes(section)) {
    return NextResponse.json({ error: "Section tidak valid" }, { status: 400 });
  }

  try {
    const data = await getSectionData(section);
    return NextResponse.json({ data });
  } catch (err) {
    console.error("Gagal mengambil state:", describeDbError(err));
    return NextResponse.json({ data: null });
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const section = body?.section;
  if (!section || !ALLOWED_SECTIONS.includes(section)) {
    return NextResponse.json({ error: "Section tidak valid" }, { status: 400 });
  }

  try {
    await saveSectionData(section, body.data);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Gagal menyimpan state:", describeDbError(err));
    return NextResponse.json({ error: "Gagal menyimpan" }, { status: 500 });
  }
}
