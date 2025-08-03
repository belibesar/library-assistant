import { db } from "../config/mongodb";
import { Penerbit } from "@/libs/types";

class PenerbitModel {
  static async collection() {
    return await db("penerbit");
  }

  static async generateNextId(): Promise<string> {
    const collection = await this.collection();
    
    // Find the latest penerbit with ID pattern P###
    const latestPenerbit = await collection
      .find({ id: { $regex: /^P\d{3}$/ } })
      .sort({ id: -1 })
      .limit(1)
      .toArray();
    
    if (latestPenerbit.length === 0) {
      return "P017"; // Start from P017 as requested
    }
    
    const latestId = latestPenerbit[0].id;
    const currentNumber = parseInt(latestId.substring(1), 10);
    const nextNumber = currentNumber + 1;
    
    return `P${nextNumber.toString().padStart(3, '0')}`;
  }

  static async getPenerbitById(id: string) {
    const collection = await this.collection();
    const penerbit = await collection.findOne({ id: id });
    return penerbit;
  }

  static async createPenerbit(data: Penerbit) {
    const collection = await this.collection();
    
    if (!data.id) {
      data.id = await this.generateNextId();
    }
    
    const penerbit = await collection.insertOne(data);
    return penerbit;
  }

  static async updatePenerbit(id: string, data: Penerbit) {
    const collection = await this.collection();
    const identifier = { id: id };
    const currentPenerbit = await collection.findOne(identifier);
    if (!currentPenerbit) {
      throw new Error("Penerbit not found");
    }
    
    return await collection.updateOne(identifier, { $set: data });
  }

  static async findOrCreatePenerbit(penerbitData: Partial<Penerbit>): Promise<string> {
    const collection = await this.collection();
    
    // Find existing penerbit by name
    const existingPenerbit = await collection.findOne({
      name: penerbitData.name
    });
    
    if (existingPenerbit) {
      return existingPenerbit.id;
    }
    
    // Create new penerbit
    const newPenerbit: Penerbit = {
      id: await this.generateNextId(),
      name: penerbitData.name || ""
    };
    
    await collection.insertOne(newPenerbit);
    return newPenerbit.id;
  }

  static async getAllPenerbit() {
    const collection = await this.collection();
    return await collection.find({}).toArray();
  }
}

export default PenerbitModel;
