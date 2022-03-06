import React from 'react'
import PropTypes from 'prop-types'
import './Header.css'
import debounce from 'lodash.debounce'
const Header = ({ onInputChange }) => {
  const onChange = (event) => {
    const text = event.target.value
    return onInputChange(text)
  }
  const onChangeDebounce = debounce(onChange, 1000)
  return (
    <header className="header">
      <label>
        <input type="text" className="search" placeholder="Type to search..." onChange={onChangeDebounce} />
      </label>
    </header>
  )
}

Header.propTypes = {
  onInputChange: PropTypes.func,
}

Header.defaultProps = {
  onInputChange: () => {},
}
export default Header
