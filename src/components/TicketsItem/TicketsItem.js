import uniqid from 'uniqid'
import { add, format } from 'date-fns'

import classnames from './TicketsItem.module.scss'

export default function TicketsItem({ data }) {
  const { price, segments, carrier } = data

  const there = { ...segments[0] }
  const back = { ...segments[1] }
  const logo = `https://pics.avs.io/110/36/${carrier}.png`

  return (
    <li className={classnames.item}>
      <header className={classnames.header}>
        <h1 className={classnames.price}>{price}</h1>
        <img className={classnames.logo} src={logo} alt="Airlines logo" />
      </header>
      <TicketsItemLine key={uniqid()} data={there} />
      <TicketsItemLine key={uniqid()} data={back} />
    </li>
  )
}

function TicketsItemLine({ data }) {
  const { destination, duration, origin, stops, date: dateOrigin } = data

  const date = new Date(dateOrigin)
  const newDate = add(date, { minutes: duration })

  const hours = Math.floor(duration / 60)
  const minutes = duration - hours * 60

  const transfers = (!stops.length && 'ПЕРЕСАДОК') || (stops.length === 1 && 'ПЕРЕСАДКA') || 'ПЕРЕСАДКИ'

  return (
    <div className={classnames.line}>
      <div className={classnames.col}>
        <p className={classnames['col-header']}>
          {origin} – {destination}
        </p>
        <p>
          {format(date, 'HH:mm')} - {format(newDate, 'HH:mm')}
        </p>
      </div>
      <div className={classnames.col}>
        <p className={classnames['col-header']}>В ПУТИ</p> <p>{`${hours}ч ${minutes}м`}</p>
      </div>
      <div className={classnames.col}>
        <p className={classnames['col-header']}>{`${stops.length} ${transfers}`}</p>
        <p>{stops.join(',')}</p>
      </div>
    </div>
  )
}
