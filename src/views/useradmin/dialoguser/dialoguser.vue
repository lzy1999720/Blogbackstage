<template>
  <div>
    <el-dialog :title="dialogtitle" :visible.sync="dialogFormVisible">
      <el-form :model="adduseritem" :rules="rules" ref="adduseritem">
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="accountnumber">
          <el-input v-model="adduseritem.accountnumber" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="pwd">
          <el-input v-model="adduseritem.pwd" :type="type" class="pwd-input" placeholder="请输入密码">
            <i slot="suffix" class="icon-style" :class="elIcon" autocomplete="auto" @click="flag = !flag" />
          </el-input>
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth" prop="role">
          <el-select v-model="adduseritem.role" placeholder="请选择活动区域">
            <el-option v-for="(item, index) in rolelist" :key="index" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="电子邮箱" :label-width="formLabelWidth" prop="mailbox">
          <el-input v-model="adduseritem.mailbox" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button @click="resetForm('adduseritem')">重置</el-button>
        <slot>
          <el-button type="primary" @click="adduserinfoitem('adduseritem')">确 定</el-button>
        </slot>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      adduseritem: {
        accountnumber: '',
        pwd: '',
        role: '',
        mailbox: '',
      },
      rules: {
        accountnumber: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 6, message: '长度在 2 到 6 个字符', trigger: 'blur' },
        ],
        pwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          // { max: 6, message: '长度6个字符', trigger: 'blur' },
        ],
        role: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        mailbox: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
        ]
      },
      dialogtitle: "账号修改",
      dialogFormVisible: false,
      formLabelWidth: "120px",
      flag: false,
    };
  },
  props: {
    rolelist: {
      type: [Object, Function, Array],
      default: {},
    },
  },
  computed: {
    type () {
      return this.flag ? "text" : "password";
    },
    elIcon () {
      return this.flag ? "el-icon-view " : "el-icon-minus";
    },
  },
  methods: {
    updateuserinfoitem () {
      this.$refs['adduseritem'].validate((valid) => {
        if (valid) {
          this.dialogFormVisible = false;
          this.$emit("updateuserinfoitem", this.adduseritem);
        } else {
          this.$message.error('请安规则填写')
          return false;
        }
      });
    },
    adduserinfoitem (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogFormVisible = false;
          this.$emit("adduserinfoitem", this.adduseritem);
        } else {
          this.$message.error('请安规则填写')
          return false;
        }
      });
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped>
.icon-style {
  margin-top: 8px;
  font-size: 18px;
}
.pwd-input {
  border: 1px solid #fff;
  width: 250px;
}
</style>