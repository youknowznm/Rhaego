import React from 'react'
import ReactDOMServer from 'react-dom/server'
import {connect} from 'react-redux'
import {Typography} from 'material-ui'
import {
  LoadingArea,
  SplitToSpans,
  getOffsetToPage,
  changeDocTitle,
  TransitionWrap,
} from '../../../utils'
import {fetchResume} from '../actions'

const handleScroll = () => {
  const articleNav = document.querySelector('.article-nav')
  if (articleNav !== null) {
    articleNav.style['top'] = `${document.scrollingElement.scrollTop + 24}px`
  }
}

// 返回一个监听函数：使页面滚动到指定元素位置
const getNavClickHandler = (index) => () => {
  if (index === 0) {
    document.scrollingElement.scrollTop = 0
  } else {
    const el = document.querySelector(`#header-anchor-${index - 1}`)
    const top = getOffsetToPage(el).top
    document.scrollingElement.scrollTop = top - 84
  }
}

class Resume extends React.Component {
  constructor() {
    super(...arguments)
    this.state = {
      headerTextArr: [],
    }
  }
  componentDidMount() {
    this.props.thisFetchResume()
    window.addEventListener('scroll', handleScroll)
    changeDocTitle('简历')
  }
  componentDidUpdate(prevProps) {
    if (this.props.getResumeRequestStatus !== prevProps.getResumeRequestStatus) {
      this.getHeaderTextArr()
    }
  }
  getHeaderTextArr = () => {
    const contentHeaderElements = document.querySelectorAll('.resume-content > h1')
    const arr = ['索引']
    Array.prototype.forEach.call(contentHeaderElements, (elem, index) => {
      elem.setAttribute('id', `header-anchor-${index}`)
      arr.push(elem.innerHTML)
      elem.innerHTML = ReactDOMServer.renderToString(<SplitToSpans>{elem.innerHTML}</SplitToSpans>)
    })
    this.setState({
      headerTextArr: arr,
    })
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', handleScroll)
  }
  render() {
    const {
      getResumeStatusMessage,
      getResumeRequestStatus,
      resumeHTML,
    } = this.props
    return (
      <LoadingArea
        status={getResumeRequestStatus}
        failedMsg={getResumeStatusMessage}
      >
        {
          () => (
            <TransitionWrap>
              <div className="article-wrap">
                <h1 className="article-title">
                  <SplitToSpans>{'▇ ▇ 铭'}</SplitToSpans>
                </h1>
                <article
                  className="resume-content mb-article"
                  dangerouslySetInnerHTML={{__html: resumeHTML}}
                />
                <ul className="article-nav">
                  {
                    this.state.headerTextArr.map((headerText, index) => (
                      <Typography type="body2" component="li"
                        key={index}
                        data-header-anchor={index}
                        className="article-nav-anchor"
                        onClick={getNavClickHandler(index)}
                      >
                        {headerText}
                      </Typography>
                    ))
                  }
                </ul>
              </div>
            </TransitionWrap>
          )
        }
      </LoadingArea>
    )
  }
}

const mapState = (state) => {
  return {
    resumeHTML: state.resume.resumeHTML,
    getResumeRequestStatus: state.resume.getResumeRequestStatus,
    getResumeStatusMessage: state.resume.getResumeStatusMessage,
  }
}

const mapDispatch = (dispatch) => ({
  thisFetchResume: (articleId) => {
    dispatch(fetchResume())
  },
})

export default connect(mapState, mapDispatch)(Resume)
