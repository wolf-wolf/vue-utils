<template>
  <div id="app">
    <ul>
      <li class="img-item-wrapper" v-for="src in imgList">
        <img class="img-item" v-img-lazy-loader:avatar="src">
      </li>
    </ul>

    <HelloWorld/>
  </div>
</template>

<script>
  import HelloWorld from './components/HelloWorld'

  export default {
    name: 'App',
    components: {
      HelloWorld
    },
    data() {
      return {
        imgList: []
      }
    },
    created() {
      setTimeout(() => {
        this.imgList = [].concat([
          'http://img06.tooopen.com/images/20170928/tooopen_sy_225841273973.jpg',
          'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=555866542,4051847146&fm=27&gp=0.jpg',
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524828312705&di=83d4cc891cdf1a8e379e6816465cff45&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F3812b31bb051f81959d814bed0b44aed2f73e741.jpg'
        ])
      }, 3000)
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  .img-item-wrapper {
    list-style: none;
  }

  .img-item {
    width: 400px;
    height: 400px;
  }
</style>
