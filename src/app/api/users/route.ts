import UserModel from "@/db/models/UserModel";
import errHandler from "@/utils/errHandler";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "50";
  const search = searchParams.get("search") || "";

  try {
    const data = await UserModel.getAllUsers(
      parseInt(page),
      parseInt(limit),
      search,
    );
    return NextResponse.json({
      success: true,
      message: "Success!",
      data: data.users,
      pagination: data.pagination,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        error,
      },
      {
        status: 500,
      },
    );
  }
}

export async function POST(request: Request) {
  try {
    const res = await request.json();
    console.log("Received registration data:", res);

    const result = await UserModel.create(res);
    console.log(result, "result");

    console.log("User created successfully:", result);

    return Response.json({
      message: "Success register user",
      success: true,
    });
  } catch (error) {
    console.error("Registration error:", error);

    if (error instanceof Error && error.message.includes("ENOTFOUND")) {
      return Response.json(
        {
          message:
            "Database connection failed. Please check your internet connection.",
          success: false,
        },
        { status: 500 },
      );
    }

    return errHandler(error);
  }
}