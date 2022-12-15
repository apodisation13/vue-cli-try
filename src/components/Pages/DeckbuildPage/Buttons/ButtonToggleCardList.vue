<template>
  <div class="wrapper-button">
    <div
      class="button-toggle-card-list"
      :class="isActive ? 'button-active' : 'button-default'"
    >
      <span class="button-text">
        <slot></slot>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style scoped>
.wrapper-button {
  margin: 20px 8px;
  border-radius: 1px;
  overflow: hidden;
  min-width: 70px;
}

.button-toggle-card-list {
  padding: 10px 5px;
  text-align: center;
  font-weight: 300;
  font-size: 12px;
  font-family: "Inter";
  border-radius: 1px;
}

.button-default {
  border: 2px solid;
  border-image: repeating-linear-gradient(
      rgb(74, 66, 55) 0%,
      rgb(197, 168, 126) 50%,
      rgb(74, 66, 55) 100%
    )
    1;
  background: linear-gradient(
    168.49deg,
    #717e8b -9.67%,
    rgba(0, 0, 0, 0.13) 46.61%,
    #717e8b 101.72%
  );
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
}

.button-active {
  background: linear-gradient(
    180deg,
    #1d252d -21.82%,
    rgba(0, 0, 0, 0.13) 44.55%,
    #282d33 109.53%
  );
  border: 2px solid #facf5d;
  box-shadow: 5px 9px 20px rgba(0, 0, 0, 0.25),
    inset -5px -5px 5px rgba(0, 0, 0, 0.25),
    inset 5px 5px 5px rgba(0, 0, 0, 0.25);
}

.button-default .button-text {
  background: linear-gradient(
    183.6deg,
    rgba(237, 177, 62, 0.4) 2.96%,
    rgba(244, 217, 119, 0.4) 65.79%,
    rgba(238, 184, 80, 0.4) 129.95%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2);
}

.button-active .button-text {
  background: var(--primary-gold-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2);
}
</style>
