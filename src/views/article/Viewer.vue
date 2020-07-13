<template>
  <div id="ArticleViewer">
    <div class="article">
      <Loading :value="!article" />
      <template v-if="article">
        <div class="article-head">
          <WriterProfile :writer="article.writer" />
          <div class="spacer" />
          <div
            class="article-head-icon"
            @click="$router.push(`/articles/write?articleId=${article.id}`)"
          >
            <Icon icon="edit" />
          </div>
          <div class="article-head-icon" @click="remove()">
            <Icon icon="trash" />
          </div>
        </div>
        <div class="article-title">{{ article.title }}</div>
        <TViewer class="article-content" :initialValue="article.content" />
        <div class="article-createdAt">
          {{ article.createdAt | moment('YYYY년 MMMM Do a h시 mm분') }}에 게시됨
        </div>
      </template>
    </div>
    <div class="article-comment-head">
      <span>댓글 {{ comments ? comments.length : 0 }}</span>
      <div class="article-comment-refresh" @click="loadComments()">
        <Icon icon="sync-alt" :spin="loading" />
      </div>
    </div>
    <transition-group name="list" tag="div" class="article-comment-list">
      <Comment
        v-for="comment in comments"
        :key="comment.id"
        :article-id="article.id"
        :comment="comment"
        @remove="onRemoveComment"
      />
    </transition-group>
    <CommentWriter :article-id="articleId" @write="onWriteComment" />
    <div v-if="board" class="article-more">
      <div class="article-more-title">{{ board.name }} 글 더보기</div>
      <ArticleList :articles="moreArticles" mini />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { State } from 'vuex-class';
import Comment from '@/components/Comment.vue';
import CommentWriter from '@/components/CommentWriter.vue';
import WriterProfile from '@/components/WriterProfile.vue';
import ArticleList from '@/components/ArticleList.vue';

@Component({
  components: { Comment, CommentWriter, WriterProfile, ArticleList },
})
export default class ArticleViewer extends Vue {
  @State('me') me?: any;
  @State('boards') boards?: any;
  article: null | any = null;
  comments: any = null;
  loading = false;
  moreArticles = [];
  get board() {
    return (
      this.boards &&
      this.article &&
      this.boards.find((v: any) => v.id === this.article.boardId)
    );
  }
  get articleId() {
    return Number(this.$route.params.articleId as string);
  }
  @Watch('articleId')
  onArticleChanged() {
    if (Number.isNaN(this.articleId)) {
      this.$router.back();
    }
    this.loadArticle();
  }
  created() {
    if (Number.isNaN(this.articleId)) {
      this.$router.back();
    }
    this.loadArticle();
  }
  loadArticle() {
    this.$axios.get(`/articles/${this.articleId}`).then(res => {
      const { success, article } = res.data;
      if (success) {
        this.article = article;
        this.loadComments();
        this.loadMoreArticle();
      }
    });
  }
  loadComments() {
    this.loading = true;
    this.$axios.get(`/comments?articleId=${this.articleId}`).then(res => {
      const { success, comments } = res.data;
      if (success) {
        this.comments = comments;
        this.loading = false;
      }
    });
  }
  loadMoreArticle() {
    this.$axios
      .get(`/articles?boardId=${this.article.boardId}&limit=5`)
      .then(res => {
        const { success, articles } = res.data;
        if (success) this.moreArticles = articles;
      });
  }
  onWriteComment(success: boolean) {
    if (success) this.loadComments();
  }
  onRemoveComment(id: number) {
    this.$axios.delete(`/comments/${id}`).then(res => {
      const { success } = res.data;
      if (success)
        this.comments.splice(
          this.comments.findIndex((v: any) => v.id === id),
          1,
        );
    });
  }
  remove() {
    this.$axios.delete(`/articles/${this.article!.id}`).then(res => {
      const { success } = res.data;
      if (success) this.$router.push(`/board/${this.article.id}`);
    });
  }
}
</script>

<style lang="scss">
#ArticleViewer {
  .article {
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
    padding: 10px;
    margin-bottom: 10px;
    &-head {
      display: flex;
      align-items: center;
      &-icon {
        margin-left: 8px;
        cursor: pointer;
        user-select: none;
        &:hover svg {
          color: #333333;
        }
      }
    }
    &-title {
      padding: 10px 0;
    }
    &-content {
      margin-bottom: 10px;
    }
    &-createdAt {
      font-size: 12px;
      text-align: right;
    }
    &-comment {
      &-list {
        position: relative;
      }
      &-head {
        display: flex;
        margin-bottom: 10px;
        font-size: 18px;
        align-items: center;
      }
      &-refresh {
        display: inline-block;
        cursor: pointer;
        margin-left: 10px;
        height: 1em;
        display: flex;
        &:hover svg {
          color: #333333;
        }
      }
    }
  }
}
</style>
