<script setup>
import { ref, onMounted , watch } from 'vue'
import { EnseignantApi , fetchTest } from '@/service/api.js'

const querySearch = ref('')
const enseignants = ref([])   // tableau vide au début
const filteredEnseignants = ref([])

// apply filter on search

watch(querySearch, (newQuery) => {
  if (newQuery !== '') {
    filteredEnseignants.value = enseignants.value.filter(user =>
      user.nom.toLowerCase().includes(newQuery.toLowerCase())
    )
  } else {
    filteredEnseignants.value = enseignants.value
  }
} , {immediate : true})

// complete the list
async function fillList(){
  const data = await EnseignantApi.getAll()
    enseignants.value = data;
  console.log("data reçue :", data)
}


// Quand la page charge >> récupère la liste
onMounted(async () => {
fillList();
// const test = await fetchTest.test();
})
</script>

<template>
  <div>
<input type="search" v-model="querySearch" class="form-control rounded-pill px-3 mb-2 w-25" placeholder="Search...">
   <p>{{ filteredEnseignants.nom }}</p>
    <div class="container-md">
        <div class="row">
            <div class="col-lg-12">
        <table class="table table-striped table-bordered">
           <thead>
                <tr>
                <th>Matricule</th>
                <th>Nom</th>
                <th>Taux Horaire</th>
                <th>Nombre Heures</th>
                <th>Prestation</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="ens in enseignants">
                    <td>{{ ens.matricule }}</td>
                    <td>{{ ens.nom }}</td>
                    <td>{{ ens.taux_horaire }}</td>
                    <td>{{ ens.nombre_heures }}</td>
                    <td>{{ ens.prestation }}</td>
                    <td>
                        <button type="button" class="btn btn-danger w-75" >Delete</button>
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



