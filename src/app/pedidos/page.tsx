import Link from 'next/link';
import { SetStateAction, useState } from 'react';
import "./pedidospage.css";
import { Button } from "../../components/ui/button"
import { getServerSession, Session } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { signOut } from 'next-auth/react';



export default async function Pedidos() {
    const session = await getServerSession(authOptions);

    const usuario = await db.user.findFirst({
        where: {
            email: session?.user.email != null ? session.user.email : 'asd',
        },
    })

    if (!usuario?.email) {
        signOut({
            redirect: true,
            callbackUrl: `/sign-in`
        })
    }

    let currentUserId = usuario?.id;

    async function getPedidos(usuarioId: string | undefined) {
        if (session) {
            const response = await db.pedidos.findMany({
                where: {
                    pedidoSalvo: false,
                },
            });
            return response;
        } else {
            return null;
        }
    }
    const pedidos = await getPedidos(currentUserId);

    return (
        <main>
            <div className='rastreioContainer flex p-3 flex-col w-screen overflow-hidden '>
                <div className='text-2xl font-bold mb-5 w-full flex text-center justify-between'>
                    <h2 className='text-4xl'>Pedidos</h2>
                    <div>
                        <div className='inputBox_bottom flex flex-1'>
                            <h2 className='mr-3'>{usuario?.username} </h2>
                            <Button variant="default" size="icon">
                                <div className="h-4 w-4"></div>
                            </Button>
                        </div>

                    </div>
                </div>

                <div className='flex w-full flex-wrap items-center justify-between overflow-hidden p-2 outline-red-900'>
                    {pedidos?.map((pedidos, index) => (
                        <Link href={usuario?.role === 'ADMIN' ? `/pedidos/${pedidos.id}` : `/pedidos`} key={index} className='flex flex-col justify-between items-center p-3 w-[49%] max-w-[49%]   h-[152px] max-h-[152px]  overflow-hidden bg-[#06041a] text-zinc-50 rounded-lg  font-bold cursor-pointer mb-8'>

                            <div className='flex justify-between items-center text-4xl w-full mb-4'>
                                <p>{pedidos.numero}</p>
                                <p>{pedidos.prioridade}</p>
                            </div>


                            <div className='w-full  flex-auto text-3xl break-all'>
                                <h2>{pedidos.descricao}</h2>
                            </div>
                        </Link>
                    ))}


                </div>
            </div>


        </main>
    );
}

