<script setup>
import { ref, onMounted , watch } from 'vue'
import { EnseignantApi , fetchTest } from '@/service/api.js'
import dialog from '@/components/dialog'
import ConfirmDialog from '@/components/ConfirmDialog.vue'

const querySearch = ref('')
const enseignants = ref([])   // an empty array for the first time
const filteredEnseignants = ref([]) // to store the filtered list 

// delete feedback
var databaseMessage = ref([]); 

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
  console.log("data reçue :", data)
}

 // delete one record in the list 
async function deleteOne(matricule) {

 const confirmed = await dialog.prompt("Are you sure you want to delete?");

  if (confirmed) {
  const response = await EnseignantApi.delete(matricule);
 alert(`${response.message}`);
// alert(`${matricule}`);
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
  <div>
<input type="search" v-model="querySearch" class="form-control rounded-pill px-3 mb-2 w-25" placeholder="Search...">
   <!-- <p v-for="value in filteredEnseignants">{{ value.nom }}</p> -->
   <ConfirmDialog /> 
   <div class="container-md">
        <div class="row">
            <div class="col-lg-12">
        <table class="table table-striped table-bordered border-2">
           <thead>
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
                    <td>{{ ens.taux_horaire }}</td>
                    <td>{{ ens.nombre_heures }}</td>
                    <td>{{ ens.prestation }}</td>
                    <td>
                        <button @click="deleteOne(ens.matricule)" type="button" class="btn btn-danger w-75" >Delete</button>
                    </td>
                    <td>
                        <button type="button" class="btn btn-primary w-75">Edit</button>
                    </td>
                </tr>
            </tbody>
        </table>
        </div>
    </div>
</div>

    </div>
</template>



