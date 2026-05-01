import type { Metadata } from "next";
import BackHomeButton from "./components/BackHomeButton";
import Header from "./components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "Journey Kyrgyzstan",
  description: "Private tours, guides, and car hire in Kyrgyzstan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <BackHomeButton />
      </body>
    </html>
  );
}
