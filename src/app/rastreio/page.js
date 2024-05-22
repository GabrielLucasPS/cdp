"use client"
import Link from 'next/link';
import { useState } from 'react';
import "./rastreio.css";

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

                        <div className="parent">
                            <div className="div1 flex justify-center items-center w-72 flex-col">
                                <h3 className="font-bold text-2xl mb-5 text-center min-h-20 max-h-20 p-2">
                                    PEDIDO RECEBIDO
                                </h3>
                                <div className="font-bold text-2xl text-center p-3 rounded-lg bg-[#26c602] min-h-20 max-h-20 text-slate-900  w-full" >CONFIRMAR PEDIDO RECEBIDO</div>
                            </div>
                            <div className="div2 flex justify-center items-center w-56  flex-col">
                                <h3 className="font-bold text-2xl mb-5 text-center min-h-20 max-h-20 p-2">FAZENDO COTAÇÃO</h3>
                                <div className="font-bold text-2xl text-center p-2 rounded-lg bg-[#26c602]  min-h-20 max-h-20 text-slate-900  w-full" >CONFIRMAR
                                    COTAÇÃO</div>
                            </div>
                            <div className="div3 flex justify-center items-center w-56  flex-col">
                                <h3 className="font-bold text-2xl mb-5 text-center min-h-20 max-h-20 p-2">COMPRA
                                    REALIZADA</h3>
                                <div className="font-bold text-2xl text-center p-2 rounded-lg bg-[#26c602]  min-h-20 max-h-20 text-slate-900  w-full" >CONFIRMAR
                                    COMPRA</div>
                            </div>
                            <div className="div4 flex justify-center items-center w-56  flex-col">
                                <h3 className="font-bold text-2xl mb-5 text-center min-h-20 max-h-20 p-2">COMPRA
                                    ENVIADA</h3>
                                <div className="font-bold text-2xl text-center p-2 rounded-lg bg-[#FCD753] min-h-20 max-h-20 text-slate-900  w-full"  >CONFIRMAR
                                    ENVIO</div>
                            </div>
                            <div className="div5 flex justify-center items-center w-56  flex-col ">
                                <h3 className="font-bold text-2xl mb-5 text-center min-h-20 max-h-20 p-2">COMPRA
                                    RECEBIDA</h3>
                                <div className="font-bold text-2xl text-center p-2 rounded-lg bg-[#f53b3b]  min-h-20 max-h-20 text-slate-900  w-full" >CONFIRMAR
                                    RECIBO</div>
                            </div>
                            <div className="div6 flex justify-center items-center w-56  flex-col ">
                                <h3 className="font-bold text-2xl mb-5 text-center min-h-20 max-h-20 p-2">PAGAMENTO
                                    REALIZADO</h3>
                                <div className="font-bold text-2xl text-center p-2 rounded-lg bg-[#f53b3b]  min-h-20 max-h-20 text-slate-900  w-full" >CONFIRMAR
                                    PAGAMENTO</div>
                            </div>
                        </div>

                    </div>


                </div >
                <div className='sairButton'>
                    <button className="cancelarButton">Cancelar</button>

                </div>

            </div>
        </>
    );

}


