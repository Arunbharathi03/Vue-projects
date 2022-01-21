<template>
    <div>
        <div class="flex">
            <div id="btn-back" class="px-6 cursor-pointer" @click="NavToPosts">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            </div>
            <h1>Posts/ <span class="font-bold">{{ $route.params.title }}</span></h1>    
        </div>
        
        <div class="bg-zinc-200 pt-12 pb-12 mt-8 m-auto text-center max-w-6xl flex flex-col shadow-lg">
            <h1 class="text-xl font-bold mt-4 p-2 ">{{ $route.params.title }}</h1>
            <div class="max-w-4xl m-auto mt-4">
                <p class="text-lg leading-10">{{ $route.params.details}}</p>
            </div>   
        </div>
        
    </div>
</template>

<script>
import UserPosts from '../components/UserPost.vue'
export default {
    component: UserPosts,

    methods:{
        NavToPosts() {
            this.$router.push('/posts')
        }
    }
}
</script>

<style scoped>

</style>