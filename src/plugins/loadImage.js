// plugins/i18n.js
export default {
  //app: 현재 프로젝에 해당한 객체데이터
  install: (app, options) => {
    // app.config.globalProperties.$플러그인 이름 = 함수 내용
    app.config.globalProperties.$loadImage = (src) =>{
      return new Promise((resolve)=>{
        const img =document.createElement('img')
        img.src = src
        img.addEventListener('load', ()=>{
        resolve()//완료
        })
      })   
    }
  }
}