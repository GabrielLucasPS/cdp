"use client"
import Link from 'next/link';
import { useState } from 'react';
import "./pedidos.css";

import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "../../lib/utils"
import { Button } from "../../components/ui/button"
import { Calendar } from "../../components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../../components/ui/popover"

export default function Pedidos() {
    var dataAtual = new Date()

    const [numeroPedido, setNumeroPedido] = useState(null);
    const [Quantidade, setQuantidade] = useState(null);

    const [embalagem, setEmbalagem] = useState('');
    const [fornecedor, setFornecedor] = useState('');

    const [valorTotal, setValorTotal] = useState(null);

    const [date, setDate] = useState(dataAtual);
    const [dataPagamento, setDataPagamento] = useState(dataAtual);

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]

    const handleNumeroPedido = (e) => {
        const value = e.target.value;
        let tamanho = value.toString().length;
        if (tamanho > 10) {
            setNumeroPedido(numeroPedido);

        } else {
            setNumeroPedido(value);

        }
    }

    const handleQuantidade = (e) => {
        const value = e.target.value;
        let tamanho = value.toString().length;
        if (tamanho > 3) {
            setQuantidade(Quantidade);
        } else {
            setQuantidade(value);

        }
    }

    const handleEmbalagem = (e) => {
        setEmbalagem(e.target.value);
    }

    const handleFornecedor = (e) => {
        setFornecedor(e.target.value);
    }

    const handleValorTotal = (e) => {
        setValorTotal(e.target.value);
    }

    return (
        <>
            <div className="novoPedidoContainer">
                <div className="pedidoContainer">
                    <div className='descricaoProduto'>
                        <div className='inputBox_descricaoProduto'>
                            Descrição do Produto
                            <textarea className="input_descricaoProduto" name="descricao" maxLength={120} />
                        </div>
                        <div className='inputBox'>
                            Número do Pedido
                            <input className="input_numeroPedido" name="descricao" type="number" value={numeroPedido} onChange={handleNumeroPedido} max={999999999} />
                        </div>
                    </div>

                    <div className='descricaoProduto'>
                        <div className='inputBox_bottom'>
                            Quantidade
                            <input className="input" name="Quantidade" type="number" value={Quantidade} onChange={handleQuantidade} max={999} />
                        </div>

                        <div className='inputBox_bottom'>
                            Embalagem
                            <input className="input" name="Embalagem" type="text" value={embalagem} onChange={handleEmbalagem} max={999} />
                        </div>

                        <div className='inputBox_bottom'>
                            Fornecedor
                            <input className="input" name="Fornecedor" type="text" value={fornecedor} onChange={handleFornecedor} max={999} />
                        </div>

                    </div>

                    <div className='descricaoProduto'>
                        <div className='inputBox_bottom'>
                            Valor Total
                            <input className="input" name="valorTotal" type="number" value={valorTotal} onChange={handleValorTotal} max={999} />
                        </div>

                        <div className='inputBox_bottom'>
                            Prazo Pagamento
                            <Popover >
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-[280px] justify-start text-left font-normal text-slate-900 text-2xl font-bold w-full",
                                            !dataPagamento && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {dataPagamento ? format(dataPagamento, "dd/MM/yyyy") : <span>Selecione uma data</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={dataPagamento}
                                        onSelect={setDataPagamento}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        <div className='inputBox_bottom'>
                            Prazo Entrega

                            <Popover >
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-[280px] justify-start text-left font-normal text-slate-900 text-2xl font-bold w-full",
                                            !date && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {date ? format(date, "dd/MM/yyyy") : <span>Selecione uma data</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>



                    </div>
                    <div className='actionButtons'>
                        <button class="confirmarPedido">CONFIRMAR PEDIDO</button>
                        <button class="salvarPedido">SALVAR PEDIDO</button>
                    </div>

                </div >
                <div className='sairButton'>
                    <button className="cancelarButton">Cancelar</button>

                </div>

            </div>
        </>
    );

}


