import {
  SET_SORTING,
  TOGGLE_CHECKBOX,
  GET_SEARCH_ID,
  GET_TICKETS,
  SET_FILTER,
  SET_FILTER_ALL,
  LOADER_ON,
  LOADER_OFF,
} from './types'

const _APIBASE = 'https://aviasales-test-api.kata.academy'

export function setFilter(value) {
  if (value === 'all') {
    return {
      type: SET_FILTER_ALL,
    }
  }
  return { type: SET_FILTER }
}

export function toggleCheckbox(id) {
  return { type: TOGGLE_CHECKBOX, id }
}

export function getSearchId() {
  return async (dispatch) => {
    try {
      const response = await fetch(`${_APIBASE}/search`)
      const jsonData = await response.json()
      dispatch({ type: GET_SEARCH_ID, data: jsonData })
    } catch (err) {
      dispatch(getSearchId())
    }
  }
}

export function setSorting(value) {
  return { type: SET_SORTING, value }
}

export function loaderOn() {
  return { type: LOADER_ON }
}

export function loaderOff() {
  return { type: LOADER_OFF }
}

let moreTickets = []

function getMoreTickets(searchId) {
  return async (dispatch) => {
    try {
      const response = await fetch(`${_APIBASE}/tickets?searchId=${searchId}`)
      const jsonData = await response.json()
      if (!jsonData.stop) {
        moreTickets = [...moreTickets, ...jsonData.tickets]
        dispatch(getMoreTickets(searchId))
      }
      if (jsonData.stop) {
        moreTickets = [...moreTickets, ...jsonData.tickets]
        dispatch({ type: GET_TICKETS, data: { tickets: moreTickets } })
        dispatch(loaderOff())
      }
    } catch (err) {
      dispatch(getMoreTickets(searchId))
    }
  }
}

export function getTickets(searchId) {
  return async (dispatch) => {
    try {
      dispatch(loaderOn())
      const response = await fetch(`${_APIBASE}/tickets?searchId=${searchId}`)
      const jsonData = await response.json()
      dispatch({ type: GET_TICKETS, data: { tickets: jsonData.tickets } })

      if (!jsonData.stop) {
        dispatch(getMoreTickets(searchId))
      }
    } catch (err) {
      dispatch(getTickets(searchId))
    }
  }
}
