import Link from 'next/link';
import { SetStateAction, useState } from 'react';
import "./pedidospage.css";
import { Button } from "../../components/ui/button"
import { getServerSession, Session } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';



export default async function Pedidos() {
    const session = await getServerSession(authOptions);

    let currentUserId = session?.user.id;

    async function getPedidos(usuarioId: string | undefined) {
        if (session) {
            const response = await db.pedidos.findMany({
                where: {
                    AND: [
                        {
                            userId: usuarioId
                        },
                        {
                            pedidoSalvo: true
                        },
                    ],
                },
            });
            return response;
        } else {
            return null;
        }
    }
    const pedidos = await getPedidos(currentUserId);

    if (session?.user.role == "ADMIN") {
        return (
            <main>
                <div className=' rastreioContainer flex p-3 flex-col w-screen'>
                    <div className='text-2xl font-bold mb-5 w-full flex text-center justify-between'>
                        <h2 className=''>Pedidos</h2>
                        <div>
                            <div className='inputBox_bottom flex flex-1'>
                                <h2 className='mr-3'>Pedido: </h2>
                                <Button variant="default" size="icon">
                                    <div className="h-4 w-4"></div>
                                </Button>
                            </div>

                        </div>
                    </div>

                    <div className='flex w-full flex-wrap items-center justify-between'>
                        {pedidos?.map((pedidos, index) => (
                            <div key={index} className='flex p-3 w-[49%] slate-900 border border-slate-800 rounded-lg text-2xl font-bold justify-between cursor-pointer items-center mb-8'>
                                <h2>{pedidos.descricao}</h2>
                                <p>{pedidos.numero}</p>
                                <p>{pedidos.prioridade}</p>
                                <img src='assets/dropdownarrow.png' alt='Dropdown Arrow' />
                            </div>

                        ))}

                    </div>
                </div>


            </main>
        );
    } else {
        return (
            <h2 className="text-2xl">
                Ir para a
                <Link className="m-10 p-5 bg-red-600 rounded-md" href="/">
                    Home
                </Link>
            </h2>
        );
    }


}


