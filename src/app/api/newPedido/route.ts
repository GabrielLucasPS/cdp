import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import * as z from 'zod'
import { any } from "zod";


const PedidoSchea = z.object({
    numero: z.number().min(1, "Número do pedido"),
    descricao: z.string().min(1, "Descrição necessaria"),
    quantidade: z.number().min(1, "quantidade necessaria"),
    tipo: z.string().min(1, "Tipo de pedido necessario"),
    prioridade: z.string().min(1, "Prioridade do pedido necessaria"),
    departamento: z.string().min(1, "Departamento necessario"),
    user: z.any(),
    userId: z.string().min(1, "Id do usuario"),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { numero, descricao, quantidade, tipo, prioridade, departamento, user, userId } = PedidoSchea.parse(body)

        // ver se o Entregador ja esta em uma entrega 

        /*
            numeroPedido: 0,
            descricao: '',
            quantidade: 0,
            tipo: '',
            prioridade: '',
            departamento: '',
        */


        // CRIANDO NOVA ENTREGA

        const newPedido = await db.pedidos.create({
            data: {
                numero,
                descricao,
                quantidade,
                tipo,
                prioridade,
                departamento,
                user,
                userId
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