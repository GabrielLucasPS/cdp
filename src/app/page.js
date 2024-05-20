import style from '../styles/login.module.css';
import Link from 'next/link'

export default function Home() {
    return (
        <main>
            <div className={style.loginContainer}>

                <div className={style.leftSide}></div>

                <div className={style.rightSide}>
                    <div className={style.logo}>

                    </div>

                    <div className={style.credentialsContainer}>

                        <div className={style.inputContainer}>
                            <div className={style.label}>Login</div>
                            <input className={style.login} name="myInput" />
                        </div>

                        <div className={style.inputContainer}>
                            <div className={style.label}>Senha</div>
                            <input className={style.senha} name="myInput" />
                        </div>

                        <Link className={style.entrar} href="/novopedido">Entrar</Link>

                    </div>
                    <div className={style.criarConta} >
                        Criar conta
                    </div>
                </div>
            </div >
        </main >
    );
}


