"use client"
import Link from 'next/link';
import { useState } from 'react';
import "./pedidos.css";
import { Search } from "lucide-react"
import { Button } from "../../components/ui/button"

export default function Pedidos() {

    const [embalagem, setEmbalagem] = useState('');

    const handleEmbalagem = (e) => {
        setEmbalagem(e.target.value);
    }

    const generateRandomOrderNumber = () => {
        return Math.floor(1000000 + Math.random() * 9000000).toString();
    };

    return (
        <>
            <div className=' rastreioContainer flex p-3 flex-col w-screen'>
                <div className='text-2xl font-bold mb-5 w-full flex text-center justify-between'>
                    <h2 className=''>Pedidos</h2>
                    <div>
                        <div className='inputBox_bottom flex flex-1'>
                            <h2 className='mr-3'>Pedido: </h2>
                            <input className="input" name="Embalagem" type="text" value={embalagem} onChange={handleEmbalagem} max={999} />
                            <Button variant="" size="icon">
                                <Search className="h-4 w-4" />
                            </Button>
                        </div>

                    </div>
                </div>

                <div className='flex  w-full flex-wrap items-center justify-between'>
                    <div className='flex p-3 w-[49%] slate-900 border border-slate-800 rounded-lg text-2xl font-bold justify-between cursor-pointer items-center mb-8'>
                        <h2>Pedido 1</h2>
                        <p>Descrição do pedido</p>
                        <p>{generateRandomOrderNumber()}</p>
                        <img src='assets/dropdownarrow.png' alt='Dropdown Arrow' />
                    </div>

                    <div className='flex p-3 w-[49%] slate-900 border border-slate-800 rounded-lg text-2xl font-bold justify-between cursor-pointer items-center mb-8'>
                        <h2>Pedido 2</h2>
                        <p>Descrição do pedido</p>
                        <p>{generateRandomOrderNumber()}</p>
                        <img src='assets/dropdownarrow.png' alt='Dropdown Arrow' />
                    </div>

                    <div className='flex p-3 w-[49%] border border-slate-800 rounded-lg text-2xl font-bold justify-between cursor-pointer items-center mb-8'>
                        <h2>Pedido 3</h2>
                        <p>Descrição do pedido</p>
                        <p>{generateRandomOrderNumber()}</p>
                        <img src='assets/dropdownarrow.png' alt='Dropdown Arrow' />
                    </div>

                    <div className='flex p-3 w-[49%] border border-slate-800 rounded-lg text-2xl font-bold justify-between cursor-pointer items-center mb-8'>
                        <h2>Pedido 4</h2>
                        <p>Descrição do pedido</p>
                        <p>{generateRandomOrderNumber()}</p>
                        <img src='assets/dropdownarrow.png' alt='Dropdown Arrow' />
                    </div>

                    <div className='flex p-3 w-[49%] border border-slate-800 rounded-lg text-2xl font-bold justify-between cursor-pointer items-center mb-8'>
                        <h2>Pedido 5</h2>
                        <p>Descrição do pedido</p>
                        <p>{generateRandomOrderNumber()}</p>
                        <img src='assets/dropdownarrow.png' alt='Dropdown Arrow' />
                    </div>

                    <div className='flex p-3 w-[49%] border border-slate-800 rounded-lg text-2xl font-bold justify-between cursor-pointer items-center mb-8'>
                        <h2>Pedido 6</h2>
                        <p>Descrição do pedido</p>
                        <p>{generateRandomOrderNumber()}</p>
                        <img src='assets/dropdownarrow.png' alt='Dropdown Arrow' />
                    </div>

                    <div className='flex p-3 w-[49%] border border-slate-800 rounded-lg text-2xl font-bold justify-between cursor-pointer items-center mb-8'>
                        <h2>Pedido 7</h2>
                        <p>Descrição do pedido</p>
                        <p>{generateRandomOrderNumber()}</p>
                        <img src='assets/dropdownarrow.png' alt='Dropdown Arrow' />
                    </div>

                    <div className='flex p-3 w-[49%] border border-slate-800 rounded-lg text-2xl font-bold justify-between cursor-pointer items-center mb-8'>
                        <h2>Pedido 8</h2>
                        <p>Descrição do pedido</p>
                        <p>{generateRandomOrderNumber()}</p>
                        <img src='assets/dropdownarrow.png' alt='Dropdown Arrow' />
                    </div>

                    <div className='flex p-3 w-[49%] border border-slate-800 rounded-lg text-2xl font-bold justify-between cursor-pointer items-center mb-8'>
                        <h2>Pedido 9</h2>
                        <p>Descrição do pedido</p>
                        <p>{generateRandomOrderNumber()}</p>
                        <img src='assets/dropdownarrow.png' alt='Dropdown Arrow' />
                    </div>

                    <div className='flex p-3 w-[49%] border border-slate-800 rounded-lg text-2xl font-bold justify-between cursor-pointer items-center mb-8'>
                        <h2>Pedido 10</h2>
                        <p>Descrição do pedido</p>
                        <p>{generateRandomOrderNumber()}</p>
                        <img src='assets/dropdownarrow.png' alt='Dropdown Arrow' />
                    </div>

                    <div className='flex p-3 w-[49%] border border-slate-800 rounded-lg text-2xl font-bold justify-between cursor-pointer items-center mb-8'>
                        <h2>Pedido 11</h2>
                        <p>Descrição do pedido</p>
                        <p>{generateRandomOrderNumber()}</p>
                        <img src='assets/dropdownarrow.png' alt='Dropdown Arrow' />
                    </div>


                </div>
            </div>


        </>
    );

}


