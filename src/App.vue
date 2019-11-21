<template>
  <div class="container">
      <router-view/>
    <!-- <location></location> -->
  </div>
</template>
<script>
// import Location from "./components/Location"
export default {
  // components:{
  //   Location
  // } 
  watch:{
         $route(to,from){
    if(from.path == '/city'){
      location.reload();
    }
  },
  immediate:true
  }
}
</script>