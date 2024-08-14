import { useSelector } from 'react-redux'

import FiltersItem from '../FiltersItem/FiltersItem'

import classnames from './Filters.module.scss'

export default function Filters() {
  const filters = useSelector((state) => state.reducer.checkboxes)

  return (
    <div className={classnames.container}>
      <header className={classnames.header}>КОЛИЧЕСТВО ПЕРЕСАДОК</header>
      <ul className={classnames.filters}>
        {filters.map((el) => (
          <FiltersItem key={el.id} data={el} />
        ))}
      </ul>
    </div>
  )
}
