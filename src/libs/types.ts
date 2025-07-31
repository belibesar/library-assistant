import { LibraryItem } from "./types/libraryType";

export type CardOnboardingFeatureProps = {
  icon: React.ReactElement;
  cardTitle: string;
  description: string;
};

export type DividerElements = {
  headerTitle: string;
  paragraph: string;
};

export type ButtonProps = {
  className: string;
  buttonName: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
};
export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}
export type HeroSectionProps = {
  heroTitle: string;
  heroDescription: string;
  span: string;
  buttonPrimary: string;
  buttonSecondary: string;
};

// Chat related types
export interface ChatMessage {
  id: number;
  sender: "user" | "bot";
  message: string;
  timestamp: string;
  results?: ResultChatbotCard[];
  racks?: Rack;
  type?: "buku" | "skripsi" | "jurnal" | "rak";
}

type Rack = {
  name: string;
};

export interface ChatbotMessagesCardProps {
  messages: ChatMessage[];
  inputMessage: string;
  setInputMessage: React.Dispatch<React.SetStateAction<string>>;
  agreePrivacy: boolean;
  setAgreePrivacy: React.Dispatch<React.SetStateAction<boolean>>;
  sendMessage: () => void;
}

export interface ChatbotHeaderCardProps {
  onTagClick: (tagText: string) => void;
}

export type userType = {
  email: string;
  username: string;
  name: string;
  password: string;
};
export type NewUser = {
  email: string;
  password: string;
  name: string;
  username: string;
};

export type CustomError = {
  message: string;
  status: number;
};
export interface Buku {
  id: string;
  judul: string;
  pengarang: string;
  jumlah: string;
  tersedia: number;
  dipinjam: string;
  penerbit_id: number;
  pengarang_id: number;
  deskripsi?: string;
}

export interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export type ResultChatbotCard = {
  _id?: { $oid: string } | string;
  id: string;
  judul: string;
  abstrak?: string;
  jumlah?: number;
  tersedia?: number;
  dipinjam?: number;
  createdAt?: string;
  updatedAt?: string;
  count?: number;
  nim?: string;
  tahun?: string;
  pengarang?: Pengarang;
  penerbit?: Penerbit;
  name?: string;
};

export type Pengarang = {
  name: string;
};
export type Penerbit = {
  name: string;
};

export type Mahasiswa = {
  id: string;
  name: string;
  masuk: string;
  lulus: string;
  ipk: string;
};

export type Publikasi = {
  id: string;
  name: string;
  volume: string;
  tahun: string;
};
export interface Book {
  id: string;
  title: string;
  call_number?: string;
  no_invent?: string;
  no_barcode?: string;
  lokasi?: string;
  available?: number;
  total?: number;
}

export interface BookData {
  _id: string;
  judul: string;
  count?: number;
}

export interface JournalData {
  _id: string;
  judul: string;
  count?: number;
}

export interface ThesisData {
  _id: string;
  judul: string;
  count?: number;
}
