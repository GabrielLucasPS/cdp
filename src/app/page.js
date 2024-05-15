import style from '../styles/login.module.css';

export default function Home() {
    return (
        <main>
            <div className={style.loginContainer}>

                <div className={style.leftSide}></div>

                <div className={style.rightSide}>
                    <div className={style.logo}>

                    </div>

                    <div className={style.LoginContainer}>
                        <div className={style.login}>
                            Login
                        </div>
                        <div className={style.senha}>
                            Senha
                        </div>

                        <div className={style.entrar}>
                            Entrar
                        </div>
                    </div>

                    <div className={style.criarConta}>
                        Criar conta
                    </div>
                </div>
            </div >
        </main >
    );
}


