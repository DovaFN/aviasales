import { useSelector } from 'react-redux'

import classnames from './Message.module.scss'

function Message() {
  const hasError = useSelector((state) => state.reducer.error.hasError)

  const message = hasError
    ? 'Упс, у нас возникла ошибка, но мы уже работаем над ее решением!'
    : 'Рейсов, подходящих под заданные фильтры, не найдено'

  const className = hasError ? classnames['error-message'] : classnames.message

  return <p className={className}>{message}</p>
}

export default Message
