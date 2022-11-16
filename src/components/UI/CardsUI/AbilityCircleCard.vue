<template>
  <div>
    <!--  Кружок абилок карт игрока и лидера игрока-->
    <heal-ability v-if="card.ability.name === 'heal'" :heal="card.heal" />

    <!--Дополнительные способности карт: урон на строку, столбец, всем, распределить, уничтожить, заблочить-->
    <row-attack-ability v-if="card.ability.name === 'damage-row'" />
    <column-attack-ability v-else-if="card.ability.name === 'damage-column'" />
    <all-attack-ability v-else-if="card.ability.name === 'damage-all'" />
    <spread-attack-ability v-else-if="card.ability.name === 'spread-damage'" />
    <lock-ability v-else-if="card.ability.name === 'lock'" />
    <destroy-ability
      v-else-if="
        card.ability.name === 'destroy-highest-hp' ||
        card.ability.name === 'destroy-highest-damage' ||
        card.ability.name === 'destroy-random' ||
        card.ability.name === 'destroy-all-same-hp'
      "
    />
    <card-interaction-ability
      v-else-if="
        card.ability.name === 'resurrect' ||
        card.ability.name === 'draw-two-cards' ||
        card.ability.name === 'give-charges-to-card-in-hand-1' ||
        card.ability.name === 'play-from-deck' ||
        card.ability.name === 'discard-draw-2' ||
        card.ability.name === 'play-from-grave'
      "
    />
  </div>
</template>

<script>
import HealAbility from "@/components/UI/Abilities/HealAbility"
import RowAttackAbility from "@/components/UI/Abilities/RowAttackAbility"
import ColumnAttackAbility from "@/components/UI/Abilities/ColumnAttackAbility"
import AllAttackAbility from "@/components/UI/Abilities/AllAttackAbility"
import SpreadAttackAbility from "@/components/UI/Abilities/SpreadAttackAbility"
import LockAbility from "@/components/UI/Abilities/LockAbility"
import DestroyAbility from "@/components/UI/Abilities/DestroyAbility"
import CardInteractionAbility from "@/components/UI/Abilities/CardInteractionAbility"
export default {
  name: "card-ability-circle",
  components: {
    CardInteractionAbility,
    DestroyAbility,
    LockAbility,
    HealAbility,
    RowAttackAbility,
    ColumnAttackAbility,
    AllAttackAbility,
    SpreadAttackAbility,
  },
  props: {
    card: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style scoped></style>
