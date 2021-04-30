import React from 'react'
import {
  LOGIN_STATUS_KEY,
  getStorage, isValidString,
} from "~utils"
import {siteNameCondensed} from '~config'

export const MainContext = React.createContext({
  hasLoggedIn: false,
  markLogin: () => {},
  markLogout: () => {},
  docTitle: '',
  bannerTitle: '',
  setDocTitle: () => {},
  setBannerTitle: () => {},
})

export class MainProvider extends React.Component {

  state = {
    hasLoggedIn: false,
    docTitle: '',
    bannerTitle: '',
  }

  componentDidMount() {
    this.setState({
      hasLoggedIn: getStorage(LOGIN_STATUS_KEY),
    })
  }

  markLogin = () => {
    this.setState({
      hasLoggedIn: true
    })
  }

  markLogout = () => {
    this.setState({
      hasLoggedIn: false
    })
  }

  setDocTitle = docTitle => {
    this.setState({
      docTitle
    })
    document.title = isValidString(docTitle)
      ? `${docTitle} · ${siteNameCondensed}`
      : siteNameCondensed
  }

  setBannerTitle = bannerTitle => {
    this.setState({
      bannerTitle
    })
  }

  render() {
    const value = {
      hasLoggedIn: this.state.hasLoggedIn,
      docTitle: this.state.docTitle,
      bannerTitle: this.state.bannerTitle,
      markLogin: this.markLogin,
      markLogout: this.markLogout,
      setDocTitle: this.setDocTitle,
      setBannerTitle: this.setBannerTitle,
    }
    return (
      <MainContext.Provider value={value}>
        {this.props.children}
      </MainContext.Provider>
    )
  }

}

export const MainConsumer = MainContext.Consumer