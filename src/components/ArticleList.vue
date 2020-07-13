<template>
  <div :class="{ 'articlel-list': true, mini }">
    <div class="articlel articlel-head">
      <div class="articlel-id">번호</div>
      <div class="articlel-title">제목</div>
      <div class="articlel-writer">작성자</div>
      <div class="articlel-createdAt">작성일</div>
    </div>
    <div
      class="articlel"
      v-for="article in articles"
      :key="article.id"
      @click="$router.push('/articles/' + article.id)"
    >
      <div class="articlel-id">{{ article.id }}</div>
      <div class="articlel-title">
        {{ article.title }}
        <span class="articlel-commentCount" v-if="article.commentCount > 0">
          ({{ article.commentCount }})
        </span>
      </div>
      <div class="articlel-writer">{{ article.writer.nickname }}</div>
      <div class="articlel-createdAt">
        {{ getDate(article.createdAt) }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import moment from 'moment';

const now = new Date();
@Component
export default class ArticleList extends Vue {
  @Prop(Array) articles!: any;
  @Prop({ type: Boolean, default: false }) mini!: boolean;
  getDate(_date: string) {
    const date = new Date(_date);
    if (
      now.getFullYear() === date.getFullYear() &&
      now.getMonth() === date.getMonth() &&
      now.getDate() === date.getDate()
    ) {
      return moment(date).format('HH시 mm분');
    }
    return moment(date).format('MM월 DD일');
  }
}
</script>

<style lang="scss">
.articlel {
  cursor: pointer;
  display: flex;
  background-color: #ffffff;
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    transition: all 300ms ease;
  }
  * {
    padding: 0 5px;
    box-sizing: border-box;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  &-list {
    display: flex;
    flex-direction: column;
    &.mini {
      font-size: 14px;
      .articlel {
        padding: 5px 0;
      }
    }
    &-head {
      &:hover {
        background-color: #ffffff;
      }
    }
  }
  &-id {
    flex: 1 0 auto;
    text-align: center;
  }
  &-title {
    flex: 0 1 70%;
  }
  &-writer {
    flex: 0 0 15%;
    text-align: center;
  }
  &-createdAt {
    flex: 1 0 auto;
    text-align: center;
  }
  &-commentCount {
    color: #f03939;
  }
}
</style>
