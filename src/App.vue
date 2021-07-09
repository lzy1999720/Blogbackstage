<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted(){
    this.$router.replace('/articlesadmin');
  },
}
</script>

<style>

</style>
