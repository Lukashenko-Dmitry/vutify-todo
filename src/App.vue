<template> 

  <v-app id="inspire">
     <v-navigation-drawer
     v-model="drawer"
     app
     >
      <v-img 
        color="primary"
        class="pa-4 pt-7"
        gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
        :height="this.$route.path === '/' ? 240 : 170"
        dark        
        src="https://picsum.photos/1920/1080?random"
      >
       <v-avatar size="70">
        <img          
          src="@/assets/Lukashenko.jpg"
          alt="Dmitry Lukashenko"
        >
      </v-avatar>
      <div class="text-subtitle-1 font-weight-bold ">Dmitry Lukashenko</div>
      <div class="text-subtitle-2 ">dmitry_lukashenko</div>
      </v-img>


      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.to"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="primary"
      dark      
      src="https://picsum.photos/1920/1080?random"      
      prominent
      :height="this.$route.path === '/' ? 240 : 170"

    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(19,84,122,.9), rgba(128,208,199,.9)"
        ></v-img>
      </template>
      <v-container class="pa-0">
        <v-row>
          <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
          <v-spacer></v-spacer>
          <search/>
        </v-row>       
        <v-row>
          <v-app-bar-title class="ml-4">{{$store.state.appTitle}}</v-app-bar-title>
        </v-row>
         <v-row class="mt-1">
          <live-date-time />
        </v-row>
        <v-row v-if="this.$route.path === '/'">
          <field-add-task/>
        </v-row>
      </v-container>     
    </v-app-bar>
    <v-main>
      <router-view></router-view>
      <snackbar/>
    </v-main>
  </v-app> 
</template>

<script>

export default {
  name: 'App',
  data: () => ({
    drawer: false,
    items: [
          { title: 'Todo', icon: 'mdi-format-list-checks', to:'/' },
          { title: 'About', icon: 'mdi-help-box', to:'/about' },
        ],
    right: null,
  }),
  mounted () {    
    this.$store.dispatch('getTasks');
  },  
  components:{
    'search': require('@/components/Tools/Search.vue').default,    
    'live-date-time': require('@/components/Tools/LiveDateTime.vue').default,
    'field-add-task': require('@/components/Todo/FieldAddTask.vue').default,
    'snackbar': require('@/components/Shared/SnackBar.vue').default,
    
  }
};
</script>
