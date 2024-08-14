import { useDispatch, useSelector } from 'react-redux'

import { toggleCheckbox, setFilter } from '../../redux/actions'

import classnames from './FiltersItem.module.scss'

export default function FiltersItem({ data }) {
  const { description, id, value } = data

  const dispatch = useDispatch()

  const checked = useSelector((state) => {
    const { checkboxes } = state.reducer
    const idx = checkboxes.findIndex((el) => el.id === id)
    return checkboxes[idx].checked
  })

  const handleChecked = () => {
    dispatch(toggleCheckbox(id))
    dispatch(setFilter(value))
  }

  const filterClass = checked ? classnames['filter-checked'] : classnames.filter

  return (
    <li className={classnames.item}>
      <label onChange={handleChecked} className={classnames.description}>
        <input value={checked} hidden type="checkbox" />
        <span className={filterClass}> </span> {description}
      </label>
    </li>
  )
}
