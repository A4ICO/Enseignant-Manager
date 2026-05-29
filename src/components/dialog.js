import { reactive } from 'vue';
const state = reactive({ active: false, message: '' });

const dialog = {
  state,

  prompt(message) {
    state.message = message;
    state.active = true;
    return new Promise(resolve => {
      state.resolve = resolve;
    });
  },

  ok(value) {
    state.active = false;
    state.resolve(value);
  }
};

export default dialog;