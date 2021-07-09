<template>
  <div>
    <el-row class="top" :gutter="20">
      <el-col :span="3.5">
        <div class="grid-content bg-purple">
          <el-button type="primary" icon="el-icon-plus" @click="adduser">新增</el-button>
        </div>
      </el-col>
    </el-row>
    <el-table :data="userdata" style="width: 100%">
      <!-- <el-table-column type="selection" width="55"> </el-table-column> -->
      <el-table-column label="编号" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户" width="120">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.accountnumber }}</span>
        </template>
      </el-table-column>
      <el-table-column label="角色" width="120">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.role }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="创建日期" width="225">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{
            scope.row.creationtime | creationtime(scope.row.creationtime)
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="邮箱" width="180">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.mailbox }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <dialoguser ref="dialoguser" :rolelist="rolelist" @updateuserinfoitem="updateuserinfoitem">
      <el-button type="primary" @click="updateuser">更 新</el-button>
    </dialoguser>
    <dialoguser ref="dialoguser1" :rolelist="rolelist" @adduserinfoitem="adduserinfoitem" />
  </div>
</template>

<script>
import { formatTime } from "common/utils.js";
import { getuser, deleteuser, updateduser, adduserinfo } from "network/user.js";

import dialoguser from "./dialoguser/dialoguser.vue";
export default {
  name: "leavingAdmin",
  components: {
    dialoguser,
  },
  data () {
    return {
      userdata: [],
      useritem: {},
      useritemindex: Number,
      rolelist: ["普通用户", "管理员", "超级管理员"],
    };
  },
  created () {
    getuser().then((res) => {
      this.userdata = res;
    });
  },
  filters: {
    creationtime (time) {
      return formatTime(time);
    },
  },
  methods: {
    adduser () {
      (this.$refs.dialoguser1.dialogFormVisible = !this.$refs.dialoguser1.dialogFormVisible);
      this.$refs.dialoguser1.dialogtitle = "添加用户";
    },
    adduserinfoitem (datauser) {                              //添加用户
      datauser.creationtime = formatTime(Date())
      adduserinfo(datauser).then(res => {
        if (res.state) {
          this.$message.success(res.msg)
          this.userdata.push(datauser)
          return;
        }
        this.$message.error(res.msg)
      })
    },
    updateuser () {
      this.$refs.dialoguser.updateuserinfoitem()
    },
    updateuserinfoitem (data) {                             //更新用户
      updateduser(data).then((res) => {
        if (res.state) {
          this.userdata.splice(this.useritemindex, 1, data);
          this.$message.success(res.msg);
          return;
        }
        this.$message.error(res.msg);
      });
    },
    handleEdit (index, row) {                                    //用户编辑
      this.useritem = Object.assign({}, row);
      this.useritemindex = index;
      this.$refs.dialoguser.adduseritem = this.useritem;
      (this.$refs.dialoguser.dialogFormVisible = !this.$refs.dialoguser.dialogFormVisible);
    },
    handleDelete (index, row) {                                       //用户删除
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteuser(row.id).then((res) => {
            if (res.state) {
              this.$message.success(res.msg);
              this.userdata.splice(index, 1);
              return;
            }
            this.$message.error(res.msg);
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>
