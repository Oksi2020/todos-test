<template>
  <main class="auth">
    <div class="auth__form">
      <header class="auth__form__header">description</header>
      <form class="auth__form__fields" @submit.prevent="submit">
        <p class="auth__form__fields_label">description</p>
        <base-input v-model="username" v-validate="'[a-zA-Z]'"  placeholder="Username"></base-input>
        <base-input v-model="phone" v-validate="'[^a-zA-Z]'" placeholder="Phone number"></base-input>
        <p v-if="loginError" class="auth__form__fields_error">Login error</p>
        <base-button>Register</base-button>
      </form>
    </div>
  </main>
</template>

<script>
export default {
  name: 'AuthPage',
  data: () => ({
    username: '',
    phone: '',
    loginError: false,
    allUsers: []
  }),
  created() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(json => this.allUsers = json)
  },
  methods: {
    submit () {
      const selectedUser = this.allUsers.find(user => user.name === this.username && user.phone === this.phone)

      if (selectedUser) {
        this.$store.dispatch('setUser', selectedUser)
        this.$router.push({ name: 'Home' })
      }
      else this.loginError = true;
    }
  }
}
</script>

<style lang="scss">
.auth {
  background-color: #545454;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  padding: 0 20px;

  &__form {
    max-width: 447px;
    width: 100%;
    background-color: #C3C3C3;
    border-radius: 5px;

    &__header {
      background-color: #A5A5A5;
      height: 51px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 17px;
      color: #5F5F5F;
    }
    &__fields {
      display: flex;
      flex-direction: column;
      gap: 20px;
      padding: 20px 25px 30px;
      &_label {
        margin: 0;
        text-align: left;
        color: #5F5F5F;
        font-size: 15px;
      }
      &_error {
        margin: 0;
        text-align: left;
        color: #FF0000;
        font-size: 15px;
      }
    }
  }
}
</style>
