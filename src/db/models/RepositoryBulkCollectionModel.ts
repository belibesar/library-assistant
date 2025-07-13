import { RepositoryType } from "@/libs/types";
import connectToDatabase from "../config/mongodb";

class RepositoryBulkCollectionModel {
  async getRepository(repositoryName: string) {
    const db = await connectToDatabase();
    console.log(db.collection<RepositoryType>(repositoryName));

    return db.collection<RepositoryType>(repositoryName);
  }
}

export default RepositoryBulkCollectionModel;
