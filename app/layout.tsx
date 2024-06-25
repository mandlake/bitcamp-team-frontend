import { Inter } from "next/font/google";
import "@/styles/globals.css";
import dynamic from "next/dynamic";
import { Metadata } from "next";
import BaseLayout from "@/components/layouts/BaseLayout";

const ReduxProvider = dynamic(() => import("@/redux/redux-provider"), {
  ssr: false,
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <BaseLayout>{children}</BaseLayout>
        </ReduxProvider>
      </body>
    </html>
  );
}
