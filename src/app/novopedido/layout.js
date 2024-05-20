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
                    <a className="opcao ativo" >
                        Pedidos
                    </a>
                    <a className="opcao" >
                        Compra
                    </a>
                    <a className="opcao">
                        Rastreio
                    </a>

                </div>
                <a className="perfil">
                    <img src="/assets/account_circle.png" alt="Perfil" />
                </a>
            </nav>

            {children}
        </section>
    )
}