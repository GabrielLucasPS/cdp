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




const FormSchema = z.object({
    embalagemPedido: z.string().min(1, "Embalagem do pedido necessario"),
    fornecedorPedido: z.string().min(1, "Fornecedor do pedido necessaria"),
    valorTotalPedido: z.number().min(1, "Valor total do pedido necessario"),
    prazoPagamentoPedido: z.date(),
    prazoEntregaPedido: z.date(),
});


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
    } | null
}

const NewCompra = ({ userId, pedido }: Props) => {


    const router = useRouter()

    const { toast } = useToast()
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            embalagemPedido: '',
            fornecedorPedido: '',
            valorTotalPedido: 0,
            prazoPagamentoPedido: new Date(),
            prazoEntregaPedido: new Date()
        },
    }
    );


    const onSubmit = async (values: z.infer<typeof FormSchema>) => {
        console.log(values.embalagemPedido, values.fornecedorPedido, values.valorTotalPedido, values.prazoPagamentoPedido, values.prazoEntregaPedido)
        const response = await fetch('/api/newPedido', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                embalagem: values.embalagemPedido,
                fornecedor: values.fornecedorPedido,
                valorTotal: values.valorTotalPedido,
                prazoPagamento: values.prazoPagamentoPedido,
                prazoEntrega: values.prazoEntregaPedido,
            })
        })

        if (response.ok) {
            toast({
                title: "Confirmado",
                description: "Compra confirmada com sucesso",
            })
            router.push('/pedidos');
        } else {
            toast({
                title: "Erro",
                description: "Oops! Alguma coisa deu errado :(",
                variant: 'destructive'
            })
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='w-full novoPedidoContainer'>
                <div className='text-4xl'> {pedido?.id}</div>
                <div className='bg-[#06041A]  rounded-lg p-10 h-full w-full flex-col flex justify-between'>
                    <div className='flex justify-between items-center  flex-wrap min-w-full '>
                        <div className=' flex  w-full mb-12'>

                            <FormField
                                control={form.control}
                                name='embalagemPedido'
                                render={({ field }) => (
                                    <FormItem className='flex flex-col mr-4 w-1/3' >
                                        <FormLabel className='text-3xl text-zinc-100'>Embalagem</FormLabel>
                                        <FormControl className=' text-xl'>
                                            <textarea placeholder='Descrição do pedido'  {...field} className='h-32  text-xl rounded-md p-2 resize-none' />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='fornecedorPedido'
                                render={({ field }) => (
                                    <FormItem className='flex flex-col mr-4 w-1/3' >
                                        <FormLabel className='text-3xl text-zinc-100'>Fornecedor</FormLabel>
                                        <FormControl className=' text-xl'>
                                            <textarea placeholder='Descrição do pedido' {...field} className='h-32  text-xl rounded-md p-2' />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='valorTotalPedido'
                                render={({ field }) => (
                                    <FormItem className=' mr-4 w-1/3'>
                                        <FormLabel className='text-3xl text-zinc-100'>Valor total</FormLabel>
                                        <FormControl className='h-32  text-2xl font-bold'>
                                            <Input placeholder='digite a quantidade' type='number' {...field} onChange={event => field.onChange(parseInt(event.target.value))} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className=' flex  w-full justify-around items-center'>
                            <FormField
                                control={form.control}
                                name="prazoPagamentoPedido"
                                render={({ field }) => (
                                    <FormItem className=' mr-4 '>
                                        <FormLabel className='text-3xl text-zinc-100'>Prazo de pagamento</FormLabel>
                                        <FormControl className='h-32  text-[3.95rem] font-bold w-full  '>
                                            <Input
                                                className=' w-full '
                                                type="date"
                                                placeholder="Prazo de Pagamento"
                                                {...field}
                                                value={
                                                    field.value instanceof Date
                                                        ? field.value.toISOString().split('T')[0]
                                                        : field.value
                                                }
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="prazoEntregaPedido"
                                render={({ field }) => (
                                    <FormItem className=' mr-4 '>
                                        <FormLabel className='text-3xl text-zinc-100'>Prazo de entrega</FormLabel>
                                        <FormControl className='h-32  text-[3.95rem] font-bold w-full  '>
                                            <Input
                                                className=' w-full '
                                                type="date"
                                                placeholder="Prazo de Pagamento"
                                                {...field}
                                                value={
                                                    field.value instanceof Date
                                                        ? field.value.toISOString().split('T')[0]
                                                        : field.value
                                                }
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                    </div>
                    <div className='actionButtons w-full'>
                        <button type='submit' className="confirmarPedido mr-0 w-full">CONFIRMAR ENTREGA</button>
                    </div>

                </div>



            </form>

        </Form>
    );
};


export default NewCompra;


