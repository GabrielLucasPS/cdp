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
import Link from 'next/link';
import GoogleSignInButton from '../GoogleSignInButton';
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import { useToast } from '../ui/use-toast';




const FormSchema = z.object({
  email: z.string().min(1, 'Insira um email').email('Email invalido'),
  password: z
    .string()
    .min(1, 'Insira a senha')
    .min(8, 'senha tem que ter no minimo 8 digitos'),
});

const SignInForm = () => {
  const router = useRouter()

  const { toast } = useToast()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const singInData = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false
    })
    console.log(singInData)

    if (singInData?.error) {
      toast({
        title: "Erro",
        description: "Oops! Alguma coisa deu errado :(",
        variant: 'destructive'
      })
    } else {
      router.refresh();
      router.push('/pedidos')
    }
  };

  return (
    <div className='w-[500px]'>

      <Form  {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='w-full '>
          < div className='space-y-2' >
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel><div className='text-2xl '>Email</div></FormLabel>
                  <FormControl>
                    <Input placeholder='email@examplo.com' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel><div className='text-2xl '>Senha</div></FormLabel>
                  <FormControl>
                    <Input
                      type='password'
                      placeholder='Sua Senha'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div >
          <Button className='w-full text-2xl mt-6 bg-[#06041a] text-zinc-100' type='submit'>
            Entrar
          </Button>
        </form >
        <div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
          ou
        </div>
        <p className='text-center text-sm text-gray-600 mt-2'>
          Não tem uma conta ? cadastre:
          <Link className='text-blue-500 hover:underline font-bold ml-1' href='/sign-up'>
            Aqui
          </Link>
        </p>
      </Form >
    </div >

  );
};

export default SignInForm;
