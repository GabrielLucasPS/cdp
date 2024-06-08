'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import "../styles/topbar.css";
import UserAccountnav from "./UserAccountnav";
const TopMenu = () => {
    const pathName = usePathname()
    console.log('pathName:', pathName);
    return (
        <nav className="topMenu">
            <a className="logo" >
                <img src="/assets/logo.png" alt="Logo" className="" />
            </a>
            <div className="opcoesContainer">
                <Link className={pathName === '/pedidos' ? 'opcao ativo' : 'opcao'} href="/pedidos">Pedidos</Link>
                <Link className={pathName === '/novopedido' ? 'opcao ativo' : 'opcao'} href="/novopedido">Novo pedido</Link>
                <div className={pathName.includes("/pedidos/") ? 'opcao ativo' : 'opcao'} >Compra</div>
                <Link className={pathName === '/rastreio' ? 'opcao ativo' : 'opcao'} href="/rastreio">Rastreio</Link>

            </div>
            <a className="perfil">

                <UserAccountnav></UserAccountnav>
            </a>
        </nav>
    )
}


export default TopMenu;