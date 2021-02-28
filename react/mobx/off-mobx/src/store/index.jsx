import StyleStore from './StyleStore';
import UserStore from './UserStore';
import TodoStore from '../TodoList/store'

export default {
  StyleStore,
  UserStore,
  TodoStore: new TodoStore()
}