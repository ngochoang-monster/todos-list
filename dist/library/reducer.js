import localStorage from '../util/storeage.js'
const init = {
    todos: localStorage.get(),
    filter: 'all',
    filters: {
        all: () => true,
        active: todo => !todo.completed,
        completed: todo => todo.completed,
    },
    editIndex: null,
}

const actions = {
    add({ todos }, title) {
        if (title) {
            todos.push({ title, completed: false })
            localStorage.set(todos)
        }
    },
    toggle({ todos }, index) {
        var todo = todos[index]
        todo.completed = !todo.completed
        localStorage.set(todos)
    },
    toggleAll({ todos }, isChecked) {
        todos.forEach(todo => todo.completed = isChecked)
        localStorage.set(todos)
    },
    destroy({ todos }, index) {
        todos.splice(index, 1)
        localStorage.set(todos)
    },
    deleteCompleted(state) {
        state.todos = state.todos.filter(state.filters.active)
        localStorage.set(state.todos)
    },
    changeFilter(state, value) {
        state.filter = value
    },
    startEdit(state, index) {
        state.editIndex = index
    },
    endEdit(state, title) {
        if (state.editIndex !== null) {
            if (title) {
                state.todos[state.editIndex].title = title
                localStorage.set(state.todos)
            } else {
                this.destroy(state, state.editIndex)
            }
            state.editIndex = null
        }
    },
    cancelEdit(state) {
        state.editIndex = null
    }
}

export default function reducer(state = init, action, args) {
    actions[action] && actions[action](state, ...args)
    return state
}