import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Users from '../views/Users.vue'
import Posts from '../views/Posts.vue'
import PostPreview from '../views/UserPostPreview.vue'
import NotFound404 from '../views/NotFound404.vue'
import Todo from '../views/Todo.vue'
import TodoPreview from '../views/TodoPreview.vue'
import TodoSearch from '../views/TodoSearch.vue'
import EmployeeList from '../views/EmployeeList.vue'
import EmployeePreview from '../views/EmployeePreview.vue'
import Notes from '../views/Notes.vue'
import NoteView from '../views/NoteView.vue'

Vue.use(VueRouter)

const routes = [
  
  {
    path: '/',
    component: Home
  },
  {
    path: '/users',
    component: Users,  
  },
  {
    path: '/posts',
    name: 'postsList',
    component: Posts,
    // children: [
    //   {
    //     name: 'preview',
    //     path: ':title',  
    //     component: PostPreview,  
    //   },
    // ]
  },
  {
    name: 'preview',
    path: '/posts/:title',  
    component: PostPreview,  
  },
  {
    name: 'todo',
    path: '/todo',  
    component: Todo,  
  },
  {
    name: 'todoPreview',
    path: '/todo/:itemId',
    component: TodoPreview
  },
  {
    name: 'todoSearch',
    path: '/todo/search/:title',
    component: TodoSearch
  },
  {
    name: 'PageNotFound',
    path: '*',
    component: NotFound404
  },
  {
    name: 'employeeList',
    path: '/employees',
    component: EmployeeList
  },
  {
    name:  'employeePreview',
    path: '/employee/:itemId',
    component: EmployeePreview
  },
  {
    name: 'notes',
    path: '/notes',
    component: Notes
  },
  {
    name: 'noteView',
    path: '/notes/:id',
    component: NoteView
  },
  
  
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
  })
  
  export default router