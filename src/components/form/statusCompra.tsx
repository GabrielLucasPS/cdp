'use client';

import { useForm } from 'react-hook-form';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../ui/form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { useToast } from '../ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';


import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"


import { Status } from '@prisma/client';
import { useEffect, useState } from 'react';
import { $Enums } from "@prisma/client";

type Props = {
    userId?: String;
    pedido: {
        id: number;
        numero: number;
        descricao: string;
        quantidade: number;
        tipo: string;
        prioridade: string;
        departamento: string;
        pedidoSalvo: boolean | null;
        embalagem: string | null;
        fornecedor: string | null;
        valorTotal: Number | null;
        prazoPagamento: Date | null;
        prazoEntrega: Date | null;
        status: Status | null;
        userId: String | null;
        createdAt: Date | null;
        updatedAt: Date | null;
    }
}

const StatusCompra = ({ userId, pedido }: Props) => {
    const router = useRouter()

    const { toast } = useToast()

    const [abrir, setAbrir] = useState(1);
    const [status, setStatus] = useState<$Enums.Status | null>(pedido.status);



    const alterarStatus = async (idpedido: number, Status: $Enums.Status | null) => {
        console.log('Entro -------------------------------------------')
        const response = await fetch('/api/status', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                novostatus: Status,
                id: idpedido
            })
        })

        if (response.ok) {
            toast({
                title: "Confirmado",
                description: "Status alterado com sucesso",
            })

            router.refresh()
        } else {
            toast({
                title: "Erro",
                description: "Oops! Alguma coisa deu errado :(",
                variant: 'destructive'

            })
        }
    }

    useEffect(() => {
        if (abrir == 1) {
            setAbrir(2)
        } else {
            alterarStatus(pedido.id, status)
        }
    }, [status])


    return (
        <div className='w-full novoPedidoContainer '>
            <div className='bg-[#06041A]  rounded-lg p-10 h-full w-full flex-col  justify-between  grid grid-cols-3 grid-rows-2 text-zinc-50 gap-4'>

                <div className='p-4  rounded-lg flex flex-col justify-center shadow-sm shadow-slate-100'>
                    <h2 className='text-4xl font-bold w-full text-center mb-8 h-[120px] '>PEDIDO RECEBIDO</h2>
                    <div className={status != null ? 'verde' : 'vermelho'} onClick={() => setStatus('PEDIDO_RECEBIDO')}>
                        <h2 >CONFIRMAR PEDIDO</h2>
                    </div>
                </div>

                <div className='p-4  rounded-lg flex flex-col justify-center shadow-sm shadow-slate-100'>
                    <h2 className='text-4xl font-bold w-full text-center mb-8 h-[120px] '>FAZENDO COTAÇÃO</h2>
                    <div className={status != null && status != 'PEDIDO_RECEBIDO' ? 'verde' : 'vermelho'} onClick={() => setStatus('FAZENDO_COTACAO')}>
                        <h2 >CONFIRMAR COTAÇÃO</h2>
                    </div>
                </div>

                <div className='p-4  rounded-lg flex flex-col justify-center shadow-sm shadow-slate-100'>
                    <h2 className='text-4xl font-bold w-full text-center mb-8 h-[120px] '>COMPRA REALIZADA</h2>
                    <div className={status != null && status != 'PEDIDO_RECEBIDO' && status != 'FAZENDO_COTACAO'
                        ? 'verde' : 'vermelho'} onClick={() => setStatus('COMPRA_REALIZADA')}>
                        <h2>CONFIRMAR COMPRA</h2>
                    </div>
                </div>

                <div className='p-4  rounded-lg flex flex-col justify-center shadow-sm shadow-slate-100'>
                    <h2 className='text-4xl font-bold w-full text-center mb-8 h-[120px] '>COMPRA ENVIADA</h2>
                    <div className={status != null && status != 'PEDIDO_RECEBIDO' && status != 'FAZENDO_COTACAO' && status != 'COMPRA_REALIZADA'
                        ? 'verde' : 'vermelho'} onClick={() => setStatus('COMPRA_ENVIADA')}>
                        <h2>CONFIRMAR ENVIO</h2>
                    </div>
                </div>

                <div className='p-4  rounded-lg flex flex-col justify-center shadow-sm shadow-slate-100'>
                    <h2 className='text-4xl font-bold w-full text-center mb-8 h-[120px] '>COMPRA RECEBIDA</h2>
                    <div className={status != null && status != 'PEDIDO_RECEBIDO' && status != 'FAZENDO_COTACAO' && status != 'COMPRA_REALIZADA' && status != 'COMPRA_ENVIADA'
                        ? 'verde' : 'vermelho'} onClick={() => setStatus('COMPRA_RECEBIDA')}>
                        <h2>CONFIRMAR RECIBO</h2>
                    </div>
                </div>

                <div className='p-4  rounded-lg flex flex-col justify-center shadow-sm shadow-slate-100'>
                    <h2 className='text-4xl font-bold w-full text-center mb-8 h-[120px] '>PAGAMENTO REALIZADO</h2>
                    <div className={status != null && status != 'PEDIDO_RECEBIDO' && status != 'FAZENDO_COTACAO' && status != 'COMPRA_REALIZADA' && status != 'COMPRA_ENVIADA' && status != 'COMPRA_RECEBIDA'
                        ? 'verde' : 'vermelho'} onClick={() => setStatus('PAGAMENTO_REALIZADO')}>
                        <h2>CONFIRMAR PAGAMENTO</h2>
                    </div>
                </div>

            </div>


        </div >
    );
};


export default StatusCompra;


