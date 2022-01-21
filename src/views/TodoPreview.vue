<template>
    <div>
        <div class="flex justify-between">
            <div class="flex">
                <div id="btn-back" class="px-6 cursor-pointer" @click="NavToTodos">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                </div>
                <h1 class="mb-8">Todo Details</h1>
            </div>
            
            <div v-if="isTodoPresent === true" class="flex">
                <div class="edit px-1 cursor-pointer mx-1">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                </div>
                <div class="delete px-1 cursor-pointer mx-1" @click="deleteTodo (todos, $route.params.itemId)">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </div>
            </div>
        </div>
        
        <!-- <div v-if="isTodoPresent === false" class="flex flex-col items-center">
            <div class="text-red-300 mb-2">
               <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <div class="mb-14">
                <p class="text-2xl text-red-300">Todo Deleted</p>
            </div> 
            <div class="flex hover:text-blue-300">
                <div id="btn-back" class="px-2 cursor-pointer" @click="NavToTodos">
                    <svg class="w-4 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                </div>
                <div>
                    <button>Back To Todo Page</button>
                </div>
            </div> 
             
        </div> -->
        <div class="max-w-7xl ml-60 mt-10">
            <div id="todoHead" class="text-xl text-red-400 border-b-2 mb-2 pl-10">
                <input class="focus: outline-none bg-gray-200 pl-2" id="inputEditTitle" v-if="editTitle" type="text" v-model="newTitle" v-on:keyup.enter="updateTitle(todos, $route.params.itemId)" maxlength= "30">
                <h1 id="todoTitle" v-else @click="editHeading(previewTitle(todos, $route.params.itemId))">{{ previewTitle(todos, $route.params.itemId) }}</h1>
            </div>
            
            <div class="mt-6 pl-10">
                <textarea class="focus: outline-none bg-gray-200 w-full h-24 pt-2 pl-2" v-if="editDescription" type="text"
                v-model="newDescription" v-on:keyup.enter="updateDescription($route.params.itemId)"></textarea>
                <p v-else @click="editDetails" class="text-lg previewDetails">{{ previewDetails (todos, $route.params.itemId) }}</p>  
            </div>
            
        </div>
        
        
    </div>
</template>

<script>

export default {

    data() {
        return {
            isTodoPresent: true,
            newTitle:'',
            newDescription: '',
            editTitle: false,
            editDescription: false
        }
    },
    computed: {
        todos() {
        return this.$store.state.Todo.list
        }
    },
    methods: {
        previewTitle (myTodos, todoId) {
            const todoItemIndex = myTodos.findIndex (function (todoItem) {
                return todoItem.id === todoId
            })
            const matchedTodo =  myTodos [todoItemIndex]
            return matchedTodo.title
        
        },
        previewDetails (myTodos, todoId) {
            const todoItemIndex = myTodos.findIndex(function (todoItem) {
            return todoItem.id === todoId
            })
            const matchedTodo =  myTodos [todoItemIndex]
            return matchedTodo.description
        },
        deleteTodo (myTodos, todoId) {
            const todoItemIndex = myTodos.findIndex(function (todoItem) {
            return todoItem.id === todoId
            })
            this.$store.dispatch('Todo/deleteTodo', todoItemIndex)
            this.$router.push('/todo')
        },
        NavToTodos () {
            this.$router.push('/todo')
        },
        editHeading(title) {
            this.editTitle = true
            this.newTitle = title
            // const editTitleInput = document.getElementById('inputEditTitle')
            // editTitleInput.focus()
        },

        //1.on click pass title to edit heading
        //2.set the title passed to newtitle 
        editDetails() {
            this.editDescription = true
        },
        updateTitle (myTodos, itemId) {
            this.editTitle = false
            if (this.newTitle !== '') {
                const todoItemIndex = myTodos.findIndex(function (todoItem) {
                return todoItem.id === itemId
            })
            this.$store.dispatch('Todo/updateTitle', [todoItemIndex, this.newTitle]) 
            } 
            
        },
        updateDescription(itemId) {
            this.editDescription = false
            if (this.newDescription !== '') {
                const todoItemIndex = this.todos.findIndex(function (todoItem) {
                return todoItem.id === itemId
            })
            this.$store.dispatch('Todo/updateDescription', [todoItemIndex, this.newDescription]) 
            } 
        }
    }
      
}
</script>

<style scoped>
    .previewDetails {
        overflow-wrap: break-word;
    }
</style>