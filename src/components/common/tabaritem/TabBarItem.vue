<template>
  <div @click="clicklink" class="tabbaritem">
    <div>
      <slot name="tabbaritem">
        <i class="el-icon-location"></i>
        <span>默认标题</span>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabBarItem',
  props: {
    path: {
      type: String,
      required: true
    }
  },
  methods: {
    clicklink () {
      this.$router.replace(this.path)
    }
  }
}
</script>

<style>
.tabbaritem{
	padding: 0;
}
</style>
