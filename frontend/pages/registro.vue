<template>
    <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card elevation="9" shaped color="#212121" width=550>
        <v-card-title class="headline justify-center">
          Registrate
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
        <v-div>
        <v-col
          cols="12"
          sm="12"
          md="12"
        >
        <v-text-field
            height=30
            color="green"
            label="Confirmación de contraseña"
            v-model="pass2"
            type="password"
          ></v-text-field>
        </v-col>
        </v-div>

      <div class="text-center">
        <v-btn 
        color="green"
        @click="signup"
        >
        SIGN UP
        </v-btn>
      </div>
      <v-div class="text-center">
       <v-card-text> 
         Ya tiene una cuenta, ingresa aquí 
         <v-btn text color="green" to="/login">
          LOGIN
          </v-btn>
         </v-card-text>
      </v-div>

      <v-dialog v-model="dialogError" max-width="500px">
          <v-card>
            <v-card-title>
              <span>{{ formTitle}}</span>
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

      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import axios from 'axios'; 
export default {
  name: 'registroPage',
  layout: 'loginLayout',
  data: () => ({
    pass: "",
    pass2: "",
    usuario: "",
    dialogError: false,
    us: ""
  }),
  methods: {
    signup(){
      if(this.usuario&&this.pass&&this.pass==this.pass2){
          axios.post("https://localhost:4000/users", {
            user: this.usuario,
            password: this.pass
          }).then(r=>{
            this.us=r.data;
          })
      }
      this.dialogError=true
    },
    close(){
      this.dialogError=false
    }
  },

  computed: {
      formText () {
        if(!this.usuario&&!this.pass&&!this.pass2){
          return "Por favor llene todos los campos"
        }
        else if(this.pass!=this.pass2){
          return "Las contraseñas no coinciden"
        }
        else if(!this.us.user){
          return "El usuario ya existe, intente con otro"
        }
        else{
          return "Usuario creado correctamente"
        }
      },
      formTitle () {
        if(this.us.user){
           console.log(this.us)
            return "Acción exitosa"
        }
        else{
          return "No se pudo llevar a cabo la acción"
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