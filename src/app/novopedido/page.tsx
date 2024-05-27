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
    const [numeroPedido, setNumeroPedido] = useState<number>(0);
    const [Quantidade, setQuantidade] = useState<number>(0);


    const handleNumeroPedido = (e: { target: { value: any; }; }) => {
        const value = e.target.value;
        let tamanho = value.toString().length;
        if (tamanho > 10) {
            setNumeroPedido(numeroPedido);

        } else {
            setNumeroPedido(value);

        }
    }

    const handleQuantidade = (e: { target: { value: any; }; }) => {
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
                            <Select >
                                <SelectTrigger className="w-full">
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
                            <Select >
                                <SelectTrigger className="w-full">
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
                            <Select >
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
                        <button className="confirmarPedido">CONFIRMAR PEDIDO</button>
                        <button className="salvarPedido">SALVAR PEDIDO</button>
                    </div>

                </div >
                <div className='sairButton'>
                    <button className="cancelarButton">Cancelar</button>

                </div>

            </div>
        </>
    );

}


