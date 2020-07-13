<template>
  <transition name="loading">
    <div
      :class="{ 'loading-overlay': true, fixed: fixed, black: black }"
      v-if="value"
    >
      <svg
        class="loading"
        width="65px"
        height="65px"
        viewBox="0 0 66 66"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          class="loading-path"
          fill="none"
          stroke-width="6"
          stroke-linecap="round"
          cx="33"
          cy="33"
          r="30"
        ></circle>
      </svg>
      <div class="loading-message">무명 커뮤니티</div>
    </div>
  </transition>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class Loading extends Vue {
  @Prop({ type: Boolean, default: false }) value?: boolean;
  @Prop({ type: Boolean, default: false }) fixed?: boolean;
  @Prop({ type: Boolean, default: false }) black?: boolean;
}
</script>
<style lang="scss">
.loading-enter-active,
.loading-leave-active {
  transition: opacity 0.5s ease;
}
.loading-enter,
.loading-leave-to {
  opacity: 0;
}
.loading {
  $offset: 187;
  $duration: 1.6s;
  animation: rotator $duration linear infinite;
  user-select: none;
  &-overlay {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.9);
    z-index: 1000;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    &.fixed {
      position: fixed;
      z-index: 2001;
    }
    &.black {
      background-color: rgba(0, 0, 0, 0.9);
    }
  }
  &-path {
    stroke-dasharray: $offset;
    stroke-dashoffset: 0;
    transform-origin: center;
    stroke: #ffaa44;
    animation: dash $duration ease-in-out infinite;
  }
  &-message {
    margin-top: 10px;
    font-size: 18px;
    font-weight: bold;
    color: #ffaa44;
  }
  @keyframes rotator {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(270deg);
    }
  }
  @keyframes dash {
    0% {
      stroke-dashoffset: $offset;
    }
    50% {
      stroke-dashoffset: $offset/4;
      transform: rotate(135deg);
    }
    100% {
      stroke-dashoffset: $offset;
      transform: rotate(450deg);
    }
  }
}
</style>
