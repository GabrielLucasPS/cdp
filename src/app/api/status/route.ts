import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import * as z from 'zod'
import { any } from "zod";




const CompraSchema = z.object({
    novostatus: z.any(),
    id: z.number()
});
export async function POST(req: Request) {
    console.log('API -------------------------------------------')
    const body = await req.json();
    const { novostatus, id } = CompraSchema.parse(body)





    const alterarStatus = await db.pedidos.update({
        where: {
            id: id,
        },
        data: {
            status: novostatus
        }
    })


    const { ...rest } = alterarStatus;

    if (alterarStatus) {
        return NextResponse.json({
            entrega: rest,
            massage: "Status alterado com sucesso",
            status: 201
        });
    } else {
        return NextResponse.json({
            massage: "Alguma coisa deu errado :(",
            status: 400
        });
    }

}