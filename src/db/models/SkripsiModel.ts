import {db} from "@/db/config/mongodb"

class SkripsiModel {
    static async collection() {
        return await db("skripsi")
    }
}

export default SkripsiModel