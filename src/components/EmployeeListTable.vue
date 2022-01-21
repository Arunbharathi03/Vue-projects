<template>
    <div>
        <table class="mx-auto border-solid border-2 border-black">
            <tr>
                <th class="w-96 py-2 border-solid border-2 border-black text-red-400 bg-red-100">Name</th>
                <th class="w-96 py-2 border-solid border-2 border-black text-red-400 bg-red-100">Age</th>
                <th class="w-96 py-2 border-solid border-2 border-black text-red-400 bg-red-100">Salary (Rs.)</th>
                <th class="w-96 py-2 border-solid border-2 border-black text-red-400 bg-red-100">Modify</th>
            </tr>
            <tr v-for="employee in employeeList" :key="employee.uuid">
                <td class="w-96 py-2 border-solid border-2 border-black text-center text-blue-600 font-bold"><router-link :to="{ name: 'employeePreview', params: { itemId: employee.uuid }}">{{ employee.name }}</router-link></td>
                <td class="w-96 py-2 border-solid border-2 border-black text-center">{{ employee.age }}</td>
                <td class="w-96 py-2 border-solid border-2 border-black text-center">{{ employee.salary }}</td>
                <td class="w-96 py-2 border-solid border-2 border-black text-center">
                    <div class="flex justify-around">
                        <div class="edit cursor-pointer text-blue-700" @click="local_editEmployee(employee)">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round"  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                        </div>
                        <div class="delete cursor-pointer text-red-600" @click="local_deleteEmployee(employee.uuid, employee.name)">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        </div>    
                    </div>
                </td>
            </tr>
        </table>
        <div class="c-employee-edit" v-if="editMode">
            <div class="flex flex-col items-center relative">
                <div class="absolute top-5 right-5 hover:text-white cursor-pointer" @click="local_closeEdit">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </div>
                <h1 class="my-10 font-bold text-lg">Edit Employee</h1>
                <div class="w-96">
                    <input ref="editName" class="p-2 mb-6 w-full" type="text" placeholder="Edit name" v-model="editedName" maxlength="40">
                    <input ref="inputAge" min="18" max="99" maxlength="2" class="p-2 mb-6 w-full" type="number" placeholder="Edit age" v-model="editedAge">
                    <input ref="inputSalary" class="p-2 mb-6 w-full" type="number" placeholder="Edit salary" v-model="editedSalary" @keyup.enter="local_update(employee_data)">
                </div>
                <div>
                    <button type="button" @click="local_closeEdit" class="w-28 mx-1 bg-red-200 py-2 w-full rounded-sm hover:bg-red-300 hover:scale-105 shadow-md">Cancel</button>
                    <button type="button" @click="local_update(employee_data)" class="w-28 mx-1 bg-red-200 py-2 w-full rounded-sm hover:bg-red-300 hover:scale-105 shadow-md">Update</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
    data () {
        return {
            editMode: false,
            editedName: '',
            editedAge: '',
            editedSalary: ''
        }
    },
    mounted () {
        this.index_employees()
    },
    computed: {
        employeeList () {
            return this.$store.state.Employees.list
        },
        editedData () {
            return {
                "name": this.editedName,
                "age": this.editedAge,
                "salary": this.editedSalary
            }
        },
        ...mapState('Employees', {
            isEditMode: 'isEditMode',
            employee_data: 'employeeData',
        }),
    },
    methods: {
        local_editEmployee (employeeData) {
            this.editMode = true 
            this.edit_employee(employeeData.uuid)

            this.editedName = employeeData.name
            this.editedAge = employeeData.age
            this.editedSalary = employeeData.salary
        },
        local_closeEdit () {
            this.editMode = false
        },
        local_update (employee_data) {
            if (this.editedData.name && this.editedData.age && this.editedData.salary) {
                if (this.editedData.age > 99 || this.editedData.age < 18) {
                    alert('Enter age 18 - 99 years')
                }
                else if (this.editedData.age < 100 && this.editedData.age > 17){
                    let edited_data = Object.assign( { ...employee_data }, {...this.editedData} )
                    
                    this.employee_update(edited_data) 
                    this.editMode = false
            
                    this.editedName = ''
                    this.editedAge = ''
                    this.editedSalary = ''
                }
                
            } else alert ('Enter valid fields')
        },
        local_deleteEmployee (itemId, name) {
            const confirmDelete = confirm(`Delete ${name}`)
            if(confirmDelete) this.delete_employee(itemId)
        },

        ...mapActions('Employees', {
            index_employees: 'index',
            edit_employee: 'edit',
            employee_update: 'update',
            delete_employee: 'delete',
        })
    }
}
</script>

<style scoped>
    .c-employee-edit {
        background-color: rgb(191 219 254);
        width: 600px;
        height: 400px;
        position: fixed;
        top: calc(50% - 200px) ;
        left: calc(50% - 300px);
        opacity: 99%;
        z-index: 1;
        box-shadow: 0px 0px 20px rgb(97, 91, 91);
    }
</style>