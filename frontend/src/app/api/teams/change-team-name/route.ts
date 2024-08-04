import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: Request) {
  // Do whatever you want
  
  console.log('team_name', req.query)
  return NextResponse.json({ message: "Hello World" }, { status: 200 });
}