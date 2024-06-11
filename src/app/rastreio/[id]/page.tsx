import Link from 'next/link';
import { useState } from 'react';
import "./pedidos.css";
import { db } from "@/lib/db";
import { getServerSession, Session } from 'next-auth';

import { authOptions } from '@/lib/auth';
import NewCompra from '@/components/form/newCompra';
import { redirect } from 'next/navigation'
import StatusCompra from '@/components/form/statusCompra';



export default async function novaCompra({ params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);



    const usuario = await db.user.findFirst({
        where: {
            id: session?.user.id,
        },
    })

    const ID = parseInt(params.id);

    const pedido = await db.pedidos.findFirst({
        where: {
            id: ID,
        },
    })
    console.log(params.id)
    return (
        <>
            <StatusCompra pedido={pedido ? pedido : redirect('/pedidos')} userId={usuario?.id}></StatusCompra>
        </>
    );

}


