import connectToDatabase from "@/db/config/mongodb";
import RepositoryBulkCollectionModel from "@/db/models/RepositoryBulkCollectionModel";
import errHandler from "@/utils/errHandler";
import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({});

export async function GET() {
  return Response.json({ message: "Hello Chatbot!" });
}

export async function POST(request: Request) {
  try {
    const res = await request.json();
    const { messageRequestFromClient } = res;
    if (!messageRequestFromClient) {
      throw { message: "message request required", status: 400 };
    }

    // get all books from db
    const checkRepo = new RepositoryBulkCollectionModel();
    console.log(
      await checkRepo.getRepository("repository-paingan-referensi"),
      "mongodb check",
    );

    //gemini logic

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: messageRequestFromClient,
      config: {
        thinkingConfig: {
          thinkingBudget: 0, // Disables thinking
        },
      },
    });

    return Response.json({ response: response.text });
  } catch (error) {
    console.log(error);
    return errHandler(error);
  }
}
