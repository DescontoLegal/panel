import Image from "next/image";

export default function Home() {
  return (
    <div className="container">
      <div className="sidebar">
        
        <div className="logo">
            <Image src="/logo.png" alt="Logo" width={120} height={120} />
        </div>

        <a href="#" className="menu-item">
          Home
        </a>
        <a href="#" className="menu-item">
          Cadastrar Parceiro
        </a>
        <a href="#" className="menu-item">
          Configurações
        </a>
        <a href="#" className="menu-item">
          Sair
        </a>
      </div>
      <div className="content">
        <div className="header">
          <h2>Bem-vindo ao Painel</h2>
        </div>
        <p>Utilize o menu ao lado para escolher uma opção</p>
      </div>
    </div>
  );
}
