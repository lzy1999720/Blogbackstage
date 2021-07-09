<template>
  <div>
    <el-dialog :title="dialogtitle" :visible.sync="dialogFormVisible">
      <el-form :model="artitem">
        <el-form-item label="文章标题" :label-width="formLabelWidth">
          <el-input v-model="artitem.title" style="width: 300px" autocomplete="off" modal="true"></el-input>
        </el-form-item>
        <el-form-item label="文章类型" :label-width="formLabelWidth">
          <el-select v-model="artitem.aclass" placeholder="请选择活动区域">
            <el-option v-for="item in aclass" :key="item.aclassid" :value="item.aclassvalue" :label="item.aclassvalue">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="dialogmodifydate" style="margin-left: 13px">
          <el-date-picker type="date" v-model="artitem.releasetime" placeholder="选择日期" value-formate="timestamp">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="热度" style="margin-left: 13px">
          <el-input v-model="artitem.fabulous" style="width: 100px" autocomplete="off" modal="true">
          </el-input>
        </el-form-item>
        <el-form-item>
          <label style="margin-left: 13px">博文编辑</label>
          <editor-1 ref="edit" :content="artitem.content"></editor-1>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import editor1 from "../editor/editor.vue";
import { updatearticle } from "network/article.js";
import { formatTime } from "common/utils.js";
export default {
  name: "dialogmsg",
  components: {
    editor1,
  },
  data () {
    return {
      dialogtitle: "博文修改",
      dialogmodifydate: "修改时间",
      dialogFormVisible: false,
      formLabelWidth: "80px",
      pickerOptions1: {
        disabledDate (time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick (picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick (picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick (picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
    };
  },
  computed: {
  },
  filters: {},
  props: {
    artitem: {
      type: [Object, Function],
      default: {},
    },
    aclass: {
      type: [Array, Function],
      default: {},
    },
  },
  methods: {
    submit () {
      this.artitem.releasetime = formatTime(this.artitem.releasetime);
      this.artitem.content = this.$refs.edit.editor.txt.html()
      if (this.artitem.state > 0) {
        this.$emit('addarticleitem', this.artitem)
        this.dialogFormVisible = false;
        return;
      }
      updatearticle(this.artitem)
        .then((res) => {
          if (res.state) {
            this.$emit("upclick", this.artitem);
            this.$message({
              showClose: true,
              message: res.msg,
              type: "success",
            });
            this.dialogFormVisible = false;
            return;
          }
          this.$message({
            showClose: true,
            message: res.msg,
            type: "error",
          });
        })
        .catch((err) => {
          console.log(err);
        });
      this.dialogFormVisible = false;
    },
  },
};
</script>

<style>
</style>