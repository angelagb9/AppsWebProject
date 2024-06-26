<template>
  <v-data-table light
    :headers="headers"
    :items="personas"
    sort-by="id"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Personas CRUD</v-toolbar-title>
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
              Nueva Persona
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
                      v-model="editedItem.nombre"
                      label="Nombre "
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.rfc"
                      label="RFC"
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
          v-model="dialogPropiedades"
          max-width="600px"
        >
          <v-card>
            <v-card-title>
              <span class="text-h5">Propiedades</span>
            </v-card-title>

            <v-simple-table>
            <template v-slot:default>
            <thead>
            <tr>
              <th class="text-left">
                ID
              </th>
              <th class="text-left">
                Descripcion
              </th>
              <th class="text-left">
                Clave Catastral
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="p in propiedades"
              :key="p.id"
            >
            <td>{{ p.id }}</td>
            <td>{{ p.descripcion }}</td>
            <td>{{ p.clave_catastral }}</td>
            </tr>
          </tbody>
          </template>
          </v-simple-table>
            <v-card-text>
              <br>
              <h3>Agregar Propiedad</h3>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.propiedadid"
                      label="Propiedad clave"
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
                @click="closePropiedades"
              >
                Cerrar
              </v-btn>
              <v-btn
                color="green"
                text
                @click="savePropiedades"
              >
                Agregar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog
          v-model="dialogPropiedadesArrendadas"
          max-width="600px"
        >
          <v-card>
            <v-card-title>
              <span class="text-h5">Propiedades Arrendadas</span>
            </v-card-title>

            <v-simple-table>
            <template v-slot:default>
            <thead>
            <tr>
              <th class="text-left">
                ID
              </th>
              <th class="text-left">
                Descripcion
              </th>
              <th class="text-left">
                Clave Catastral
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="a in arrendadas"
              :key="a.id"
            >
            <td>{{ a.id }}</td>
            <td>{{ a.descripcion }}</td>
            <td>{{ a.clave_catastral }}</td>
            </tr>
          </tbody>
          </template>
          </v-simple-table>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="green"
                text
                @click="closePropiedadesArrendadas"
              >
                Cerrar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">¿Deseas eliminar a esta persona?</v-card-title>
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
            @click="editPropiedades(item)"
            color="black"
            class="mr-2"
            v-bind="attrs"
            v-on="on"
          >
          mdi-home
          </v-icon>
        </template>
        <span>Propiedades</span>
    </v-tooltip>
    <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-icon
            @click="getPropiedadesArrendadas(item)"
            color="green"
            class="mr-2"
            v-bind="attrs"
            v-on="on"
          >
          mdi-home-outline
          </v-icon>
        </template>
        <span>Propiedades Arrendadas</span>
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
        <span>Editar Persona</span>
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
        <span>Eliminar Persona</span>
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
  name: 'PersonasPage',
  data: () => ({
      dialog: false,
      dialogDelete: false,
      dialogPropiedades: false,
      dialogPropiedadesArrendadas: false,
      headers: [
        {
          text: 'ID',
          align: 'start',
          sortable: false,
          value: 'id',
        },
        { text: 'Nombre', value: 'nombre' },
        { text: 'RFC', value: 'rfc' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      personas: [],
      propiedades: [],
      arrendadas: [],
      editedIndex: -1,
      editedItem: {
        nombre: '',
        rfc: " ",
        propiedadid: " "
      },
      defaultItem: {
        nombre: '',
        rfc: 0,
        propiedadid: " "
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nueva persona' : 'Editar persona'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
      dialogPropiedades(val){
        val || this.closePropiedades()
      }
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        axios.get('https://localhost:4000/personas',{
        headers: {
          'Authorization': "Bearer "+this.$store.state.token
          }
        }).then((r) => {
          this.personas=r.data;
          });
      },

      editItem (item) {
        this.editedIndex = this.personas.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      getPropiedadesArrendadas(item){
        this.editedIndex = this.personas.indexOf(item)
        this.editedItem = Object.assign({}, item)
        let link= "https://localhost:4000/personas/arrendador/"+this.editedItem.id+"/propiedades"
        axios.get(link, {
        headers: {
          'Authorization': "Bearer "+this.$store.state.token
          }
        }).then((r)=>{
          this.arrendadas = r.data
        })
        this.dialogPropiedadesArrendadas = true
      },
      deleteItem (item) {
        this.editedIndex = this.personas.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        let link='https://localhost:4000/personas/'+this.editedItem.id;
        axios.delete(link,{
        headers: {
          'Authorization': "Bearer "+this.$store.state.token
          }
        }).then(r=>{});
        this.closeDelete()
      },
      editPropiedades (item) {
        this.editedIndex = this.personas.indexOf(item)
        this.editedItem = Object.assign({}, item)
        let link= "https://localhost:4000/personas/propietario/"+this.editedItem.id+"/propiedades"
        axios.get(link,{
        headers: {
          'Authorization': "Bearer "+this.$store.state.token
          }
        }).then((r)=>{
          this.propiedades = r.data
        })

        this.dialogPropiedades = true
      },
      close () {
        this.dialog = false
        this.initialize()
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      closePropiedadesArrendadas(){
        this.dialogPropiedadesArrendadas = false
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
      closePropiedades(){
          this.dialogPropiedades=false
          this.initialize()
          this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          let linkNombre='https://localhost:4000/personas/'+this.editedItem.id+'/name';
          let linkRFC='https://localhost:4000/personas/'+this.editedItem.id+'/RFC';
          axios.put(linkNombre,{
            nombre: this.editedItem.nombre
          },{
        headers: {
          'Authorization': "Bearer "+this.$store.state.token
          }
        }).then(r=>{});
          axios.put(linkRFC,{
            rfc: this.editedItem.rfc
          },{
        headers: {
          'Authorization': "Bearer "+this.$store.state.token
          }
        }).then(r=>{
            this.initialize()
          });
        } else {
          axios.post('https://localhost:4000/personas',{nombre: this.editedItem.nombre,rfc: this.editedItem.rfc.trim()},{
        headers: {
          'Authorization': "Bearer "+this.$store.state.token
          }
        })
          .then(r=>{
            this.initialize()
          });
        }
        this.close();
      },
      savePropiedades(){
        axios.post("https://localhost:4000/personas/propietario/propiedad",{
          rfc: this.editedItem.rfc.trim(),
          clave_catastral: this.editedItem.propiedadid.trim()
        },{
        headers: {
          'Authorization': "Bearer "+this.$store.state.token
          }
        }).then(r=>{console.log(r.data)})
        this.closePropiedades();
      },
    } 
  }
</script>
