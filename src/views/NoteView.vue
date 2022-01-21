<template>
    <div>
        <div class="flex justify-between">
            <div class="flex">
                <div class="px-6 cursor-pointer" @click="local_NavToList">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                </div>
                <h1>Note / <span class="text-sm font-italic text-gray-700">{{ itemId }}</span></h1>
            </div>
            <div class="delete px-1 cursor-pointer mx-1 hover:text-red-400" @click="local_delete(itemId)">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
            </div> 
        </div>
        <div class="mt-8 bg-slate-200 py-10 rounded-2xl">
            <div class="flex border-b-2 border-blue-300 px-12 mb-6">
                <h1 class="pb-3 text-lg font-bold text-red-400">Note:</h1>
                <div class="ml-12">
                    <input class="cursor-pointer" type="checkbox" v-model="note.completed" @click="local_changeStatus(note)"><span class="text-lg pl-2 text-blue-600">Completed</span>
                </div>
            </div>
            <div class="pl-12" v-if="editMode">
                <input class="p-2 text-xl focus: outline-none" autofocus type="text" placeholder="Edit note" @keyup.enter="local_update(edit_clip)" v-model="edit_clip.description">
            </div>
            <p v-else class="text-xl pl-12 p-2" @click="local_edit(note.uuid)">{{ note.description }}</p>
        </div>
    </div>
</template>

<script>

import { mapActions, mapState } from 'vuex'

export default {
    data () {
        return {
            editMode : false,
        }
    },
    mounted () {
        this.index_noteItem(this.itemId)
    },
    computed: {
        itemId () {
            return this.$route.params.id
        },
        note () {
            return {...this.note_item}
        },
        
        ...mapState('Notes', {
            notes_list: 'list',
            edit_clip: 'editClip',
            note_item: 'noteItem'
        })
    },
    methods: {
        local_edit (id) {
            this.editMode = true
            this.edit_note(id)
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
        local_delete (id) {
            const consent = confirm('Delete note?')
            if (consent) {
                this.delete_note(id)
                setTimeout(() => this.$router.push({ name: 'notes' }), 200) 
            }
        },
        local_NavToList () {
            this.$router.push({ name: 'notes' })
        },
        ...mapActions('Notes', {
            index_noteItem: 'indexItem',
            edit_note: 'edit',
            edit_status: 'editStatus',
            update_note: 'update',
            delete_note: 'delete',
        })
    }
}
</script>
