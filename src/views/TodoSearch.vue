<template>
<div>
    <h1>Todo Search Results</h1>
    <h2>{{ title ( $route.params.title ) }}</h2>
    <p>{{ description ( $route.params.title ) }}</p>
</div>
</template>

<script>
export default {
    computed: {
        todos () {
            return this.$store.state.Todo.list
        },
    },
    methods: {
        title (title) {
            const todoItemIndex = this.todos.findIndex(function (todoItem) {
                return todoItem.title === title
            })
            return this.todos[todoItemIndex].title
        },
        description (title) {
            const todoItemIndex = this.todos.findIndex(function (todoItem) {
                return todoItem.title === title
            })
            return this.todos[todoItemIndex].description
        }
    }
}
</script>