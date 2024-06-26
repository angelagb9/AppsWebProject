<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <br>
      <v-card class="logo py-4 d-flex justify-center" elevation="9" shaped color="#212121">
        <UabcLogo />
      </v-card>
      <br>
      <v-card elevation="9" shaped color="#212121">
        <v-card-title class="headline justify-center">
          Universidad Autónoma de Baja California
        </v-card-title>
        <v-card-text class="justify-center">
          <h2>
            Facultad de Ingeniería
          </h2>
          <hr class="my-3" />
          <br>
          <h3>
            Desarrollo de Aplicaciones Web
          </h3>
          <br>
          <h3>
            Garcia Beltran Angela Maria
          </h3>
          <h3>
            1168371
          </h3>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import UabcLogo from '~/components/UabcLogo.vue'
export default {
  components: { UabcLogo },
  name: 'IndexPage',
}
</script>
