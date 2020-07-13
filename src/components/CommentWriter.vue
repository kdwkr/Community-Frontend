<template>
  <div class="comment-writer">
    <div class="comment-writer-title">
      {{ parentCommentId ? '답글' : '댓글' }} {{ comment ? '수정' : '작성' }}
    </div>
    <div class="comment-writer-body">
      <textarea
        class="textarea"
        v-model="content"
        :disabled="!me"
        :placeholder="
          me ? '내용을 입력해주세요.' : '로그인 후 댓글 작성이 가능합니다.'
        "
      ></textarea>
      <button class="btn btn-beige" @click="write()" :disabled="!me">
        확인
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { State } from 'vuex-class';

@Component
export default class CommentWriter extends Vue {
  @Prop(Number) articleId!: number;
  @Prop(Number) parentCommentId?: number;
  @Prop(Object) comment?: any;
  @State('me') me?: any;

  content = '';

  mounted() {
    if (this.comment) this.content = this.comment.content;
  }

  write() {
    if (this.comment)
      this.$axios
        .put(`/comments/${this.comment.id}`, { content: this.content })
        .then(res => {
          const { success } = res.data;
          this.$emit('write', success, this.content);
          if (success) {
            this.content = '';
          }
        });
    else
      this.$axios
        .post(
          `/comments?articleId=${this.articleId}&parentCommentId=${this.parentCommentId}`,
          { content: this.content },
        )
        .then(res => {
          const { success, id } = res.data;
          this.$emit('write', success, id);
          if (success) {
            this.content = '';
          }
        });
  }
}
</script>

<style lang="scss">
.comment-writer {
  display: flex;
  flex-direction: column;
  &-title {
    font-size: 14px;
    margin: 5px;
  }
  &-body {
    display: flex;
    textarea {
      flex: 1;
      height: 80px;
    }
    button {
      margin-left: 5px;
      width: 80px;
    }
  }
}
</style>
