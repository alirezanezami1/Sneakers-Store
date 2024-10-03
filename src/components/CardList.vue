<script setup>
import Card from '@/components/Card.vue';
import { ref } from 'vue';

defineProps({
    items : Array,
    isFavorite : Boolean,
})

const limit = ref(4)
const emit = defineEmits(['addToFavorite' , 'addToCart'])
</script>

<template>
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5" v-auto-animate>
     <Card v-for="item in items.slice(0 , limit || items.length)" :key="item.id" :id="item.id"  :imageUrl="item.imageUrl" :title="item.title" :price="item.price" :isAdded="item.isAdded" :isFavorite="item.isFavorite" :favoriteFuncs="isFavorite ? null : () => emit('addToFavorite' , item)" :addedFuncs=" isFavorite ? null :() => emit('addToCart' , item)"></Card> 
    </div>

    <div class="flex items-center justify-center mb-10 mt-16 buttonsShow" v-if="items.length">
        <button @click="limit=0" v-if="limit" class= " text-white font-bold py-2 px-4 rounded shadow-xl"> show more</button>
        <button @click="limit=4" v-if="!limit" class=" text-white font-bold py-2 px-4 rounded"> show less</button>
    </div>    
</template>
