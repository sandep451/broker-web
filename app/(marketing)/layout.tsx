import "../globals.css";
import { Header } from "../../components/layout/Header";
import { Footer } from "../../components/layout/Footer";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
