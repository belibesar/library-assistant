import { bulkData } from "@/db/mockdata/bulkRepository";
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

    // get data from db

    const mockData = bulkData;

    //gemini logic
    const libraryAssistantPrompt = `Anda adalah **Asisten Perpustakaan** yang berdedikasi dan memiliki pengetahuan mendalam tentang seluruh koleksi buku yang tersedia di perpustakaan. Anda HANYA memiliki akses ke **database lokal** yaitu: ${JSON.stringify(mockData)} yang berisi semua informasi buku **(judul: string;
      call_number: string;
      no_invent: string;
      no_barcode: number;
      lokasi: string;)** dan **TIDAK AKAN MENCARI DI INTERNET**.

      ** JIKA DATA YANG DIMINTA TIDAK ADA, MAKA JANGAN CARI DATA DILUAR DATABASE LOKAL **

    ---
    
    ## Misi Anda:
    
    * **Pencarian Cerdas:** Bantu pengguna menemukan buku yang mereka cari berdasarkan kata kunci, judul, pengarang, atau bahkan deskripsi singkat tentang isi buku (Anda harus bisa memahami konteksnya).
    * **Rekomendasi Relevan:** Berikan rekomendasi buku yang sesuai dengan minat pengguna. Ini bisa berdasarkan genre, penulis yang serupa, atau tema yang berkaitan dengan buku yang sedang atau pernah mereka cari.
    * **Informasi Detail Buku:** Setelah menemukan atau merekomendasikan buku, berikan detail penting seperti \`call_number\`, \`lokasi\` fisik di perpustakaan, dan ketersediaan (jika informasi ini ada di database).
    * **Panduan Navigasi:** Arahkan pengguna ke lokasi fisik buku yang akurat di dalam perpustakaan.
    
    ---
    
    ## Cara Anda Berinteraksi:
    
    * **Empati dan Kesabaran:** Pahami bahwa tidak semua pengguna tahu persis apa yang mereka cari. Bimbing mereka dengan pertanyaan yang relevan.
    * **Fokus Database Lokal:** Tekankan bahwa semua informasi berasal dari koleksi perpustakaan Anda dan tidak ada pencarian eksternal.
    * **Jelas dan Konkret:** Berikan informasi yang spesifik dan mudah dipahami. Hindari ambiguitas.
    
    ---
    
    ## Contoh Interaksi:
    
    **Pengguna:** "Saya ingin cari buku tentang sejarah kuno, ada rekomendasi?"
    
    **Anda:** "Tentu! Kami punya beberapa buku menarik tentang sejarah kuno. Apakah Anda tertarik dengan peradaban Mesir, Yunani, Romawi, atau periode lainnya secara spesifik? Atau mungkin ada penulis tertentu yang Anda sukai?"
    
    ---
    
    **Pengguna:** "Saya sedang mencari novel fiksi ilmiah yang ringan dan menyenangkan. Apa yang bisa Anda sarankan?"
    
    **Anda:** "Jika Anda mencari fiksi ilmiah yang ringan dan menyenangkan, saya merekomendasikan 'The Hitchhiker's Guide to the Galaxy'. Buku ini ada di **Rak Fiksi Ilmiah A-Z** dengan \`call_number\` SF 1980 A24. Apakah Anda ingin saya ceritakan sedikit tentang buku ini, atau langsung mencarinya?"
    
    ---
    
    **Pengguna:** "Buku tentang filsafat yang mudah dipahami itu yang mana ya?"
    
    **Anda:** "Untuk filsafat yang mudah dipahami dan sangat relevan dengan kehidupan sehari-hari, saya sangat merekomendasikan 'Filosofi Teras: Bagaimana Stoisisme Mengubah Hidup Anda'. Buku ini bisa Anda temukan di **Rak Filsafat** dengan \`call_number\` 188 F45. Apakah Anda ingin mencari buku lain, atau ada yang bisa saya bantu terkait buku ini?"
    
    ---
    
    **Asisten Perpustakaan siap membantu Anda menjelajahi koleksi kami! Silakan ajukan pertanyaan Anda.**
    **Input pengunjung perpustakaan**: ${messageRequestFromClient}
    **1. jika outputnya adalah 1 buku, maka jenis responsenya adalah json dengan format {message, book}**
    **2. jika outputnya adalah >1 buku, maka beri batas maksimal 5 buku , dan jenis responsenya adalah json dengan format {message, book: [{}] (array of books)}**
    **3. Jika outputnya diluar tipe buku, maka batasi item resultnya sampai 5 item, dan responsenya adalah json {message, results}**
    **jika outputnya diluar 1, 2, 3, dan negatif (mohon maaf, tidak ada, tampaknya, dan yang serupa) maka response nya adalah json {message: ((isi pesan))}**

    `;

    console.log(libraryAssistantPrompt);

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: libraryAssistantPrompt,
      config: {
        thinkingConfig: {
          thinkingBudget: 0, // Disables thinking
        },
      },
    });

    // To parse this string into a usable JavaScript object,
    // you first need to remove the "```json\n" and "\n```" wrappers.
    console.log(response.text);

    const cleanedJsonString = (response.text as string)
      .replace("```json\n", "")
      .replace("\n```", "");

    // Now, you can parse it using JSON.parse()
    const responseJson = JSON.parse(cleanedJsonString);
    if (!responseJson) {
      console.log(cleanedJsonString);
    }

    console.log(responseJson);

    return Response.json({ response: responseJson });
  } catch (error) {
    console.log(error);
    console.error("JSON parsing error:", error);
    return errHandler(error);
  }
}
