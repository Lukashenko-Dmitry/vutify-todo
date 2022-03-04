<template>
    <div>
        <v-menu
            bottom
            left
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color= 'primary'       
                icon
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item
                v-for="(item, index) in items"
                :key="index"
                @click="handelClick(index)"
              >
                <v-list-item-icon>
                    <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

        
        <dialog-edit
            @close="dialogs.edit = false"
            v-if="dialogs.edit"
            :task="task"
            />
        <dialog-due-date
            @close="dialogs.dueDate = false"
            v-if="dialogs.dueDate"
            :task="task"
            />
        <dialog-delete
            @close="dialogs.delete = false"
            v-if="dialogs.delete"
            :task="task"
            />
        
    </div>
   
</template>

<script>
export default {
    props: ['task'],
    data: () => ({
      dialogs: {
          edit: false,
          dueDate: false,
          delete: false,
      },
      items: [
        { 
            title: 'Edit',
            icon: 'mdi-pencil',
            click(){
                this.dialogs.edit = true;
            },
        },
        { 
            title: 'Due Date',
            icon:  'mdi-calendar',
            click(){
             this.dialogs.dueDate = true;
            },
        },
        {
            title: 'Delete',
            icon: 'mdi-delete',
            click(){
             this.dialogs.delete = true;
            },
        },       
      ],
    }),
    methods: {
        handelClick(index){
            this.items[index].click.call(this)
        }
    },
    components: {
        'dialog-delete': require('@/components/Todo/Dialogs/DialogDelete.vue').default,
        'dialog-edit': require('@/components/Todo/Dialogs/DialogEdit.vue').default,
        'dialog-due-date': require('@/components/Todo/Dialogs/DialogDueDate.vue').default,
    }
}
</script>

<style>

</style>