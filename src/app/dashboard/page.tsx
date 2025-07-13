// import PrivacyNotice from '../components/PrivacyNotice';
// import ChatbotSection from '../components/ChatbotSection';
import PrivacyNotice from "@/components/PrivacyNotice";
import ChatbotSection from "@/components/ChatbotSection";

export default function HomePage() {
  return (
    <div className="flex flex-col h-full">
      <PrivacyNotice />
      <ChatbotSection />
    </div>
  );
}