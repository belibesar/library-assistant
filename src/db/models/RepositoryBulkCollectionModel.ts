import { RepositoryType } from "@/libs/types";
import connectToDatabase from "../config/mongodb";

class RepositoryBulkCollectionModel {
  async getRepository(repositoryName: string) {
    const db = await connectToDatabase();
    return db.collection<RepositoryType>(repositoryName);
  }

  async db() {
    return await connectToDatabase();
  }
}

export default RepositoryBulkCollectionModel;
