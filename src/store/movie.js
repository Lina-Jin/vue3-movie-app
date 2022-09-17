import axios from 'axios'
import _uniqBy from 'lodash/uniqBy'

const _defaultMessage = 'Search for the movie title!'


export default {
  namespaced : true,
  state: () => ({
    movies: [],
    message: _defaultMessage,
    loading: false,
    theMovie: {}

}),
  getters: {  },
  mutations: {
    updateState(state, payload) {
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    },
      resetMovies(state) {
      state.movies = []
      state.message=_defaultMessage
      state.loading = false
    }
  },
  actions: {
    async searchMovies({state,commit}, payload) {
      if(state.loading) return //동시에 여러번 발생하는 것을 방지

      commit('updateState', {
        message: '',  //메세지 초기화
        loading: true,
      })
      
      try {
        const res = await _fetchMovie({
          ...payload,
          page:1
        })
        const {Search, totalResults} = res.data
        commit('updateState', {
          movies: _uniqBy(Search, 'imdbID')
        })
        console.log(totalResults)
        console.log(typeof totalResults)//string
  
        const total = parseInt(totalResults, 10) //숫자로변환
        const pageLength = Math.ceil(total / 10) //10개씩 가져오면 총 몇개의 페이지를 가져와야하는지 체크
  
        //추가요청
        if(pageLength > 1) {  //pageLength가 1이라면 한개의 페이지로 모든 정보를 가지고 온것을 유추할 수 있다. 따라서 그렇지 않은 경우
          for(let page = 2; page <=pageLength; page++) {
            if(page > ( payload.number /10)) break //로직이 하나므로 한줄로
            const res = await _fetchMovie({
              ...payload,
          page
            })
            const {Search} = res.data
            commit('updateState', {
              movies: [...state.movies, ..._uniqBy(Search, 'imdbID')] //기존데이터 + 새로가져온 데이터
            })
          }
        }
      } catch ({message}){
        commit('updateState', {
          movies: [], //초기화          
          message
        }) //✅error객체를 구조분해하여 message를 꺼내여 사용
      } finally {
        commit('updateState', {
          loading: false
        })
      }
    },
    async searchMovieWithId({state, commit}, payload) { //비동기를 통해 가져오므로 async를 붙임.
      if(state.loading) return
      commit('updateState', {
        theMovie: {},
        loading: true,
      })
      try {
        const res = await _fetchMovie(payload)
        console.log(res)

        commit('updateState', {
          theMovie: res.data
        })
      } catch (error) {
        commit('updateState', {
          theMovie: {}
        })
      }finally {
        commit('updateState', {
          loading: false
        })
      }
    }
  }
}

async  function _fetchMovie(payload) {
  // 서버리스 함수로 처리
  //post메소드를 통해 로컬에 서버리스 함수 주소로 payload를 인수로 특정데이터 요청, payload는 body라는 객체 데이터에 포함되여 전송됨 
  return await axios.post('/.netlify/functions/movie', payload)

  // const {title, type, year, page, id} = payload  
  // const OMDB_API_KEY = '7035c60c'
  // const url = id  //삼항연산자를 이용해 작성
  // ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}`
  // : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`
  
  // return new Promise((resolve, reject) => {
  //   axios.get(url)
  //     .then(res => {
  //       if(res.data.Error) {
  //         reject(res.data.Error)
  //       }
  //       resolve(res)
  //     })
  //     .catch((err) => {
  //       reject(err.message) //axios.get의 경우 에러발생시 에러 객체가 넘어갑니다. 그내부의 message속성을 반환시킵니다.
  //     })
  // })

}