import "@/app/globals.css";
import { QueryProvider } from "@/providers/query-provider";
import { Plus_Jakarta_Sans, Tajawal } from "next/font/google";
import { ReactNode } from "react";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const arabic = Tajawal({
  subsets: ["arabic"],
  variable: "--font-arabic",
  weight: ["400", "500", "700"],
});

export const metadata = {
  title: "UniHub Admin LMS",
  description: "Admin LMS for sessions, users, students, groups, community, tickets, quizzes, surveys, and reports.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${arabic.variable} font-sans antialiased`}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
