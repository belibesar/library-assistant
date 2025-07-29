import { ResultChatbotCard } from "@/libs/types";

const ThesisBubbleChat: React.FC<{
  item: ResultChatbotCard;
}> = ({ item }) => {
  return (
    <div className="mt-5 rounded-bl-none bg-blue-200 p-5 text-black">
      <h3>
        Judul: <span className="font-bold">{item?.judul || ""}</span>{" "}
      </h3>
      <p>Sinopsis: {item?.abstrak || ""}</p>
      <p>Nama Mahasiswa: John Doe</p>
      <p>Tahun Skripsi: {item?.tahun || ""}</p>
    </div>
  );
};

export default ThesisBubbleChat;
