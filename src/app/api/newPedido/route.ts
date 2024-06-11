import { db } from "@/lib/db";

import { NextResponse } from "next/server";
import * as z from 'zod'
import { any } from "zod";



const PedidoSchema = z.object({
    descricaoPedido: z.string().min(1, "Descricao do pedido necessario"),
    quantidadePedido: z.number().min(1, "Quantidade do pedido necessaria"),
    tipoPedido: z.string().min(1, "Tipo do pedido necessario"),
    prioridadePedido: z.string().min(1, "Prioridade do pedido necessario"),
    departamentoPedido: z.string().min(1, "Departamento do pedido necessario"),
    Id: z.string().optional()
});
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { descricaoPedido, quantidadePedido, tipoPedido, prioridadePedido, departamentoPedido, Id } = PedidoSchema.parse(body)



        const newPedido = await db.pedidos.create({
            data: {
                descricao: descricaoPedido,
                quantidade: quantidadePedido,
                tipo: tipoPedido,
                prioridade: prioridadePedido,
                departamento: departamentoPedido,
                userId: Id,
            }
        })

        const { ...rest } = newPedido;

        return NextResponse.json({
            entrega: rest,
            massage: "Entrega criada com sucesso",
            status: 201
        });
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            massage: "Alguma coisa deu errado :(",
            status: 400
        });
    }
}