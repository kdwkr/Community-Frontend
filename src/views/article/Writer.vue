<template>
  <div id="ArticleWriter">
    <div class="label">제목</div>
    <input class="input" v-model="title" />
    <TEditor
      v-if="content !== null"
      ref="editor"
      :initialValue="content"
      :options="editorOptions"
      height="500px"
      previewStyle="vertical"
    />
    <div style="margin-top:10px;display:flex;">
      <div class="spacer" />
      <button class="btn btn-purple" @click="write()">확인</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Editor } from '@toast-ui/vue-editor';

@Component
export default class ArticleWriter extends Vue {
  $refs!: { editor: Editor };
  title = '';
  content: null | string = null;
  editorOptions = {
    useDefaultHTMLSanitizer: true,
    language: 'ko-KR',
  };
  boardId: null | number = null;
  articleId: null | number = null;
  created() {
    this.boardId = Number(this.$route.query.boardId as string);
    this.articleId = Number(this.$route.query.articleId as string);
    if (this.articleId) {
      this.$axios.get(`/articles/${this.articleId}`).then(res => {
        const { success, article } = res.data;
        if (success) {
          this.title = article.title;
          this.content = article.content;
        }
      });
    } else this.content = '';
  }
  write() {
    if (this.articleId)
      this.$axios
        .put(`/articles?boardId=${this.boardId}&articleId=${this.articleId}`, {
          title: this.title,
          content: this.$refs.editor.invoke('getMarkdown'),
        })
        .then(res => {
          const { success } = res.data;
          if (success) {
            this.$router.push(`/articles/${this.articleId}`);
          }
        });
    else
      this.$axios
        .post(`/articles?boardId=${this.boardId}`, {
          title: this.title,
          content: this.$refs.editor.invoke('getMarkdown'),
        })
        .then(res => {
          const { success, id } = res.data;
          if (success) {
            this.$router.push(`/articles/${id}`);
          }
        });
  }
}
</script>

<style lang="scss"></style>
