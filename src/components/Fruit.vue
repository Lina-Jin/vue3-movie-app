<template>
<h1>{{name}}</h1>
</template>

<script>
export default {
  props: {          
    name: {             //name이라는 이름으로 어떤 데이터를 받음 ★default값을 지정해줄 수 있다.
      type: String,         //데이터의 타입은 String
      default: ''          //name의 default값을 설정해줘야한다. => 데이터가 들어오지 않는 경우 출력
    }
  }
}
</script>