<template>
  <div id="app">
    <Loading fixed black :value="!boards" />
    <div class="nav">
      <div class="container">
        <router-link to="/" class="nav-item nav-brand"
          >무명 커뮤니티</router-link
        >
        <router-link
          v-for="board in boards"
          :to="'/board/' + board.id"
          :key="board.id"
          class="nav-item"
        >
          {{ board.name }}
        </router-link>
        <div class="spacer" />
        <template v-if="me">
          <router-link to="/mypage" class="nav-item">내정보</router-link>
          <div class="nav-item" @click="logout()">로그아웃</div>
        </template>
        <template v-else>
          <router-link to="/signin" class="nav-item">로그인</router-link>
          <router-link to="/signup" class="nav-item">회원가입</router-link>
        </template>
      </div>
    </div>
    <router-view class="container page" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { State } from 'vuex-class';
import '@/assets/scss/global.scss';

@Component
export default class App extends Vue {
  @State('token') token!: string | null;
  @State('me') me: any;
  @State('boards') boards: any;

  @Watch('token')
  onTokenChanged() {
    this.getMe();
  }

  mounted() {
    this.$axios
      .get('/boards')
      .then(res => {
        const { success, boards } = res.data;
        if (success) this.$store.commit('boards', boards);
      })
      .catch(() => {});
    this.getMe();
  }

  logout() {
    this.$axios.post('/auth/revoke').then(() => {
      this.$store.commit('me', null);
      this.$store.commit('token', null);
      localStorage.removeItem('refreshToken');
    });
  }

  getMe() {
    this.$axios
      .get('/me')
      .then(res => {
        const { success, me } = res.data;
        if (success) this.$store.commit('me', me);
      })
      .catch(() => {});
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap');
#app {
  font-family: 'Noto Sans KR', 'Malgun Gothic', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #000000;
}

body {
  margin: 0;
}

.nav {
  padding: 20px 0;
  background-color: #f4989c;
  margin-bottom: 20px;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.3);
  .container {
    display: flex;
  }

  &-item {
    font-weight: bold;
    color: #ffffff;
    text-decoration: none;
    cursor: pointer;
    font-size: 18px;
    margin-right: 20px;
    text-align: center;

    &.router-link-exact-active {
      color: #e0373f;
    }
  }
  &-brand {
    margin-right: 40px;
  }
}

.page {
  position: relative;
  display: flex;
  flex-direction: column;
}
</style>
