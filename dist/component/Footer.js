import html from '../library/core.js'
import { connect } from '../library/store.js'

function Footer({ todos, filters, filter }) {
    return html`
     <footer class="footer">
        <span class="todo-count"><strong>${todos.filter(filters.active).length}</strong> item left</span>
        <ul class="filters">
        ${Object.keys(filters).map((key) => html`
            <li>
                <a class="${filter === key && 'selected'}"
                    href="#"
                    onclick="dispatch('changeFilter', '${key}')"
                 >
                    ${key[0].toUpperCase() + key.slice(1)}
                </a>
            </li>`)
        }
        </ul>
        ${todos.filter(filters.completed).length > 0 && html`
            <button 
                class="clear-completed"
                onclick="dispatch('deleteCompleted')"
            >
                Clear completed
            </button> `
        }
        </footer>
    `
}

export default connect()(Footer);