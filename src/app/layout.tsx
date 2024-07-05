import { ClerkProvider } from "@clerk/nextjs";
import { GeistSans } from "geist/font/sans";
import "~/styles/globals.css";
import { TopNav } from "./_components/topnav";

export const metadata = {
  title: "T3 Gallery",
  description: "Image gallery with T3",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={`font-sans ${GeistSans.variable} flex flex-col gap-4`}>
        <body >
          <TopNav />
          {children}</body>
      </html>
    </ClerkProvider>
  );
}
