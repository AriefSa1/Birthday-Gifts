import { NextRequest, NextResponse } from "next/server";
import { getSectionData, saveSectionData, describeDbError } from "@/app/lib/db";

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
    const debug = describeDbError(err);
    console.error("Gagal mengambil state:", debug);
    // TODO: hapus field `debug` ini setelah selesai diagnosa koneksi DB di production
    return NextResponse.json({ data: null, debug });
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
    const debug = describeDbError(err);
    console.error("Gagal menyimpan state:", debug);
    // TODO: hapus field `debug` ini setelah selesai diagnosa koneksi DB di production
    return NextResponse.json({ error: "Gagal menyimpan", debug }, { status: 500 });
  }
}
