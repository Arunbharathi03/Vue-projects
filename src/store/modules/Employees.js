import axios from "axios"

axios.defaults.baseURL = 'https://notes-crud.test/api'
export default {
    namespaced: true,

    state: {
        isCreateMode: false,
        list: [],
        employeeItem: {},
        employeeData: {},
        isSearchMode: false,
    },

    mutations: {
        INDEX (state, payload) {
            state.list = payload
        },
        INDEX_EMPLOYEE (state, payload) {
            state.employeeItem = payload
        },
        SHOW_CREATE_POP (state) {
            state.isCreateMode = true
        },
        CLOSE_CREATE_POP (state) {
            state.isCreateMode = false
        },
        ADD_EMPLOYEE (state, payload) {
            state.isCreateMode = false
            state.list.unshift(payload)
        },
        EDIT_EMPLOYEE (state, payload) {
            const index = state.list.findIndex(employee => employee.uuid === payload)
            Object.assign(state.employeeData, { ...state.list[index] }) 
            state.isCreateMode = false
        },
        UPDATE_EMPLOYEE (state, payload) {
            const index = state.list.findIndex(employee => employee.uuid === payload.uuid)
            if (index !== -1) Object.assign(state.list[index], payload)
            Object.assign(state.employeeItem, payload)
        },
        UPDATE_EMPLOYEE_NAME (state, payload) {
            state.list[ payload.index ].name = payload.updatedName
        },
        UPDATE_EMPLOYEE_AGE (state, payload) {
            state.list[payload.index].age = payload.updatedAge
        },
        UPDATE_EMPLOYEE_SALARY (state, payload) {
            state.list[payload.index].salary = payload.updatedSalary
        },
        SEARCH_MODE (state) {
            state.isSearchMode = true
        },
        NORMAL_MODE (state) {
            state.isSearchMode = false
        },
        DELETE_EMPLOYEE (state, index) {
            state.list.splice(index, 1)
        },
    },
    actions: {
        index (context) {
            axios.get('/users')
            .then(response => {
                const data = response.data.data
                context.commit('INDEX', data)
            })
            .catch(error => console.log(error))
        },
        indexEmployee (context, payload) {
            axios.get(`/users/${payload}`)
            .then(response => {
                const data = response.data.data
                context.commit('INDEX_EMPLOYEE', data)
            })
            .catch(error => console.log(error))
        },
        showCreate ({commit}) {
            commit('SHOW_CREATE_POP')
        },
        closeCreate ({commit}) {
            commit('CLOSE_CREATE_POP')
        },
        add ({commit}, payload) {
            axios.post('/users', payload)
            .then(response => {
                const data = response.data.data.data
                commit('ADD_EMPLOYEE', data)   
            })
            .catch(error => console.log(error))
           
        },
        edit ({commit}, payload) {
            commit('EDIT_EMPLOYEE', payload)
        },
        update ({commit}, payload) {
            axios.patch(`/users/${payload.uuid}`, payload)
            .then(response => {
                const data = response.data.data
                commit('UPDATE_EMPLOYEE', data)
            })
            .catch(error => console.log(error))
        },
        updateName ({commit}, payload){
            commit('UPDATE_EMPLOYEE_NAME', payload)
        },
        updateAge ({commit}, payload){
            commit('UPDATE_EMPLOYEE_AGE', payload)
        },
        updateSalary ({commit}, payload){
            commit('UPDATE_EMPLOYEE_SALARY', payload)
        },
        search ({commit}) {
            commit('SEARCH_MODE')
        },
        normalList ({commit}) {
            commit('NORMAL_MODE')
        },
        delete ({commit}, payload) {
            axios.delete(`/users/${payload}`)
            .then(response => {
                console.log(response)
                commit('DELETE_EMPLOYEE', payload)
            })
            .catch(error => console.log(error)) 
            
        },
        
    }
}