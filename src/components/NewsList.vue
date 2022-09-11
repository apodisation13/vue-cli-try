<template>
  <div class="news">
    <button class="news__prev" @click="prev">
      <img :src="require('@/assets/icons/' + 'arrow.svg')" />
    </button>
    <button class="news__next" @click="next">
      <img :src="require('@/assets/icons/' + 'arrow.svg')" />
    </button>
    <div class="news__content">
      <carousel ref="carousel" :items-to-show="1.4" :wrap-around="true">
        <slide v-for="element in news" :key="element.id">
          <div class="news__item">
            <div class="news__title">
              <b class="news__title-text">{{ element.title }}</b>
            </div>
            <div class="news__text">{{ element.description }}</div>
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
  font-weight: 700;
  font-size: 24px;
  line-height: 30px;
}
.news__header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
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
  height: 350px;
  width: 250px;
  border: 3px solid #667080;
  border-radius: 10px;
  overflow: scroll;
  background: #EEF1F4;
}
.news__title{
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
  z-index: 3;
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
