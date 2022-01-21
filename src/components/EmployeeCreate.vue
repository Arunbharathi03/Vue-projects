<template>
    <div class="c-employee-create">
        <div class="flex flex-col items-center relative">
            <div class="absolute top-5 right-5 hover:text-white cursor-pointer" @click="close_create">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </div>
            <h1 class="my-10 font-bold text-lg">Create Employee</h1>
            <div class="w-96">
                <input ref="inputName" class="p-2 mb-6 w-full" type="text" placeholder="Enter name" v-model="employeeName" @keyup.enter="focusAgeInput" maxlength="40">
                <input ref="inputAge" min="18" max="99" maxlength="2"  class="p-2 mb-6 w-full" type="number" placeholder="Enter age" v-model="employeeAge" @keyup.enter="focusSalaryInput">
                <input ref="inputSalary" class="p-2 mb-6 w-full" type="number" placeholder="Enter salary" v-model="employeeSalary" @keyup.enter="local_create">
            </div>
            <div>
                <button type="button" @click="local_create" class="w-28 bg-red-200 py-2 w-full rounded-sm hover:bg-red-300 hover:scale-105 shadow-md">Create</button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {

    data() {
        return {
            employeeName: '',
            employeeAge: '',
            employeeSalary: '',
        }
    },
    
    mounted () {
        this.$refs.inputName.focus()
    },
    
    computed: {
        employeeData() {
            return {
                "name": this.employeeName,
                "age": this.employeeAge,
                "salary": this.employeeSalary,
                "email": new Date().toJSON(),
                "password": 'Hello'
            }
        }
    },

    methods: {
        ...mapActions('Employees',{
            add_employee: 'add',
            close_create: 'closeCreate'
        }),

        local_create () {
            if (this.employeeData.name && this.employeeData.age && this.employeeData.salary) {
                if (this.employeeData.age > 99 || this.employeeData.age < 18) {
                    alert('Enter age 18 - 99 years')
                }
                else if (this.employeeData.age < 100 && this.employeeData.age > 17){
                    
                    this.add_employee(this.employeeData) 

                    this.employeeName = ''
                    this.employeeAge = ''
                    this.employeeSalary = ''
                }
                
            } else alert ('Enter valid fields')
            
        },
        
        focusAgeInput () {
            this.$refs.inputAge.focus()
        },
        focusSalaryInput () {
            this.$refs.inputSalary.focus()
            
        }
    },
}
</script>
    
<style>
    .c-employee-create {
        background-color: rgb(191 219 254);
        width: 600px;
        height: 400px;
    }
</style>