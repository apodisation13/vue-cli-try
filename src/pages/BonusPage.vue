<template>
  <div>
    <div class="bonus-page" v-if="!show_reward_page">
      <div class="title">
        <div class="title__text">
          <h1>Страница бонусов</h1>
        </div>
      </div>
      <div class="resources">
        <!--Строка открытия и приобретения kegs-->
        <bonus-page-resource
          resource_name="kegs"
          :resource_count="resource.kegs"
          :resource_price="kegs_price"
          @open_item="open_keg"
          @add_item="add_kegs"
        />

        <!--Строка открытия и приобретения big_kegs-->
        <bonus-page-resource
          resource_name="big_kegs"
          :resource_count="resource.big_kegs"
          :resource_price="big_kegs_price"
          @open_item="open_big_keg"
          @add_item="add_big_kegs"
        />

        <!--Строка открытия и приобретения chests-->
        <bonus-page-resource
          resource_name="chests"
          :resource_count="resource.chests"
          :resource_price="chests_price"
          @open_item="open_chest"
          @add_item="add_chests"
        />

        <!--Строка открытия keys-->
        <bonus-page-resource
          resource_name="keys"
          :resource_count="resource.keys"
          @open_item="open_key"
        />
      </div>
    </div>

    <!-- Страница обработки наград -->
    <reward-comp
      v-else
      :visible="show_reward_page"
      :name="reward_name"
      :reward="random_cards"
      :key_reward="random_reward_choice"
      @clear_reward="clear_reward"
      @accept_key_reward="accept_random_reward"
    />
  </div>
</template>

<script>
import { getRandomReward } from "@/logic/random_rewards"
import BonusPageResource from "@/components/UI/BonusPageResource"
import RewardComp from "@/components/Pages/BonusPage/RewardComp.vue"
export default {
  components: { BonusPageResource, RewardComp },
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

      reward_name: "",
      show_reward_page: false,
    }
  },
  methods: {
    is_enough_wood(value) {
      return this.resource.wood > value
    },

    async clear_reward() {
      this.random_cards = []
      this.random_reward_choice = null
      this.show_reward_page = false
    },

    async add_kegs(quantity) {
      const final_price = quantity * this.kegs_price
      if (!this.is_enough_wood(final_price)) return
      await this.$store.dispatch("pay_resource", {
        wood: this.resource.wood - final_price,
        kegs: this.resource.kegs + quantity,
      })
    },

    async open_keg() {
      if (this.resource.kegs <= 0) return
      this.keg_len = 3
      this.random_cards = []
      this.reward_name = "kegs"
      this.show_reward_page = true
      for (let i = 0; i < this.keg_len; i++) {
        let random = Math.floor(Math.random() * this.pool.length)
        this.random_cards.push(this.pool[random])
      }
      await this.$store.dispatch("pay_resource", {
        kegs: this.resource.kegs - 1,
      })
    },

    async add_big_kegs(quantity) {
      const final_price = quantity * this.big_kegs_price
      if (!this.is_enough_wood(final_price)) return
      await this.$store.dispatch("pay_resource", {
        wood: this.resource.wood - final_price,
        big_kegs: this.resource.big_kegs + quantity,
      })
    },

    async open_big_keg() {
      if (this.resource.big_kegs <= 0) return
      this.keg_len = 5
      this.random_cards = []
      this.reward_name = "big_kegs"
      this.show_reward_page = true
      for (let i = 0; i < this.keg_len; i++) {
        let random = Math.floor(Math.random() * this.pool.length)
        this.random_cards.push(this.pool[random])
      }
      await this.$store.dispatch("pay_resource", {
        big_kegs: this.resource.big_kegs - 1,
      })
    },

    async add_chests(quantity) {
      const final_price = quantity * this.chests_price
      if (!this.is_enough_wood(final_price)) return
      await this.$store.dispatch("pay_resource", {
        wood: this.resource.wood - final_price,
        chests: this.resource.chests + quantity,
      })
    },
    async open_chest() {
      if (this.resource.chests <= 0) return
      this.keg_len = 3
      this.random_cards = []
      this.reward_name = "chests"
      this.show_reward_page = true
      for (let i = 0; i < this.keg_len; i++) {
        let random = Math.floor(Math.random() * this.pool.length)
        this.random_cards.push(this.pool[random])
      }
      await this.$store.dispatch("pay_resource", {
        chests: this.resource.chests - 1,
      })
    },

    async open_key() {
      if (this.resource.keys <= 0) return
      await this.$store.dispatch("pay_resource", {
        keys: this.resource.keys - 1,
      })
      const key_reward = []
      for (let i = 0; i < 4; i++) {
        key_reward.push(getRandomReward())
      }
      this.reward_name = "keys"
      this.random_reward_choice = key_reward
      this.show_reward_page = true
    },

    //Функцию принятия награды с ключа проще было оставить на этой странице,
    //Принятие карточных наград, делал первыми поэтому логика описана в RewardPage,
    //Возможно лучше будет через эмит тоже перенести сюда
    async accept_random_reward(res) {
      const { resource, value } = res
      let reward = {}
      reward[resource] = this.resource[resource] + value
      await this.$store.dispatch("pay_resource", reward)
      this.clear_reward()
    },
  },
  emits: ["add_item"],
}
</script>

<style scoped>
.bonus-page {
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
  color: hsl(39, 82%, 62%);
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

.inlines {
  display: table;
  margin: 1%;
}

.test-button {
  z-index: 9999;
  position: relative;
  bottom: 50px;
}
/* .cards_list {
  height: 50vh;
} */
</style>
