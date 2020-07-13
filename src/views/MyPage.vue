<template>
  <div id="MyPage" v-if="me">
    <h2>내정보</h2>
    <div class="my-profile">
      <div
        class="my-profile-icon"
        :style="{ backgroundImage: `url(${me.icon || profileIcon})` }"
      />
      <div class="col">
        <div class="my-profile-nickname">{{ me.nickname }}</div>
        <div class="my-profile-createdAt">
          {{ me.createdAt | moment('YYYY년 MM월 DD일 가입') }}
        </div>
      </div>
    </div>
    <h4>내가 작성한 게시글</h4>
    <ArticleList class="my-articles" :articles="articles" mini />
    <h4>내가 작성한 댓글</h4>
    <div class="my-comments mini">
      <div class="my-comment my-comment-head">
        <div class="my-comment-id">번호</div>
        <div class="my-comment-content">내용</div>
        <div class="my-comment-writer">작성자</div>
        <div class="my-comment-createdAt">작성일</div>
      </div>
      <div class="my-comment" v-for="comment in comments" :key="comment.id">
        <div class="my-comment-id">{{ comment.id }}</div>
        <div class="my-comment-content">{{ comment.content }}</div>
        <div class="my-comment-writer">{{ comment.writer.nickname }}</div>
        <div class="my-comment-createdAt">
          {{ getDate(comment.createdAt) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';
import ArticleList from '@/components/ArticleList.vue';

import moment from 'moment';

const profileIcon = require('@/assets/img/profile.svg');

const now = new Date();

@Component({ components: { ArticleList } })
export default class MyPage extends Vue {
  @State('me') me: any;
  profileIcon = profileIcon;
  articles = null;
  comments = null;
  created() {
    this.$axios.get('/articles/my').then(res => {
      const { success, articles } = res.data;
      if (success) this.articles = articles;
    });
    this.$axios.get('/comments/my').then(res => {
      const { success, comments } = res.data;
      if (success) this.comments = comments;
    });
  }
  mounted() {
    if (!this.me) this.$router.push('/');
  }
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
#MyPage {
  .my {
    &-profile {
      display: flex;
      align-items: center;
      &-icon {
        width: 64px;
        height: 64px;
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
        margin-right: 20px;
      }
      &-nickname {
        font-size: 24px;
        line-height: 1;
        margin-bottom: 5px;
      }
      &-createdAt {
        line-height: 1;
      }
    }
    &-comment {
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
      &s {
        display: flex;
        flex-direction: column;
        &.mini {
          font-size: 14px;
          .my-comment {
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
      &-content {
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
  }
}
</style>
