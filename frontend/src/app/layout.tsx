import "@/app/globals.css";
import { QueryProvider } from "@/providers/query-provider";
import { Inter, Tajawal } from "next/font/google";
import { ReactNode } from "react";

const sans = Inter({
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

const themeInitScript = `(function(){try{var t=localStorage.getItem('theme');var d=document.documentElement;if(t==='light'){d.classList.remove('dark');}else{d.classList.add('dark');}}catch(e){document.documentElement.classList.add('dark');}})();`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={`${sans.variable} ${arabic.variable} font-sans antialiased`}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
