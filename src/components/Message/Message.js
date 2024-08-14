import classnames from './Message.module.scss'

function Message() {
  return <p className={classnames.message}>Рейсов, подходящих под заданные фильтры, не найдено</p>
}

export default Message
