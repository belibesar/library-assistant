import BookModel from "@/db/models/BookModel";
import JournalModel from "@/db/models/JournalModel";
import ThesisModel from "@/db/models/ThesisModel";
import errHandler from "@/utils/errHandler";
import { CachingService } from "@/utils/caching";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

function extractText(resp: any) {
  try {
    const text =
      resp?.response?.candidates?.[0]?.content?.parts?.[0]?.text ??
      resp?.candidates?.[0]?.content?.parts?.[0]?.text ??
      resp?.response?.candidates?.[0]?.content?.text;

    // console.log(text, "<---EXTEXT");

    return text ?? JSON.stringify(resp, null, 2);
  } catch (error) {
    console.error(`Error extracting text func extractText: `, error);
    JSON.stringify(resp, null, 2);
  }
}

function fetchHistoryChat(histories: any) {
  try {
    let history = [];

    if (!histories) {
      history = [];
    } else {
      history = histories;
    }

    // // Log data untuk debugging
    // console.log("Riwayat yang diterima:", JSON.stringify(historyMessage));

    // Pastikan historyChat adalah array yang valid
    if (!Array.isArray(history)) {
      console.log("historyChat must be an array.");
      history = [];
    } else {
      history = histories;
    }

    // Periksa setiap objek di historyChat
    for (const turn of histories) {
      if (!turn.role || (turn.role !== "user" && turn.role !== "model")) {
        console.log("Objek riwayat dengan peran tidak valid:", turn);
        console.log(`Role must be user or model, but got ${turn.role}.`);
        history = [];
      } else {
        history = histories;
      }
    }

    return history;
  } catch (error) {
    console.error(error, "error on fetchHistoryChat");
  }
}

async function fetchDatabase() {
  try {
    // data dari db
    // mendapatkan data buku
    const responseGetAllBook: any = await BookModel.getAllBook(1, 1000, "");
    const booksCollection = await responseGetAllBook?.books;
    // console.log(booksCollection, "<-------- ALLLL BOOKS");

    // mendapatkan data skripsi
    const responseGetAllThesis: any = await ThesisModel.getAllThesis(
      1,
      1000,
      "",
    );
    const thesisCollection = await responseGetAllThesis?.thesis;
    // console.log(thesisCollection, '<--------- All THESIS')

    // mendapatkan data jurnal
    const responseGetAllJournal: any = await JournalModel.getAllJournal(
      1,
      1000,
      "",
    );
    const journalCollection = await responseGetAllJournal?.journals;
    // console.log(journalCollection, "<-------- journalCollection");

    // output
    const dataFromDatabase = [
      {
        buku: booksCollection,
        skripsi: thesisCollection,
        jurnal: journalCollection,
      },
    ];
    return JSON.stringify(dataFromDatabase);
    // console.log({ dataFromDatabase }, "<------- dataFromDatabase");
  } catch (error) {
    console.log(error);
  }
}

function handleGeminiResponse(responseChat: any) {
  try {
    // Extract text from Gemini response (handle both .text and .content?.parts?.[0]?.text)
    const rawText = extractText(responseChat);

    // console.log(rawText);

    let cleanedJsonString = rawText
      .replace(/```json\s*([\s\S]*?)\s*```/g, "$1") // remove ```json ... ```
      .replace(/```[\s\S]*?```/g, "") // remove ``` ... ```
      .trim();

    // If the string is already a JSON-like object (e.g. {message: "Maaf data tersebut tidak ditemukan"})
    // but not valid JSON (single quotes, missing quotes on keys), try to fix it
    if (
      cleanedJsonString.startsWith("{") &&
      cleanedJsonString.endsWith("}") &&
      !cleanedJsonString.includes("\n")
    ) {
      // Try to fix missing quotes on keys
      cleanedJsonString = cleanedJsonString.replace(
        /([{,]\s*)([a-zA-Z0-9_]+)\s*:/g,
        '$1"$2":',
      );
    }

    // If still not valid JSON, fallback to wrapping as message
    let responseJson;
    try {
      responseJson = JSON.parse(cleanedJsonString);
    } catch {
      responseJson = { message: cleanedJsonString };
    }
    return responseJson;
  } catch (error) {
    throw error;
  }
}

export async function GET() {
  return Response.json({ message: "Hello Chatbot!" });
}

export async function POST(request: Request) {
  try {
    const res = await request.json();
    const messageRequestFromClient = res?.messageRequestFromClient;
    const historyMessage = res?.historyMessage;
    if (!messageRequestFromClient) {
      throw { message: "message request required", status: 400 };
    }

    // fetch history chat
    const history = fetchHistoryChat(JSON.parse(historyMessage)) || [];
    // console.log("Riwayat yang diterima:", history);

    // cek apakah cache dengan key tsb ada? kalo ada fetch lewat cache
    // kalo gaada fetch database, terus set key value ke uptash
    let stringDatabase = await CachingService.getCache("DB:CHATBOT:SOURCE");

    if (!stringDatabase) {
      console.log("fetching from database....");
      stringDatabase = (await fetchDatabase()) as string;
      await CachingService.setCache("DB:CHATBOT:SOURCE", stringDatabase);
    } else {
      console.log("cache hit - using cached data");
    }

    //gemini logic
    const libraryAssistantInstructions = `
    Anda adalah **Asisten Perpustakaan USD** yang berdedikasi dan memiliki pengetahuan mendalam tentang 
    seluruh koleksi yang tersedia di perpustakaan. Anda HANYA memiliki akses ke **database lokal** 
    yaitu: ${stringDatabase} yang berisi semua informasi item dengan rincian:
   
   type Buku =  {
    id: string;
    judul: string;
    abstrak?: string;
    jumlah: number;
    tersedia: number;
    dipinjam: number;
    count?: number;
    penerbit_id: string;
    pengarang_id: string;
    penerbit: Penerbit;
    pengarang: Pengarang;
    rak: string;
    sinopsis: string;
    lokasi: string;
    updatedAt?: string;
    createdAt?: string;
  },

  type Penerbit= {
    id: string;
    name: string;
  }

  type Pengarang= {
    id: string;
    name: string;
    nationality: string;
  }

   type Jurnal = {
    id: string;
    judul: string;
    abstrak?: string;
    jumlah: number;
    tersedia: number;
    dipinjam: number;
    count?: number;
    jurnal_id: string;
    publikasi: Publikasi;
    updatedAt?: string;
    createdAt?: string;
  }
    type Publikasi= {
    id: string;
    name: string;
    volume: string;
    tahun: string;
  }
, dan
    type Skripsi = {
    id: string;
    judul: string;
    abstrak?: string;
    count?: number;
    nim: string;
    tahun: string;
    updatedAt?: string;
    createdAt?: string;
    mahasiswa: Mahasiswa;
}
    type Mahasiswa = {
    id: string;
    name: string;
    masuk: string;
    lulus: string;
    ipk: string;
    fakultas?: string;
    program_studi?: string;
  }

      **TIDAK AKAN MENCARI DI INTERNET**.
      **JIKA DATA YANG DIMINTA TIDAK ADA, MAKA JANGAN CARI DATA DILUAR DATABASE LOKAL, 
        OUTPUT NYA MAAF DATA TERSEBUT TIDAK DITEMUKAN **
    ---
    
    ## Misi Anda:
    * **Pencarian Cerdas:** Bantu pengguna menemukan item yang mereka cari. Sesuaikan abstrak sebagai sinopsis dari item yang dicari user.
    * **Rekomendasi Relevan:** Berikan rekomendasi item yang sesuai dengan minat pengguna. Ini bisa berdasarkan genre, 
      penulis yang serupa, atau tema yang berkaitan dengan item yang sedang atau pernah mereka cari.
    * **Informasi Detail:** Setelah menemukan atau merekomendasikan item, berikan detail pentingnya kecuali id
    (informasi ini ada di database).
    * **Panduan Navigasi:** Arahkan pengguna ke lokasi fisik item yang akurat di dalam perpustakaan.
    ---
        ## Cara Anda Berinteraksi:
    * **Empati dan Kesabaran:** Pahami bahwa tidak semua pengguna tahu persis apa yang mereka cari. 
      Bimbing mereka dengan pertanyaan yang relevan.
    * **Fokus Database Lokal:** Tekankan bahwa semua informasi berasal dari koleksi perpustakaan Anda dan tidak ada pencarian eksternal.
    * **Jelas dan Konkret:** Berikan informasi yang spesifik dan mudah dipahami. Hindari ambiguitas.
    ---
    
    ## Contoh Interaksi:
    **Pengguna:** "Saya ingin cari buku tentang sejarah kuno, ada rekomendasi?"
    **Anda:** "Tentu! Kami punya beberapa buku menarik tentang sejarah kuno. Apakah Anda tertarik dengan 
      peradaban Mesir, Yunani, Romawi, atau periode lainnya secara spesifik? Atau mungkin ada penulis tertentu yang Anda sukai?"
    ---
    
    **Pengguna:** "Saya sedang mencari novel fiksi ilmiah yang ringan dan menyenangkan. Apa yang bisa Anda sarankan?"
    **Anda:** "Jika Anda mencari fiksi ilmiah yang ringan dan menyenangkan, saya merekomendasikan 'The Hitchhiker's Guide to the Galaxy'.
      Buku ini ada di **Rak Fiksi Ilmiah A-Z**. Apakah Anda ingin saya ceritakan sedikit tentang buku ini, atau langsung mencarinya?"
    ---
    
    **Pengguna:** "Buku tentang filsafat yang mudah dipahami itu yang mana ya?"
    **Anda:** "Untuk filsafat yang mudah dipahami dan sangat relevan dengan kehidupan sehari-hari, saya sangat merekomendasikan 
    'Filosofi Teras: Bagaimana Stoisisme Mengubah Hidup Anda'. Buku ini bisa Anda temukan di **Rak Filsafat**. 
    Apakah Anda ingin mencari buku lain, atau ada yang bisa saya bantu terkait buku ini?"
    _______
    **Asisten Perpustakaan siap membantu Anda menjelajahi koleksi kami! Silakan ajukan pertanyaan Anda.**
    item adalah buku / skripsi / jurnal / publikasi
    **1. JIKA JUMLAH ITEMNYA DITENTUKAN OLEH USER,
    contoh: berikan saya 2 item tentang sejarah
        MAKA BERIKAN HANYA 2 item TENTANG SEJARAH
    dengan output
        {message: ((PESAN DARI ANDA) tipe:string), result:  [] (tipe resultnya:  Jurnal[] | Skripsi[] | Buku[] | Publikasi[] ), type: "jurnal" / "skripsi" / "buku" / "publikasi" }

    **JIKA JUMLAH ITEMNYA TIDAK DITENTUKAN OLEH USER
    contoh: rekomendasikan ITEM kepada saya
      jika hasil dari itemnya LEBIH DARI 5, maka batasi HANYA 5 ITEM PILIHAN, jika tidak, berikan sesuai hasil jumlah itemnya
    tetap dengan output
      {message: ((PESAN DARI ANDA) tipe: string), result:  [] (tipe resultnya:  Jurnal[] | Skripsi[] | Buku[] | Publikasi[]), type: "jurnal" / "skripsi" / "buku" / "publikasi" }
      jika itemnya hanya satu outputnya tetap {message: ((PESAN DARI ANDA)), result:  [] (tipe resultnya:  Jurnal[] | Skripsi[] | Buku[] | Publikasi[]), type: "jurnal" / "skripsi" / "buku" / "publikasi" }

    **JIKA MENANYAKAN ... apa aja penerbit / apa aja pengarang ... 
    jawab dengan output
    {message: ((PESAN DARI ANDA) tipe: string)}

    **JIKA ITEM YANG DICARI TIDAK ADA
    KONTEKS: di database lokal tidak ada jurnal dengan judul "Otomotif Terbarukan";
    contoh input: coba carikan saya jurnal dengan judul otomotif terbarukan;
    MAKA OUTPUTNYA "MAAF JURNAL YANG DICARI TIDAK ADA" atau yang senada dengan kalimat tersebut,
      dengan output {message: ((ISI PESAN DISINI) tipe: string)}
      contoh output = {message: 'Maaf jurnal yang dicari tidak ada'}

    **JIKA DILUAR KONTEKS PERAN ANDA HANYA SEBAGAI LIBRARY ASSISTANT, maka tawarkan bantuan, apakah ingin disarankan atau direkomendasikan buku/ skripsi/ jurnal  di perpustakaan ini karena peran anda sebagai asisten perpustakaan
    maka outputnya tetap {message: ((PESAN DARI ANDA) tipe: string)}

    ** JANGAN BERIKAN AKSES KETIKA USER MEMINTA UNTUK MENAMBAH, MENGUBAH ATAU MENGHAPUS ITEM

    
    `;

    console.log("processing instructions: " + messageRequestFromClient);

    const chat = ai.chats.create({
      model: "gemini-2.5-flash",
      history: history,
      config: {
        thinkingConfig: {
          thinkingBudget: 0, // AI time allocation for unlimited thinking
        },
        systemInstruction: libraryAssistantInstructions,
        responseMimeType: "application/json",
      },
    });

    const responseChat = await chat.sendMessage({
      message: messageRequestFromClient,
    }); // multimodal chat configuration

    const responseJson = handleGeminiResponse(responseChat);

    console.log(responseJson, "<-------- RESPONSES");

    return Response.json({
      response: responseJson,
    });
  } catch (error) {
    console.log(error);
    console.error("JSON parsing error:", error);
    return errHandler(error);
  }
}
