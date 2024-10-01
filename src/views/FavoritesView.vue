<script setup>
import {ref, onMounted } from 'vue';
import axios from 'axios';
import CardList from '@/components/CardList.vue';

const favorites = ref([])

onMounted(async () => {
    try {
        const {data} = await axios.get('https://489df7edeb427ff0.mokky.dev/favorites?_relations=items')
        favorites.value = data.map((obj) => obj.item)
    } catch (error) {
        console.log(error);
        
    }
})

</script>

<template>

    <h1 class="text-3xl font-bold mb-8" >Favorites</h1>


     <cardList :items="favorites" isFavorite ></cardList>
</template>