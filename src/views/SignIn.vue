<template>
  <div id="SignIn">
    <div class="label">아이디</div>
    <input class="input" v-model="username" />
    <div class="label">비밀번호</div>
    <input
      class="input"
      v-model="password"
      type="password"
      @keydown.enter="login()"
    />
    <button class="btn btn-beige btn-login" @click="login()">로그인</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class SignIn extends Vue {
  username = '';
  password = '';
  mounted() {
    if (this.$store.state.me) this.$router.back();
  }
  login() {
    this.$axios
      .post('/auth/authorize', {
        username: this.username,
        password: this.password,
      })
      .then(res => {
        const { success, refreshToken } = res.data;
        if (success) {
          localStorage.setItem('refreshToken', refreshToken);
          localStorage.setItem('generated', new Date().toString());
          this.$store.commit('token', new Date().getTime());
          this.$router.push('/');
        }
      });
  }
}
</script>

<style lang="scss">
#SignIn {
  .btn-login {
    margin-top: 10px;
  }
}
</style>
