<template>
  <div id="Board">
    <Loading :value="loading" />
    <template v-if="board">
      <div class="board-head">
        <div class="board-name">{{ board.name }}</div>
        <div class="board-desc">{{ board.desc }}</div>
      </div>
      <ArticleList :articles="articles" />
      <div class="board-bottom">
        <div class="spacer" />
        <router-link
          class="btn btn-purple"
          :to="'/articles/write?boardId=' + board.id"
        >
          글쓰기
        </router-link>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import ArticleList from '@/components/ArticleList.vue';

@Component({ components: { ArticleList } })
export default class Board extends Vue {
  board: any = null;
  articles: any[] = [];
  loading = false;
  get boardId() {
    return this.$route.params.boardId;
  }
  @Watch('boardId')
  onBoardChanged() {
    this.getBoardInfo();
    this.getArticles();
  }
  created() {
    this.getBoardInfo();
    this.getArticles();
  }
  getBoardInfo() {
    this.$axios.get(`/boards/${this.boardId}`).then(res => {
      const { success, board } = res.data;
      if (success) this.board = board;
    });
  }
  getArticles() {
    this.loading = true;
    this.$axios.get(`/articles?boardId=${this.boardId}`).then(res => {
      const { success, articles } = res.data;
      if (success) this.articles = articles;
      this.loading = false;
    });
  }
}
</script>

<style lang="scss">
#Board {
  .board {
    &-name {
      font-size: 23px;
      margin-bottom: 10px;
    }
    &-desc {
      font-size: 15px;
      margin-bottom: 10px;
    }
    &-head {
      display: flex;
      flex-direction: column;
    }
    &-bottom {
      display: flex;
      margin-top: 10px;
    }
  }
  .btn {
  }
}
</style>
