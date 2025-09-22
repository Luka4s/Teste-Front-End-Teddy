import Header from "@/components/Header";
import { Toaster } from "sonner";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Toaster richColors closeButton />
      <Header />
      {children}
    </>
  );
};

export default Layout;
