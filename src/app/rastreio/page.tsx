import Link from 'next/link';
import { SetStateAction, useState } from 'react';
import "./pedidospage.css";
import { Button } from "../../components/ui/button"
import { getServerSession, Session } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { format, formatDate } from 'date-fns';



export default async function Pedidos() {
    const session = await getServerSession(authOptions);
    const usuario = await db.user.findFirst({
        where: {
            id: session?.user.id,
        },
    })
    let currentUserId = usuario?.id;

    async function getPedidos(usuarioId: string | undefined) {
        if (session) {
            const response = await db.pedidos.findMany({
                where: {
                    pedidoSalvo: true,
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
                <div className='rastreioContainer flex p-3 flex-col w-screen overflow-hidden '>
                    <div className='text-2xl font-bold mb-5 w-full flex text-center justify-between'>
                        <h2 className='text-4xl'>Rastrear compras</h2>
                        <div>
                            <div className='inputBox_bottom flex flex-1'>
                                <h2 className='mr-3'> </h2>
                                <Button variant="default" size="icon">
                                    <div className="h-4 w-4"></div>
                                </Button>
                            </div>

                        </div>
                    </div>

                    <div className='flex w-full flex-wrap items-center justify-between overflow-hidden p-2 outline-red-900'>
                        {pedidos?.map((pedidos, index) => (
                            <Link href={'/rastreio/' + pedidos.id} key={index} className='flex flex-col justify-between items-center p-3 w-[49%] max-w-[49%]   h-[210px] max-h-[210px]  overflow-hidden bg-[#06041a] text-zinc-50 rounded-lg  font-bold cursor-pointer mb-8'>

                                <div className='flex justify-between items-center text-4xl w-full mb-4'>
                                    <p>{pedidos.numero}</p>
                                    <p>{pedidos.status}</p>
                                </div>


                                <div className='w-full  text-3xl break-all mb-4'>
                                    <h2>{pedidos.descricao}</h2>
                                </div>

                                <div className='w-full  flex text-3xl break-all justify-between items-center'>
                                    {pedidos.prazoPagamento != null ? (
                                        <h2 className='mr-2 text-2xl'>{`Pagamento: ${format(pedidos.prazoPagamento, 'dd/MM/yy')}`}</h2>

                                    )
                                        :
                                        (
                                            <div className='hidden'></div>

                                        )
                                    }
                                    {pedidos.prazoEntrega != null ? (
                                        <h2 className='mr-2 text-2xl'>{`Entrega: ${format(pedidos.prazoEntrega, 'dd/MM/yy')}`}</h2>

                                    )
                                        :
                                        (
                                            <div className='hidden'></div>

                                        )
                                    }
                                    <h2>R${pedidos.valorTotal}</h2>
                                </div>
                            </Link>
                        ))

                        }


                    </div>
                </div>


            </main >
        );
    } else {
        return (
            <div>
                <h2 className="text-2xl mb-5">
                    Ir para a
                    <Link className="m-10 p-5 bg-red-600 rounded-md" href="/">
                        Home
                    </Link>
                </h2>
                <h2>
                    Ir para
                    <Link className="m-10 p-5 bg-red-600 rounded-md" href="/">
                        Fazer pedidos
                    </Link>
                </h2>
            </div>

        );
    }


}


/*

 async function getPedidos(usuarioId: string | undefined) {
        if (session) {
            const response = await db.pedidos.findMany({
                where: {
                    AND: [
                        {
                            userId: usuarioId
                        },

                    ],
                },
            });
            return response;
        } else {
            return null;
        }
    }
*/