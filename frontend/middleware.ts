import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Example: route protection or logging
  return NextResponse.next();
}
