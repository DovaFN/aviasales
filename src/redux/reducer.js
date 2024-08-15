import uniqid from 'uniqid'

import {
  SET_SORTING,
  TOGGLE_CHECKBOX,
  GET_SEARCH_ID,
  GET_TICKETS,
  SET_FILTER_ALL,
  SET_FILTER,
  LOADER_OFF,
  LOADER_ON,
  SET_ERROR,
} from './types'

const createFilter = (text, value) => ({ id: uniqid(), description: text, checked: true, value })

const arr = [
  createFilter('Все', 'all'),
  createFilter('Без пересадок', 0),
  createFilter('1 пересадка', 1),
  createFilter('2 пересадки', 2),
  createFilter('3 пересадки', 3),
]

const initialState = {
  filters: {},
  checkboxes: arr,
  tickets: [],
  searchId: '',
  sorting: 'fast',
  loading: true,
  error: { hasError: false, message: '' },
}

const reducer = (state, action) => {
  switch (action.type) {
    case TOGGLE_CHECKBOX: {
      const { checkboxes } = state
      const { id } = action
      const idx = checkboxes.findIndex((el) => el.id === id)
      const checked = !checkboxes[idx].checked
      const { description } = checkboxes[idx]
      const valueCopy = checkboxes[idx].value
      const newCheckbox = {
        id,
        checked,
        value: valueCopy,
        description,
      }
      return { ...state, checkboxes: [...checkboxes.slice(0, idx), newCheckbox, ...checkboxes.slice(idx + 1)] }
    }

    case GET_SEARCH_ID: {
      return { ...state, searchId: action.data.searchId }
    }

    case LOADER_ON: {
      return { ...state, loading: true }
    }

    case LOADER_OFF: {
      return { ...state, loading: false }
    }

    case SET_ERROR: {
      return { ...state, error: { hasError: true, message: action.err.message } }
    }

    case SET_SORTING: {
      return { ...state, sorting: action.value }
    }
    case GET_TICKETS: {
      const { tickets: newTickets } = action.data
      const { tickets } = state
      return { ...state, tickets: [...tickets, ...newTickets] }
    }

    case SET_FILTER_ALL: {
      const { checkboxes } = state
      const filtersMap = checkboxes.reduce((acc, dec) => {
        acc[dec.value] = dec.checked
        return acc
      }, {})
      const newCheckBoxes = checkboxes.map((el) => {
        if (el.value === 'all') {
          return { ...el, checked: !!el.checked }
        }
        return { ...el, checked: filtersMap.all }
      })
      return { ...state, checkboxes: newCheckBoxes, filters: filtersMap }
    }
    case SET_FILTER: {
      const { checkboxes } = state
      const filtersMap = checkboxes.reduce((acc, dec) => {
        acc[dec.value] = dec.checked
        return acc
      }, {})

      const checkboxesCopy = checkboxes.slice(1)
      const everyCh = checkboxesCopy.every((el) => el.checked)

      const newCheckBoxes = checkboxes.map((el) => {
        if (el.value === 'all' && everyCh) {
          return { ...el, checked: true }
        }
        if (el.value !== 'all' && everyCh) {
          return { ...el, checked: true }
        }
        if (el.value === 'all') {
          return { ...el, checked: false }
        }
        return { ...el, checked: el.checked }
      })
      return { ...state, checkboxes: newCheckBoxes, filters: filtersMap }
    }

    default: {
      return initialState
    }
  }
}

export default reducer
