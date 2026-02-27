import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SanityLive } from "@/sanity/lib/live";
import { VisualEditing } from "next-sanity/visual-editing";
import { draftMode } from "next/headers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Diggo Agency Demo",
  description: "Demo de Sanity CMS con Live Preview",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}

        {/* Sanity Live Updates */}
        <SanityLive />

        {/* Visual Editing overlays (solo en draft mode) */}
        {(await draftMode()).isEnabled && (
          <>
            <VisualEditing />
            <a
              href="/api/draft-mode/disable"
              className="fixed bottom-4 right-4 bg-black text-white px-4 py-2 rounded-full text-sm hover:bg-gray-800 transition z-50"
            >
              Salir del Preview
            </a>
          </>
        )}
      </body>
    </html>
  );
}
