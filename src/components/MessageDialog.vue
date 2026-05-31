<template>
    <div v-if="props.showMessage" class=" border rounded-4 h-100 bg-warning">
        <p class="text-secondary p-2">Alert : {{message}} {{ props.showMessage }}</p>
    </div>
</template>

<script setup>
import {ref, watch} from 'vue'

const props = defineProps(
    {
        showMessage : {type:Boolean , default: true},
        Message:String,
        MessageType:String
    }
)

const emit = defineEmits(['Hide']);
const message = ref('');
const messageType = ref('');

watch(() => props.Message , (val) => { 
if(val) {
message.value = props.Message
messageType.value = props.MessageType 
setTimeout(() => {
      message.value      = '' ;
      messageType.value  = '' ;
      emit('Hide', false) 
    }, 5000)
} 
})

</script>