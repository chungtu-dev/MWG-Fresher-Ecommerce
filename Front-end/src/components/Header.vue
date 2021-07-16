<template>
    <div class="header">
      <div class="header-title">
        <span class="title">{{title}}</span>
      </div>
      <div class="header-path">
          Home  {{path}}
      </div>
    </div>
</template>
<script>
export default {
    props:['title','path']
}
</script>
<style>
    .header{
        height: 110x;
        padding: 34px 0px;
        background-color: #29434f;
        color: white;
        margin-bottom: 22px;
    }
    .header-title{
        font-size: 2.8rem;

    }
    .header-path{

    }
</style>