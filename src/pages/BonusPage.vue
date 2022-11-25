<template>
  <div class="d">
    <div class="title">
      <div class="title__text">
        <b>ДОБРО ПОЖАЛОВАТЬ НА <br />БОНУСНУЮ СТРАНИЦУ!</b>
      </div>
    </div>

    <!--Строка открытия и приобретения kegs-->
    <div class="element">
      <div class="open_icon" @dblclick="open_keg"></div>
      <div class="line">
        <resource-item name="kegs" :count="resource.kegs" />
      </div>
      <div class="line">
        <div class="kegs" @dblclick="add_kegs">
          +++ {{ $store.state.user_actions.game_prices.pay_for_kegs }}
          <img
            :src="require(`@/assets/icons/resources/wood.svg`)"
            alt=""
            class="wood"
          />
        </div>
      </div>
    </div>

    <!--Строка открытия и приобретения big_kegs-->
    <div class="element">
      <div class="open_icon" @dblclick="open_big_keg"></div>
      <div class="line">
        <resource-item name="big_kegs" :count="resource.big_kegs" />
      </div>
      <div class="line">
        <div class="kegs" @dblclick="add_big_kegs">
          +++
          {{ $store.state.user_actions.game_prices.pay_for_big_kegs }}
          <img
            :src="require(`@/assets/icons/resources/wood.svg`)"
            class="wood"
            alt=""
          />
        </div>
      </div>
    </div>

    <!--Строка открытия и приобретения chests-->
    <div class="element">
      <div class="open_icon" @dblclick="open_chest"></div>
      <div class="line">
        <resource-item name="chests" :count="resource.chests" />
      </div>
      <div class="line">
        <div class="kegs" @dblclick="add_chests">
          +++
          {{ $store.state.user_actions.game_prices.pay_for_chests }}
          <img
            :src="require(`@/assets/icons/resources/wood.svg`)"
            alt=""
            class="wood"
          />
        </div>
      </div>
    </div>

    <!--Строка открытия и приобретения chests-->
    <div class="element">
      <div class="open_icon" @dblclick="open_key"></div>
      <div class="line">
        <resource-item name="keys" :count="resource.keys" />
      </div>
    </div>

    <div class="cards_list" v-if="show_keg">
      <card-list-component
        :cards="random_cards"
        :deckbuilder="true"
        :bonus="true"
        @chose_player_card="chose"
      />
    </div>

    <div class="cards_list" style="height: 20vh" v-if="show_chest">
      <card-list-component
        :cards="random_cards"
        :deckbuilder="true"
        :bonus="true"
      />
      <button v-if="show_chest" @click="accept_chest">Принять!</button>
    </div>

    <div v-if="show_key_content" class="inlines">
      <div class="scraps_wood" @dblclick="accept_random_reward">
        <img
          :src="
            require(`@/assets/icons/resources/${random_reward_choice.resource}.svg`)
          "
          alt=""
          class="wood"
        />
        {{ random_reward_choice.value }}
      </div>
    </div>
  </div>
</template>

<script>
import CardListComponent from "@/components/Cards/CardListComponent"
import { getRandomReward } from "@/logic/random_rewards"
import ResourceItem from "@/components/UI/ResourceItem"
export default {
  components: { ResourceItem, CardListComponent },
  created() {
    this.cards.forEach(card => {
      if (card.card.color === "Bronze") {
        for (let i = 0; i < 20; i++) {
          this.pool.push(card)
        }
      } else if (card.card.color === "Silver") {
        this.pool.push(card)
        this.pool.push(card)
      } else if (card.card.color === "Gold") {
        this.pool.push(card)
      }
    })
  },
  computed: {
    cards() {
      return this.$store.getters["all_cards"]
    },
    resource() {
      return this.$store.getters["resource"]
    },
  },
  data() {
    return {
      pool: [],
      random_cards: [],
      keg_len: 3,
      show_keg: false,
      show_chest: false,
      show_key_content: false,
      random_reward_choice: null,
    }
  },
  methods: {
    async chose(card) {
      await this.$store.dispatch("craft_card_action", card)
      this.show_keg = false
      this.show_chest = false
      this.random_cards = []
    },

    async add_kegs() {
      await this.$store.dispatch("pay_resource", {
        wood:
          this.resource.wood +
          this.$store.state.user_actions.game_prices.pay_for_kegs,
        kegs: this.resource.kegs + 1,
      })
    },
    async open_keg() {
      if (this.resource.kegs <= 0) return
      this.keg_len = 3
      this.random_cards = []
      this.show_keg = true
      for (let i = 0; i < this.keg_len; i++) {
        let random = Math.floor(Math.random() * this.pool.length)
        this.random_cards.push(this.pool[random])
      }
      await this.$store.dispatch("pay_resource", {
        kegs: this.resource.kegs - 1,
      })
    },

    async add_big_kegs() {
      await this.$store.dispatch("pay_resource", {
        wood:
          this.resource.wood +
          this.$store.state.user_actions.game_prices.pay_for_big_kegs,
        big_kegs: this.resource.big_kegs + 1,
      })
    },
    async open_big_keg() {
      if (this.resource.big_kegs <= 0) return
      this.keg_len = 5
      this.random_cards = []
      this.show_keg = true
      for (let i = 0; i < this.keg_len; i++) {
        let random = Math.floor(Math.random() * this.pool.length)
        this.random_cards.push(this.pool[random])
      }
      await this.$store.dispatch("pay_resource", {
        big_kegs: this.resource.big_kegs - 1,
      })
    },

    async add_chests() {
      await this.$store.dispatch("pay_resource", {
        wood:
          this.resource.wood +
          this.$store.state.user_actions.game_prices.pay_for_chests,
        chests: this.resource.chests + 1,
      })
    },
    async open_chest() {
      if (this.resource.chests <= 0) return
      this.keg_len = 3
      this.random_cards = []
      this.show_keg = false
      this.show_chest = true
      for (let i = 0; i < this.keg_len; i++) {
        let random = Math.floor(Math.random() * this.pool.length)
        this.random_cards.push(this.pool[random])
      }
      await this.$store.dispatch("pay_resource", {
        chests: this.resource.chests - 1,
      })
    },
    async accept_chest() {
      await this.$store.dispatch("craft_card_action", this.random_cards[0])
      await this.$store.dispatch("craft_card_action", this.random_cards[1])
      await this.$store.dispatch("craft_card_action", this.random_cards[2])
      this.show_keg = false
      this.show_chest = false
      this.random_cards = []
    },

    async open_key() {
      await this.$store.dispatch("pay_resource", {
        keys: this.resource.keys - 1,
      })
      this.show_key_content = true
      this.random_reward_choice = getRandomReward()
    },
    async accept_random_reward() {
      const { resource, value } = this.random_reward_choice
      let reward = {}
      reward[resource] = this.resource[resource] + value
      await this.$store.dispatch("pay_resource", reward)
      this.show_key_content = false
      this.random_reward_choice = null
    },
  },
}
</script>

<style scoped>
.d {
  width: 98%;
  height: 80vh;
  border: solid 1px blueviolet;
  margin: 1%;
  /*background-image: url('~@/assets/brick.jpg');*/
}

div {
  font-family: "Brush Script MT", cursive;
  font-size: 14pt;
  color: white;
}

.title {
  justify-content: center;
  display: flex;
}

.title__text {
  text-align: center;
}

.element {
  /*border: solid 2px red;*/
  margin-top: 10px;
}

.line {
  display: inline-block;
  margin-right: 30px;
}

.open_icon {
  width: 30px;
  height: 30px;
  background-image: url("~@/assets/icons/buttons/open_icon.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  margin-left: 20px;
  margin-right: 30px;
  display: inline-block;
}

.wood {
  max-height: 25px;
}

.scraps_wood {
  width: 30vh;
  height: 5vh;
  margin: 1%;
  border-radius: 50% 20% / 10% 40%;
  border: dashed 2px dodgerblue;
  text-align: center;
  line-height: 5vh;
  display: table-cell;
}

.inlines {
  display: table;
  margin: 1%;
}

.kegs {
  border-radius: 50% 20% / 10% 40%;
  width: 200px;
  border: dashed 2px brown;
  text-align: center;
  line-height: 7vh;
}

.cards_list {
  height: 50vh;
}
</style>
