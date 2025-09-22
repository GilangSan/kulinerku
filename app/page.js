"use client";

import Image from "next/image";
import { useState } from "react";
import { UtensilsCrossed, CupSoda, ShoppingCart, Minus, Plus, ChefHat } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import Link from "next/link";

export default function Home() {
  const [selectedMenu, setSelectedMenu] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);
  const [popupText, setPopupText] = useState("");

  function popUp(text) {
    setPopupText(text);
    setTimeout(() => {
      setPopupText("");
    }, 2000);
  }

   const handleCart = (name, image, price) => {
    const existingItemIndex = cart.findIndex((item) => item.name === name);
    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
      popUp("Berhasil menambahkan item ke keranjang!");
    } else {
      setCart([...cart, { name, image, price, quantity: 1 }]);
      popUp("Berhasil menambahkan item ke keranjang!");
    }
  }

  const addItemInCart = (name) => {
    const existingItemIndex = cart.findIndex((item) => item.name === name);
    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
    }
  }

  const removeItemInCart = (name) => {
    const existingItemIndex = cart.findIndex((item) => item.name === name);
    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      if (updatedCart[existingItemIndex].quantity > 1) {
        updatedCart[existingItemIndex].quantity -= 1;
        setCart(updatedCart);
      } else {
        updatedCart.splice(existingItemIndex, 1);
        setCart(updatedCart);
      }
    }
  }

  function formatRupiah(number) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  }

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  }

  const listMenu = [
    {
      name: "Nasi Goreng",
      price: 15000,
      isFood: true,
      image: "/nasgor.jpg",
    },
    {
      name: "Mie Ayam",
      price: 12000,
      isFood: true,
      image: "/mieayam.jpg",
    },
    {
      name: "Es Teh Manis",
      price: 5000,
      isFood: false,
      image: "/estehmanis.jpg",
    },
    {
      name: "Jus Alpukat",
      price: 10000,
      isFood: false,
      image: "/jusalpukat.jpg",
    },
  ];

  return (
    <div className="max-w-screen-xl md:max-w-screen-md sm:max-w-screen-sm mx-auto py-6 px-4">
      <div className={`fixed top-6 right-6 bg-neutral-800 text-white rounded-full shadow-lg px-4 py-3 flex items-center justify-center ${popupText ? 'opacity-100' : 'opacity-0 pointer-events-none'} transition-all`}>
          {popupText}
        </div>
      <h1 className="text-3xl font-bold">Halo, apa yang ingin kamu pesan hari ini?</h1>
      <p>Kami siap melayani para pelanggan lewat Whatsapp!</p>
      <input onChange={handleChange} className="border-2 rounded-full w-full px-3 py-2 mt-4" placeholder="Cari Makanan.."></input>
      <div className="grid grid-cols-3 items-center mt-2 gap-3 w-full">
        <span onClick={() => setSelectedMenu('all')} className={`border-2 ${selectedMenu == 'all' && 'bg-stone-200'} hover:bg-stone-100 rounded-full cursor-pointer transition-all text-center justify-center p-2 flex gap-x-1`}><ChefHat />Semua</span>
        <span onClick={() => setSelectedMenu('food')} className={`border-2 ${selectedMenu == 'food' && 'bg-stone-200'} hover:bg-stone-100 rounded-full cursor-pointer transition-all text-center justify-center p-2 flex gap-x-1`}><UtensilsCrossed />Makanan</span>
        <span onClick={() => setSelectedMenu('drink')} className={`border-2 ${selectedMenu == 'drink' && 'bg-stone-200'} hover:bg-stone-100 rounded-full cursor-pointer transition-all text-center justify-center p-2 flex gap-x-1`}><CupSoda />Minuman</span>
      </div>
      <div className="mt-6 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {selectedMenu == 'food' && listMenu.filter(menu => menu.isFood).filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase())).map((menu, index) => (
          <div className="border-2 rounded-lg overflow-hidden hover:scale-102 hover:shadow-md transition-all">
            <Image src={menu.image} alt={menu.name} width={200} height={200} className="w-full h-40 object-cover" />
            <div className="p-2">
              <div className="flex justify-between items-center">
                <h2 className="font-semibold">{menu.name}</h2>
                {menu.isFood ? <UtensilsCrossed /> : <CupSoda />}
              </div>
              <p className="text-sm text-gray-600">{formatRupiah(menu.price)}</p>
              <Button onClick={() => handleCart(menu.name, menu.image, menu.price)} className={"mt-2 w-full cursor-pointer"}><ShoppingCart />Tambahkan</Button>
            </div>
          </div>
        ))}
        {selectedMenu == 'all' && listMenu.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase())).map((menu, index) => (
          <div className="border-2 rounded-lg overflow-hidden hover:scale-102 hover:shadow-md transition-all">
            <Image src={menu.image} alt={menu.name} width={200} height={200} className="w-full h-40 object-cover" />
            <div className="p-2">
              <div className="flex justify-between items-center">
                <h2 className="font-semibold">{menu.name}</h2>
                {menu.isFood ? <UtensilsCrossed /> : <CupSoda />}
              </div>
              <p className="text-sm text-gray-600">{formatRupiah(menu.price)}</p>
              <Button onClick={() => handleCart(menu.name, menu.image, menu.price)} className={"mt-2 w-full cursor-pointer"}><ShoppingCart />Tambahkan</Button>
            </div>
          </div>
        ))}
        {selectedMenu == 'drink' && listMenu.filter(menu => !menu.isFood).filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase())).map((menu, index) => (
          <div className="border-2 rounded-lg overflow-hidden hover:scale-102 hover:shadow-md transition-all">
            <Image src={menu.image} alt={menu.name} width={200} height={200} className="w-full h-40 object-cover" />
            <div className="p-2">
              <div className="flex justify-between items-center">
                <h2 className="font-semibold">{menu.name}</h2>
                {menu.isFood ? <UtensilsCrossed /> : <CupSoda />}
              </div>
              <p className="text-sm text-gray-600">{formatRupiah(menu.price)}</p>
              <Button onClick={() => handleCart(menu.name, menu.image, menu.price)} className={"mt-2 w-full cursor-pointer"}><ShoppingCart />Tambahkan</Button>
            </div>
          </div>
        ))}
      </div>
      <Drawer>
        <DrawerTrigger><div className="fixed bottom-6 cursor-pointer right-6 bg-neutral-800 hover:bg-neutral-700 text-white rounded-full shadow-lg p-4 flex items-center justify-center">
          <ShoppingCart />
        </div></DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Keranjang</DrawerTitle>
            <DrawerDescription>Item yang telah kamu tambahkan</DrawerDescription>
          </DrawerHeader>
          <div className="px-4 gap-y-2 flex flex-col">
            {cart.map((item, index) => (
            <div className="flex items-center justify-between gap-x-5 bg-neutral-100 rounded-xl w-full p-4">
              <div className="flex items-center gap-x-5">
                <Image src={item.image} alt="Nasgor" width={100} height={200} className="h-10 object-cover rounded-xl" />
                <span className="font-semibold text-xl">{item.name}</span>
              </div>
              <div className="flex gap-x-3 items-center">
                <span className="font-semibold text-lg mr-3">{formatRupiah(item.price)}</span>
                <Button onClick={() => removeItemInCart(item.name)} className={'cursor-pointer'}><Minus /></Button>
                <span>{item.quantity}x</span>
                <Button onClick={() => addItemInCart(item.name)} className={'cursor-pointer'}><Plus /></Button>
              </div>
            </div>
            ))}
          </div>
          <DrawerFooter>
            <div className="flex justify-between items-center border-2 rounded-xl p-2">
              <span>Total Pesanan</span>
              <span className="text-lg">{formatRupiah(cart.reduce((total, item) => total + item.price * item.quantity, 0))}</span>
            </div>
            <Link href={`https://wa.me/62895634865955?text=Bang+mau+pesan+dong..\n${cart.map((item, i) => item.name)}`} className={'cursor-pointer text-white rounded-xl flex py-3 items-center justify-center gap-x-2 bg-neutral-900'}><ShoppingCart />Taruh Order</Link>
            <DrawerClose>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

    </div>
  );
}
