<template>
  <div class="table">
    <el-row class="top" :gutter="20">
      <el-col :span="1.5">
        <div class="grid-content bg-purple">
          <el-button type="primary" icon="el-icon-delete" @click="Deletegroup"></el-button>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-input placeholder="请输入标题" v-model="input" clearable>
          </el-input>
        </div>
      </el-col>
      <el-col :span="3.5">
        <div class="grid-content bg-purple">
          <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        </div>
      </el-col>
      <el-col :span="3.5">
        <div class="grid-content bg-purple">
          <el-button type="primary" icon="el-icon-plus" @click.native="addarticle">添加</el-button>
        </div>
      </el-col>
    </el-row>
    <el-table :data="articletabledata" @selection-change="handleSelectionChange" style="width: 100%">
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column label="id" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.aid }}</span>
        </template>
      </el-table-column>
      <el-table-column label="标题" width="200">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="类型" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">
            <el-tag size="medium">{{ scope.row.aclass }}</el-tag>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="发表日期" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{
            scope.row.releasetime | format(scope.row.releasetime)
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="热度" width="180">
        <template slot-scope="scope">
          {{ scope.row.fabulous }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row class="bottom" :gutter="20">
      <div class="block">
        <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pagesize" layout="total,prev, pager, next, jumper" :total="tableData.length">
        </el-pagination>
      </div>
    </el-row>
    <dialogmsg ref="dialogmsg" :artitem="artitem" @addarticleitem="addarticleitem" :aclass="articleclass" @upclick="op" />
  </div>
</template>

<script>
import dialogmsg from "components/common/dialog/dialog.vue";
import msgbox from "components/common/msgbox/msgbox.vue";

import { selectarticledata } from "network/article.js";
import { formatTime } from "common/utils.js";
import { addarticles, removearticles, search } from "network/article";
let that = null;


export default {
  name: "articlesAdmin",
  data () {
    return {
      artitem: Object,
      tableData: [],
      articleclass: [],
      input: "",
      currentPage: 1,
      pagesize: 5,
      multipleSelection: [],
      selectedData: [],
      removegroup: [],
      artindex: 0,
    };
  },
  props: {},
  components: {
    dialogmsg,
    msgbox,
  },
  created () {
    selectarticledata().then((data) => {                              //获取文章数据
      this.tableData = data[0];
      this.articleclass = data[1];
    }).catch(err => {
    })
  },
  computed: {
    articletabledata () {                                           //计算分页
      return this.tableData.slice((this.currentPage - 1) * this.pagesize, this.currentPage * this.pagesize);
    },
  },
  filters: {
    artclass (cid) {
      if (cid) {
        return that.articleclass[cid - 1].aclassvalue;
      }
      return "";
    },
    format (time) {
      return formatTime(time);
    },
  },
  beforeCreate () {
    that = this;
  },
  methods: {
    handleEdit (index, row) {                                   //文章编辑
      console.log(this.user)
      this.artindex = index;
      this.artitem = Object.assign({}, row);
      (this.$refs.dialogmsg.dialogFormVisible = !this.$refs.dialogmsg.dialogFormVisible);
    },
    handleDelete (index, row) {                                    //文章删除
      this.$confirm("此操作将永久删除该文章, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.tableData.splice(index, 1);
          removearticles(row.aid).then((res) => {
            if (!res.success) {
              this.$message.error(res.msg);
              return;
            }
            this.$message({
              type: "success",
              message: res.msg,
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    addarticle () {                                        //添加文章
      this.artitem = { state: 1 };
      (this.$refs.dialogmsg.dialogFormVisible = !this.$refs.dialogmsg.dialogFormVisible);
      (this.$refs.dialogmsg.dialogtitle = "添加博文");
      (this.$refs.dialogmsg.dialogmodifydate = "添加时间");
    },
    addarticleitem () {
      addarticles(this.artitem)
        .then((res) => {
          if (res.success) {
            this.$message({
              showClose: true,
              message: res.msg,
              type: "success",
            });
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
    },
    handleCurrentChange (val) {
      this.currentPage = val;
    },
    op (t) {
      this.tableData.splice(
        this.pagesize * this.currentPage - this.pagesize + this.artindex, 1, t
      );
    },
    handleSelectionChange (val) {
      this.multipleSelection = val;
    },
    Deletegroup () {                                  //多选删除
      if (!this.multipleSelection.length) {
        this.$message.warning("未选中");
        return;
      }
      this.$confirm("此操作将永久删除该文章, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.multipleSelection
          .forEach((element) => {
            this.tableData.forEach((item, index) => {
              if (item.aid == element.aid) {
                this.removegroup.push(element.aid);
                this.tableData.splice(index, 1);
              }
            });
            removearticles(this.removegroup).then((res) => {
              if (!res.success) {
                this.$message.error(res.msg);
                return;
              }
              this.$message({
                type: "success",
                message: res.msg,
              });
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      });
    },
    search () {                                         //文章标题搜索
      if (!this.input) {
        this.$message({
          showClose: true,
          message: "查询不能为空！",
          type: "warning",
        });
        return;
      }
      search(this.input).then((res) => {
        if (res.state) {
          this.tableData = res.categoryitem;
          this.$message({
            showClose: true,
            message: res.msg,
            type: "success",
          });
          return;
        }
        this.$message.error(res.msg)
      });
    },
  },
};
</script>

<style>
.top,
.bottom {
  padding: 30px 0;
  background-color: #fff !important;
  margin-left: 0 !important;
  margin-right: 0 !important;
}

.el-col {
  border-radius: 4px;
  padding: 0 10px !important;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  background-color: #f9fafc;
}

/* .table {
} */
.el-main {
  padding: 0;
}

.cell {
  text-align: center !important;
}

.el-row {
  background-color: cornflowerblue;
}

.block {
  margin-top: 20px;
}
</style>
