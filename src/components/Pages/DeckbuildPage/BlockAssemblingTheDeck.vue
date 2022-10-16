<template>
  <div class="block-assembling-deck">
    <div class="deck-block">
      <div class="leader-block">
        <card-item-preview 
          :user_card="deck.leader"
          :is_leader="true"
        />
      </div>
      <assembling-pool-list 
        class="pool-block"
       :deck_is_progress="deck.deck_is_progress"
      />
    </div>
    <div class="deck-info-block"></div>

    <!-- <div class="deck_in_progress">
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
    </div> -->
        <!-- TODO: Все вот это должно влезть в одну строку! -->
    <!-- <div class="deck_info">
      <span>Лидер: {{ !!deck.leader }}</span>
      <span>
        {{ deck.deck_is_progress.length }}/{{ $store.state.game.cards_in_deck }}
      </span>
      <span>Жизни: {{ deck.health }}</span>
      <input class="input" 
        :disabled="cant_save_deck" 
        :value='deck_name'
        @input='changeNameDeck'
      />
      <button
        class="btn_save_deck"
        v-if="!patch"
        :disabled="cant_save_deck"
        @click="save_deck"
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
    </div> -->
  </div>
</template>

<script>
import LeaderComp from '@/components/LeaderComp'
import CardsList from '@/components/CardsList'
import CardItemPreview from '@/components/CardItemPreview';
import AssemblingPoolList from '@/components/Pages/DeckbuildPage/AssemblingPoolList';
  export default {
  components: { 
    LeaderComp,
    CardsList,
    CardItemPreview,
    AssemblingPoolList,
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
      },
      deck_name: {
        type: String,
        require: true,
      }

    },
    methods: {
      delete_card_from_deck(emit) {
        this.$emit('delete_card', emit);
      },
      changeNameDeck(event) {
        this.$emit('update:deck_name', event.target.value)
      },
      save_deck() {
        this.$emit('save_deck')
      },
      patch_deck() {
        this.$emit('patch_deck')
      }
    },
  }
</script>

<style scoped>

.block-assembling-deck {
  padding: 15px 10px;
}

.deck-block {
  display: flex;
  justify-content: space-between;
}

.leader-block {
  width: 25%;
  margin-right: 10px;
}

.pool-block {
  margin-left: auto;
  margin-right: auto;
}


/* //////////////////////// */

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