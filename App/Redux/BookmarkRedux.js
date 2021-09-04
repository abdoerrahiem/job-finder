import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  createBookmark: {
    id: null,
    image: null,
    title: null,
    company: null,
    salary: null,
  },
  removeBookmark: {
    id: null,
  },
  logout: null,
})

export const BookmarkTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  bookmarks: [],
})

export const createBookmark = (state, action) => {
  return state.merge({ bookmarks: [...state.bookmarks, action] })
}

export const removeBookmark = (state, action) => {
  let updatedBookmarks = [...state.bookmarks]
  updatedBookmarks = updatedBookmarks.filter((upt) => upt.id !== action.id)

  return state.merge({ bookmarks: updatedBookmarks })
}

export const logout = (state) =>
  state.merge({
    bookmarks: [],
  })

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CREATE_BOOKMARK]: createBookmark,
  [Types.REMOVE_BOOKMARK]: removeBookmark,
  [Types.LOGOUT]: logout,
})
