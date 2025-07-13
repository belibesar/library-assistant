import connectToDatabase from "../config/mongodb";

type RepositoryType = {
  judul: string;
  call_number: string;
  no_invent: string;
  no_barcode: number;
  lokasi: string;
};

class RepositoryBulkCollectionModel {
  async getRepository(repositoryName: string) {
    const db = await connectToDatabase();
    console.log(db.collection<RepositoryType>(repositoryName));

    return db.collection<RepositoryType>(repositoryName);
  }
}

export default RepositoryBulkCollectionModel;
