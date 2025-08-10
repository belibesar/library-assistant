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
  type?: LibraryBubbleItemType;
}

export type LibraryBubbleItemType = "buku" | "skripsi" | "jurnal" | "publikasi";

export interface ChatbotMessagesCardProps {
  messages: ChatMessage[];
  inputMessage: string;
  setInputMessage: React.Dispatch<React.SetStateAction<string>>;
  agreePrivacy: boolean;
  setAgreePrivacy: React.Dispatch<React.SetStateAction<boolean>>;
  sendMessage: () => void;
  loading: boolean;
}

export interface ChatbotHeaderCardProps {
  onTagClick: (tagText: string) => void;
}

export type userType = {
  id?: string;
  email: string;
  username: string;
  name: string;
  password?: string;
  phone?: string;
  address?: string;
  institution?: string;
  studentId?: string;
  role?: string;
  bio?: string;
};
export type NewUser = {
  email: string;
  username: string;
  name: string;
  password: string;
  role: "user" | "admin";
  id_number: number;
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

export type ResultChatbotCard = LibraryItem;
export type Pengarang = {
  id: string;
  name: string;
  nationality: string;
};
export type Penerbit = {
  id: string;
  name: string;
};

export type Mahasiswa = {
  id: string;
  name: string;
  masuk: string;
  lulus: string;
  ipk: string;
  fakultas?: string;
  program_studi?: string;
};

export type Publikasi = {
  id: string;
  name: string;
  volume: string;
  tahun: string;
};
// export interface Book {
//   id: string;
//   title: string;
//   call_number?: string;
//   no_invent?: string;
//   no_barcode?: string;
//   lokasi?: string;
//   available?: number;
//   total?: number;
// }
export interface SkeletonCardProps {
  type?: 'book' | 'journal' | 'skripsi';
}
export interface LibrarySkeletonLoadingProps {
  count?: number;
  type?: 'book' | 'journal' | 'skripsi';
  types?: ('book' | 'journal' | 'skripsi')[];
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
