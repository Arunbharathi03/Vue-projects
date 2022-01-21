<template>
    <div>
        <div class="flex justify-between">
            <div class="flex">
                <div id="btn-back" class="px-6 cursor-pointer" @click="local_NavToList">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                </div>
                <h1 class="mb-8">Employee Details</h1>
            </div>
            
            <div>
                <div class="delete px-1 cursor-pointer mx-1" @click="local_deleteEmployee">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </div>
            </div>
        </div>
        <div class="max-w-7xl ml-60 mt-10">
            <div class="text-xl text-red-400 border-b-2 pl-10">
                <input class="focus: outline-none bg-gray-200 pl-2 mb-2" v-if="nameEditMode" type="text" maxlength="40" v-model="editedName" @keyup.enter="local_updateName">
                <h1 class="mb-2" v-else @click="local_editName (employeeItem)">{{ employeeItem.name }}</h1>
            </div>
            <div class="text-xl text-gray-400 mb-2 pl-10 mt-6">
                <input class="focus: outline-none bg-gray-200 pl-2" v-if="ageEditMode" type="number" min="18" max="99" maxlength="2" v-model="editedAge" @keyup.enter="local_updateAge">
                <h1 v-else @click="local_editAge ( employeeItem )">Age: <span class="text-blue-400">{{ employeeItem.age}}</span></h1>
            </div>
            <div class="text-xl text-gray-400 border-b-2 pb-6 pl-10 mt-6">
                <input class="focus: outline-none bg-gray-200 pl-2" v-if="salaryEditMode" type="number" v-model="editedSalary" @keyup.enter="local_updateSalary">
                <h1 v-else @click="local_editSalary ( employeeItem )">Salary: <span class="text-blue-400">{{ employeeItem.salary }}</span></h1>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
    data() {
        return {
            nameEditMode: false,
            ageEditMode: false,
            salaryEditMode: false,
            editedName: '',
            editedAge: '',
            editedSalary: ''
        }
    },
    mounted () {
        this.index_employee(this.itemId)
    },
    computed: {
        itemId () {
            return this.$route.params.itemId
        },
        employeeList() {
            return this.$store.state.Employees.list
        },
        employeeItem () {
            return this.employee_item
        },
        ...mapState('Employees', {
            employee_item: 'employeeItem'
        })
    },
    methods: {
        local_NavToList () {
            this.$router.push({ name: 'employeeList'})
        },
        local_editName (details) {
            this.nameEditMode = true
            this.editedName = details.name
        },
        local_editAge (details) {
            this.ageEditMode = true
            this.editedAge = details.age
        },
        local_editSalary (details) {
            this.salaryEditMode = true
            this.editedSalary = details.salary
        },
        local_updateName () {
            this.nameEditMode = false
            const index = this.employeeList.findIndex(employee => {
                return employee.id === this.$route.params.itemId
            })
            const payload = {
                index,
                updatedName: this.editedName
            }
            if (payload.updatedName !== '' && (payload.updatedName.trim() !== '')) this.update_employeeName(payload)
            else alert('Name cannot be empty!')
            this.editedName = ''
        },
        local_updateAge () {
            this.ageEditMode = false
            const index = this.employeeList.findIndex(employee => {
                return employee.id === this.$route.params.itemId
            })
            const payload = {
                index,
                updatedAge: this.editedAge
            }
            if ((payload.updatedAge > 17) && (payload.updatedAge < 100))this.update_employeeAge(payload)
            else alert('Enter valid age 18-99 years')
            this.editedAge = ''
        },
        local_updateSalary () {
            this.salaryEditMode = false
            const index = this.employeeList.findIndex(employee => {
                return employee.id === this.$route.params.itemId
            })
            const payload = {
                index,
                updatedSalary: this.editedSalary
            }
            this.update_employeeSalary(payload)
            this.editedSalary = ''
        },
        local_deleteEmployee () {
            const confirmDelete = confirm(`Delete ${this.employeeItem.name}`)
            const index = this.employeeList.findIndex(employee => {
                return employee.id === this.$route.params.itemId
            })
            if(confirmDelete) this.delete_employee(index)
            this.$router.push({ name: 'employeeList'})
        },
        ...mapActions('Employees', {
            index_employee: 'indexEmployee',
            update_employeeName: 'updateName',
            update_employeeAge: 'updateAge',
            update_employeeSalary: 'updateSalary',
            delete_employee: 'delete',
        })
    }
}
</script>