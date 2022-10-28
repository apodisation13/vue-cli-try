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
          <div class="leader-empty" v-else></div>
        </div>
        <span class="leader-block-info">
          Лидер: {{ !!deck.leader ? deck.leader.name : "не выбран" }}
        </span>
        <span class="leader-block-info">
          Размер: {{ deck.deck_is_progress.length }}/{{
            $store.state.game.cards_in_deck
          }}
        </span>
      </div>
      <assembling-pool-list
        class="pool-block"
        :deck_is_progress="deck.deck_is_progress"
        @delete_card_from_deck="delete_card_from_deck"
      />
    </div>
    <div class="deck-info-block">
      <input-name-for-deck
        :deck_name="deck.deck_name"
        @changeNameDeck="$emit('changeNameDeck', $event)"
      />
      <div class="deck-health">
        <div class="heart"></div>
        {{ deck.health }}
      </div>
      <div class="deck-charge">
        <div class="charges"></div>
        {{ charges }}
      </div>
      <create-button
        name="Создать"
        v-if="!patch"
        :disabled="cant_save_deck"
        @click="save_deck"
      />
      <create-button
        name="Изменить"
        v-if="patch"
        :disabled="cant_save_deck"
        @click="patch_deck"
      />
    </div>
  </div>
</template>

<script>
import LeaderComp from "@/components/LeaderComp"
import CardsList from "@/components/CardsList"
import CardItemPreview from "@/components/CardItemPreview"
import AssemblingPoolList from "@/components/Pages/DeckbuildPage/AssemblingPoolList"
import InputNameForDeck from "@/components/Pages/DeckbuildPage/InputNameForDeck"
import CreateButton from "@/components/Pages/DeckbuildPage/Buttons/CreateButton"
export default {
  components: {
    LeaderComp,
    CardsList,
    CardItemPreview,
    AssemblingPoolList,
    InputNameForDeck,
    CreateButton,
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
  },
  methods: {
    delete_card_from_deck(emit) {
      this.$emit("delete_card", emit)
    },
    save_deck() {
      this.$emit("save_deck")
    },
    patch_deck() {
      this.$emit("patch_deck")
    },
  },
  computed: {
    charges() {
      const leader_charges = this.deck.leader ? this.deck.leader.charges : 0
      return (
        this.deck.deck_is_progress.reduce(
          (acc, val) => acc + val.card.charges,
          0
        ) + leader_charges
      )
    },
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
  content: "";
  display: block;
  padding-top: 143%;
}

.pool-block {
  margin-left: auto;
  margin-right: auto;
}

.leader-block-info,
.deck-health,
.deck-charge {
  font-family: "Inter";
  font-weight: 300;
  font-size: 12px;
  color: #facf5d;
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
  align-items: center;
}

.deck-health,
.deck-charge {
  display: flex;
  align-items: center;
}

.heart {
  width: 12px;
  height: 10px;
  background-image: url("~@/assets/icons/card/heart_green.svg");
  background-repeat: no-repeat;
  background-position: center;
  margin-right: 3px;
}

.charges {
  width: 10px;
  height: 20px;
  margin-right: 3px;
  background-image: url("~@/assets/icons/card/charge.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}
</style>
