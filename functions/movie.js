const axios = require('axios')
const OMDB_API_KEY = process.env.OMDB_API_KEY

exports.handler = async function (event) {
  console.log(event)//
  //4. 문자데이터를 객체데이터로 변환하여 변수에 저장
  const payload = JSON.parse(event.body)
  const { title, type, year, page, id } = payload;
  const url = id 
    ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}` 
    : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`;
  // const url = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}`;

  try {
    const {data} = await axios.get(url)
    if (data.Error){
      return {
        statusCode: 400,
        body: data.Error
      }
    }
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    }
  } catch (error) {
    return {
      statusCode: error.response.status,
      body: error.message
    }
  }
}