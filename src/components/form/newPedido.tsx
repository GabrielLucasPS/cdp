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
    numeroPedido: z.number().min(1, "Número do pedido"),
    descricao: z.string().min(1, "Descrição necessaria"),
    quantidade: z.number().min(1, "quantidade necessaria"),
    tipo: z.string().min(1, "Tipo de pedido necessario"),
    prioridade: z.string().min(1, "Prioridade do pedido necessaria"),
    departamento: z.string().min(1, "Departamento necessario")
});

const NewPedido = () => {

    const { data: session } = useSession()

    const router = useRouter()

    const { toast } = useToast()

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            numeroPedido: 0,
            descricao: '',
            quantidade: 0,
            tipo: '',
            prioridade: '',
            departamento: '',
        },
    });


    const onSubmit = async (values: z.infer<typeof FormSchema>) => {
        const response = await fetch('/api/newEntrega', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                numeroPedido: values.numeroPedido,
                descricao: values.descricao,
                quantidade: values.quantidade,
                tipo: values.tipo,
                prioridade: values.prioridade,
                departamento: values.departamento
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
                        name='clientName'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nome do Cliente</FormLabel>
                                <FormControl>
                                    <Input placeholder='Nome do Cliente' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='destination'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Destino da Entrega</FormLabel>
                                <FormControl>
                                    <Input placeholder='Uberlandia' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='curretLocation'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Local Atual da Entrega</FormLabel>
                                <FormControl>
                                    <Input placeholder='São Paulo' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='description'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Descrição da Entrega</FormLabel>
                                <FormControl>
                                    <Input placeholder='Descrição da entrega' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button className='w-full mt-6' type='submit'>
                    Começar
                </Button>
            </form>

        </Form>
    );
};

export default NewPedido;
