<template>
  <div>
    <el-table :data="commentdata" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="留言用户">
              <span>{{ props.row.user }}</span>
            </el-form-item>
            <el-form-item label="所属博文">
              <span>{{ props.row.title }}</span>
            </el-form-item>
            <el-form-item label="留言 ID">
              <span>{{ props.row.lid }}</span>
            </el-form-item>
            <el-form-item label="留言时间">
              <span>{{ props.row.ltime | ltime(props.row.ltime) }}</span>
            </el-form-item>
            <el-form-item label="所属博文">
              <span>{{ props.row.aclass }}</span>
            </el-form-item>
            <el-form-item label="邮箱地址">
              <span>{{ props.row.mailbox }}</span>
            </el-form-item>
            <el-form-item label="留言内容">
              <span>{{ props.row.lvalue }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="评论 ID" prop="lid" width="100px">
      </el-table-column>
      <el-table-column label="评论人" prop="user" width="200px">
      </el-table-column>
      <el-table-column label="博文类别" width="200">
        <template slot-scope="props">
          <el-tag type="danger">{{ props.row.aclass }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="评论时间" width="200">
        <template slot-scope="props">
          <div>{{ props.row.ltime | ltime(props.row.ltime) }}</div>
        </template>
      </el-table-column>
      <el-table-column label="是否展示" prop="isexamine">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.isexamine" @change="changeSwitch(scope.row.isexamine, scope.$index)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="删除">
        <template slot-scope="scope">
          <el-button type="danger" icon="el-icon-delete" circle @click="deleteLeavewordItem(scope.$index, scope.row.lid)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row class="bottom" :gutter="20">
      <div class="block">
        <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pagesize" layout="total,prev, pager, next, jumper" :total="comment.length">
        </el-pagination>
      </div>
    </el-row>
  </div>
</template>

<script>
import { formatTime } from "common/utils.js";
import {
  getleaveingword,
  updateCommentStatus,
  deleteComment,
} from "network/comment.js";

export default {
  name: "commentAdmin",
  data () {
    return {
      value3: false,
      comment: [],
      currentPage: 1,
      pagesize: 5,
    };
  },
  created () {
    getleaveingword() //请求留言数据
      .then((res) => {
        res.forEach((item) => {
          item.isexamine = Boolean(item.isexamine);
        });
        this.comment = res;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  computed: {
    ltimes () {
      return this.ltime();
    },
    commentdata () {                             //评论分页
      return this.comment.slice((this.currentPage - 1) * this.pagesize, this.currentPage * this.pagesize);
    }
  },
  filters: {
    ltime (time) {
      return formatTime(time);
    },
  },
  methods: {
    changeSwitch (isshow, index) {                              //是否展示留言
      let lid = this.comment[index].lid;
      let isexamine = this.comment[index].isexamine;
      updateCommentStatus(lid, isexamine)
        .then((res) => {
          if (res.state) {
            this.$message.success(res.msg);
            return;
          }
          this.$message.error(res.msg);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteLeavewordItem (index, lid) {                                   //评论删除
      this.$confirm("此操作将永久删除该评论, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteComment(lid)
            .then((res) => {
              if (res.state) {
                this.$message.success(res.msg);
                this.comment.splice(index, 1);
                return;
              }
              this.$message.error(res.msg);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleCurrentChange (val) {                     //传递当前页
      this.currentPage = val;
    },
  },
};
</script>

<style>
.demo-table-expand {
  font-size: 0;
}

.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.top,
.bottom {
  padding: 30px 0;
  background-color: #fff !important;
  margin-left: 0 !important;
  margin-right: 0 !important;
}
</style>
