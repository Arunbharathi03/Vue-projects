<template>
    <div>
        <h1>Employee List</h1>
        <div class="flex py-7 mt-2 bg-gray-200 justify-around shadow-md">
            <div>
                <input class="p-2 focus: outline-none" type="search" placeholder="Search Employee" v-model="searchKey" @keyup="local_search_mode(search_mode)">
            </div>
            <div> 
                <button class="bg-blue-200 px-4 py-2 w-full rounded-sm hover:bg-blue-300 hover:scale-105 shadow-md" @click="show_create">Add Employee</button>
            </div>
        </div>
        <div class="mt-6 shadow-md py-12">
            <employee-table></employee-table>
        </div>
        <div class="employeeCreate" v-if="isCreateMode">
            <employee-create></employee-create>
        </div>
    </div>
</template>

<script>

import EmployeeTable from '../components/EmployeeListTable.vue'
import EmployeeCreate from '../components/EmployeeCreate.vue'
// import EmployeeSearch from '../components/EmployeeSearch.vue'
import { mapState, mapActions } from 'vuex'

export default {
    data() {
        return{
           searchKey: ''
        }
    },
    computed: {
        ...mapState('Employees', {
            isCreateMode: 'isCreateMode',
            isEditMode: 'isEditMode',
            employeeList: 'list',
            is_search_mode : 'isSearchMode'
        }),
    },
    components: {
        'employee-table': EmployeeTable,
        'employee-create': EmployeeCreate,
        // 'employee-search': EmployeeSearch,
    },
    methods: {
        local_search_mode () {
            
            if (this.searchKey !== '' && this.searchKey.trim() !== '') {
                const searchItem = this.employeeList.find(item => item.name.toLowerCase().includes(this.searchKey.toLowerCase()))
                this.search_mode(searchItem)
            }  
            else this.normal_mode()
        },
        ...mapActions('Employees', {
            show_create: 'showCreate',
            search_mode: 'searchIndex',
            normal_mode: 'normalMode'
        }),
        
    }
}
</script>

<style>
    .employeeCreate {
        position: fixed;
        top: calc(50% - 200px) ;
        left: calc(50% - 300px);
        opacity: 99%;
        z-index: 1;
        box-shadow: 0px 0px 20px rgb(97, 91, 91);
    }
</style>