<script setup>
import { computed, provide, ref } from 'vue';
import Basket from './components/Basket.vue';
import { watch } from 'vue';
import Header from '@/components/Header.vue';
  
const cart = ref([])

const totalPrice = computed(() => cart.value.reduce((acc, item) => acc + item.price ,0))
const vatPrice = computed(() => Math.round((totalPrice.value * 5) / 100))

const addToCart = (item) => {
  cart.value.push(item)
  item.isAdded = true
}

const removeFromCart = (item) => {
  cart.value.splice(cart.value.indexOf(item) , 1)
    item.isAdded = false
}
  
watch(cart , () => {
  localStorage.setItem('cart' , JSON.stringify(cart.value))
} , {deep: true})

const basketOpen = ref(false)

const closeBasket = () => {
  basketOpen.value = false
}

const openBasket = () => {
  basketOpen.value = true
}

provide('cart' , {
  cart,
  openBasket,
  closeBasket,
  removeFromCart,
  addToCart
})

</script>

<template>
  <Basket v-if="basketOpen" :totalPrice="totalPrice" :vat="vatPrice" ></Basket>
 
 <div class="bg-white w-full max-sm:w-content rounded-xl shadow-xl">
    <Header :totalPrice="totalPrice"></Header>  
    <div class="p-10">
     <RouterView colorSpinner="green"/>
    </div>
  </div>
  
</template>
