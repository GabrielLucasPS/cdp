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
import { useState } from 'react';
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
            router.push('/rastreio');
            router.refresh()
        } else {
            toast({
                title: "Erro",
                description: "Oops! Alguma coisa deu errado :(",
                variant: 'destructive'

            })
        }
    }


    return (
        <div className='w-full novoPedidoContainer '>
            <div className='bg-[#06041A]  rounded-lg p-10 h-full w-full flex-col  justify-between  grid grid-cols-3 grid-rows-2 text-zinc-50 gap-2'>

                <div onClick={() => setStatus('FAZENDO_COTACAO')}>
                    <h2>Compra Realizada</h2>
                    <h2>PEDIDO RECEBIDO</h2>
                </div>
                <div>
                    <h2>Status: {status}</h2>
                    <h2>PEDIDO RECEBIDO</h2>
                    <div className='text-3xl text-red-500' onClick={() => alterarStatus(pedido.id, status)}>
                        AlterarStatus
                    </div>
                </div>
            </div>


        </div >
    );
};


export default StatusCompra;


