<template>

<div class="leader"
@contextmenu.prevent
@click.right="show_card_modal=true" @mouseleave="show_card_modal=false"
@click="exec_leader"
>
  &dagger;{{ leader.damage }} <br>
  {{ leader.charges }}  <br>
  {{ leader.ability }}

</div>

<card-modal 
:card='leader' 
:show_card_modal='show_card_modal'
/>


</template>

<script>
  export default {
    name: "leader-comp",
    props: {
      leader: {
        required: true,
        type: Object
      },
    },

    data() {
      return {
        show_card_modal: false, 
      }
    },

    methods: {
      exec_leader() {
        this.$emit("exec_leader")
      }
    },

    emits: [
      "exec_leader",
    ],

  }
</script>

<style scoped>


.leader {
  width: 120px;
  height: 180px;
  border: solid 1px black;
  margin: 3px;
  text-align: center;
  vertical-align: middle;
  
}


</style>