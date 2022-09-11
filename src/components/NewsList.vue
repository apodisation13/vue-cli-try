<template>
  <div class="news">
    <div class="news__header">
      <button @click="prev">Prev</button>
      <carousel
        ref="carouselTitle"
        :mouseDrag="false"
        :items-to-show="1"
        :wrap-around="true"
        :touchDrag="false"
      >
        <slide v-for="element in news" :key="element.id">
          <div class="news__title">
            <b class="news__title-text">{{ element.title }}</b>
          </div>
        </slide>
      </carousel>
      <button @click="next">Next</button>
    </div>
    <div class="news__content">
      <carousel
        ref="carousel"
        :items-to-show="1.4"
        :wrap-around="true"
        :touchDrag="false"
        :mouseDrag="false"
      >
        <slide v-for="element in news" :key="element.id">
          <div class="news__item">{{ element.description }}</div>
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
      this.$refs.carouselTitle.next()
      this.$refs.carousel.next()
    },
    prev() {
      this.$refs.carouselTitle.prev()
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
.news__item {
  overflow: scroll;
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
.news__header .carousel{
  width: 300px;
}
.news__item {
  padding: 28px 16px;
  text-align: start;
  font-family: "Inter";
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 140%;
  height: 345px;
  width: 250px;
  border: 3px solid #667080;
  border-radius: 10px;
  background: #EEF1F4;
}
.news__item::-webkit-scrollbar {
  display: none;
}
</style>
