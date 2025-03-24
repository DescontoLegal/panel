import { Montserrat } from "next/font/google";
import "./globals.css";
import "./layout.css";

export const metadata = {
  title: "Painel",
  description: "Cartão Desconto Legal",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>
        {children}
      </body>
    </html>
  );
}
