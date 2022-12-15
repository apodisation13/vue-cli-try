<template>
  <div class="faction" :class="getTypeFaction(faction.name)">
    <div class="global_text faction-name">
      {{ faction.name[0] }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    faction: {
      type: Object,
      required: true,
    },
  },
  methods: {
    getTypeFaction(name) {
      switch (name) {
        case "Neutral":
          return "faction-n"
        case "Soldiers":
          return "faction-s"
        case "Animals":
          return "faction-a"
        case "Monsters":
          return "faction-m"
      }
    },
  },
}
</script>

<style scoped>
.faction {
  width: 55px;
  height: 45px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.faction-name {
  font-size: 21px;
  background: var(--primary-gold-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.faction-n {
  background: linear-gradient(
    180deg,
    #4b2210 0.48%,
    rgba(71, 43, 30, 0.69) 55.4%,
    #4b2210 109.17%
  );
  box-shadow: 7px 12px 276px rgba(0, 0, 0, 0.25),
    inset -7px -7px 7px rgba(0, 0, 0, 0.25),
    inset 7px 7px 7px rgba(0, 0, 0, 0.25);
}

.faction-s {
  background: linear-gradient(
    180deg,
    #366ab8 0.48%,
    #162d59 55.4%,
    #366ab8 109.17%
  );
  box-shadow: 7px 12px 27px rgba(0, 0, 0, 0.25),
    inset -7px -7px 7px rgba(0, 0, 0, 0.25),
    inset 7px 7px 7px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(13px);
}
.faction-a {
  background: linear-gradient(
    180deg,
    #047824 0.54%,
    rgba(11, 72, 28, 0.78) 50%,
    #047824 98.44%
  );
  box-shadow: 7px 12px 27px rgba(0, 0, 0, 0.25),
    inset -7px -7px 7px rgba(0, 0, 0, 0.25),
    inset 7px 7px 7px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(13px);
}
.faction-m {
  background: linear-gradient(
    180deg,
    #ea1c1c 0%,
    rgba(170, 30, 30, 0.58) 50%,
    #ea1c1c 98.96%
  );
  box-shadow: 7px 12px 27px rgba(0, 0, 0, 0.25),
    inset -7px -7px 7px rgba(0, 0, 0, 0.25),
    inset 7px 7px 7px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(13px);
}
</style>
