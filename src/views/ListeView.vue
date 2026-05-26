<script setup>
import { ref, onMounted } from 'vue'
import { EnseignantApi } from '@/service/api.js'

const liste = ref([])   // tableau vide au début

// Quand la page charge → récupère la liste
onMounted(async () => {
  liste.value = await EnseignantApi.getAll()
})
</script>


<template>
  <div>
    <h1>Liste des Enseignants</h1>
           <table>
 <caption>Monthly Savings</caption>
 <thead>
   <tr>
     <th>Month</th>
     <th>Savings</th>
   </tr>
 </thead>
 <tbody>
   <tr>
     <td>January</td>
     <td>$100</td>
   </tr>
   <tr>
     <td>February</td>
     <td>$80</td>
   </tr>
 </tbody>
 <tfoot>
   <tr>
     <td>Total</td>
     <td>$180</td>
   </tr>
 </tfoot>
</table>
    </div>
</template>
