import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'antd'
import uniqid from 'uniqid'

import Message from '../Message/Message'
import TicketsItem from '../TicketsItem/TicketsItem'
import { getSearchId, getTickets } from '../../redux/actions'

import classnames from './Tickets.module.scss'

export default function Tickets() {
  const dispatch = useDispatch()

  const searchId = useSelector((state) => state.reducer.searchId)
  const tickets = useSelector((state) => state.reducer.tickets)
  const filters = useSelector((state) => state.reducer.checkboxes)
  const sorting = useSelector((state) => state.reducer.sorting)
  const [toShowCounter, setToShowCounter] = useState(0)

  useEffect(() => {
    dispatch(getSearchId())
    setToShowCounter(10)
  }, [])

  useEffect(() => {
    if (searchId) {
      dispatch(getTickets(searchId))
    }
  }, [searchId])

  const filteredTickets = tickets.filter((item) => {
    if (filters[0].checked) {
      return true
    }
    return filters.some(
      (el) => (el.value === item.segments[0].stops.length || el.value === item.segments[1].stops.length) && el.checked
    )
  })

  const toSortTickets = (arr, value) => {
    if (value === 'cheap') {
      const cheapArr = arr.sort((a, b) => a.price - b.price)
      return cheapArr
    }
    if (value === 'fast') {
      const fastArr = arr.sort(
        (a, b) => a.segments[0].duration + a.segments[1].duration - (b.segments[0].duration + b.segments[1].duration)
      )
      return fastArr
    }
    const optimalArr = arr.sort(
      (a, b) =>
        a.price / (a.segments[0].duration + a.segments[1].duration) -
        b.price / (b.segments[0].duration + b.segments[1].duration)
    )
    return optimalArr
  }

  const sortedTickets = toSortTickets(filteredTickets, sorting)

  const toShowMore = () => {
    setToShowCounter(() => toShowCounter + 5)
  }

  const toShowTickets = sortedTickets
    ? sortedTickets.slice(0, toShowCounter).map((item) => <TicketsItem key={uniqid()} data={item} />)
    : null

  const difference = filteredTickets.length - toShowTickets.length
  const descriptionEnd = (difference === 5 && 'ТОВ') || (difference > 1 && 'ТА') || 'Т'

  return (
    <div className={classnames.container}>
      <ul>
        {(filteredTickets.length !== 0 && toShowTickets) || <Message />}
        {difference ? (
          <Button onClick={toShowMore} className={classnames.more} type="primary">
            {difference > 5 ? 'ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ' : `ПОКАЗАТЬ ЕЩЕ ${difference} БИЛЕ${descriptionEnd}`}
          </Button>
        ) : null}
      </ul>
    </div>
  )
}
