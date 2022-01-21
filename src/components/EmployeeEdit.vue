<template>
    <div class="c-employee-edit">
        <div class="flex flex-col items-center relative">
            <div class="absolute top-5 right-5 hover:text-white cursor-pointer" @click="close_edit">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </div>
            <h1 class="my-10 font-bold text-lg">Edit Employee</h1>
            <div class="w-96">
                <input ref="inputName" class="p-2 mb-6 w-full" type="text" placeholder="Edit name" v-model="editedName" @keyup.enter="local_focusAgeInput" maxlength="40">
                <input ref="inputAge" min="18" max="99" maxlength="2"  class="p-2 mb-6 w-full" type="number" placeholder="Edit age" v-model="editedAge" @keyup.enter="local_focusSalaryInput">
                <input ref="inputSalary" class="p-2 mb-6 w-full" type="number" placeholder="Edit salary" v-model="editedSalary" @keyup.enter="local_edit">
            </div>
            <div>
                <button type="button" @click="close_edit" class="w-28 mx-1 bg-red-200 py-2 w-full rounded-sm hover:bg-red-300 hover:scale-105 shadow-md">Cancel</button>
                <button type="button" @click="local_update" class="w-28 mx-1 bg-red-200 py-2 w-full rounded-sm hover:bg-red-300 hover:scale-105 shadow-md">Update</button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    data() {
        return {
            editedName: '',
            editedAge: '',
            editedSalary: ''
        }
    },
    computed: {
        editedData() {
            return {
                name: this.editedName,
                age: this.editedAge,
                salary: this.editedSalary
            }
        }
    },
    methods: {
        ...mapActions('Employees', {
            close_edit: 'closeEdit',
            
        }),
        local_focusAgeInput () {
            this.$refs.inputAge.focus()
        },
        local_focusSalaryInput () {
            this.$refs.inputSalary.focus()
        },
        local_update() {
            
        }
    }
}
</script>

<style>
    .c-employee-edit {
        background-color: rgb(191 219 254);
        width: 600px;
        height: 400px;
    }
</style>
