<template>
  <div class="comment">
    <div class="comment-head">
      <WriterProfile :writer="comment.writer" />
      <div class="spacer" />
      <div class="comment-head-icon" @click="toggleReply()">
        <Icon :icon="toggledReply ? 'times' : 'reply'" />
      </div>
      <template v-if="me && me.id === comment.writer.id">
        <div class="comment-head-icon" @click="toggleEdit()">
          <Icon :icon="toggledEdit ? 'times' : 'edit'" />
        </div>
        <div class="comment-head-icon" @click="remove()">
          <Icon icon="trash" />
        </div>
      </template>
    </div>
    <div class="comment-content">
      <template v-if="toggledEdit">
        <CommentWriter
          :article-id="articleId"
          :comment="comment"
          @write="onEditComment"
        />
      </template>
      <template v-else>
        {{ comment.content }}
      </template>
    </div>
    <transition name="fade">
      <div
        v-if="comment.childCommentCount > 0"
        class="comment-more"
        @click="loadChildComments()"
      >
        <template v-if="toggledChildComments">
          답글 접기
        </template>
        <template v-else>
          답글 보기 ({{ comment.childCommentCount }})
        </template>
      </div>
    </transition>
    <transition-group
      v-if="toggledChildComments && childComments.length > 0"
      name="list"
      tag="div"
      class="comment-list"
    >
      <Comment
        v-for="childComment in childComments"
        :key="childComment.id"
        :article-id="articleId"
        :comment="childComment"
        @remove="onRemoveComment"
      />
    </transition-group>
    <transition name="fade">
      <CommentWriter
        v-if="toggledReply"
        class="comment-rwriter"
        :article-id="articleId"
        :parent-comment-id="comment.id"
        @write="onWriteComment"
      />
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { State } from 'vuex-class';
import WriterProfile from '@/components/WriterProfile.vue';
import CommentWriter from '@/components/CommentWriter.vue';

@Component({ components: { WriterProfile, CommentWriter } })
export default class Comment extends Vue {
  @Prop(Number) articleId!: number;
  @State('me') me?: any;
  @Prop(Object) comment!: any;
  childComments: any[] = [];
  toggledReply = false;
  toggledEdit = false;
  toggledChildComments = false;
  remove() {
    this.$emit('remove', this.comment.id);
  }
  toggleReply() {
    this.toggledReply = !this.toggledReply;
  }
  toggleEdit() {
    this.toggledEdit = !this.toggledEdit;
  }
  loadChildComments() {
    if (!this.toggledChildComments)
      this.$axios
        .get(
          `/comments?articleId=${this.articleId}&parentCommentId=${this.comment.id}`,
        )
        .then(res => {
          const { success, comments } = res.data;
          if (success) {
            this.childComments = comments;
            this.$set(this.comment, 'childCommentCount', comments.length);
          }
        });
    this.toggledChildComments = !this.toggledChildComments;
  }
  onRemoveComment(id: number) {
    this.$axios.delete(`/comments/${id}`).then(res => {
      const { success } = res.data;
      if (success)
        this.childComments.splice(
          this.childComments.findIndex(v => v.id === id),
          1,
        );
    });
  }
  onWriteComment(success: boolean) {
    this.toggledReply = false;
    if (success && this.toggledChildComments) {
      this.loadChildComments();
    }
  }
  onEditComment(success: boolean, content: any) {
    this.toggledEdit = false;
    if (success) this.comment.content = content;
  }
}
</script>

<style lang="scss">
.comment {
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
  margin-bottom: 10px;
  padding: 10px;
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
  &-more {
    cursor: pointer;
    font-size: 12px;
    margin: 5px 0;
    user-select: none;
    &::before,
    &::after {
      content: '\00a0\00a0\00a0\00a0\00a0';
      text-decoration: line-through;
    }
  }
  &-list {
    margin-top: 10px;
  }
  &-rwriter {
    margin-top: 10px;
  }
}
</style>
