<template>
  <div class="button-decks-wrapper">
    <div class="button-decks">
      <span class="button-text"> Колоды </span>
    </div>
    <div class="bottom-lines-button">
      <div class="bottom-line"></div>
      <div class="bottom-line-center"></div>
      <div class="bottom-line"></div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.button-decks-wrapper {
  height: 82px;
  position: relative;
  border: 2px solid;
  border-image: linear-gradient(
      153.5deg,
      #b07b15 34.99%,
      #facf5d 57.14%,
      #b48328 82.81%
    )
    1;
  border-left: none;
  border-right: none;
  border-bottom: none;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.13) 0%, #2b6db6 100%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.button-decks {
  padding-top: 18px;
  text-align: center;
}

.button-text {
  font-family: "Philosopher";
  font-weight: 700;
  font-size: 20px;
  background: linear-gradient(
    183.6deg,
    #edb13e 2.96%,
    #f4d977 65.79%,
    #eeb850 129.95%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
}

.bottom-lines-button {
  display: flex;
  justify-content: center;
  align-items: flex-end;
}

.bottom-line {
  width: calc(30% - 6px);
  border: 2px solid;
  border-image: linear-gradient(
      153.5deg,
      #b07b15 34.99%,
      #facf5d 57.14%,
      #b48328 82.81%
    )
    1;
  border-left: none;
  border-right: none;
  border-bottom: none;
}

.bottom-line-center {
  width: calc(40% + 12px);
  height: 28px;
  border: 2px solid;
  border-image: linear-gradient(
      153.5deg,
      #b07b15 34.99%,
      #facf5d 57.14%,
      #b48328 82.81%
    )
    1;
  border-bottom: none;
  background-color: #203449;
}
</style>
