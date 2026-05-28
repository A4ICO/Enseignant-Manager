<template>
  <div class="form-container">
    <form @submit.prevent="submitEnseignant" class="student-form">

      <div v-for="field in fields" :key="field.key" class="form-group">
        <label :for="field.key">{{ field.placeholder }}</label>
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
  { key: 'matricule',     placeholder: 'Matricule',     type: 'text'   },
  { key: 'nom',           placeholder: 'Nom',           type: 'text'   },
  { key: 'taux_horaire',  placeholder: 'Taux Horaire',  type: 'number' },
  { key: 'nombre_heures', placeholder: 'Nombre Heures', type: 'number' },
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
  loading.value = true
  message.value = ''

  try {
    const res = await EnseignantApi.create(
      formData.matricule,
      formData.nom,
      formData.taux_horaire,
      formData.nombre_heures
    )

    message.value     = res.message
    messageType.value = res.message.includes('réussie') ? 'success' : 'error'

    if (res.message.includes('réussie')) {
      resetForm()
    }

  } catch (e) {
    message.value     = 'Erreur de connexion'
    messageType.value = 'error'
  } finally {
    loading.value = false
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