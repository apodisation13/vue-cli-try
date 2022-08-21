<template>
  <div class="d">
    <div class="title">
     <b>ДОБРО ПОЖАЛОВАТЬ НА БОНУСНУЮ СТРАНИЦУ!</b>
    </div>

    <div class="inlines">
      <div class="scraps_wood">
        scraps: {{ resource.scraps }}
      </div>
      <div class="add_kegs" style="border: 0"></div>
      <div class="scraps_wood">
        wood: {{ resource.wood }}
      </div>
    </div>

    <div class="inlines">
      <div class="kegs" @dblclick="open_keg">
        kegs: {{ resource.kegs }}
      </div>
      <div class="add_kegs" @dblclick="add_kegs">
        {{ $store.state.user_actions.pay_for_kegs }}
      </div>

      <div class="add_kegs" style="border: 0"></div>

      <div class="kegs" @dblclick="open_big_keg">
        big kegs: {{ resource.big_kegs }}
      </div>
      <div class="add_kegs" @dblclick="add_big_kegs">
        {{ $store.state.user_actions.pay_for_big_kegs }}
      </div>
    </div>

    <div class="inlines">
      <div class="chests" @dblclick="open_chest">
        chests: {{ resource.chests }}
      </div>
      <div class="add_chests" @dblclick="add_chests">
        {{ $store.state.user_actions.pay_for_chests }}
      </div>
    </div>

    <div class="cards_list" v-if="show_keg">
      <cards-list
          :cards="random_cards"
          :deckbuilder="true"
          :bonus="true"
          @chose_player_card="chose"
      />
    </div>

    <div class="cards_list" style="height: 20vh" v-if="show_chest">
      <cards-list
          :cards="random_cards"
          :deckbuilder="true"
          :bonus="true"
      />
      <button v-if="show_chest" @click="accept_chest">Принять!</button>
    </div>

  </div>
</template>

<script>
import CardsList from "@/components/CardsList"
export default {
  components: {CardsList},
  created() {
    this.cards.forEach(card => {
      if (card.card.color === "Bronze") {
        for (let i = 0; i < 20; i++) {
          this.pool.push(card)
        }
      }
      else if (card.card.color === "Silver") {
        this.pool.push(card)
        this.pool.push(card)
      }
      else if (card.card.color === "Gold") {
        this.pool.push(card)
      }
    })
  },
  computed: {
    cards() {
      return this.$store.getters['all_cards']
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
    }
  },
  methods: {
    async chose(card) {
      alert(card.card.name)
      await this.$store.dispatch("craft_card_action", card)
      this.show_keg = false
      this.show_chest = false
      this.random_cards = []
    },

    async add_kegs() {
      await this.$store.dispatch("pay_resource", {
        "wood": this.resource.wood + this.$store.state.user_actions.pay_for_kegs,
        "kegs": this.resource.kegs + 1
      })
    },
    async open_keg() {
      this.keg_len = 3
      this.random_cards = []
      this.show_keg = true
      for (let i = 0; i < this.keg_len; i++) {
        let random = Math.floor(Math.random() * this.pool.length)
        this.random_cards.push(this.pool[random])
      }
      await this.$store.dispatch("pay_resource", {
        "kegs": this.resource.kegs - 1
      })
    },

    async add_big_kegs() {
      await this.$store.dispatch("pay_resource", {
        "wood": this.resource.wood + this.$store.state.user_actions.pay_for_big_kegs,
        "big_kegs": this.resource.big_kegs + 1
      })
    },
    async open_big_keg() {
      this.keg_len = 5
      this.random_cards = []
      this.show_keg = true
      for (let i = 0; i < this.keg_len; i++) {
        let random = Math.floor(Math.random() * this.pool.length)
        this.random_cards.push(this.pool[random])
      }
      await this.$store.dispatch("pay_resource", {
        "big_kegs": this.resource.big_kegs - 1
      })
    },

    async add_chests() {
      await this.$store.dispatch("pay_resource", {
        "wood": this.resource.wood + this.$store.state.user_actions.pay_for_chests,
        "chests": this.resource.chests + 1
      })
    },
    async open_chest() {
      this.keg_len = 3
      this.random_cards = []
      this.show_keg = false
      this.show_chest = true
      for (let i = 0; i < this.keg_len; i++) {
        let random = Math.floor(Math.random() * this.pool.length)
        this.random_cards.push(this.pool[random])
      }
      await this.$store.dispatch("pay_resource", {
        "chests": this.resource.chests - 1
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
  font-family: 'Brush Script MT', cursive;
  font-size: 14pt;
}

.title {
  margin: auto;
  width: 40%;
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
  width: 20vh;
  height: 5vh;
  margin: 1%;
  border-radius: 50% 20% / 10% 40%;
  border: dashed 2px brown;
  text-align: center;
  line-height: 7vh;
  display: table-cell;
}

.add_kegs {
  width: 7vh;
  height: 5vh;
  margin: 1%;
  border-radius: 50% 20% / 10% 40%;
  border: solid 2px brown;
  text-align: center;
  line-height: 7vh;
  display: table-cell;
}

.chests {
  width: 30vh;
  height: 7vh;
  margin: 1%;
  border-radius: 50% 20% / 10% 40%;
  border: dotted 4px gold;
  text-align: center;
  line-height: 7vh;
  display: table-cell;
}

.add_chests {
  width: 10vh;
  height: 5vh;
  margin: 1%;
  border-radius: 50% 20% / 10% 40%;
  border: solid 4px gold;
  text-align: center;
  line-height: 7vh;
  display: table-cell;
}

.cards_list {
  height: 50vh;
}

</style>