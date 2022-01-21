<template>
    <div>
        <h1 class="mb-10">Users</h1>
        <users-list :users="users"></users-list>
    </div>
</template>

<script>
import UsersList from '../components/UsersList.vue'

export default {
  components: { UsersList },
    data() {
        return {
            users: [
                { id: 1, name: 'Arun', age: 25 },
                { id: 2, name: 'Bob', age: 22 },
                { id: 3, name: 'Alex', age: 27 }
            ]
        }
    },

    component: {
        UsersList
    }
}
</script>

