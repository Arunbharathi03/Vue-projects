export default {
    namespaced: true,

    state: {
        list: []
    },

    mutations: {
        createTodo (state, payload) {
            state.list.unshift({ id: new Date().toJSON(), title: payload[0], description: payload[1], isFinished: payload[2] })
        },
        deleteTodo (state, payload) {
            state.list.splice(payload, 1)
        },
        changeTodoStatus: (state, payload) => {
            state.list[ payload[0] ].isFinished = payload[1]  
        },
        updateTitle (state, payload) {
            state.list[ payload[0] ].title = payload[1]
        },
        updateDescription (state, payload) {
            state.list[ payload[0] ].description = payload[1]
        }
            
        
    },

    actions: {
        createTodo (context, payload) {
            context.commit('createTodo', payload)
        },
        deleteTodo (context, payload) {
            context.commit('deleteTodo', payload)
        },
        changeTodoStatus (context, payload) {
            context.commit('changeTodoStatus', payload)
        },
        updateTitle (context, payload) {
            context.commit('updateTitle', payload)
        },
        updateDescription (context, payload) {
            context.commit('updateDescription', payload)
        }
            
    }
}