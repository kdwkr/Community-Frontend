<template>
  <div id="Main">
    <h1>무명 커뮤니티</h1>
    <div class="row">
      <div class="item">
        <h4>오늘 작성된 게시글 수</h4>
        <div class="todayCount">{{ articleCount }}</div>
      </div>
      <div class="item">
        <h4>오늘 작성된 댓글 수</h4>
        <div class="todayCount">{{ commentCount }}</div>
      </div>
    </div>
    <div class="row">
      <div class="item">
        <h4>공지사항</h4>
        <ArticleList :articles="noticeArticles" mini />
      </div>
      <div class="item">
        <h4>자유게시판</h4>
        <ArticleList :articles="freeArticles" mini />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ArticleList from '@/components/ArticleList.vue';

@Component({ components: { ArticleList } })
export default class Main extends Vue {
  noticeArticles = null;
  freeArticles = null;
  articleCount = 0;
  commentCount = 0;
  created() {
    this.$axios.get('/articles/?boardId=1&limit=5').then(res => {
      const { success, articles } = res.data;
      if (success) this.noticeArticles = articles;
    });
    this.$axios.get('/articles/?boardId=2&limit=5').then(res => {
      const { success, articles } = res.data;
      if (success) this.freeArticles = articles;
    });
    this.$axios.get('/statics/articlecount').then(res => {
      const { success, count } = res.data;
      if (success) this.articleCount = count;
    });
    this.$axios.get('/statics/commentcount').then(res => {
      const { success, count } = res.data;
      if (success) this.commentCount = count;
    });
  }
}
</script>

<style lang="scss">
#Main {
  .row {
    flex-wrap: wrap;
  }
  .item {
    flex-basis: 100%;
  }
  .todayCount {
    font-weight: bold;
    font-size: 30px;
    &::after {
      content: '개';
      font-size: 20px;
    }
  }
  @media (min-width: 768px) {
    .item {
      flex-basis: 49%;
      &:first-child {
        margin-right: 1%;
      }
      &:last-child {
        margin-left: 1%;
      }
    }
  }
}
</style>
