import { LibraryBubbleItemType, Publikasi } from "@/libs/types";
import { Book, Journal, LibraryItem, Skripsi } from "@/libs/types/libraryType";
import { useEffect } from "react";

const LibraryItemBubbleChat: React.FC<{
  item: LibraryItem | Publikasi;
  type: LibraryBubbleItemType | undefined;
}> = ({ item, type }) => {
  console.log({ item, type });

  return (
    <>
      {type === "buku" &&
        ((item as Book)?.hasOwnProperty("penerbit") === true ||
          (item as Book)?.hasOwnProperty("pengarang") === true) && (
          <BookItemBubbleChat item={item as Book} />
        )}

      {type === "jurnal" &&
        ((item as Journal)?.hasOwnProperty("publikasi") === true ||
          (item as Journal)?.hasOwnProperty("jurnal_id") === true) && (
          <JournalItemBubbleChat item={item as Journal} />
        )}

      {((type === "skripsi" &&
        (item as Skripsi)?.hasOwnProperty("mahasiswa") === true) ||
        (item as Skripsi).hasOwnProperty("nama_mahasiswa") === true) && (
        <SkripsiItemBubbleChat item={item as Skripsi} />
      )}
      {type === "publikasi" &&
        (item as Publikasi)?.hasOwnProperty("volume") === true && (
          <PublicationItemBubbleChat item={item as Publikasi} />
        )}
    </>
  );
};

const PublicationItemBubbleChat: React.FC<{
  item: Publikasi;
}> = ({ item }) => {
  return (
    <div className="mt-5 rounded-bl-none bg-blue-200 p-5 text-black">
      <h3>
        Nama:{" "}
        <span className="font-bold">
          {(item as Publikasi)?.name || ""}
        </span>{" "}
      </h3>
      <p>Volume: {(item as Publikasi)?.volume || ""} </p>
      <p>Tahun: {(item as Publikasi)?.tahun || ""}</p>
    </div>
  );
};
const SkripsiItemBubbleChat: React.FC<{
  item: Skripsi;
}> = ({ item }) => {
  return (
    <div className="mt-5 rounded-bl-none bg-blue-200 p-5 text-black">
      <h3>
        Judul:{" "}
        <span className="font-bold">{(item as Skripsi)?.judul || ""}</span>{" "}
      </h3>
      <p>Sinopsis: {(item as Skripsi)?.abstrak || ""}</p>
      <p>
        Nama Mahasiswa:{" "}
        {(item as Skripsi)?.mahasiswa?.name ||
          (item as Skripsi)?.nama_mahasiswa ||
          ""}{" "}
      </p>
      <p>Tahun Skripsi: {(item as Skripsi)?.tahun || ""}</p>
    </div>
  );
};

const JournalItemBubbleChat: React.FC<{
  item: Journal;
}> = ({ item }) => {
  return (
    <div className="mt-5 rounded-bl-none bg-blue-200 p-5 text-black">
      {/* tipe item === jurnal */}
      <h3>
        Judul:{" "}
        <span className="font-bold">{(item as Journal)?.judul || ""}</span>{" "}
      </h3>
      <p>Sinopsis: {(item as Journal)?.abstrak || ""}</p>

      <p>
        Publikasi: {(item as Journal)?.publikasi?.name || ""},{" "}
        {(item as Journal)?.publikasi?.tahun || ""},{" "}
        {(item as Journal)?.publikasi?.volume || ""}
      </p>
      <p>Jurnal tersedia: {(item as Journal)?.tersedia || ""}</p>
    </div>
  );
};
const BookItemBubbleChat: React.FC<{
  item: Book;
}> = ({ item }) => {
  return (
    <div className="mt-5 rounded-bl-none bg-blue-200 p-5 text-black">
      {/* tipe item === buku */}
      <h3>
        Judul:{" "}
        <span className="font-bold">{(item as Book)?.judul || ""}</span>{" "}
      </h3>
      <p>Sinopsis: {(item as Book)?.sinopsis || ""}</p>
      <p>Pengarang: {(item as Book)?.pengarang?.name || ""}</p>
      <p>Penerbit: {(item as Book)?.penerbit?.name || ""}</p>
      <p>Lokasi buku: {(item as Book)?.lokasi || ""}</p>
    </div>
  );
};

export default LibraryItemBubbleChat;
