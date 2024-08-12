<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>Deep Space Store</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>

    <v-footer app>
      <v-col class="text-center">© 2024 - Deep Space Store</v-col>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>


</style>
