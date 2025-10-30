import Navbar from "./navigation/navbar";
import Footer from "./navigation/footer";
import { cn } from "@/utils/cn";

interface ScreenTemplateProps {
  children: React.ReactNode;
}

export default function ScreenTemplate({ children }: ScreenTemplateProps) {
  return (
    <main
      className={cn(
        "relative flex flex-col items-center min-h-screen bg-background text-text font-body overflow-x-clip"
      )}
    >
      <Navbar />
      {children}
      <Footer />
    </main>
  );
}
