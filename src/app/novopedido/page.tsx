import Link from 'next/link';
import { useState } from 'react';
import "./pedidos.css";
import { db } from "@/lib/db";
import { getServerSession, Session } from 'next-auth';

import NewPedido from '@/components/form/newPedido';
import { authOptions } from '@/lib/auth';

export default async function Pedidos() {
    const session = await getServerSession(authOptions);

    let currentUser = session?.user;


    const usuario = await db.user.findFirst({
        where: {
            id: session?.user.id,
        },
    })

    return (
        <>
            <NewPedido userId={usuario?.id}></NewPedido>
        </>
    );

}


