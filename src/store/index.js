import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import Todo from './modules/Todo'
import Employees from './modules/Employees'
import Notes from './modules/Notes'

const store = new Vuex.Store({
    strict: false,
    modules: {
       Todo,
       Employees,
       Notes
    }
})

export default store