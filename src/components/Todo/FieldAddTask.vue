<template>
    <v-text-field
            v-model="newTaskTitle"            
            @keyup.enter="addTask"
            class="pa-3"
            outlined      
            label="Add Task"            
            hide-details
            clearable
          >
          <template v-slot:append>
              <v-icon
              @click="addTask"              
              :disabled="newTaskTitleInvalid"
              >
                mdi-plus
              </v-icon>
            </template>
    </v-text-field>
</template>

<script>
export default {
    data(){
      return {
        newTaskTitle : "",        
      }
    },
    computed: {
      newTaskTitleInvalid(){
        return !this.newTaskTitle || this.newTaskTitle.length < 4;
      }
    },
    methods: {
      addTask(){
        if(!this.newTaskTitleInvalid){
          this.$store.dispatch('addTask', this.newTaskTitle);
          this.newTaskTitle = ''; 
        }        
      },    
    },
}
</script>
