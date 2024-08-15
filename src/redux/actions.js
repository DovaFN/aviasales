import {
  SET_SORTING,
  TOGGLE_CHECKBOX,
  GET_SEARCH_ID,
  GET_TICKETS,
  SET_FILTER,
  SET_FILTER_ALL,
  LOADER_ON,
  LOADER_OFF,
  SET_ERROR,
} from './types'

const _APIBASE = 'https://aviasales-test-api.kata.academy'

let counter = 0

export function setFilter(value) {
  if (value === 'all') {
    return {
      type: SET_FILTER_ALL,
    }
  }
  return { type: SET_FILTER }
}

export function loaderOn() {
  return { type: LOADER_ON }
}

export function loaderOff() {
  return { type: LOADER_OFF }
}

export function setError(err) {
  return { type: SET_ERROR, err }
}

export function toggleCheckbox(id) {
  return { type: TOGGLE_CHECKBOX, id }
}

export function getSearchId() {
  return async (dispatch) => {
    try {
      dispatch(loaderOn())
      const response = await fetch(`${_APIBASE}/search`)
      if (response.ok) {
        counter = 0
        const jsonData = await response.json()
        dispatch({ type: GET_SEARCH_ID, data: jsonData })
      }
      if (!response.ok) {
        throw new Error(`We have Error, Response Status >> ${response.status}`)
      }
    } catch (err) {
      counter += 1
      if (counter === 3) {
        dispatch(loaderOff())
        dispatch(setError(err))
      }
      if (counter < 3) {
        dispatch(getSearchId())
      }
    }
  }
}

export function setSorting(value) {
  return { type: SET_SORTING, value }
}

export function getTickets(searchId) {
  return async (dispatch) => {
    try {
      dispatch(loaderOn())
      const response = await fetch(`${_APIBASE}/tickets?searchId=${searchId}`)
      if (response.ok) {
        counter = 0
        const jsonData = await response.json()
        dispatch({ type: GET_TICKETS, data: { tickets: jsonData.tickets } })
        if (jsonData.stop) {
          dispatch(loaderOff())
        }
        if (!jsonData.stop) {
          dispatch(getTickets(searchId))
        }
      }
      if (!response.ok) {
        throw new Error(`We have Error, Response Status >> ${response.status}`)
      }
    } catch (err) {
      counter += 1
      if (counter === 3) {
        dispatch(loaderOff)
        dispatch(setError(err))
      }
      if (counter < 3) {
        dispatch(getTickets(searchId))
      }
    }
  }
}
