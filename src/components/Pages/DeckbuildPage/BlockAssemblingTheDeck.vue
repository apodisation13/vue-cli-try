<template>
  <div class="block-assembling-deck">
    <div class="deck-block">
      <div class="leader-block">
        <div class="leader-img-block">
          <card-item-preview 
            v-if="!!deck.leader"
            class="leader-selected"
            :user_card="deck.leader"
            :is_leader="true"
          />
          <div 
            class="leader-empty"
            v-else
          ></div>
        </div>
        <span class="leader-block-info">
          Лидер: {{ !!deck.leader ? deck.leader.name : 'не выбран' }}
        </span>
        <span class="leader-block-info">
          Размер: {{ deck.deck_is_progress.length }}/{{ $store.state.game.cards_in_deck }}
        </span>
      </div>
      <assembling-pool-list 
        class="pool-block"
       :deck_is_progress="deck.deck_is_progress"
      />
    </div>
    <div class="deck-info-block">
      <input-name-for-deck />
      <div class="deck-health">
        <div class="heart"></div>
        {{ deck.health }}
      </div>
      <div class="deck-charge">
        <div class="charges"></div>
        {{ charges }}
      </div>
    </div>

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
    <!-- <span>Жизни: {{ deck.health }}</span>
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
import InputNameForDeck from '@/components/Pages/DeckbuildPage/InputNameForDeck';
  export default {
  components: { 
    LeaderComp,
    CardsList,
    CardItemPreview,
    AssemblingPoolList,
    InputNameForDeck,
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
    computed: {
      charges() {
        const leader_charges = this.deck.leader ? this.deck.leader.charges : 0
        return this.deck.deck_is_progress.reduce( (acc, val) => acc + val.card.charges, 0) + leader_charges;
      }
    }
  }
</script>

<style scoped>

.block-assembling-deck {
  padding: 15px 10px;
}

.deck-block {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.leader-block {
  width: 25%;
  margin-right: 10px;
}
.leader-img-block {
  margin-bottom: 10px;
}

.leader-empty {
  width: 100%;
  background-color: grey;
  border-radius: 5px;
}

.leader-empty::before {
  content: '';
  display: block;
  padding-top: 143%;
}

.pool-block {
  margin-left: auto;
  margin-right: auto;
}

.leader-block-info, .deck-health, .deck-charge {
  font-family: 'Inter';
  font-weight: 300;
  font-size: 12px;
  color: #FACF5D;
}

.leader-block-info {
  display: block;
  margin-left: 5px;
  margin-bottom: 7px;
  white-space: nowrap;
}

.deck-info-block {
  display: flex;
  justify-content: space-between;
}

.deck-health, .deck-charge {
  display: flex;
  align-items: center;
}

.heart {
  width: 12px;
  height: 10px;
  background-image: url('~@/assets/icons/card/heart_green.svg');
  background-repeat: no-repeat;
  background-position: center;
  margin-right: 3px;
} 

.charges {
  width: 10px;
  height: 20px;
  margin-right: 3px;
  background-image: url('~@/assets/icons/card/charge.svg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
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