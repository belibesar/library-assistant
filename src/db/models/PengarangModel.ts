import { db } from "../config/mongodb";
import { Pengarang } from "@/libs/types";

class PengarangModel {
  static async collection() {
    return await db("pengarang");
  }

  static async generateNextId(): Promise<string> {
    const collection = await this.collection();
    
    const latestPengarang = await collection
      .find({ id: { $regex: /^A\d{3}$/ } })
      .sort({ id: -1 })
      .limit(1)
      .toArray();
    
    if (latestPengarang.length === 0) {
      return "A026"; 
    }
    
    const latestId = latestPengarang[0].id;
    const currentNumber = parseInt(latestId.substring(1), 10);
    const nextNumber = currentNumber + 1;
    
    return `A${nextNumber.toString().padStart(3, '0')}`;
  }

  static async getPengarangById(id: string) {
    const collection = await this.collection();
    const pengarang = await collection.findOne({ id: id });
    return pengarang;
  }

  static async createPengarang(data: Pengarang) {
    const collection = await this.collection();
    
    if (!data.id) {
      data.id = await this.generateNextId();
    }
    
    const pengarang = await collection.insertOne(data);
    return pengarang;
  }

  static async updatePengarang(id: string, data: Pengarang) {
    const collection = await this.collection();
    const identifier = { id: id };
    const currentPengarang = await collection.findOne(identifier);
    if (!currentPengarang) {
      throw new Error("Pengarang not found");
    }
    
    return await collection.updateOne(identifier, { $set: data });
  }

  static async findOrCreatePengarang(pengarangData: Partial<Pengarang>): Promise<string> {
    const collection = await this.collection();
    
    const existingPengarang = await collection.findOne({
      name: pengarangData.name
    });
    
    if (existingPengarang) {
      if (pengarangData.nationality) {
        await collection.updateOne(
          { id: existingPengarang.id },
          { 
            $set: {
              nationality: pengarangData.nationality
            }
          }
        );
      }
      return existingPengarang.id;
    }
    
    const newPengarang: Pengarang = {
      id: await this.generateNextId(),
      name: pengarangData.name || "",
      nationality: pengarangData.nationality || ""
    };
    
    await collection.insertOne(newPengarang);
    return newPengarang.id;
  }

  static async getAllPengarang() {
    const collection = await this.collection();
    return await collection.find({}).toArray();
  }
}

export default PengarangModel;
