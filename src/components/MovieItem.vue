<template>
  <RouterLink
    :to="`/movie/${movie.imdbID}`"
    :style="{backgroundImage: `url(${movie.Poster})`}"
    class="movie">
    <Loader 
    v-if="imageLoading" 
    :size= "1.5" 
    absolute/>
    <div class="info">
      <div class="year">
        {{ movie.Year }}
      </div>
      <div class="title">
        {{ movie.Title }}
      </div>
    </div>
  </RouterLink>
</template>

<style lang="scss" scoped>
  
    .movie {
      $width: 200px;
      width: $width;
      height: $width * 3 / 2;
      margin: 10px;
      border-radius: 4px;
      background-color: $gray-400;
      background-size: cover;
      overflow: hidden;
      position: relative;
      &:hover::after {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        border: 6px solid $primary;
      }
      .info {
        background-color: rgba($black, .3);
        position: absolute;
        width: 100%;
        padding: 14px;
        font-size: 14px;
        text-align: center;
        left: 0;
        bottom: 0;
        backdrop-filter: blur(10px);
        .year{
          color: $primary
        }
        .title {
          color: $white;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  </style>

<script>
import Loader from '~/components/Loader'

export default {
  components:{
    Loader,
},
  props: {
    movie: {
      type: Object,
      default: () => ({      })
    }
  },
  //로딩 중인지 판단하는 데이터 생성, 초기값은 true 즉 이미지가 로딩중
  data(){
    return {
      imageLoading: true
    }
  },
  mounted (){
    this.init() //컴포넌트가 연결된직후에 init메소드 동작(html 요소가 생성된후 동작 되여야므로 creat사용 안함)
  },
  methods:{
    //초기화 메소드 생성하여 imageLoading 데이터값을 false 즉 이미지가 로드 완료됨으로 수정
    async init(){
      const poster = this.movie.Poster;
      if(!poster || poster === "N/A") {
        this.imageLoading =false
      } else {
        await this.$loadImage(poster)
      this.imageLoading = false
      }
      
    }
  }
}
</script>