import {FETCH_GITHUB} from './actionTypes'
import {createReducer} from 'redux-action-tools'

export default createReducer()
  .when(FETCH_GITHUB, (state, action) => {
    return {
      ...state,
      status: 'loading',
    }
  })
  .done((state, action) => {
    const data = action.payload.data
    let productsArr = data.sort((p1, p2) => {
      return -(p1.stargazers_count - p2.stargazers_count)
    })
    return {
      ...state,
      status: 'completed',
      statusMsg: '获取成功。',
      productsArr,
    }
  })
  .failed((state, action) => {
    return {
      ...state,
      status: 'failed',
      statusMsg: '获取失败。请稍后重试。',
      productsArr: [],
    }
  })
  .build({
    status: 'initial',
    productsArr: [],
    statusMsg: '',
  })
