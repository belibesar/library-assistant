import { Book, Journal } from "@/libs/types/libraryType";

const BookAndJournalBubbleChat: React.FC<{
  item: Book | Journal;
  type: string | undefined;
}> = ({ item, type }) => {
  const itemType = type === "buku" ? "Buku" : "Jurnal";
  return (
    <div className="mt-5 rounded-bl-none bg-blue-200 p-5 text-black">
      {type === "buku" ? (
        <>
          {/* tipe item === buku */}
          <h3>
            Judul:{" "}
            <span className="font-bold">
              {(item as Book)?.judul || ""}
            </span>{" "}
          </h3>
          <p>Sinopsis: {(item as Book)?.sinopsis}</p>
          <p>Pengarang: {(item as Book)?.pengarang?.name || ""}</p>
          <p>Penerbit: {(item as Book)?.penerbit?.name || ""}</p>
          <p>Lokasi buku: {(item as Book)?.lokasi || ""}</p>
          <p>Rak: {(item as Book)?.rak || ""}</p>
        </>
      ) : (
        <>
          {/* tipe item === jurnal */}
          <h3>
            Judul:{" "}
            <span className="font-bold">
              {(item as Journal)?.judul || ""}
            </span>{" "}
          </h3>
          <p>Sinopsis: {(item as Journal)?.abstrak || ""}</p>

          <p>
            Publikasi: {(item as Journal)?.publikasi?.name || ""},{" "}
            {(item as Journal)?.publikasi?.tahun || ""},{" "}
            {(item as Journal)?.publikasi?.volume || ""}
          </p>
          <p>Jumlah: {(item as Journal)?.jumlah || ""}</p>
          <p>
            {itemType} tersedia: {(item as Journal)?.tersedia || ""}
          </p>
          <p>
            {itemType} sedang dipinjam: {item?.dipinjam || ""}
          </p>
        </>
      )}
    </div>
  );
};

export default BookAndJournalBubbleChat;
