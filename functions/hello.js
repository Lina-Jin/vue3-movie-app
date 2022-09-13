exports.handler = async function (event, context) {
  return {
    statusCode: 200, // 정상적인 응답 의미
    body: JSON.stringify({
      heropy: 'Heropy?!'
    }) //서버리스 함수로 응답시켜줄 데이터 
  }
}