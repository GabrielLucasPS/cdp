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

import { useRouter } from 'next/navigation';
import { useToast } from '../ui/use-toast';



import { Status } from '@prisma/client';





const FormSchema = z.object({
    embalagemPedido: z.string().min(1, "Embalagem do pedido necessario"),
    fornecedorPedido: z.string().min(1, "Fornecedor do pedido necessaria"),
    valorTotalPedido: z.number().min(1, "Valor total do pedido necessario"),
    prazoPagamentoPedido: z.any(),
    prazoEntregaPedido: z.any(),
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
    }
}

const NewCompra = ({ userId, pedido }: Props) => {
    let idPedido = pedido.id;
    console.warn(idPedido)

    const router = useRouter()

    const { toast } = useToast()
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            embalagemPedido: '',
            fornecedorPedido: '',
            valorTotalPedido: undefined,

        },
    }
    );


    const onSubmit = async (values: z.infer<typeof FormSchema>) => {
        console.warn(values.embalagemPedido, values.fornecedorPedido, values.valorTotalPedido, values.prazoPagamentoPedido, values.prazoEntregaPedido)
        const response = await fetch('/api/compra', {
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
                id: idPedido
            })
        })

        if (response.ok) {
            toast({
                title: "Confirmado",
                description: "Compra confirmada com sucesso",
            })
            router.push('/pedidos');
            router.refresh()
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
            <form onSubmit={form.handleSubmit(onSubmit)} className='w-full novoPedidoContainer '>
                <div className='bg-[#06041A]  rounded-lg p-10 h-full w-full flex-col flex justify-between'>
                    <div className='flex justify-between items-center  flex-wrap min-w-full '>
                        <div className=' flex text-2xl  w-full mb-12 text-zinc-50 items-center justify-between'>
                            <div className='p-4 max-w-[259px]'>
                                <h3 className='font-extrabold'>Descrição</h3>
                                <h3 className='text-base'>{pedido?.descricao}</h3>
                            </div>
                            <div className='p-4 max-w-[259px]'>
                                <h3 className='font-extrabold'>Quantidade</h3>
                                <h3>{pedido?.quantidade}</h3>
                            </div>
                            <div className='p-4 max-w-[259px]'>
                                <h3 className='font-extrabold'>Tipo</h3>
                                <h3>{pedido?.tipo}</h3>
                            </div>
                            <div className='p-4 max-w-[259px]'>
                                <h3 className='font-extrabold'>Prioridade</h3>
                                <h3>{pedido?.prioridade}</h3>
                            </div>
                            <div className='p-4 max-w-[259px]'>
                                <h3 className='font-extrabold'>Departamento</h3>
                                <h3>{pedido?.departamento}</h3>
                            </div>
                        </div>
                        <div className=' flex  w-full mb-12'>

                            <FormField
                                control={form.control}
                                name='embalagemPedido'
                                render={({ field }) => (
                                    <FormItem className='flex flex-col mr-4 w-1/3' >
                                        <FormLabel className='text-3xl text-zinc-100'>Embalagem</FormLabel>
                                        <FormControl className=''>
                                            <Input placeholder='Descrição do pedido' type={'text'} {...field} className='h-32 p-10 text-3xl rounded-md  resize-none' />
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
                                        <FormControl className=''>
                                            <Input placeholder='Descrição do pedido'  {...field} className='h-32 p-10 text-3xl rounded-md  resize-none' />
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
                                        <FormControl className='h-32  text-4xl font-bold'>
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
                                        <FormControl className='h-32  text-[3.95rem] font-bold w-full  text-[#06041A]'>
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
                                        <FormControl className='h-32  text-[3.95rem] font-bold w-full  text-[#06041A]'>
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
                        <button type='submit' className="confirmarPedido mr-0 w-full">CONFIRMAR COMPRA</button>
                    </div>

                </div>



            </form >

        </Form >
    );
};


export default NewCompra;


