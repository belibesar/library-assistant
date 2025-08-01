import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/db/models/UserModel";
import jwt from "jsonwebtoken";

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json(
        { success: false, message: "No authorization header" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return NextResponse.json(
        { success: false, message: "No token provided" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    const user = await UserModel.getUserById(decoded.id);

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    console.error("Profile GET error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json(
        { success: false, message: "No authorization header" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return NextResponse.json(
        { success: false, message: "No token provided" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    const { name, email, phone, address, institution, studentId, role, bio } = await request.json();

    const updatedUser = await UserModel.updateUser(decoded.id, {
      name,
      email,
      phone,
      address,
      institution,
      studentId,
      role,
      bio,
    });

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Profile PUT error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
