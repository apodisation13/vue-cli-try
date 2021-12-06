<template>
  <div>
    <button class="start_btn" @click="show_modal = true">Начать</button>
    
    <try-modal v-if="show_modal" 
    :show_modal='show_modal' 
    @close_modal='close_modal'
    />
  </div>
</template>

<script>
import TryModal from '@/components/ModalWindows/TryModal'

export default {
  components: {
    TryModal,
  },
  data() {
    return {
      show_modal: false,

    }
  },
  methods: {
    close_modal(param) {
      this.show_modal = param
    },
  }
}
</script>

<style scoped>
.start_btn {
    color: red;
    background: yellow;
    width: 300px;
    height: 100px;
    font-size: 20pt;
    border-radius: 10px;
    border-color: green;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>