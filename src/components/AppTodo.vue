<template>
    <div class="">
        <h1 class="mb-8">Todo</h1>
        <div class="grid grid-cols-2 gap-x-16 mx-64">
            <div class="relative bg-gray-200 rounded-md">
                <h1 class="text-l bg-red-200 p-2 absolute w-full text-center font-bold rounded-t-md">Create Todo</h1>
                <div class="px-12 pt-16">
                    <div class="flex flex-col mb-8">
                        <label class="mb-4" for="todoTitle">Title:</label>
                        <input class="h-8 p-2 focus: outline-none rounded-lg" id="todoTitle" type="text" placeholder="Enter Todo Title" v-model="todoTitle" maxlength="30" v-on:keyup.enter="nextStep()">
                    </div>
                    <div class="flex flex-col mb-8">
                        <label class="mb-4" for="todoDescription">Todo Description:</label>
                        <input class="h-16 p-2 focus: outline-none rounded-md" maxlength="260" id="todoText" placeholder="Enter Todo Description" v-model="todoDescription" v-on:keyup.enter="createTodo()">
                    </div>
                    <div class="text-center">
                        <button class="bg-blue-200 text-gray-700 rounded-md px-4 py-2 hover:scale-105 hover:bg-blue-300" @click="createTodo()">Create</button>
                    </div>
                </div>
            </div>
            
            <div class="bg-gray-200 rounded-md h-96 overflow-auto relative">
                <h1 class="text-l bg-red-200 p-2 sticky top-0 left-0 right-0 w-full text-center font-bold">Todo List</h1>
                <ul class="px-12 pt-12">
                    <li class="todoCard bg-white border-b-2 border-b-red-600 p-2 mb-6 flex justify-between align-center"  v-for="todo in todos" :key="todo.id">
                        <div>
                           <input id="statusInput" type="checkbox" @click="changeTodoStatus (todo.id)"> 
                        </div>
                        
                        <label for="statusInput">{{ todo.title }}</label>
                        <div class="border-2 border-red-200 rounded-full w-6 hover:scale-105 hover:scale-105" @click="NavToPreview(todo.id)">
                            <svg class="w-4 h-full m-auto hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                        </div>
                    </li>      
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
// import { mapActions } from 'vuex'

export default {
    data() {
        return {
            todoTitle : '',
            todoDescription: '',
            searchTitle: ''
        }
    },
    
    computed: {
        todos() {
            return this.$store.state.Todo.list
        },

    },
    
    methods: {
    
        nextStep () {
            const todoTextInput = document.getElementById('todoText')
            todoTextInput.focus()
        },
        createTodo() {
            if( this.todoTitle == '' || this.todoDescription == '') alert('Enter fields')
            else {
                this.$store.dispatch('Todo/createTodo', [this.todoTitle, this.todoDescription, false ])
            }
            this.todoTitle = ''
            this.todoDescription = ''

            const todoTitleInput = document.getElementById('todoTitle')
            todoTitleInput.focus()
            

        },
        NavToPreview(id) {
            this.$router.push ({ name: 'todoPreview', params: { itemId: id }})
        },
        changeTodoStatus(todoId) {
            const todoItemIndex = this.todos.findIndex (item => {
                return item.id === todoId
            })
            if ( this.todos[ todoItemIndex ].isFinished === false ) {
                this.$store.dispatch('Todo/changeTodoStatus', [ todoItemIndex, true ])
                this.completedTodos()
                
            } else {
                this.$store.dispatch('Todo/changeTodoStatus', [ todoItemIndex, false ])
                this.incompleteTodos()
            }   
        },
        completedTodos () {
            const todoCard = document.querySelectorAll('.todoCard')  
            
            todoCard.forEach( todo => {
                todo.addEventListener('click', function() {
                    todo.classList.add('completed')
                })
            }) 
        },
        incompleteTodos () {
            const todoCard = document.querySelectorAll('.todoCard')  
            
            todoCard.forEach( todo => {
                todo.addEventListener('click', function() {
                    todo.classList.remove('completed')
                })
            })
        },
        searchForTitle () {
            this.$router.push({ name: 'todoSearch', params: { title: this.searchTitle }})
        }
        
    },
    
}
</script>

<style scoped>
    .completed {
        text-decoration: line-through ;
        text-decoration-thickness: 1px;
        border-bottom: 0.15rem solid green;
        
    }
</style>

