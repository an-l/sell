<template>
  <div class="star" :class="starType">
    <span v-for="itemClass in itemClasses" :class="itemClass" :key="itemClass" class="star-item">

    </span>
  </div>
</template>

<script>
const LENGTH = 5
const CLS_ON = 'on'
const CLS_HALF = 'half'
const CLS_OFF = 'off'

export default {
  props: {
    size: {
      type: Number
    },
    score: {
      type: Number
    }
  },
  computed: {
    starType() {
      return `star-${this.size}`
    },
    itemClasses() {
      let score = Math.floor(this.score * 2) / 2
      let hasDecimals = score % 1 !== 0
      let interger = Math.floor(score)
      let result = [ ]
      for (var i = 0; i < interger; i++) {
        result.push(CLS_ON)
      }

      if (hasDecimals) {
        result.push(CLS_HALF)
      }
      while (result.length < LENGTH) {
        result.push(CLS_OFF)
      }

      return result
    }
  }
}
</script>

<style lang="scss" type="text/css">
@import '../../common/scss/mixin.scss';

.star {
  font-size: 0;
  .star-item {
    display: inline-block;
    background-repeat: no-repeat;
  }
  &.star-24 {
    .star-item {
      width: 10px;
      height: 10px;
      margin-right: 3px;
      background-size: 10px 10px;
      &:last-child {
        margin-right: 0;
      }
      
      &.on {
        @include bg-image('star24_on');
      }
      &.half {
        @include bg-image('star24_half');
      }
      &.off {
        @include bg-image('star24_off');
      }
    }
  }
  &.star-36 {
    .star-item {
      width: 15px;
      height: 15px;
      margin-right: 6px;
      background-size: 15px 15px;
      &:last-child {
        margin-right: 0;
      }
      
      &.on {
        @include bg-image('star36_on');
      }
      &.half {
        @include bg-image('star36_half');
      }
      &.off {
        @include bg-image('star36_off');
      }
    }
  }
  &.star-48 {
    .star-item {
      width: 20px;
      height: 20px;
      margin-right: 22px;
      background-size: 20px 20px;
      &:last-child {
        margin-right: 0;
      }
      
      &.on {
        @include bg-image('star48_on');
      }
      &.half {
        @include bg-image('star48_half');
      }
      &.off {
        @include bg-image('star48_off');
      }
    }
  }
}
</style>
