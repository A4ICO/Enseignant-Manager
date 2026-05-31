<script setup>
import { ref, onMounted , watch, reactive } from 'vue'
import { EnseignantApi , fetchTest } from '@/service/api.js'
import dialog from '@/components/dialog'
import ConfirmDialog from '@/components/ConfirmDialog.vue'
import EditDialog from '@/components/EditDialog.vue'
import MessageDialog from '@/components/MessageDialog.vue'

const querySearch = ref('')
const enseignants = ref([])   // an empty array for the first time
const filteredEnseignants = ref([]) // to store the filtered list 

// delete feedback
var databaseMessage = ref([]); 

// handle message display after actions
const testMessage = ref('');
const testMessageType = ref('');
const showMess = ref(false);

// check if edit button is clicked
   //and set up the needed data for the update
const NomToEdit = ref('');
const tauxHoraireToEdit = ref();
const nombreHeuresToEdit = ref();
const matriculeToEdit = ref('');
const checkEdit = ref(false);

function editButtonClicked(row){
  console.log(row);
  // show message
  testMessage.value = 'Edit mode enabled'
  showMess.value = true ;
  
  matriculeToEdit.value = row.matricule;
  NomToEdit.value = row.nom;
  tauxHoraireToEdit.value = Number(row.taux_horaire);
  nombreHeuresToEdit.value = Number(row.nombre_heures);
  console.log(nombreHeuresToEdit);
  checkEdit.value = !checkEdit.value;
}

// apply filter on search
watch(querySearch, (newQuery) => {
  if (newQuery !== '') {
    filteredEnseignants.value = enseignants.value.filter(user =>
      user.nom.toLowerCase().includes(newQuery.toLowerCase())
    )
  } else {
    filteredEnseignants.value = enseignants.value;
  }
} , {immediate : true})

// complete the list
async function fillList(){
  const data = await EnseignantApi.getAll()
    enseignants.value = data;
    filteredEnseignants.value = enseignants.value;
  // console.log("data reçue :", data)
}

 // delete one record in the list 
async function deleteOne(matricule) {
 const confirmed = await dialog.prompt("Are you sure you want to delete?");
  if (confirmed) {
  const response = await EnseignantApi.delete(matricule);
 alert(`${response.message}`);
databaseMessage = response.value;
fillList();
  }
}
 
 // Fill the table is the page is being mounted
onMounted(async () => {
fillList();
})
</script>

<template>

<div class="" style="position: fixed; top: 5px; right:15%; z-index:9999;">
  <input type="text"
      v-model="querySearch" 
      class=" border rounded-pill m-2 p-2 h-75 w-100"
      style="" 
      placeholder="Search..." >
</div>

<EditDialog :openDialog="checkEdit"
:matricule=matriculeToEdit
:nom=NomToEdit 
:nombreHeures="nombreHeuresToEdit"
:tauxHoraire="tauxHoraireToEdit"
,
@close="checkEdit = false"
/>
        
<div class="container-md">
  <div class="row">
    <div class="col-lg-4">
    </div>
    <div class="col-lg-4"><ConfirmDialog/></div>
  </div>
  <div class="col-lg-4">
    </div>
</div>


   <div class="container-md">
        <div class="row">
            <div class="col-lg-12">
        <table class="table table-striped table-bordered border-2">
           <thead  style="position: sticky; top:100px ; height: 90px;">
                <tr>
                <th>Matricule</th>
                <th>Nom</th>
                <th>Taux Horaire</th>
                <th>Nombre Heures</th>
                <th>Prestation</th>
                <th colspan="2" class="text-center">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="ens in filteredEnseignants">
                    <td>{{ ens.matricule }}</td>
                    <td>{{ ens.nom }}</td>
                    <td>{{ ens.taux_horaire }} H</td>
                    <td>{{ ens.nombre_heures }} H</td>
                    <td>{{ ens.prestation }} Ar</td>
                    <td>
                        <button type="button" @click="deleteOne(ens.matricule)"  class="btn btn-danger w-75 text-center" >Delete</button>
                    </td>
                    <td>
                        <button type="button" @click.stop.self="editButtonClicked(ens)" class="btn btn-primary w-75 text-center">Edit</button>
                    </td>
                </tr>
            </tbody>
        </table>
        
        <div style="background-color: transparent;
          height: 40px; 
          margin-bottom: 5px;
          position: sticky;
          bottom: 20px;">
          <MessageDialog 
           :showMessage="showMess"
           :Message="testMessage"
           :MessageType="testMessageType"
           @Hide="showMess = false ; testMessage = ''"/>
        </div>  
      </div>
</div>

    </div>
</template>



