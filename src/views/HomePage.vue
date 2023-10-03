<template>
  <main class="home">
    <div class="home__user">
      <p>User name: {{ user.name }}</p>
      <p>Phone number: {{ user.phone }}</p>
      <p>Email: {{ user.email }}</p>
      <p>Address: {{ userAddress }}</p>
    </div>
    <h3 class="home__title">Create todo</h3>
    <form class="home__add-todo" @submit.prevent="addTodo">
      <base-input v-model="newTodoUserId" v-validate="'^[0-9]'" type="text" placeholder="User Id" />
      <base-input v-model="newTodoTitle" type="text" placeholder="Title" />
      <p v-if="!isFormValid" class="error">Please, fill up the form correctly!</p>
      <base-button>Add todo</base-button>
    </form>
    <h3 class="home__title">Todos list</h3>
    <div class="home__filters">
      <base-input v-model="search" type="text" placeholder="Search" />
      <base-select v-model="selectedStatus" :options="statusOptions" />
      <base-select v-model="selectedId" :options="idOptions" />
    </div>
    <ul class="home__todos">
      <li v-for="todo in filteredTodos" :key="todo.id" class="home__todos__item">
        <h3>{{ todo.title }}</h3>
        <p>User id: {{ todo.userId }}</p>
        <p>Status: {{ todo.completed ? 'Completed': 'Uncompleted' }}</p>
        <base-button v-if="!isTodoFavourite(todo)" @click.native="addTodoToFavourite(todo)">Add to favourite</base-button>
      </li>
    </ul>
  </main>
</template>

<script>
export default {
  data: () => ({
    todos: [],
    search: '',
    statusOptions: ['all', 'completed', 'uncompleted', 'favourites'],
    isFormValid: true,
    selectedStatus: '',
    selectedId: '',
    newTodoTitle: '',
    newTodoUserId: '',
    favourites: []
  }),
  created() {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(json => this.todos = json)
    const favourites = localStorage.getItem('favourites')
    if (favourites) this.favourites = JSON.parse(favourites)
  },
  computed: {
    user () {
      return this.$store.getters.user
    },
    userAddress () {
      const address = this.$store.getters.user.address
      return address.suite + ', ' + address.street + ', ' + address.city + ', ' + address.zipcode
    },
    filteredTodos () {
      return this.filterTodosByUserId(
          this.filterTodosByStatus(
              this.filterTodosByTitle(this.todos)
          )
      )
    },
    idOptions () {
      return ['all', ...new Set(this.todos.map(todo => todo.userId))]
    }
  },
  methods: {
    filterTodosByTitle (todos) {
      return todos.filter(todo => todo.title.includes(this.search))
    },
    filterTodosByStatus (todos) {
      if (this.selectedStatus === 'completed') return todos.filter(todo => todo.completed)
      if (this.selectedStatus === 'uncompleted') return todos.filter(todo => !todo.completed)
      if (this.selectedStatus === 'favourites') return todos.filter(todo => this.isTodoFavourite(todo))
      return todos
    },
    filterTodosByUserId (todos) {
      if (this.selectedId === 'all') return todos
      return todos.filter(todo => todo.userId === Number(this.selectedId))
    },
    addTodo () {
      if (!this.newTodoUserId || !this.newTodoTitle) {
        this.isFormValid = false
        return
      }

      const newTodo = {
        userId: Number(this.newTodoUserId),
        title: this.newTodoTitle,
        completed: false
      }
      this.todos = [...this.todos, newTodo]
      this.newTodoTitle = ''
      this.newTodoUserId = ''
    },
    addTodoToFavourite (todo) {
      this.favourites = [...this.favourites, todo]
      localStorage.setItem('favourites', JSON.stringify(this.favourites))
    },
    isTodoFavourite (favourite) {
      return this.favourites.some(todo => todo.id === favourite.id)
    }
  }
}
</script>

<style lang="scss">
.home {
  background-color: #545454;
  flex: 1;
  padding: 20px;
  color: #5F5F5F;

  &__user {
    background-color: #A5A5A5;
    color: #5F5F5F;
    padding: 15px 20px;
    border-radius: 10px;
    p {
      margin: 3px 0;
    }
  }
  &__title {
    font-size: 20px;
    color: #FFFFFF;
  }
  &__add-todo {
    display: flex;
    flex-direction: column;
    gap: 20px 10px;
    max-width: 400px;
    margin-bottom: 20px;
    padding: 15px 20px;
    border-radius: 10px;
    background-color: #C3C3C3;
  }
  &__filters {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }
  &__todos {
    list-style: none;
    padding: 0;

    &__item {
      background-color: #C3C3C3;
      padding: 5px 10px;
      border-radius: 10px;
      margin-bottom: 10px;
    }
  }
}
</style>
