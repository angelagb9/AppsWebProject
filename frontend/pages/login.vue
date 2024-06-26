<template>
    <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card elevation="9" shaped color="#212121" width=550>
        <v-card-title class="headline justify-center">
          Iniciar Sesion
        </v-card-title>
        <v-div>
        <v-col
          cols="12"
          sm="12"
          md="12"
        >
        <v-text-field
            height=30
            color="green"
            label="Usuario"
            v-model="usuario"
          ></v-text-field>
        </v-col>
        </v-div>
        <v-div>
        <v-col
          cols="12"
          sm="12"
          md="12"
        >
        <v-text-field
            height=30
            color="green"
            label="Contraseña"
            v-model="pass"
            type="password"
          ></v-text-field>
        </v-col>
        </v-div>

      <div class="text-center">
        <v-btn 
        color="green"
        @click="login"
        >
        Login
        </v-btn>
      </div>
      <v-div class="text-center">
       <v-card-text> 
         Registrate aquí 
         <v-btn text color="green" to="/registro">
          SIGN UP
          </v-btn>
         </v-card-text>
         
      </v-div>
      <v-dialog v-model="dialogError" max-width="500px">
          <v-card>
            <v-card-title>
              <span>No se pudo llevar a cabo la acción</span>
            </v-card-title>
            <v-card-text class>
              <span>{{ formText }}</span>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green" text @click="close">Aceptar</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogAccept" max-width="500px">
          <v-card>
            <v-card-title>
              Usuario encontrado
            </v-card-title>
            <v-card-text class>
              Bienvenido 
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green" text to="/">Continuar</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import axios from 'axios';
export default {
  name: 'loginPage',
  layout: 'loginLayout',
  data: () => ({
    pass: "",
    usuario: "",
    dialogError: false,
    dialogAccept: false
  }),
  methods: {
    login(){
      axios.post("https://localhost:4000/login",{
        user: this.usuario,
        password: this.pass
      }).then(r=>{
        this.$store.commit("SET_TOKEN",r.data.token);
        if(!this.$store.state.token){
          this.dialogError=true
        }
        else{
          this.dialogAccept=true;
        }
      });
    },
    close(){
      this.dialogError=false
    }

  },
  computed: {
      formText () {
        if(!this.usuario&&!this.pass){
          return "Por favor llene todos los campos"
        }
        else{
          return "Usuario no encontrado, vuelva a introducir los datos"
        }
      },

    },

    watch: {
      dialogError (val) {
        val || this.close()
      },
      
    },
}
</script>