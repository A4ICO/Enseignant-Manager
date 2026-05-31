<template>

<div v-if="dialogOpen" class="backdrop">
  <div class="container-md rounded-5 border m-5 p-3 w-50 bg-light">

         <!-- the title of the actions -->
        <div class="row">
            <div class="col-lg-12 mb-4 text-center">
                <h3 class="action-title">Editer une enregistrement</h3>
                <!-- <hr> -->
            </div>
        </div>

        <!-- the form row  -->
        <div class="row">
            <div class="col-lg-12">
               <form @submit.prevent="submitEnseignant" class="student-form">
                
                <hr><label for="matricule" class="text-primary">Matricule : {{ props.matricule }}</label><hr>
                  <div v-for="field in fields" :key="field.key" class="form-group">
                        <label :for="field.key">{{ field.label }} </label>
                        <input
                        :id="field.key"
                        v-model="formData[field.key]"
                        :placeholder="field.placeholder"
                        :type="field.type || 'text'"
                        />
                   </div>

      <!-- buttons row -->
      <div class="row">
            <div class="col-lg-12 text-center">
                <button type="submit" :disabled="loading" class="btn btn-success mx-2">
                {{ loading ? 'Enregistrement...' : 'Enregistrer' }}
                </button>
                <button type="button" @click="closeDialog" class="btn btn-secondary mx-2">Cancel</button>
            </div>
      </div>
      <p v-if="message" :class="messageType" class="fade-message">{{ message }}</p>
    </form>
        </div>
    </div>
  </div>
</div>
</template>

<script setup>
import { ref, reactive , toRef , watch} from 'vue'
import { EnseignantApi } from '@/service/api'


const fields = [
  { key: 'nom',           placeholder: 'Ex : Randria',           type: 'text'   , label : 'Nom'  },
  { key: 'taux_horaire',  placeholder: '18',  type: 'number' , label : 'Taux Horaire'},
  { key: 'nombre_heures', placeholder: '7', type: 'number' , label: 'Nombre Heures'},
]

const props = defineProps({
        toEdit : Array,
        openDialog:Boolean,
        matricule:String,
        nom:String,
        tauxHoraire:Number,
        nombreHeures:Number
}
)

// check if the dialog is meant to be open
const dialogOpen = toRef(props , 'openDialog');
const emit = defineEmits(['close']);

// bind data into variable

// local variable
const formData = reactive({
  matricule:  '',
  nom:           '',
  taux_horaire:  '',
  nombre_heures: ''
})

watch(
  () => ({
    matricule:     props.matricule,
    nom:           props.nom,
    taux_horaire:  props.tauxHoraire,
    nombre_heures: props.nombreHeures
  }),
  (newProps) => {
    Object.assign(formData, newProps)
  },
  { immediate: true })


// 
function closeDialog(){
emit('close');
}

const loading     = ref(false)
const message     = ref('')
const messageType = ref('')

function showMessage(msg , type){
  message.value     = msg
  messageType.value = type
  setTimeout(() => {
    message.value     = ''
    messageType.value = ''
  }, 5000)
}

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

    showMessage(res.message , res.message.includes('succes') ? 'success' : 'error');

    if (res.message.includes('réussie')) {
        showMessage('Enregistrement a jour' , 'success')
      resetForm()
    }

  } catch (e) {
    showMessage('Erreur de connexion' , 'error')
  } finally {
    loading.value = false
  }
  }
  else{
    showMessage('Completer tous' , 'error');
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
.student-form {width: 100%; }
.form-group { margin-bottom: 16px; display: flex; flex-direction: column; }
label { margin-bottom: 6px; font-weight: 600; }
input { padding: 10px; border: 1px solid #ccc; border-radius: 6px; }

/* .submit-btn {
  margin-top: 10px;
  padding: 12px 24px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
} */

.backdrop {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0,0,0,0.4);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.success { color: green; font-weight: bold; }
.error   { color: red;   font-weight: bold; }
.action-title{
    color:black;
}

</style>