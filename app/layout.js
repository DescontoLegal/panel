import Image from "next/image";
import "./globals.css";
import "./layout.css";
import Link from "next/link";

export const metadata = {
  title: "CDL ADMIN",
  description: "Painel do ADMIN CDL",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <div className="container">
            <div className="sidebar">
              <div className="logo">
                <Image src="/logo.png" alt="Logo" width={120} height={120} />
              </div>

              <Link href="/" className="menu-item">
                Home
              </Link>

              <Link href="/pages/add-partner" className="menu-item">
                Cadastrar Parceiro
              </Link>

              <Link href="/pages/list-partner" className="menu-item">
                Listar Parceiro
              </Link>

              <Link href="/pages/config" className="menu-item">
                Configurações
              </Link>

              <Link href="/" className="menu-item">
                Sair
              </Link>
            </div>

            {children}
            
          </div>
        </main>
      </body>
    </html>
  );
}
