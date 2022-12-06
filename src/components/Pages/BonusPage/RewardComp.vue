<template>
  <div class="reward-comp" @click="clear_reward">
    <div class="reward-image__container">
      <img
        class="reward-image__image"
        :src="require(`@/assets/icons/resources/${name}_open.svg`)"
        alt=""
      />
    </div>

    <div class="reward-text">
      <span>{{ get_message(name) }}</span>
    </div>

    <div class="reward-content">
      <!-- Если не ключ, то отображается этот компонент -->
      <card-list-component
        class="reward-card-list"
        v-if="!show_key_content"
        :cards="reward"
        :deckbuilder="true"
        :bonus="true"
        @chose_player_card="accept_reward"
      />
      <!-- Иначе. для ключа отображается этот компонент -->
      <div v-if="show_key_content" class="reward-resources">
        <div
          class="reward-resources__wrapper"
          @dblclick="accept_random_reward(resource)"
          v-for="(resource, index) in key_reward"
          :key="index"
        >
          <img
            :src="require(`@/assets/icons/resources/${resource.resource}.svg`)"
            alt=""
            class="reward-resources__item"
          />
          <resource-count-rombus>
            {{ resource.value }}
          </resource-count-rombus>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CardListComponent from "@/components/Cards/CardListComponent"
import ResourceCountRombus from "@/components/UI/ResourceCountRombus"
export default {
  components: { CardListComponent, ResourceCountRombus },
  name: "reward-comp",
  data() {
    return {
      show_key_content: !!this.key_reward, //Если не передается награда за ключ, значит это либо бочки, либо сундук
    }
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    reward: {
      type: Array,
      required: false,
    },
    key_reward: {
      type: Array,
      required: false,
      default: null,
    },
  },
  methods: {
    get_message(name) {
      if (name === "kegs" || name === "big_kegs") return "Выбрать можно 1 карту"
      if (name === "chests") return "Все карты ваши"
      return "Выбрать можно 1 награду"
    },

    //Функция принятия наград с картами
    async accept_reward(card) {
      if (this.name !== "chests") {
        await this.$store.dispatch("craft_card_action", card)
      }
      this.$emit("clear_reward")
    },
    async accept_random_reward(res) {
      this.$emit("accept_key_reward", res)
    },
    async accept_chest_reward() {
      if (this.name === "chests") {
        for (const elem of this.reward) {
          await this.$store.dispatch("craft_card_action", elem)
        }
        setTimeout(() => this.$emit("clear_reward"), 10000)
      }
    },
    clear_reward() {
      if (this.name === "chests") this.$emit("clear_reward")
    },
  },
  mounted() {
    this.accept_chest_reward()
  },
}
</script>
<style scoped>
.reward-comp {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  gap: 20px;
}

.reward-text span {
  font-family: "Philosopher";
  font-style: normal;
  font-weight: 700;
  font-size: 26px;
  line-height: 100%;
  color: hsl(44, 94%, 67%);
}

.reward-content {
  width: 100%;
}

.reward-content .reward-card-list {
  padding: 8px 0;
  display: grid;
  row-gap: 10px;
  justify-content: center;
  grid-template-columns: repeat(3, 25%);
  column-gap: 25px;
}

.resource-count {
  position: relative;
}

.reward-resources__wrapper {
  position: relative;
}

.reward-resources {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 25px;
  margin-top: 10%;
}

.reward-resources__item {
  width: 100px;
}
</style>
