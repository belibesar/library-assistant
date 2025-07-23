import { NextRequest, NextResponse } from "next/server";
import JournalModel from "@/db/models/JournalModel";
import journlSchema from "@/libs/schemas/JournalSchema";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = await params;
    const data = await JournalModel.getJournalById(id);
    if (!data[0]) {
      return NextResponse.json(
        {
          success: false,
          message: "Data not found!",
        },
        {
          status: 404,
        },
      );
    }
    return NextResponse.json({
      success: true,
      message: `Data for Journal ID ${id}`,
      data: data[0],
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      error,
    });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = await params;
    const currentJournal = JournalModel.getJournalById(id);

    if (!currentJournal) {
      throw new Error(`Book not found!`);
    }

    const requestData = await request.json();
    const newData: Journal = {
      id: requestData.id,
      judul: requestData.judul,
      abstrak: requestData.abstrak,
      jurnal_id: requestData.jurnal_id,
      updatedAt: requestData.updatedAt,
      createdAt: requestData.createdAt,
    };

    const journalData = await journlSchema.parseAsync(newData);
    const updatedJournal = await JournalModel.updateJournal(id, journalData);
    return NextResponse.json({
      success: true,
      message: `Journal with id ${id} has been updated`,
      data: updatedJournal,
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
  { params }: { params: { id: string } },
) {
  try {
    const { id } = await params;
    const currentJournal = JournalModel.getJournalById(id);

    if (!currentJournal) {
      throw new Error(`Book not found!`);
    }

    const deletedJournal = await JournalModel.deleteJournal(id);
    return NextResponse.json(
      {
        success: true,
        message: `Book with id ${id} has been deleted`,
        data: deletedJournal,
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

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = await params;
    const journal = await JournalModel.getJournalById(id);
    if (!journal) {
      throw new Error(`Journal not found!`);
    }
    const increaseCount = await JournalModel.countJournal(id);
    return NextResponse.json(
      {
        success: true,
        message: `Journal count with id ${id} has been updated`,
        data: increaseCount,
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
