<template>
    <div class="flex items-center justify-between bg-white shadow p-4 mb-8">
        <div class="flex p-2">
            <label class="px-2">ID:</label>
            <p>{{ identity }}</p>
        </div>
        <div class="flex p-2">
            <label class="px-2">Name:</label>
            <p>{{ name }}</p>
        </div>
        <div class="flex p-2">
            <label class="px-2">Age:</label>
            <p>{{ age }}</p>
        </div>  
    </div>
</template>

<script>

export default {
    props: ['identity', 'name', 'age' ],
        
    
}
</script>
