import axios from "axios"
axios.defaults.baseURL = "https://notes-crud.test/api"

export default {
    namespaced: true,

    state: {
        list: [],
        noteItem: {},
        editClip: {},
    },

    mutations: {
        INDEX (state, payload) {
            state.list = payload
        },
        INDEX_ITEM (state, payload) {
            state.noteItem = payload 
        },
        ADD_NOTE (state, payload) {
            state.list.unshift(payload)
        },
        EDIT_NOTE (state, payload) {
            const index = state.list.findIndex(note => note.uuid === payload)
            Object.assign(state.editClip, { ...state.list[index] })
        },
        EDIT_STATUS (state, payload) {
            const index = state.list.findIndex(note => note.uuid === payload.uuid)
            Object.assign(state.list[index], payload) 
        },
        UPDATE_NOTE (state, payload) {  
            const index = state.list.findIndex(note => note.uuid === payload.uuid)
            Object.assign(state.noteItem, payload)
            Object.assign(state.list[index], payload)  
        },
        DELETE_NOTE (state, payload) {
            const index = state.list.findIndex(note => note.uuid === payload)
            state.list.splice(index, 1)
        } 
    },

    actions: {
        index (context) {
            axios.get('/notes')
            .then(response => {
                context.commit('INDEX', response.data.data)
            })
        },
        indexItem (context, payload) {
            axios.get(`/notes/${payload}`)
            .then(response => {
                context.commit('INDEX_ITEM', response.data.data)
            })
            .catch(error => console.log(error))
        },
        add (context, payload) {
            axios.post('/notes', payload)
            .then(response => {
                const data = response.data.data.data
                context.commit('ADD_NOTE', data)
            })
            .catch(error => console.log(error))
        },
        edit (context, payload) {
            context.commit('EDIT_NOTE', payload)
        },
        editStatus ({commit}, payload) {
            axios.patch(`/notes/${payload[0]}`, { "completed": payload[1]})
            .then(response => {
                const data = response.data.data
                commit('EDIT_STATUS', data)
            })
            .catch(error => console.log(error))
        },
        update (context, payload) {
            axios.patch(`/notes/${payload.uuid}`, payload)
            .then(response => {
                const data = response.data.data
                context.commit('UPDATE_NOTE', data)
            })
            .catch(error => console.log(error))  
        },
        delete (context, payload) {
            axios.delete(`/notes/${payload}`)
            .then(response => {
                console.log('delete',response);
                context.commit('DELETE_NOTE', payload)
            })
            .catch(error => console.log(error))
        }
    }
}
