<template>
    <div>
        <router-link  v-for="post in posts" :key="post.id" v-bind:to="{ name: 'preview', params: { id: post.id, title: post.title, details: post.description }}">
            <div class="mb-12 shadow  border-l-4 border-l-red-600">
                <h3 class="p-3 text-xl font-bold">{{ post.title }}</h3>   
                <p class="p-3">{{ truncatedDetail(post.description, 25) }}</p>         
            </div>    
        </router-link> 
        <!-- <router-view></router-view> -->

    </div>
</template>

<script>


export default {

    data() {
        return {
        
        }
    },
    props: [ 'posts' ],

    methods: {
        truncatedDetail: (details, num) => {
            if (num > details.length) {
            return details;
            } else {
            details = details.substring(0,num);
            return details+"...";
            }
        }
    }

}

</script>