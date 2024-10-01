<script setup>
import { inject } from 'vue';
import { useToast } from 'vue-toastification'
import { reactive ,watch,ref ,onMounted} from 'vue';
import CardList from '../components/CardList.vue';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import PricingSection from '@/components/PricingSection.vue';
import Footer from '@/components/Footer.vue';
import axios from 'axios';






const {cart , addToCart , removeFromCart} = inject('cart')

const items = ref([])

const filters = reactive({
  sortBy : 'title',
  searchQuery : ''
})



const props = defineProps({
  colorSpinner : String
})


const toast = useToast()

const onClickAddPlus = (item) => {
  if(!item.isAdded) {
   addToCart(item)
  } else {
    removeFromCart(item)
  }
}

const changeSelect = event => {
  filters.sortBy = event.target.value
}

const searchInput = event => {
  filters.searchQuery = event.target.value
}

const addToFavorite = async (item) => {
  try {


    
    if(!item.isFavorite) {
      const obj = {
        item_id: item.id
      }
      
      item.isFavorite = true
      
      toast.success(`The product named " ${item.title} " was added to favorites`)

    const { data } = await axios.post('https://489df7edeb427ff0.mokky.dev/favorites',obj)

    item.favoriteId = data.id
    } else {
      item.isFavorite = false
      await axios.delete(`https://489df7edeb427ff0.mokky.dev/favorites/${item.favoriteId}`)
      item.favoriteId = null
    }

    

  } catch (error) {
    console.log(error);
    
  }
}



const fetchFavorites = async () => {
  try {
    const { data: favorites } = await axios.get('https://489df7edeb427ff0.mokky.dev/favorites')
    items.value = items.value.map( item => {
      const favorite = favorites.find((favorite) => favorite.item_id === item.id)
      if (!favorite) {
        return item
      }

      return {
        ...item,
        isFavorite: true,
        favoriteId : favorite.id
      }
    })
  } catch (error) {
    console.log(error.message)
  }
}

const fetchItem = async () => {
  try {

    const params = {
      sortBy : filters.sortBy
    }

    if (filters.searchQuery) {
      params.title = `*${filters.searchQuery}*`
    }

    const { data } = await axios.get(`https://489df7edeb427ff0.mokky.dev/items`, {
      params
    })
    
    items.value = data.map((obj) => ({
      ...obj,
      isFavorite : false,
      favoriteId : null,
      isAdded : false
    }))

  } catch (error) {
    console.log(error.message);
    
  }
}



onMounted(async () => {

const localCart = localStorage.getItem('cart')
cart.value = localCart ? JSON.parse(localCart) : []

await fetchItem()
await fetchFavorites()


items.value = items.value.map((item) => ({
  ...item,
  isAdded : cart.value.some((cartItem) => cartItem.id === item.id)
})) 


})



watch(cart , () => {
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: false
  }))
})




watch(filters , fetchItem)








</script>

<template>

<div class="flex flex-col justify-center w-full max-sm:w-content">

  
  <div class="flex w-full max-sm:w-content justify-center -mt-5  gap-2 py-5 h-max lg:h-auto  px-5 lg:py-10 lg:px-20">
          <img src="../../public/Group 112.png" class="w-screen rounded-2xl shadow-xl cursor-pointer">
    </div>

    <div class="flex w-full flex-col  max-sm:w-content items-center justify-center my-10 gap-2 -mt-5 lg:-mt-10 py-5 h-max lg:h-auto lg:flex-row px-5 lg:py-10 lg:px-20">
      <img src="../../public/Untitled6.png" class="w-full lg:w-2/4 lg:2/4 h-auto object-cover rounded-2xl shadow-xl cursor-pointer transition hover:opacity-65" >
      <img src="../../public/Untitled7.png" class="w-full lg:w-2/4 h-auto object-cover rounded-2xl shadow-xl cursor-pointer transition hover:opacity-65" >
    </div>

</div>


  <div class="flex justify-between items-center flex-col sm:flex-row">


        <h2 class="text-3xl font-bold mb-8 ">All Shoes...</h2>


        <div class="flex gap-4">
          <select @change="changeSelect" id="" class="py-2 px-3 border rounded-md outline-none">
          <option value="title">all</option>
          <option value="price">Cheaper</option>
          <option value="-price">expensive</option>
        </select>


        <div class="relative">
          <img class="absolute left-4 top-3" src="../../public/search.svg" alt="SearchImg">
          <input type="text" @input="searchInput" placeholder="search..." class="border rounded-md py-2 pl-11 pr-4 outline-none focus:border-gray-400">
        </div>
        </div>


  </div>

  

      <div v-if="!items.length" class="text-center  py-6">
            <PulseLoader :color="props.colorSpinner"></PulseLoader>
        </div>
      <div class="mt-10 ">
        <CardList :items="items" @addToFavorite="addToFavorite" @addToCart="onClickAddPlus"></CardList>
      </div>


      <div>
        <PricingSection></PricingSection>
      </div>
      
      <div>
        <Footer></Footer>
      </div>


</template>
