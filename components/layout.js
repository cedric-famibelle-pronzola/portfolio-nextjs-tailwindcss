import PropTypes from 'prop-types'
import NavBar from './nav-bar'

export default function Layout(props) {
  return (
    <div>
      <NavBar />
      {props.children}
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}
