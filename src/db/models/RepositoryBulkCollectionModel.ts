import { RepositoryType } from "@/libs/types";
import connectToDatabase from "../config/mongodb";

class RepositoryBulkCollectionModel {
  async db() {
    return await connectToDatabase();
  }

  async getRepository(repositoryName: string) {
    const db = await connectToDatabase();
    return db.collection<RepositoryType>(repositoryName);
  }

  async getAllData() {
    try {
      const getAllCollections = await (await this.db())
        .listCollections()
        .toArray();

      const allCollections = getAllCollections.map((repo) => repo.name);
      const allData: any = {};
      for (const collectionName of allCollections) {
        const collection = await this.getRepository(collectionName);
        const data = await collection.find().toArray();
        allData[collectionName] = data;
      }
      return allData;
    } catch (error) {
      console.log(error, "<--- RepositoryBulkCollectionModel getAllData error");
    }
  }
}

export default RepositoryBulkCollectionModel;
