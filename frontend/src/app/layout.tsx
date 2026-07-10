import type { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  title: "LeadMapper AI",
  description: "Upload CSV and map leads into CRM format using AI.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
