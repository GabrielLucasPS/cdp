import { buttonVariants } from "@/components/ui/button";
import User from "@/components/User";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import Link from "next/link";
import style from '../styles/home.module.css'
import React, { useState, useEffect } from 'react';
import { redirect } from 'next/navigation';

export default async function Home() {

    const session = await getServerSession(authOptions);


    if (session?.user) {
        redirect('/pedidos');
    } else {

    }

    return (
        <div className="">

            <main>
                <div className={style.loginContainer}>

                    <div className={style.leftSide}></div>

                    <div className={style.rightSide}>
                        <div className={style.logo}>

                        </div>
                        {session?.user ? (
                            <div></div>
                        ) : (
                            <Link className='px-20 rounded-lg py-5 text-3xl text-[#06041a] font-bold bg-[#26c602]' href="/sign-in">
                                Entrar
                            </Link>
                        )}


                    </div>
                </div >
            </main >
        </div>
    )

}
