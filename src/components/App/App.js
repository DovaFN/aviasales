import logo from '../../icons/Logo.svg'
import Filters from '../Filters'
import Tickets from '../Tickets'
import Sorting from '../Sorting'
import Spinner from '../Spinner/Spinner'

import classnames from './App.module.scss'

export default function App() {
  return (
    <main className={classnames.main}>
      <header>
        <img className={classnames.logo} src={logo} alt="Aviasales logo" />
      </header>
      <div className={classnames.container}>
        <Filters />
        <Spinner />
        <div>
          <Sorting />
          <Tickets />
        </div>
      </div>
    </main>
  )
}
