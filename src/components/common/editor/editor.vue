<template>
  <div id="editor1"></div>
</template>

<script>
import E from "wangeditor";
export default {
  name: "editor",
  data () {
    return {
      editor: null,
    };
  },
  methods: {
    initE () {
      this.editor = new E("#editor1");
      this.editor.config.menus = [
        "head",
        "bold",
        "fontSize",
        "fontName",
        "italic",
        "underline",
        "strikeThrough",
        "indent",
        "lineHeight",
        "foreColor",
        "backColor",
        "link",
        "list",
        "todo",
        "justify",
        "quote",
        "emoticon",
        "image",
        "table",
        "code",
        "splitLine",
        "undo",
        "redo",
      ];
      this.editor.create();
    },
  },
  props: {
    content: {
      type: String,
      default: "",
    },
  },
  mounted () {
    this.initE();
    this.editor.txt.clear()
    this.editor.txt.html(this.content);
  },
  watch: {
    content () {
      this.editor.txt.clear()
      this.editor.txt.html(this.content);
    }
  }
};
</script>

<style>
</style>