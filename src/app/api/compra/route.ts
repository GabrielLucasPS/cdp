import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import * as z from 'zod'
import { any } from "zod";




const CompraSchema = z.object({
    embalagem: z.string().nullish(),
    fornecedor: z.string().nullish(),
    valorTotal: z.number().nullish(),
    prazoPagamento: z.string(),
    prazoEntrega: z.string(),
    id: z.number(),
});
export async function POST(req: Request) {

    const body = await req.json();
    const { embalagem, fornecedor, valorTotal, prazoPagamento, prazoEntrega, id } = CompraSchema.parse(body)
    console.warn(embalagem, fornecedor, valorTotal, prazoPagamento, prazoEntrega, id)


    let prazoDePagamento = new Date(prazoPagamento);
    let prazoDeEntrega = new Date(prazoEntrega);


    const compra = await db.pedidos.update({
        where: {
            id: id,
        },
        data: {
            embalagem: embalagem,
            fornecedor: fornecedor,
            valorTotal: valorTotal,
            prazoPagamento: prazoDePagamento,
            prazoEntrega: prazoDeEntrega,
            pedidoSalvo: true
        }
    })

    const { ...rest } = compra;

    if (compra) {
        return NextResponse.json({
            entrega: rest,
            massage: "Entrega criada com sucesso",
            status: 201
        });
    } else {
        return NextResponse.json({
            massage: "Alguma coisa deu errado :(",
            status: 400
        });
    }

}