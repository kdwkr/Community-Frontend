<template>
  <div class="wprofile">
    <div
      class="wprofile-icon"
      :style="{ backgroundImage: `url(${writer.icon || profileIcon})` }"
    />
    <div class="wprofile-nickname">{{ writer.nickname }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

const profileIcon = require('@/assets/img/profile.svg');

@Component
export default class WriterProfile extends Vue {
  @Prop(Object) writer: any;
  profileIcon = profileIcon;
}
</script>

<style lang="scss">
.wprofile {
  display: flex;
  align-items: center;
  &-icon {
    width: 32px;
    height: 32px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    margin-right: 5px;
  }
  &-nickname {
    font-size: 16px;
  }
}
</style>
