<script setup>
import { ref, onMounted } from 'vue'
import { EnseignantApi , fetchTest } from '@/service/api.js'

const enseignants = ref([])   // tableau vide au début

// Quand la page charge >> récupère la liste
onMounted(async () => {
  const data = await EnseignantApi.getAll()
  console.log("data reçue :", data) 
  enseignants.value = data;
// const test = await fetchTest.test();
})
</script>


<template>
  <div>
<input type="search" class="form-control rounded-pill px-3 mb-2 w-25" placeholder="Search...">
   
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
                    <td>{{ ens.nombre_heures }}</td>
                    <td>{{ ens.prestation }}</td>
                    <td>{{ ens.taux_horaire }}</td>
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



