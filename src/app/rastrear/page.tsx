import Link from 'next/link'
import style from './rastrear.module.css'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import TodasEntregas from '@/components/todasEntregas';
import { buttonVariants } from '@/components/ui/button';
import { redirect } from 'next/navigation';
import { empty } from '@prisma/client/runtime/library';


export default async function rastrear() {
    const session = await getServerSession(authOptions);




    let role = session?.user.role;
    let nome = session?.user.username;
    console.log(session)



    async function getEntregas(cliente: string | undefined) {
        if (session) {
            const response = await db.entrega.findMany({
                where: { clientName: cliente }
            });
            return response;
        } else {
            return null;
        }
    }


    const entregas = await getEntregas(nome)
    console.log(entregas)





    return (
        <>
            {session?.user ? (
                <div className="pt-[100px] w-screen px-20 flex flex-col justify-center items-center">
                    <div className='text-5xl font-bold text-slate-800'>
                        Suas Encomendas
                    </div>


                    <div className='flex justify-between  mt-20 flex-wrap w-[1850px]'>

                        {entregas?.map((entrega) => (
                            <TodasEntregas key={entrega.id} entrega={entrega} session={session} />
                        ))}


                        {session ?

                            <div className='hidden'></div>
                            :
                            <div className='flex justify-center flex-col items-center w-[100%]'>
                                <div className='bg-slate-800 p-4 rounded-lg flex justify-center items-center flex-col'>
                                    <h2 className='text-3xl  text-cyan-400 p-14 rounded-lg'>Fassa o Login para ver suas emcomendas</h2>
                                    <Link className='mt-3 font-bold text-3xl   text-cyan-400 border-b-4 border-cyan-400' href="/sign-in">
                                        Entrar
                                    </Link>
                                </div>

                            </div>

                        }


                    </div>


                </div>
            ) : (
                <div>Não esta logado</div>
            )}

        </>


    );

}




/*
   {
           entrega.map((entregasItem, index) => (
               <div key={index} className='p-4 bg-slate-200 border-2 border-black rounded-md'>
                   <h3 className='text-4xl font-bold text-cyan-800 mb-4'>{entregasItem.deliverId}</h3>
                   <p className='text-2xl font-bold mb-2'>Cliente: {entregasItem.clientName}</p>
                   <p className='text-2xl font-bold mb-2'>Destino: {entregasItem.destination}</p>
                   <p className='text-2xl font-bold mb-2 '>Ultima localização: {entregasItem.curretLocation}</p>
                   <p className='text-2xl font-bold mb-6 max-h-44 break-words'>Descrição: {entregasItem.description}</p>

                   <div className='flex justify-between items-center'>
                       <p className='text-xl font-bold text-slate-500'>{entregasItem.updateUt.toString()}</p>
                       {entregasItem.delivered === true ?
                           <p className='text-xl font-bold bg-green-400 p-2 rounded-md ml-6'>Entrega Realizada</p>
                           :
                           <p className='text-xl font-bold bg-orange-500 p-2 rounded-md ml-6'>Em Percurso</p>

                       }
                   </div>

               </div>
           ))
   */
