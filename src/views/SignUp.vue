<template>
  <div id="SignUp">
    <div class="label">닉네임</div>
    <input class="input" v-model="nickname" />
    <div class="label">아이디</div>
    <input class="input" v-model="username" />
    <div class="label">비밀번호</div>
    <input
      class="input"
      v-model="password"
      type="password"
      @keydown.enter="signup()"
    />
    <button class="btn btn-beige btn-signup" @click="signup()">회원가입</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class SignUp extends Vue {
  nickname = '';
  username = '';
  password = '';
  mounted() {
    if (this.$store.state.me) this.$router.back();
  }
  signup() {
    this.$axios
      .post('/auth/signup', {
        nickname: this.nickname,
        username: this.username,
        password: this.password,
      })
      .then(res => {
        const { success } = res.data;
        if (success) this.$router.push('/signin');
      });
  }
}
</script>

<style lang="scss">
#SignUp {
  .btn-signup {
    margin-top: 10px;
  }
}
</style>
