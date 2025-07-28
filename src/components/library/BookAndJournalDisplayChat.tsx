import { ResultChatbotCard } from "@/libs/types";

const BookAndJournalBubbleChat: React.FC<{
  item: ResultChatbotCard;
  type: string | undefined;
}> = ({ item, type }) => {
  const itemType = type === "buku" ? "Buku" : "Jurnal";
  return (
    <div className="mt-5 rounded-bl-none bg-blue-200 p-5 text-black">
      <h3>
        Judul: <span className="font-bold">{item?.judul || ""}</span>{" "}
      </h3>
      <p>Sinopsis: {item?.abstrak || ""}</p>
      <p>Jumlah: {item?.jumlah || ""}</p>
      <p>
        {itemType} tersedia: {item?.tersedia || ""}
      </p>
      <p>
        {itemType} sedang dipinjam: {item?.dipinjam || ""}
      </p>
    </div>
  );
};

export default BookAndJournalBubbleChat;
