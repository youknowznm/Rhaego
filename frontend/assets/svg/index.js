import React from 'react'
import PropTypes from 'prop-types'

class Svg extends React.Component {
  static propTypes = {
    fillType: PropTypes.oneOf(['default', 'light', 'dark']),
    width: PropTypes.number,
    height: PropTypes.number,
    path: PropTypes.string.isRequired,
    className: PropTypes.string,
    defaultFill: PropTypes.string.isRequired, // 默认 fill 颜色
  }
  static defaultProps = {
    fillType: 'default',
    className: '',
    width: 24,
    height: 24,
  }
  get computedFill() {
    const {
      fillType,
      defaultFill,
    } = this.props
    if (fillType === 'default') {
      return defaultFill
    }
    if (fillType === 'dark') {
      return 'rgba(0, 0, 0, .7)'
    }
    if (fillType === 'light') {
      return '#fff'
    }
  }
  render() {
    const {
      width,
      height,
      path,
      className,
    } = this.props
    return (
      <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        height={`${height}px`}
        viewBox="0 0 24 24"
        width={`${width}px`}
        fill={this.computedFill}
      >
        <path d="M0 0h24v24H0V0z" fill="none"/>
        <path d={path}/>
      </svg>
    )
  }
}

export const SvgHeart = props => (
  <Svg
    path={'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'}
    defaultFill={'#E91E63'}
    {...props}
  />
)

export const SvgComment = props => (
  <Svg
    path={'M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM20 4v13.17L18.83 16H4V4h16zM6 12h12v2H6zm0-3h12v2H6zm0-3h12v2H6z'}
    defaultFill={'#607D8B'}
    {...props}
  />
)