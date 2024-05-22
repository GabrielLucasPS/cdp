import Link from "next/link";
import "./pedidos.css";


export default function DashboardLayout({
    children, // will be a page or nested layout
}) {
    return (
        <section>
            {/* Include shared UI here e.g. a header or sidebar */}
            <nav className="topMenu">
                <a className="logo" >
                    <img src="/assets/logo.png" alt="Logo" className="" />
                </a>
                <div className="opcoesContainer">
                    <Link className="opcao " href="/novopedido">Pedidos</Link>
                    <Link className="opcao " href="/novacompra">Compra</Link>
                    <Link className="opcao " href="/rastreio">Rastreio</Link>
                    <Link className="opcao ativo" href="/pedidos">Pedidos</Link>

                </div>
                <a className="perfil">
                    <img src="/assets/account_circle.png" alt="Perfil" />
                </a>
            </nav>

            {children}
        </section>
    )
}