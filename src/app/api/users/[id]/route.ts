import UserModel from "@/db/models/UserModel";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const user = await UserModel.getUserById(id);
    if (!user) {
      throw new Error(`User not found!`);
    }
    const requestData = await request.json();
    const newData = {
      id: requestData.id || user.id,
      name: requestData.name || user.name,
      email: requestData.email || user.email,
      role: requestData.role || user.role,
      createdAt: requestData.createdAt || user.createdAt,
      updatedAt: new Date().toISOString(),
    };

    // Let UserModel handle the update and pengarang/penerbit processing
    const updatedUser = await UserModel.updateUser(id, newData);
    return NextResponse.json({
      success: true,
      message: `User with id ${id} has been updated`,
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      error,
    });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const user = await UserModel.getUserById(id);
    console.log("current user", user);
    if (!user) {
      throw new Error(`User not found!`);
    }

    const deleteUser = await UserModel.deleteUser(id);
    return NextResponse.json(
      {
        success: true,
        message: `User with id ${id} has been deleted`,
        data: deleteUser,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      error,
    });
  }
}
