<template>
  <button class="base-btn">
    <slot></slot>
  </button>
</template>

<script>
export default {}
</script>

<style scoped>
.base-btn {
  display: block;
  width: 100%;
  border: none;
  padding: 13px;
  text-align: center;
  background: #eef1f4;
  border-radius: 6px;
  color: #667080;
  font-weight: 700;
  font-size: 1rem;
}

.base-btn:hover {
  color: #eef1f4;
  background: #667080;
}
.base-btn:focus {
  color: #eef1f4;
  background: #667080;
}
</style>
