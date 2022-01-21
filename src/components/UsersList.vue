<template>
    <div>
        <user-item :age="user.age" :identity="user.id" :name="user.name" v-for="user in users" :key="user.id"></user-item>
    </div>
</template>

<script>

import UserItem from './UserItem.vue'


export default {
    components: {
        UserItem,
        
    },
    props: ['users', 'posts']
}
</script>

// 