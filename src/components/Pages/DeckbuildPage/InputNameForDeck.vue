<template>
  <div class="wrapper-name-input">
    <div class="background-name-input">
      <input 
        class="name-input" 
        type="text" 
        placeholder="Введите название колоды"
        :disabled="cant_save_deck" 
        :value="deck_name"
        @input="$emit('changeNameDeck', $event.target.value)"
      >
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      deck_name: String, 
    }
  }
</script>

<style scoped>
.wrapper-name-input {
  border-radius: 3px;
  overflow: hidden;
}

.background-name-input {
  background-image: linear-gradient(#4A4237 0%, #C5A87E50 50%, #4A4237 100%);
  padding: 2px;
}

.name-input {
  background-color: #fff;
  padding: 5px 10px;
  border-radius: 3px;
  width: 148px;
  outline: none;
  border: none;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 300;
  font-size: 10px;
}
</style>