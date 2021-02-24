import { VisibilityFilters } from './actionTypes'

const initState = {
  visibilityFilter: VisibilityFilters.SHOW_ALL,
  todos: []
}

// function todoApp (state, action) {
//   if (typeof state === 'undefined') {
//     return initState
//   }
//   return state
// }

function todoApp (state = initState, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return Object.assign({}, state, { visibilityFilter: action.filter })
    default:
      return state
  }
  return state
}