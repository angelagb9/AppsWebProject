<template>
  <v-app>
      <div class= "h-screen">
        <main class= "h-full bg-light dark:bg-dark">
            <v-toolbar
      dark
      color="green"
    >
      <v-toolbar-title>Proyecto</v-toolbar-title>
      <br>
    </v-toolbar>
            <v-parallax 
            src="/fondoNegro.jpg" 
            height="600">
            <Nuxt />
            </v-parallax>
        </main>
      </div>
      <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'loginLayout',
  layout: 'empty',
  data() {
    return {
      fixed: false,
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>