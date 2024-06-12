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



const FormSchema = z.object({
    descricaoPedido: z.string().min(1, "Descricao do pedido necessario"),
    quantidadePedido: z.number().min(1, "Quantidade do pedido necessaria"),
    tipoPedido: z.string().min(1, "Tipo do pedido necessario"),
    prioridadePedido: z.string().min(1, "Prioridade do pedido necessario"),
    departamentoPedido: z.string().min(1, "Departamento do pedido necessario"),
});

type Props = {
    userId?: String;
}

const NewPedido = ({ userId }: Props) => {
    const router = useRouter()

    const { toast } = useToast()

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            descricaoPedido: '',
            quantidadePedido: 1,
            tipoPedido: '',
            prioridadePedido: '',
            departamentoPedido: ''
        },
    });


    const onSubmit = async (values: z.infer<typeof FormSchema>) => {
        console.log(values.descricaoPedido, values.quantidadePedido, values.tipoPedido, values.prioridadePedido, values.departamentoPedido)
        const response = await fetch('/api/newPedido', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                descricaoPedido: values.descricaoPedido,
                quantidadePedido: values.quantidadePedido,
                tipoPedido: values.tipoPedido,
                prioridadePedido: values.prioridadePedido,
                departamentoPedido: values.departamentoPedido,
                Id: userId
            })
        })

        if (response.ok) {
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
            <form onSubmit={form.handleSubmit(onSubmit)} className='w-full novoPedidoContainer'>
                <div className='bg-[#06041A]  rounded-lg p-10 h-full w-full flex-col flex justify-between'>
                    <div className='flex justify-between items-center  flex-wrap min-w-full '>
                        <div className=' flex  w-full mb-12'>
                            <FormField
                                control={form.control}
                                name='descricaoPedido'
                                render={({ field }) => (
                                    <FormItem className='flex flex-col mr-4 w-1/3' >
                                        <FormLabel className='text-3xl text-zinc-100'>Descrição</FormLabel>
                                        <FormControl className=' text-xl'>
                                            <textarea placeholder='Descrição do pedido' {...field} className='h-32  text-xl rounded-md p-2 resize-none' />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='quantidadePedido'
                                render={({ field }) => (
                                    <FormItem className=' mr-4 w-1/3'>
                                        <FormLabel className='text-3xl text-zinc-100'>Quantidade</FormLabel>
                                        <FormControl className='h-32  text-2xl font-bold'>
                                            <Input placeholder='digite a quantidade' type='number' {...field} onChange={event => field.onChange(parseInt(event.target.value))} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='tipoPedido'
                                render={({ field }) => (
                                    <FormItem className='  w-1/3'>
                                        <FormLabel className='text-3xl text-zinc-100'>Tipo</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl className='h-32  text-xl'>
                                                <SelectTrigger className='flex h-32  text-2xl font-bold  text-left'>
                                                    <SelectValue placeholder="Selecione um tipo" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="Kg">Kg</SelectItem>
                                                <SelectItem value="L">L</SelectItem>
                                                <SelectItem value="ml">ml</SelectItem>
                                                <SelectItem value="unidade">Un</SelectItem>
                                                <SelectItem value="metro">m</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className=' flex  w-full'>
                            <FormField
                                control={form.control}
                                name='prioridadePedido'
                                render={({ field }) => (
                                    <FormItem className=' mr-4  w-1/2'>
                                        <FormLabel className='text-3xl text-zinc-100'>Prioridade</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl className=' h-32 w-full text-xl'>
                                                <SelectTrigger className='flex  w-full text-2xl font-bold text-left'>
                                                    <SelectValue placeholder="Selecione a prioridade" className='text-zinc-100' />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="Baixa">Baixa</SelectItem>
                                                <SelectItem value="Media">Media</SelectItem>
                                                <SelectItem value="Alta">Alta</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='departamentoPedido'
                                render={({ field }) => (
                                    <FormItem className='flex flex-col w-1/2'>
                                        <FormLabel className='text-3xl text-zinc-100 '>Departamento</FormLabel>
                                        <FormControl className='text-3xl '>
                                            <textarea placeholder='Digite um departamento' {...field} className='h-32 w-full rounded-md  text-center p-12' />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <div className='actionButtons w-full'>
                        <button type='submit' className="confirmarPedido mr-0 w-full">CONFIRMAR PEDIDO</button>
                    </div>

                </div>



            </form>

        </Form>
    );
};


export default NewPedido;




/*

<form onSubmit={form.handleSubmit(onSubmit)} className='w-full' >
            <div className="novoPedidoContainer" >
                <div className="pedidoContainer">
                    <div className='descricaoProduto'>

                        <div className='inputBox_descricaoProduto'>
                            Descrição do Produto
                            <textarea name='descricao' className="input_descricaoProduto" maxLength={120} value={descricaco} onChange={handleDescricao} />
                        </div>

                        <div className='inputBox'>
                            Número do Pedido
                            <input className="input_numeroPedido" name="numeroPedido" type="number" value={numeroPedido} onChange={handleNumeroPedido} max={999999999} />
                        </div>
                    </div>

                    <div className='descricaoProduto'>
                        <div className='inputBox_bottom'>
                            Quantidade
                            <input className="input" name="Quantidade" type="number" value={Quantidade} onChange={handleQuantidade} max={999} />
                        </div>
                        <div className='inputBox_bottom '>
                            Tipo
                            <Select onValueChange={handleTipo}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Tipo" />
                                </SelectTrigger>
                                <SelectContent >
                                    <SelectItem value="Kg">Kg</SelectItem>
                                    <SelectItem value="Litros">Litros</SelectItem>
                                    <SelectItem value="Alta">Sacas</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className='inputBox_bottom'>
                            Prioridade
                            <Select onValueChange={handlePrioridade}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Prioridade" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Baixa" className='text-[#06041a]'>Baixa</SelectItem>
                                    <SelectItem value="Media">Media</SelectItem>
                                    <SelectItem value="Alta">Alta</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className='inputBox'>
                            Departamento
                            <Select onValueChange={handleDepartamento}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Departamento" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="departamento1">1</SelectItem>
                                    <SelectItem value="departamento2">2</SelectItem>
                                    <SelectItem value="departamento3">3</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className='actionButtons'>
                        <button type='submit' className="confirmarPedido">CONFIRMAR PEDIDO</button>
                        <button className="salvarPedido">SALVAR PEDIDO</button>
                    </div>

                </div >
                <div className='sairButton'>
                    <button className="cancelarButton">Cancelar</button>

                </div>

            </div>
        </form>

*/