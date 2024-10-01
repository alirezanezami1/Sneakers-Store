<script setup>
import { inject, ref } from 'vue'
import Logo from '../../public/logo.png'
import Cart from '../../public/cart.svg'
import heart from '../../public/heart.svg'
import profile from '../../public/profile.svg'
import Menu from '../../public/icons8-menu-100.png'

const {openBasket} = inject('cart')
const openMenu = ref(false)

defineProps({
 totalPrice : Number
})


</script>

<template>

    <header class="flex justify-between border-b border-slate-200 px-10 py-8">
        <!-- //// left side -->
        <router-link to="/">
            <div class="flex items-center gap-4">
            <img :src="Logo" alt="LogoImg" class=" mr-5" width="60">
            <div>
                <h2 class="text-md font-bold uppercase">Sneakers</h2>
                <p class="text-slate-500 text-sm">The best sneaker store</p>
            </div>
        </div>
        </router-link>

        <!-- //// right side  -->
         <ul class="flex items-center gap-10">

            <li @click="openMenu = true" class="flex items-center cursor-pointer gap-3 -mr-10 text-gray-500 hover:text-black sm:hidden">
                <img :src="Menu" alt="" width="30">
            </li>


            <li @click="openBasket" class="sm:flex hidden items-center cursor-pointer gap-3 text-gray-500 hover:text-black">
                <img :src="Cart" alt="Cart">
                <b>{{ totalPrice }} $</b>
            </li>

           <router-link to="/Favorites">
            <li class="sm:flex hidden items-center cursor-pointer gap-3 text-gray-500 hover:text-black">
                <img :src="heart" alt="Cart">
                <span>Favorites</span>
            </li>
           </router-link>

            <li class="sm:flex hidden items-center cursor-pointer gap-3 text-gray-500 hover:text-black">
                <img :src="profile" alt="Cart">
                <span>Profile</span>
            </li>

         </ul>
    </header>

   <div v-if="openMenu">
    <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70"></div>
    <div class="bg-white w-96 h-full fixed right-0 top-0 z-20 p-8">

        <div  class="flex items-center gap-5 mb-5">

        <svg @click="openMenu = false" class="opacity-30 cursor-pointer rotate-180 transition hover:opacity-100 hover:-translate-x-1" width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 7H14.7143" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M8.71436 1L14.7144 7L8.71436 13" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

        <h2 class="text-2xl font-bold">Menu</h2>
        </div>


        <ul class="flex items-center flex-col gap-10 mt-10">


            <li @click="openBasket" class="flex items-center w-full  cursor-pointer gap-3 text-gray-500 hover:text-black">
                <img :src="Cart" alt="Cart">
                <b>{{ totalPrice }} $</b>
            </li>

            <router-link to="/Favorites" class="w-full">
            <li class="flex items-center cursor-pointer  gap-3 text-gray-500 hover:text-black">
                <img :src="heart" alt="Cart">
                <span>Favorites</span>
            </li>
            </router-link>

            <li class="flex items-center cursor-pointer w-full gap-3 text-gray-500 hover:text-black">
                <img :src="profile" alt="Cart">
                <span>Profile</span>
            </li>

        </ul>




    </div>
   </div>

</template>