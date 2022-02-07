<template>
    <div>
        <div class="flex bg-gray-100 py-8 pr-12 shadow-md justify-end">
            <div class="ml-4">
                <input class="p-2 focus: outline-none" type="text" placeholder="Enter notes" v-model="noteText" @keyup.enter="local_create" maxlength="65">
            </div>
            <div>
                <button class="py-2 px-4 bg-red-300" @click="local_create">Create</button>
            </div>
        </div>

        <div class="flex bg-gray-100 py-8 shadow-md mt-4">
            <ul class="c-list">
                <li v-for="note in noteList" :key="note.uuid" class="mb-3 p-4 w-full bg-white flex justify-between items-center rounded-lg">
                    <input class="cursor-pointer" type="checkbox" v-model="note.completed" :value="note.completed" true-value="true" false-value="false" @click="local_changeStatus(note)">
                    <p class="text-lg description" @click="NavToView(note.uuid)">{{ note.description }}</p>
                    <div class="flex">
                        <div class="edit pr-4 border-r-2 cursor-pointer hover:text-blue-300" @click="local_edit(note.uuid)">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                        </div>
                        <div class="delete pl-4 cursor-pointer hover:text-red-400" @click="local_delete(note)">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        </div>
                    </div>
                </li>
            </ul>
        </div>

        <div v-if="editMode" class="c-edit-pop relative shadow-lg">
            <div class="flex flex-col items-center">
                <div class="absolute top-4 right-4 hover:text-white cursor-pointer" @click="local_closeEdit">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </div>
                <h1 class="mb-4 font-bold text-lg">Edit Notes</h1>
                <div class="w-96 mb-4">
                    <input class="p-2 mb-6 w-full focus: outline-none rounded-lg" type="text" placeholder="Edit note" v-model="edit_clip.description" maxlength="65">
                    <div class="w-full p-2 mb-4 rounded-lg text-center">
                        <input class="mr-4" type="checkbox" v-model="edit_clip.completed">
                        <span class="text-lg">Completed</span>
                    </div>
                </div>
                <div>
                    <button type="button" @click="local_closeEdit" class="w-28 mx-1 bg-red-200 py-2 w-full rounded-sm hover:bg-red-300 hover:scale-105 shadow-md">Cancel</button>
                    <button type="button" @click="local_update(edit_clip)" class="w-28 mx-1 bg-red-200 py-2 w-full rounded-sm hover:bg-red-300 hover:scale-105 shadow-md">Update</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
    data () {
        return {
            editMode: false,
            noteText: '',
        }
    },
    mounted () {
        this.index_notes()
    },
    computed: {
        noteList () {
            return [...this.notes_list]
        },
        ...mapState('Notes', {
            edit_clip: 'editClip'
        }),
        ...mapGetters('Notes', {
            notes_list: 'list'  
        })
    },
    methods: {
        local_create () {
            if (this.noteText !== '' && this.noteText.trim() !== ''){
                const noteItem = { "description": this.noteText, "completed": 0}
                this.create_note(noteItem)
                this.noteText = ''
            } else alert('Enter note')
        },
        local_edit (id) {
            this.editMode = true
            this.edit_note(id)
        },
        local_closeEdit () {
            this.editMode = false
        },
        local_update (editItem) {
            this.editMode = false
            editItem.completed = editItem.completed ? 1 : 0
            delete editItem.sync
            this.update_note(editItem)
        },
        local_changeStatus (note) {
            const editedStatus = note.completed ? 0 : 1 
            this.edit_status([note.uuid, editedStatus])
        },
        local_delete (note) {
            const consent = confirm(`Are you sure to delete ${note.description}`)
            if (consent) this.delete_note(note.uuid)
        },
        NavToView (itemId) {
            this.$router.push({ name: 'noteView', params: { id: itemId }})
        },
        ...mapActions('Notes', {
            index_notes: 'index',
            create_note: 'add',
            edit_note: 'edit',
            edit_status: 'editStatus',
            update_note: 'update',
            delete_note: 'delete'
        })
    }
}
</script>

<style scoped>
    .c-list {
        width: 800px;
        margin: auto;
        height: 55vh;
        overflow: scroll;
    }
    .c-list::-webkit-scrollbar{
        display: none;
    }
    .c-edit-pop {
        background-color: rgb(191 219 254);
        width: 500px;
        padding: 3rem 0;
        position: fixed;
        top: calc(50% - 200px);
        left: calc(50% - 250px);
        z-index: 1;
        opacity: 96%;
        border-radius: 2rem;
        
    }
    .description {
        overflow-wrap: break-word;
        cursor: pointer;
    }
</style>