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
import { useSession } from 'next-auth/react';



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
            quantidadePedido: 0,
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
            router.refresh();
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
            <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
                <div className='space-y-2'>
                    <FormField
                        control={form.control}
                        name='descricaoPedido'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Descrição</FormLabel>
                                <FormControl>
                                    <Input placeholder='Descrição do pedido' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='quantidadePedido'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Quantidade</FormLabel>
                                <FormControl>
                                    <Input placeholder='10' type='number' {...field} onChange={event => field.onChange(+event.target.value)} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='tipoPedido'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tipo</FormLabel>
                                <FormControl>
                                    <Input placeholder='Kg (Quilograma) / L (Litros)' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='prioridadePedido'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Prioridade</FormLabel>
                                <FormControl>
                                    <Input placeholder='Baixa / Media / Alta' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='departamentoPedido'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Departamento</FormLabel>
                                <FormControl>
                                    <Input placeholder='Descrição da entrega' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button className='w-full mt-6' type='submit'>
                    Criar Pedido
                </Button>
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