import { NextResponse } from "next/server";
import { db } from "@/app/lib/db/drizzle";
import { waitlist } from "@/app/lib/db/schema";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email } = body;

  if (!name || !email) {
    return NextResponse.json(
      { error: "Name and email are required" },
      { status: 400 }
    );
  }

  try {
    // Insert the data into the PostgreSQL database using Drizzle
    const result = await db.insert(waitlist).values({
      name,
      email,
    }).returning();

    return NextResponse.json({ success: true, data: result[0] }, { status: 201 });
  } catch (error: any) {
    console.error("Error adding to waitlist:", error);
    
    // Handle duplicate email error
    if (error.message?.includes("unique constraint")) {
      return NextResponse.json(
        { error: "This email is already on the waitlist" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Failed to add to waitlist" },
      { status: 500 }
    );
  }
} 