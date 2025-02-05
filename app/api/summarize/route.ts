import dbConnect from "@/lib/db";
import { summarizePDF } from "@/lib/deepseek";
import { NextResponse } from "next/server";
import Summary from "@/models/summary";
import PdfParse from "pdf-parse";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file || file.type !== "application/pdf") {
      return NextResponse.json(
        { error: "Invalid file format" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const data = await PdfParse(buffer);
    await dbConnect();
    const summaryText = await summarizePDF(data.text);

    const newSummary = await Summary.create({
      originalName: file.name,
      content: data.text,
      summary: summaryText,
    });

    return NextResponse.json({
      id: newSummary._id,
      summary: summaryText,
    });
  } catch (error) {
    console.log("Internal Server Error: ", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
