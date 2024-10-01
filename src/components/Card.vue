<script setup>
defineProps({
    id: Number,
    imageUrl : String,
    title : String,
    price : Number,
    isFavorite : Boolean,
    isAdded : Boolean,
    addedFuncs : Function,
    favoriteFuncs : Function
})


</script>


<template>
    <div class="relative bg-white border border-slate-100 rounded-2xl p-8 cursor-pointer transition hover:-translate-y-2 hover:shadow-xl">
        <img v-if="favoriteFuncs" @click="favoriteFuncs" :src="isFavorite ? '../../public/like-2.svg' : '../../public/like-1.svg' " alt="Like" class="absolute top-8 left-8">
        <img :src="imageUrl" alt="sneaker" class="">
        <p class="mt-2">{{ title }}</p>

        <div class="flex justify-between mt-5">
          <div class="flex flex-col">
            <span class="text-slate-400">price</span>
            <span>{{ price }} $</span>
          </div>

          <img v-if="favoriteFuncs" @click="addedFuncs" :src="!isAdded ? '../../public/plus.svg' : '../../public/checked.svg' " alt="Plus">

        </div>

      </div>
</template>