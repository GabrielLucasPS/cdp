"use client"
import Link from 'next/link';
import { useState } from 'react';
import "./pedidos.css";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../components/ui/select"

export default function Pedidos() {
    const [numeroPedido, setNumeroPedido] = useState(null);
    const [Quantidade, setQuantidade] = useState(null);

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
                            Tipo
                            <Select className="input">
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Tipo" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Kg">Kg</SelectItem>
                                    <SelectItem value="Litros">Litros</SelectItem>
                                    <SelectItem value="Alta">Sacas</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className='inputBox_bottom'>
                            Prioridade
                            <Select className="input">
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Prioridade" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Baixa">Baixa</SelectItem>
                                    <SelectItem value="Media">Media</SelectItem>
                                    <SelectItem value="Alta">Alta</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className='inputBox'>
                            Departamento
                            <Select className="input">
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Departamento" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">1</SelectItem>
                                    <SelectItem value="2">2</SelectItem>
                                    <SelectItem value="3">3</SelectItem>
                                </SelectContent>
                            </Select>
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


