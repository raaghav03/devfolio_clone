import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { username, email, password, firstName, lastName } = body;

  try {
    const user = await prisma.name.create({
      data: {
        username,
        email,
        password,
        firstName,
        lastName,
      },
    });
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
