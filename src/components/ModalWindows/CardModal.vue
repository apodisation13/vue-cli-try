<template>
  <modal-window
    :style="{ backgroundColor: 'floralwhite' }"
    v-touch:swipe="close_self"
  >
    <button-close @close_self="close_self" />

    <!--Имя у карты есть всегда-->
    <h2>{{ card.name }}</h2>

    <!--Карта игрока, или карта лидера врагов!-->
    <div
      class="card-ui"
      :style="[border(card)]"
      v-if="!forEnemy || forEnemyLeader"
    >
      <card-ui
        :count="count"
        :card="card"
        :user_card="user_card"
        :hp_needed="hp_needed"
        :deckbuilder="deckbuilder"
        :bonus="bonus"
        :is_leader="is_leader"
      />
    </div>
    <!--А это соответственно карта врага, у неё есть card.move-->
    <div class="card-ui" :style="[border(card)]" v-if="forEnemy">
      <enemy-ui :enemy="card" />
    </div>

    <card-descriptions :card="card" :forEnemy="forEnemy" />

    <!--Блок кнопок милл, крафт (ТОЛЬКО ДЛЯ ДЕКБИЛДЕРА!!!-->
    <div class="mill_craft_block" v-if="deckbuilder">
      <div class="divb" v-if="!bonus">
        <button class="b" @click="mill">Уничтожить</button>
        <button class="count">{{ count }}</button>
        <button class="b" @click="craft">Создать</button>
      </div>
      <div class="divb" v-if="bonus">
        <button class="bonus_count">У вас {{ count }}</button>
      </div>
    </div>
    <yesno-modal
      v-if="deckbuilder"
      :visible="show_yesno_mill"
      :resource_value="resource_value"
      @confirm="confirm_mill"
      @cancel="cancel"
    />
    <yesno-modal
      v-if="deckbuilder"
      :visible="show_yesno_craft"
      :resource_value="resource_value"
      @confirm="confirm_craft"
      @cancel="cancel"
    />
  </modal-window>
</template>

<script>
import {
  border_for_card,
  background_color,
  border_leader,
} from "@/logic/border_styles"
import ButtonClose from "@/components/UI/Buttons/ButtonClose"
import ModalWindow from "@/components/ModalWindows/ModalWindow"
import YesnoModal from "@/components/ModalWindows/YesnoModal"
import CardUi from "@/components/Cards/CardUi"
import EnemyUi from "@/components/Cards/EnemyUi"
import CardDescriptions from "@/components/Cards/CardDescriptions"
export default {
  name: "card-modal",
  components: {
    CardDescriptions,
    EnemyUi,
    CardUi,
    ModalWindow,
    ButtonClose,
    YesnoModal,
  },
  props: {
    // брать границу карты как для лидеров
    is_leader: {
      type: Boolean,
      default: false,
    },
    user_card: {
      // объект противника по индексу поля
      type: Object,
      default() {
        return null
      },
    },
    card: {
      type: Object,
      required: true,
    },
    count: {
      type: Number,
    },
    hp_needed: {
      // hp только для декбилдера, для игры не нужно оно
      type: Boolean,
      default: false,
    },
    bonus: {
      //этот пропс используется для страницы BonusPage
      type: Boolean,
      default: false,
      required: false,
    },
    deckbuilder: {
      type: Boolean,
      default: false,
    },
    // отображать описание для врага или нет
    forEnemy: {
      type: Boolean,
      required: false,
      default: false,
    },
    // отображать описание для лидера врагов или нет
    forEnemyLeader: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      show_passive: false,
      show_yesno_mill: false,
      show_yesno_craft: false,
      resource_value: 0,
    }
  },
  methods: {
    close_self() {
      this.$emit("close_card_modal")
    },
    border(card) {
      return this.is_leader ? border_leader(card) : border_for_card(card)
    },
    background_color(e) {
      return background_color(e)
    },
    cancel() {
      this.show_yesno_mill = false
      this.show_yesno_craft = false
    },
    async mill() {
      let can_mill = await this.$store.dispatch("calculate_value", {
        card: this.card,
        process: "mill",
        count: this.count,
      })
      if (!can_mill) return
      this.resource_value = can_mill
      this.show_yesno_mill = true
    },
    async craft() {
      let can_craft = await this.$store.dispatch("calculate_value", {
        card: this.card,
        process: "craft",
        count: this.count,
      })
      if (!can_craft) return
      this.resource_value = can_craft
      this.show_yesno_craft = true
    },
    async confirm_mill() {
      this.show_yesno_mill = false
      let result = await this.$store.dispatch("pay_resource", {
        scraps: this.$store.getters["resource"].scraps + this.resource_value,
      })
      if (result) await this.$store.dispatch("mill_card_action", this.user_card)
    },
    async confirm_craft() {
      this.show_yesno_craft = false
      let result = await this.$store.dispatch("pay_resource", {
        scraps: this.$store.getters["resource"].scraps + this.resource_value,
      })
      if (result)
        await this.$store.dispatch("craft_card_action", this.user_card)
    },
  },
  emits: ["close_card_modal"],
}
</script>

<style scoped>
.card-ui {
  position: relative;
  margin: auto;
  width: 85%;
  box-shadow: -4px 0 4px rgb(0 0 0 / 50%);
}

.card-ui::before {
  content: "";
  display: block;
  padding-top: 143%;
}

.divb {
  width: 98%;
  height: 3vh;
  margin-left: 0.5%;
  margin-top: 0.2%;
}

.b {
  width: 42%;
  height: 100%;
}

.count {
  width: 13%;
  height: 100%;
}

.bonus_count {
  width: 90%;
  height: 100%;
}
</style>
