<template>
  <div class="news" v-if="news">
    <button class="news__prev" @click="prev">
      <img :src="require('@/assets/icons/' + 'arrow.svg')" />
    </button>
    <button class="news__next" @click="next">
      <img :src="require('@/assets/icons/' + 'arrow.svg')" />
    </button>
    <div class="news__content">
      <carousel
        ref="carousel"
        :items-to-show="1.4"
        :wrap-around="true"
        :touchDrag="false"
      >
        <slide v-for="element in news" :key="element.id">
          <div class="news__item">
            <div class="news__title">
              <p class="news__title-text">{{ element.title }}</p>
            </div>
            <div class="news__text">
              {{ element.description }}
            </div>
            <div class="rombica">
              <div class="rombica__wrapper">
                <div class="rombica__date">
                  <span class="rombica__text">{{
                    this.setDay(element.created_at, "day")
                  }}</span>
                </div>
                <div class="rombica__date rombica__bottom-date">
                  <span class="rombica__text">{{
                    this.setDay(element.created_at, "month")
                  }}</span>
                </div>
              </div>
            </div>
            <img
              class="rombica__outer-border"
              :src="require('@/assets/icons/Vector 77.svg')"
            />
          </div>
        </slide>
      </carousel>
    </div>
  </div>
</template>

<script>
import "vue3-carousel/dist/carousel.css"
import { Carousel, Slide } from "vue3-carousel"
export default {
  name: "news-list",
  computed: {
    news() {
      return this.$store.getters["all_news"]
    },
  },
  data() {
    return {
      currentSlide: 0,
    }
  },
  methods: {
    next() {
      this.$refs.carousel.next()
    },
    prev() {
      this.$refs.carousel.prev()
    },
    setDay(data, option) {
      const date = new Date(data)

      if (option === "month") {
        return date.toLocaleString("en-GB", { month: "2-digit" })
      } else if (option === "day") {
        return date.toLocaleString("en-GB", { day: "2-digit" })
      }
      // console.log(result.getMonth())
    },
  },
  components: {
    Carousel,
    Slide,
  },
}
</script>

<style scoped>
.carousel__slide > .news__item {
  transform: scale(1);
  opacity: 0.5;
  transition: 0.5s;
  will-change: transform;
}
.carousel__slide--visible > .news__item {
  opacity: 1;
  transform: rotateY(0);
}
.carousel__slide--next > .news__item {
  transform: scale(0.9) translate(-10px);
}
.carousel__slide--prev > .news__item {
  transform: scale(0.9) translate(10px);
}
.carousel__slide--active > .news__item {
  transform: scale(1);
}
.carousel__slide {
  align-items: baseline;
}
.news__title-text {
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 120%;
  letter-spacing: -0.02em;
  color: #fceabc;
}
.news__header .carousel {
  width: 300px;
}
.news__text {
  padding: 28px 16px;
  text-align: start;
  font-family: "Inter";
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 140%;
  height: 38vh;
  width: 250px;
  border: 3px solid;
  border-image-source: var(--secondary-gold-gradient);
  border-image-slice: 1;
  border-radius: 10px;
  color: #fceabc;
  overflow: scroll;
  background: linear-gradient(
    180deg,
    #192320 0%,
    rgba(25, 35, 32, 0.56) 0.01%,
    rgba(16, 22, 28, 0.29) 41.27%,
    #10161c 100%
  );
  white-space: pre-line;
}
.news__item {
  padding-bottom: 40px;
}
.rombica {
  position: absolute;
  border: 3px solid;
  border-image-source: var(--secondary-gold-gradient);
  border-image-slice: 1;
  height: 49.5px;
  width: 49.5px;
  bottom: 0;
  right: 0;
  transform: rotate(-45deg);
  margin: 0 21px 16px 0;
  filter: drop-shadow(0px 4px 10px rgba(247, 202, 86, 0.2));
  background: #1c2228;
}
.rombica__bottom-date {
  border-top: 0.5px solid;
  border-image-source: var(--third-gold-gradient);
  border-image-slice: 1;
  display: flex;
  align-items: flex-end;
}
.rombica__date {
  height: 50%;
  display: flex;
  justify-content: center;
}
.rombica__text {
  transform: rotate(45deg);
  font-weight: 700;
  font-size: 13.0909px;
  line-height: 100%;
  font-family: "Philosopher";
  background: var(--third-gold-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.rombica__outer-border {
  position: absolute;
  bottom: 0;
  right: -0.5px;
}
.rombica__wrapper {
  border: 1px solid;
  border-image-source: linear-gradient(
    180deg,
    rgba(208, 170, 112, 0.4) -49.87%,
    rgba(197, 168, 126, 0.116) 2.91%,
    rgba(176, 139, 87, 0) 53.83%
  );
  margin-left: 3px;
  margin-top: 3px;
  width: 38px;
  height: 38px;
}
/* .rombica__bottom-text {
  display: flex;
  align-self: flex-end;
} */
.news__title {
  margin-bottom: 42px;
}
.news__content {
  height: 250px;
}
.news__text::-webkit-scrollbar {
  display: none;
}
.news {
  position: relative;
}
.news button {
  position: absolute;
  z-index: 1;
  background: none;
  border: none;
}
.news__prev {
  left: 0;
  transform: rotate(180deg);
  margin-left: 30px;
}
.news__next {
  right: 0;
  margin-right: 30px;
}
</style>
