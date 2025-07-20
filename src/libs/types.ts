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
  books?: RepositoryType[];
  racks?: [rak: string];
}

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

export type RepositoryType = {
  judul: string;
  call_number: string;
  no_invent: string;
  no_barcode: number;
  lokasi: string;
};
