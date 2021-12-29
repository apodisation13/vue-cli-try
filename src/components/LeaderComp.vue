<template>

<div class="leader">
  <hand-comp :hand='leader' />
</div>


</template>

<script>
  export default {
    name: "leader-comp",
    props: {
      leader: {
        required: true,
        type: Object
      },
    }
  }
</script>

<style scoped>


.leader {
  width: 120px;
  height: 180px;
  border: solid 1px black;
  margin: 10px;
}


</style>