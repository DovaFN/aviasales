import uniqid from 'uniqid'
import classNames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'

import { setSorting } from '../../redux/actions'

import classnames from './Sorting.module.scss'

export default function Sorting() {
  const active = useSelector((state) => state.reducer.sorting)
  const dispatch = useDispatch()

  const handleSorting = (e) => {
    dispatch(setSorting(e.target.value))
  }

  const createSorting = (description, value) => ({ description, value })

  const sortingItems = [
    createSorting('САМЫЙ ДЕШЕВЫЙ', 'cheap'),
    createSorting('САМЫЙ БЫСТРЫЙ', 'fast'),
    createSorting('ОПТИМАЛЬНЫЙ', 'optimal'),
  ]

  return (
    <div className={classnames.container}>
      {sortingItems.map((el) => {
        const className = active === el.value ? classNames(classnames.button, classnames.active) : classnames.button
        return (
          <button key={uniqid()} onClick={handleSorting} value={el.value} className={className} type="button">
            {el.description}
          </button>
        )
      })}
    </div>
  )
}
