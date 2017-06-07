<template>
  <header class="header">
    <div class="center row">
        <a class="logo" href=""></a>
        <nav class="nav-menu">
            <a href="#">Me</a>
            <a href="#">Portfolio</a>
            <a href="#">Contact</a>
        </nav>
    </div>
  </header> 
</template>
<script>
export default{

}
  
</script>
<style lang="scss">
  .header{
    width: 100%;
    background: #000;
    height: 80px;
    position: fixed;
    .nav-menu{
      a{
        text-decoration:  none;
        text-transform: uppercase;
        margin-right: 10px;
      }
    }
    .row{
      height: 100%;
    }
  }
</style>