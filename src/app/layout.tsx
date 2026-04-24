import type { Metadata } from "next";
import "./globals.css";
import Layout from "@/components/common/Layout";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  title: "Osstem Mall",
  description: "오스템 몰 리뉴얼 프로젝트",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin=""
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <CartProvider>
          <Layout>
            {children}
          </Layout>
        </CartProvider>
      </body>
    </html>
  );
}

