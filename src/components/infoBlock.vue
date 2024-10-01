<script setup>
defineProps({
    title : String,
    description: String,
    imageUrl: String
})
</script>


<template>
   <div class="flex flex-col text-center items-center justify-center w-72 mx-auto">
    <img :src="imageUrl" width="80" height="80">
    <h2 class="mt-4 text-2xl font-medium">{{ title }}</h2>
    <p class="text-gray-400 mt-2"> {{ description }}</p>
   </div>
</template>