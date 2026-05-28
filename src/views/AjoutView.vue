<template>

  <h3 class="page-title">Ajouter une nouvelle enregistrement</h3>

  <div class="form-container rounded-5 border m-5">
    <form @submit.prevent="submitEnseignant" class="student-form">

      <div v-for="field in fields" :key="field.key" class="form-group">
        <label :for="field.key">{{ field.label }}</label>
        <input
          :id="field.key"
          v-model="formData[field.key]"
          :placeholder="field.placeholder"
          :type="field.type || 'text'"
        />
      </div>

      <button type="submit" :disabled="loading" class="submit-btn">
        {{ loading ? 'Enregistrement...' : 'Enregistrer' }}
      </button>

      <p v-if="message" :class="messageType">{{ message }}</p>

    </form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { EnseignantApi } from '@/service/api'

const fields = [
  { key: 'matricule',     placeholder: 'E-1234',            type: 'text'   , label : 'Matricule' },
  { key: 'nom',           placeholder: 'Ex : Randria',           type: 'text'   , label : 'Nom'  },
  { key: 'taux_horaire',  placeholder: '18',  type: 'number' , label : 'Taux Horaire'},
  { key: 'nombre_heures', placeholder: '7', type: 'number' , label: 'Nombre Heures'},
]

const formData = reactive({
  matricule:     '',
  nom:           '',
  taux_horaire:  '',
  nombre_heures: ''
})

const loading     = ref(false)
const message     = ref('')
const messageType = ref('')

async function submitEnseignant() {
  message.value = '';

  if(formData.matricule != '' 
  && formData.nom != ''
  && formData.taux_horaire  != ''
  && formData.nombre_heures != ''){
    try {
        loading.value = true
    const res = await EnseignantApi.create(
      formData.matricule,
      formData.nom,
      formData.taux_horaire,
      formData.nombre_heures
    )

    message.value     = res.message
    messageType.value = res.message.includes('succes') ? 'success' : 'error'

    if (res.message.includes('réussie')) {
      resetForm()
    }

  } catch (e) {
    message.value     = 'Erreur de connexion';
    messageType.value = 'error';
  } finally {
    loading.value = false
  }
  }
  else{
    message.value =  'Completer tous';
    messageType.value = 'error';
  }
}

function resetForm() {
  formData.matricule     = ''
  formData.nom           = ''
  formData.taux_horaire  = ''
  formData.nombre_heures = ''
}
</script>

<style scoped>

.form-container { display: flex; justify-content: center; padding: 20px; }
.student-form { max-width: 450px; width: 100%; }
.form-group { margin-bottom: 16px; display: flex; flex-direction: column; }
label { margin-bottom: 6px; font-weight: 600; }
input { padding: 10px; border: 1px solid #ccc; border-radius: 6px; }

.submit-btn {
  margin-top: 10px;
  padding: 12px 24px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
}
.success { color: green; font-weight: bold; }
.error   { color: red;   font-weight: bold; }
</style>