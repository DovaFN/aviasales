import { Hourglass } from 'react-loader-spinner'
import { useSelector } from 'react-redux'

import classnames from './Spinner.module.scss'

function Spinner() {
  const spinner = useSelector((state) => state.reducer.loading)
  return (
    <div className={classnames.loader}>
      <Hourglass
        visible={spinner}
        height="50"
        width="50"
        ariaLabel="hourglass-loading"
        wrapperStyle={{}}
        wrapperClass=""
        colors={['#306cce', '#72a1ed']}
      />
    </div>
  )
}

export default Spinner
