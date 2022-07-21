<template>
  <div class="hand">

    <div class="card_in_hand" :style="border(card)"
      v-for="(card, index ) in hand" :key='card'
      @dblclick="chose_player_card(card)"
      draggable="true"
      v-on:touchmove="onDragStart($event, card, index)"
         v-touch:drag.once="onDragStart(_, card, index)"
    >

      <card-comp
          :card="card"
          :id="`card_${index}`"
      />

    </div>
  </div>
</template>

<script>
import { border_for_hand, border_for_card, border_for_hand_2 } from '@/logic/border_styles'
import CardComp from "@/components/CardComp"
export default {
  name: 'hand-comp',
  components: {CardComp},
  props: {
    hand: {
      required: true,
      type: Array,
    },
  },
  methods: {
    chose_player_card(card) {
      this.$emit('chose_player_card', card)  // передаём card по эмиту
    },
    border(card, index) {
      // return border_for_hand(card, index)
      // return border_for_card(card)
      return border_for_hand_2(this.hand, card)
    },
    onDragStart(e, card, index) {
      var self = this
      return function (a, b) {
        console.log('ТАЩИМ КАРТУ', card, index)
        self.$emit('chose_player_card', card)
      }

      // e.dataTransfer.dropEffect = 'move'
      // e.dataTransfer.effectAllowed = 'move'
      // e.dataTransfer.setData('card', JSON.stringify(card))
      // console.log('МЫ ТУТ, ТЯНЕМ ЗА КАРТУ', card)

    },
    // drawIt(index) {
    //   var canvas = document.createElement('canvas');
    //   document.body.appendChild(canvas);
    //
    //   function getOffset(el) {
    //     const rect = el.getBoundingClientRect();
    //     return {
    //       left: rect.left + window.scrollX,
    //       top: rect.top + window.scrollY
    //     };
    //   }
    //   const card = document.getElementById(`card_${index}`)
    //   const x = getOffset(card).left
    //   const y = getOffset(card).top
    //   console.log(x, y)
    //
    //
    //   // some hotfixes... ( ≖_≖)
    //   document.body.style.margin = 0;
    //   canvas.style.position = 'absolute';
    //   canvas.style.top = "0";
    //   canvas.style.left = "0";
    //   canvas.style.width = "99vw"
    //   canvas.style.height = "99vh"
    //
    //   // get canvas 2D context and set him correct size
    //   var ctx = canvas.getContext('2d');
    //   resize();
    //
    //   // last known position
    //   var pos = { x: 0, y: 0 };
    //
    //   window.addEventListener('resize', resize);
    //   document.addEventListener('mousemove', draw);
    //   // document.addEventListener('mousedown', clear);
    //   document.addEventListener('mouseenter', setPosition);
    //
    //   function clear() {
    //     ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    //     if (ctx) document.body.removeChild(canvas)
    //     console.log('were hereeeeee')
    //   }
    //
    //
    //   // new position from mouse event
    //   function setPosition(e) {
    //     pos.x = e.clientX;
    //     pos.y = e.clientY;
    //   }
    //
    //   // resize canvas
    //   function resize() {
    //     ctx.canvas.width = window.innerWidth;
    //     ctx.canvas.height = window.innerHeight;
    //   }
    //
    //   function draw(e) {
    //     // mouse left button must be pressed
    //     if (e.buttons !== 1) return;
    //
    //     ctx.beginPath(); // begin
    //
    //     ctx.lineWidth = 5;
    //     ctx.lineCap = 'round';
    //     ctx.strokeStyle = '#c0392b';
    //
    //     ctx.moveTo(pos.x, pos.y); // from
    //     setPosition(e);
    //     ctx.lineTo(pos.x, pos.y); // to
    //
    //     ctx.stroke(); // draw it!
    //   }
    // },
    draw2() {
      var canvasWidth = 200;
      var canvasHeight = 200;
      var canvas = null;
      var bounds = null;
      var ctx = null;
      var hasLoaded = false;

      var startX = 0;
      var startY = 0;
      var mouseX = 0;
      var mouseY = 0;
      var isDrawing = false;
      var existingLines = [];

      function draw() {
        ctx.fillStyle = "white";
        // ctx.fillRect(0,0,canvasWidth,canvasHeight);

        // ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.beginPath();

        for (var i = 0; i < existingLines.length; ++i) {
          var line = existingLines[i];
          ctx.moveTo(line.startX,line.startY);
          ctx.lineTo(line.endX,line.endY);
        }

        ctx.stroke();

        if (isDrawing) {
          ctx.strokeStyle = "darkred";
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(startX,startY);
          ctx.lineTo(mouseX,mouseY);
          ctx.stroke();
        }
      }

      function onmousedown(e) {
        if (hasLoaded && e.button === 0) {
          if (!isDrawing) {
            startX = e.clientX - bounds.left;
            startY = e.clientY - bounds.top;

            isDrawing = true;
          }

          draw();
        }
      }

      function onmouseup(e) {
        if (hasLoaded && e.button === 0) {
          if (isDrawing) {
            existingLines.push({
              startX: startX,
              startY: startY,
              endX: mouseX,
              endY: mouseY
            });

            isDrawing = false;
          }

          draw();
        }
      }

      function onmousemove(e) {
        if (hasLoaded) {
          mouseX = e.clientX - bounds.left;
          mouseY = e.clientY - bounds.top;

          if (isDrawing) {
            draw();
          }
        }
      }

      canvas = document.getElementById("canvas");
      // canvas.width = canvasWidth;
      // canvas.height = canvasHeight;
      canvas.style.width = "75vw"
      canvas.style.height = "75vh"
      canvas.onmousedown = onmousedown;
      canvas.onmouseup = onmouseup;
      canvas.onmousemove = onmousemove;

      bounds = canvas.getBoundingClientRect();
      ctx = canvas.getContext("2d");
      hasLoaded = true;

      draw();

    },
  },
  emits: [
    'chose_player_card', 
  ],
}
</script>

<style scoped>

.hand {
  width: 98%;
  height: 21vh;
  padding-top: 2%;
  /* border: solid 1px blue; */
  clear: both;
  overflow: auto;
  /*white-space: nowrap;*/
  /*ВОТ БЛЯТЬ ИЗЗА ЭТОЙ ЕБАНОЙ ПОЕБНИ БЛЯТЬ ВЫШЕ Я ЕБАЛСЯ ЕБАНЫЕ 3 ЧАСА БЛЯТЬ*/
  /*position: absolute;*/
  /*top: 75%;*/
  /*left: 0;*/
}

.card_in_hand {
  width: 26%;
  height: 18.5vh;
   /*border: solid 3px gold; */
  border-radius: 2%;
  display: table-row;
  overflow: hidden;
  /*вот так было через жопу*/
  /*margin-right: -12%;*/
  /*margin-left: 0.5%;*/
  /*ну а вот так вроде всё заебись*/
  /*margin-right: 0.3%;*/
  /*margin-left: -12%;*/
  /*float: right;*/
  margin-top: 0.1%;
  position: relative;
  border-width: 3px 4px 3px 5px;
  border-radius:95% 4% 92% 5%/4% 95% 6% 95%;
  /*transform: rotate(2deg);*/
}
.card_in_hand:hover {
  margin-top: -2%;
  z-index: 999999;
  border-width: 3px 4px 3px 5px;
  border-color: red;
  border-style: solid;
}
canvas {
  position: absolute;
  left: 0;
  top: 0;
  border: solid 2px red;
  width: 75vw;
  height: 75vh;
}
</style>
