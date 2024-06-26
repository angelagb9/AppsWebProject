<template>
  <v-data-table light
    :headers="headers"
    :items="propiedades"
    sort-by="id"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Propiedades CRUD</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="green"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              Nueva Propiedad
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.descripcion"
                      label="Descripcion"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.clave_catastral"
                      label="Clave catastral"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="green"
                text
                @click="close"
              >
                Cancelar
              </v-btn>
              <v-btn
                color="green"
                text
                @click="save"
              >
                Guardar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog
          v-model="dialogArrendador"
          max-width="500px"
        >
          <v-card>
            <v-card-title>
              <span class="text-h5">Asignar Arrendador</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.arrendatarioId"
                      label="Arrendatario rfc"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="green"
                text
                @click="closeArrendador"
              >
                Cancelar
              </v-btn>
              <v-btn
                color="green"
                text
                @click="deleteArrendador"
              >
                Eliminar
              </v-btn>
              <v-btn
                color="green"
                text
                @click="saveArrendador"
              >
                Guardar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog
          v-model="dialogPropietario"
          max-width="600px"
        >
          <v-card>
            <v-card-title>
              <span class="text-h5">Propietarios</span>
            </v-card-title>

            <v-simple-table>
            <template v-slot:default>
            <thead>
            <tr>
              <th class="text-left">
                ID
              </th>
              <th class="text-left">
                Nombre
              </th>
              <th class="text-left">
                RFC
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="p in propietarios"
              :key="p.id"
            >
            <td>{{ p.id }}</td>
            <td>{{ p.nombre }}</td>
            <td>{{ p.rfc }}</td>
            </tr>
          </tbody>
          </template>
          </v-simple-table>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="green"
                text
                @click="closePropietarios"
              >
                Cerrar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">¿Deseas eliminar esta propiedad?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green" text @click="closeDelete">Cancelar</v-btn>
              <v-btn color="green" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-icon
            color="black"
            class="mr-2"
            @click="asignArrendador(item)"
            v-bind="attrs"
            v-on="on"
          >
          mdi-account
          </v-icon>
        </template>
      <span>Arrendador</span>
    </v-tooltip>
    <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-icon
            color="green"
            class="mr-2"
            @click="getPropietarios(item)"
            v-bind="attrs"
            v-on="on"
          >
          mdi-account-multiple
          </v-icon>
        </template>
        <span>Propietarios</span>
    </v-tooltip>
    <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-icon
            class="mr-2"
            @click="editItem(item)"
            v-bind="attrs"
            v-on="on"
          >
          mdi-pencil
          </v-icon>
        </template>
      <span>Editar Propiedad</span>
    </v-tooltip>
    <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-icon
            color="red"
            @click="deleteItem(item)"
            v-bind="attrs"
            v-on="on"
          >
          mdi-delete
          </v-icon>
        </template>
        <span>Eliminar Propiedad</span>
    </v-tooltip> 
    </template>
    <template v-slot:no-data>
      <v-btn
        color="green"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import axios from 'axios';
export default {
  name: 'PropiedadesPage',
  data: () => ({
      dialog: false,
      dialogDelete: false,
      dialogArrendador: false,
      dialogPropietario:false,
      headers: [
        {
          text: 'ID',
          align: 'start',
          sortable: false,
          value: 'id',
        },
        { text: 'Descripcion', value: 'descripcion' },
        { text: 'Clave catastral', value: 'clave_catastral' },
        { text: 'ID Arrendatario', value: 'arrendatarioId' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      propiedades: [],
      propietarios:[],
      editedIndex: -1,
      editedItem: {
        descripcion: ' ',
        clave_catastral: ' ',
        arrendatarioId: ' '
      },
      defaultItem: {
        descripcion: ' ',
        clave_catastral: ' ',
        arrendatarioId: ' '
      },
    }),

    computed: {
      formTitle () {
        if(this.editedIndex===-1){
          return 'Nueva Propiedad'
        }
        else{
          return 'Editar Propiedad'
        }
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
      dialogArrendador (val){
        val || this.closeArrendador()
      }
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        axios.get('https://localhost:4000/propiedades',{
        headers: {
          'Authorization': "Bearer "+this.$store.state.token
          }
        }).then((r) => {this.propiedades=r.data;});
      },

      editItem (item) {
        this.editedIndex = this.propiedades.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.propiedades.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        let link='https://localhost:4000/propiedades/'+this.editedItem.id;
        axios.delete(link,{
        headers: {
          'Authorization': "Bearer "+this.$store.state.token
          }
        }).then(r=>{});
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.initialize()
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.initialize()
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          let linkDes='https://localhost:4000/propiedades/'+this.editedItem.id+'/descripcion';
          let linkClave='https://localhost:4000/propiedades/'+this.editedItem.id+'/clave';
          axios.put(linkDes,{
            descripcion: this.editedItem.descripcion
          },{
        headers: {
          'Authorization': "Bearer "+this.$store.state.token
          }
        }).then(r=>{});
          axios.put(linkClave,{
            clave_catastral: this.editedItem.clave_catastral
          }).then(r=>{this.initialize()});
        } else {
           axios.post('https://localhost:4000/propiedades',{clave_catastral: this.editedItem.clave_catastral.trim(), descripcion: this.editedItem.descripcion.trim()},{
        headers: {
          'Authorization': "Bearer "+this.$store.state.token
          }
        })
          .then(r=>{this.initialize()});
        }
        this.close()
      },
      asignArrendador(item){
        this.editedIndex = this.propiedades.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogArrendador = true
      },
      getPropietarios(item){
          this.editedIndex = this.propiedades.indexOf(item)
          this.editedItem = Object.assign({}, item)
          let link= "https://localhost:4000/propiedades/"+this.editedItem.id+"/propietarios"
          axios.get(link,{
        headers: {
          'Authorization': "Bearer "+this.$store.state.token
          }
        }).then((r)=>{
          this.propietarios = r.data
        })
          this.dialogPropietario = true
      },
      saveArrendador(){
        axios.post('https://localhost:4000/propiedades/arrendador',{
            clave_catastral: this.editedItem.clave_catastral.trim(),
            rfc: this.editedItem.arrendatarioId.trim()
            }
          ,{
        headers: {
          'Authorization': "Bearer "+this.$store.state.token
          }
        }).then(r=>{
            this.initialize()
          });
        this.closeArrendador();
      },
      deleteArrendador(){
        let link= 'https://localhost:4000/propiedades/'+this.editedItem.id+"/arrendador";
        axios.delete(link,{
        headers: {
          'Authorization': "Bearer "+this.$store.state.token
          }
        }).then(r=>{
          this.initialize()
        });
        this.closeArrendador();
      },
      closeArrendador(){
        this.dialogArrendador = false
        this.initialize()
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      closePropietarios(){
        this.dialogPropietario = false
        this.initialize()
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      }
    },
  }
</script>