<template>
  <div class="create_deck">
    <div class="deck_in_progress">
      <div class="leader">
        <leader-comp v-if="deck.leader" :leader="deck.leader" />
      </div>
      <div class="deck_build_view">
        <cards-list
          :cards="deck.deck_is_progress"
          :hp_needed="true"
          @chose_player_card="delete_card_from_deck"
        />
      </div>
    </div>
        <!-- TODO: Все вот это должно влезть в одну строку! -->
    <div class="deck_info">
      <span>Лидер: {{ !!deck.leader }}</span>
      <span>
        {{ deck.deck_is_progress.length }}/{{ $store.state.game.cards_in_deck }}
      </span>
      <span>Жизни: {{ health }}</span>
      <!-- <input class="input" :disabled="cant_save_deck" v-model="deck.deck_name" /> -->
      <button
        class="btn_save_deck"
        v-if="patch"
        :disabled="cant_save_deck"
        @click="emit('save_deck')"
      >
        СОХРАНИТЬ
      </button>
      <button
        class="btn_save_deck"
        v-if="patch"
        :disabled="cant_save_deck"
        @click="patch_deck"
      >
        ИЗМЕНИТЬ
      </button>
    </div>
  </div>
</template>

<script>
import LeaderComp from '@/components/LeaderComp'
import CardsList from '@/components/CardsList'
  export default {
  components: { 
    LeaderComp,
    CardsList,
   },
    props: {
      deck: {
        type: Object,
        required: true,
      },
      cant_save_deck: {
        type: Boolean,
        default: false,
      },
      patch: {
        type: Boolean,
      }

    },
    methods: {
      delete_card_from_deck(emit) {
        this.$emit('delete_card', emit);
      },
    }
  }
</script>

<style scoped>
.deck_in_progress {
  /* два дива в один ряд! */
  clear: both;
  height: 18vh;
  /*border: solid 2px yellow;*/
  width: 99%;
  margin: 0.05% 0.05% 1%;
}

.leader {
  width: 20%;
  height: 100%;
  border: dashed 1px black;
  display: inline;
  float: left;
  /*margin: 0.05%;*/
}

.deck_info {
  width: 100%;
}

.input {
  width: 23%;
  height: 3vh;
}

.deck_build_view {
  width: 79%;
  height: 100%;
  border: solid 1px black;
  overflow: scroll;
  display: inline;
  float: right;
  margin: 0.05%;
}

</style>