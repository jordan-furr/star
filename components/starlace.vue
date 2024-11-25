<template>
    <div class="starlace text-center ph2">
        <a :href="page"><img :src="source" alt="alt" /></a>
        <h3 class="pb2">{{ title }}</h3>
        <h6>$9.00</h6>
    </div>
</template>


<script setup>
const { source, page, title } = defineProps(['source', 'page', 'title']);
</script>