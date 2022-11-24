<template>
  <div>
  <div class="d" v-if="false">
    <div class="title">
      <div class="title__text">
        <h1>Страница бонусов</h1>
      </div>
    </div>
    <div class="resources">
      <!--Строка открытия и приобретения kegs-->
      <bonus-page-resource
        resourceName="kegs"
        :resourceCount="resource.kegs"
        :resourcePrice="kegs_price"
        @openItem="open_keg"
        @addItem="add_kegs"
      />

      <!--Строка открытия и приобретения big_kegs-->
      <bonus-page-resource
        resourceName="big_kegs"
        :resourceCount="resource.big_kegs"
        :resourcePrice="big_kegs_price"
        @openItem="open_big_keg"
        @addItem="add_big_kegs"
      />

      <!--Строка открытия и приобретения chests-->
      <bonus-page-resource
        resourceName="chests"
        :resourceCount="resource.chests"
        :resourcePrice="chests_price"
        @openItem="open_chest"
        @addItem="add_chests"
      />

      <!--Строка открытия keys-->
      <bonus-page-resource
        resourceName="keys"
        :resourceCount="resource.keys"
        @openItem="open_key"
      />
    </div>

    <!--Строка открытия и приобретения chests-->
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
  <yesno-modal v-if="true" visible="true"/>
</div>
</template>

<script>
import CardListComponent from "@/components/CardListComponent"
import { getRandomReward } from "@/logic/random_rewards"
import BonusPageResource from "@/components/UI/BonusPageResource"
import YesnoModal from "@/components/ModalWindows/YesnoModal"
export default {
  components: { CardListComponent, BonusPageResource, YesnoModal },
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
    kegs_price() {
      return this.$store.getters["get_kegs_price"]
    },
    big_kegs_price() {
      return this.$store.getters["get_big_kegs_price"]
    },
    chests_price() {
      return this.$store.getters["get_chests_price"]
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
      if (this.resource.wood < (this.kegs_price * -1)) return;
      await this.$store.dispatch("pay_resource", {
        wood: this.resource.wood + this.kegs_price,
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
      if (this.resource.wood < (this.big_kegs_price * -1)) return;
      await this.$store.dispatch("pay_resource", {
        wood: this.resource.wood + this.big_kegs_price,
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
      if (this.resource.wood < (this.chests_price * -1)) return;
      await this.$store.dispatch("pay_resource", {
        wood: this.resource.wood + this.chests_price,
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
      if (this.resource.keys <= 0) return
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
  /* border: solid 1px blueviolet; */
  margin: 1%;
  /*background-image: url('~@/assets/brick.jpg');*/
}

div {
  font-family: "Brush Script MT", cursive;
  font-size: 14pt;
  color: white;
}

.title {
  text-align: center;
  margin-top: 10px;
}

.title__text h1 {
  font-family: "Philosopher";
  font-size: 2rem;
  line-height: 2rem;
  color: hsl(39, 82%, 62%)
}

.resources {
  min-height: 90%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-around;
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

.cards_list {
  height: 50vh;
}
</style>
