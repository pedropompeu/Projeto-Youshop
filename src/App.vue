<template>
  <v-app>
   
    <v-app-bar app class="deep-space-app-bar">
      <v-container>
        <v-row>
          <v-col class="d-flex justify-center">
            <v-toolbar-title class="app-bar-title">Deep Space Store</v-toolbar-title>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>

 
    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>

    
    <v-footer app class="deep-space-footer">
      <v-container>
        <v-row>
          <v-col class="text-center">
            <span>&copy; 2024 - Deep Space Store</span>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style scoped>
.deep-space-app-bar {
  background-color: #3e3e3e; 
  color: #ffffff; 
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); 
}

.app-bar-title {
  font-size: 1.8rem; 
  font-weight: bold; 
}

.deep-space-footer {
  background-color: #3e3e3e; 
  color: #ffffff; 
  padding: 16px 0; 
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.2); 
}

.text-center {
  text-align: center;
}
</style>
