import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { ToastProvider } from "@/components/ui/toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GiftBox Studio - Create Your Perfect Custom Gift Box",
  description:
    "Design and personalize your own gift box with our interactive 3D builder. Add items, choose styles, and create memorable gifts.",
  keywords:
    "gift box, custom gift, 3D builder, gift wrapping, personalized gift",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ToastProvider>
            <div className="relative flex min-h-screen flex-col">
              <div className="flex-1">{children}</div>
            </div>
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
