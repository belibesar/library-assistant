import { db } from "../config/mongodb";
import { Publikasi } from "@/libs/types";

class PublikasiModel {
  static async collection() {
    return await db("publikasi");
  }

  static async generateNextId(): Promise<string> {
    const collection = await this.collection();
    
    const latestPublikasi = await collection
      .find({ id: { $regex: /^JRN\d{3}$/ } })
      .sort({ id: -1 })
      .limit(1)
      .toArray();
    
    if (latestPublikasi.length === 0) {
      return "JRN006";
    }
    
    const latestId = latestPublikasi[0].id;
    const currentNumber = parseInt(latestId.substring(3), 10);
    const nextNumber = currentNumber + 1;
    
    return `JRN${nextNumber.toString().padStart(3, '0')}`;
  }

  static async getPublikasiById(id: string) {
    const collection = await this.collection();
    const publikasi = await collection.findOne({ id: id });
    return publikasi;
  }

  static async createPublikasi(data: Publikasi) {
    const collection = await this.collection();
    
    if (!data.id) {
      data.id = await this.generateNextId();
    }
    
    const publikasi = await collection.insertOne(data);
    return publikasi;
  }

  static async updatePublikasi(id: string, data: Publikasi) {
    const collection = await this.collection();
    const identifier = { id: id };
    const currentPublikasi = await collection.findOne(identifier);
    if (!currentPublikasi) {
      throw new Error("Publikasi not found");
    }
    
    return await collection.updateOne(identifier, { $set: data });
  }

  static async findOrCreatePublikasi(publikasiData: Partial<Publikasi>): Promise<string> {
    const collection = await this.collection();
    
    const existingPublikasi = await collection.findOne({
      name: publikasiData.name
    });
    
    if (existingPublikasi) {
      if (publikasiData.volume || publikasiData.tahun) {
        await collection.updateOne(
          { id: existingPublikasi.id },
          { 
            $set: {
              ...(publikasiData.volume && { volume: publikasiData.volume }),
              ...(publikasiData.tahun && { tahun: publikasiData.tahun })
            }
          }
        );
      }
      return existingPublikasi.id;
    }
    
    const newPublikasi: Publikasi = {
      id: await this.generateNextId(),
      name: publikasiData.name || "",
      volume: publikasiData.volume || "",
      tahun: publikasiData.tahun || ""
    };
    
    await collection.insertOne(newPublikasi);
    return newPublikasi.id;
  }

  static async getAllPublikasi() {
    const collection = await this.collection();
    return await collection.find({}).toArray();
  }
}

export default PublikasiModel;
