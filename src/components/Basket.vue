<script setup>
import axios from 'axios';
import { useToast } from 'vue-toastification'
import { ref  , computed, inject } from 'vue';
import BasketHeader from './BasketHeader.vue';
import CardItemList from './CardItemList.vue';
import infoBlock from './infoBlock.vue';


const isCreatingOrder = ref(false)
const orderId = ref(null)

const toast = useToast()


const props = defineProps({
  totalPrice : Number,
  vat : Number,
})


const {
  cart ,
  closeBasket
} = inject('cart')


const createOrder = async () => {
  try {
    isCreatingOrder.value = true
    const {data} = await axios.post('https://489df7edeb427ff0.mokky.dev/orders' , {
      items: cart.value,
      totalPrice: props.totalPrice
    })

    cart.value = []

    orderId.value = data.id
    
    toast.success("Your order has been successfully placed")

  } catch (error) {
    console.log(error.message);
    toast.error("sorry, your order was not registered")
  } finally {
    isCreatingOrder.value = false
  }
}

const cartEmpty = computed(() => cart.value.length === 0)
const btnDisabled = computed(() => isCreatingOrder.value || cartEmpty.value)

</script>


<template>
      <div class="fixed top-0 left-0 h-full w-full bg-black z-20 opacity-70"></div>
    <div class="bg-white w-96 h-full fixed right-0 top-0 z-40 p-8">


      
        <BasketHeader></BasketHeader>


       


        <div v-if="!totalPrice || orderId" class="flex h-full items-center">
          <infoBlock v-if="!totalPrice && !orderId"  title="The shopping cart is empty" description="Return to the store and find your favorite shoe" imageUrl="../../public/package-icon.png"></infoBlock>

         
          <infoBlock v-if="orderId" title="Your purchase has been made" :description="`Thank you for buying from us and trusting us.
           Your purchase ID : ${orderId}`" imageUrl="../../public/order-success-icon.png"></infoBlock>
          

        </div>


       



        <div v-else>
             <CardItemList  ></CardItemList>

            <div>
            
              <div  class="flex flex-col gap-4 mt-7">
                <div class="flex gap-2">
                  <span>Total:</span>
                  <div class="flex-1 border-b border-dashed"></div>
                  <b>{{ totalPrice }} $</b>
                </div>
              
                <div class="flex gap-2">
                  <span>Vat 5%:</span>
                  <div class="flex-1 border-b border-dashed"></div>
                  <b>{{ vat }} $</b>
                </div>
              
                <button
                  :disabled="btnDisabled"
                  @click="createOrder"
                  class="mt-4 transition bg-lime-500 w-full rounded-xl py-3 text-white disabled:bg-slate-300 hover:bg-lime-600 active:bg-lime-700 cursor-pointer"
                >
                Complete the purchase
                </button>
              </div>
            </div>
        </div>



  </div>
</template>