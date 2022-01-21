<template>
    <nav class="py-8 bg-blue-200">
        <ul class="flex px-4">
            <li class="px-4">
                <router-link to="/">Home</router-link>
            </li>
            <li class="px-4">
                <router-link to="/users">Users</router-link>
            </li>
            <li class="px-4">
                <router-link to="/posts">Posts</router-link>
            </li>
            <li class="px-4">
                <router-link to="/todo">Todo</router-link>
            </li>
            <li class="px-4">
                <router-link to="/employees">Employee list</router-link>
            </li>
            <li class="px-4">
                <router-link to="/notes">Notes</router-link>
            </li>
        </ul>
    </nav>
</template>

<script>
    export default {
    
    }
</script>

<style scoped>
    a.router-link-exact-active {
        color: blue;
    }
</style>