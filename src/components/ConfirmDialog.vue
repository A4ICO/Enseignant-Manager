<template>
  <div v-if="state.active" class="overlay
     border
     bg-warning
     rounded-2 
     text-center
     mb-1">
    <div class="dialog">
      <p style="font-style: bold;">{{ state.message }}</p>
      <button @click="confirm" class="btn btn-danger m-1">Yes delete</button>
      <button @click="cancel" class="btn btn-secondary m-1">Cancel</button>
    </div>
  </div>
</template>

<script>
import dialog from './dialog';

export default {
  data() {
    return {
      state: dialog.state
    };
  },
  methods: {
    confirm() {
      dialog.ok(true);
    },
    cancel() {
      dialog.ok(false);
    }
  }
};
</script>