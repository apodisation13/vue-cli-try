<template>
  <base-modal 
    @close-modal="closeModal"
  >
    <div class="confirm-modal">
      <div class="confirm-modal-title-block">
        <slot></slot>
      </div>
      <div class="confirm-modal-buttons">
        <base-button 
          class="confirm-btn"
          @click="confirmAction"
        >
          Да
        </base-button>
        <base-button  
          class="confirm-btn"
          @click="closeModal"
        >
          Нет
        </base-button>
      </div>
    </div>
  </base-modal>
</template>

<script>
import BaseButton from '../UI/BaseButton.vue';
import BaseModal from '../UI/BaseModal.vue'
  export default {
  components: { BaseModal, BaseButton },
    methods: {
      closeModal() {
        this.$emit('close');
      },
      confirmAction() {
        this.$emit('confirm');
      }
    }
  }
</script>

<style scoped>
.confirm-modal-title-block {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.confirm-modal-buttons {
  display: flex;
  justify-content: space-around;
  margin: 0;
}
.confirm-btn {
  max-width: 120px;
}

</style>