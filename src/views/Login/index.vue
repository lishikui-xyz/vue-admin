<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li
          v-for="item in menuTab"
          :key="item.id"
          :class="{ current: item.current }"
          @click="toggleMenu(item)"
        >
          {{ item.txt }}
        </li>
      </ul>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="login-form"
        size="medium"
      >
        <el-form-item prop="username" class="item-form">
          <label for="">邮箱</label>
          <el-input
            type="text"
            v-model="ruleForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password" class="item-form">
          <label for="">密码</label>
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
            maxlength="20"
            minlength="6"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="password2"
          class="item-form"
          v-show="model === 'register'"
        >
          <label for="">重复密码</label>
          <el-input
            type="password"
            v-model="ruleForm.password2"
            autocomplete="off"
            maxlength="20"
            minlength="6"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code" class="item-form">
          <label for="">验证码</label>
          <el-row :gutter="11">
            <el-col :span="15">
              <el-input
                type="text"
                v-model="ruleForm.code"
                autocomplete="off"
                maxlength="6"
                minlength="6"
              ></el-input>
            </el-col>
            <el-col :span="9">
              <el-button type="success" class="block">获取验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button
            type="danger"
            @click="submitForm('ruleForm')"
            class="block login-btn"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {
  stripScript,
  validateEmail,
  validatePass,
  checkCode,
} from "/src/utils/validate.js";
export default {
  name: "login",
  component: {},
  data() {
    //验证邮箱
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (validateEmail(value)) {
        callback(new Error("用户名格式不正确"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    //验证密码
    var validatePassword = (rule, value, callback) => {
      //过滤后的密码值
      this.ruleForm.password = stripScript(value);
      value = this.ruleForm.password;

      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (validatePass(value)) {
        callback(new Error("密码至少包含 数字和英文，长度6-20"));
      } else {
        callback();
      }
    };
    //验证重复密码
    var validatePassword2 = (rule, value, callback) => {
      //过滤后的密码值
      if (this.model === "login") {
        callback();
      }
      this.ruleForm.password2 = stripScript(value);
      value = this.ruleForm.password2;

      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("重复密码不正确"));
      } else {
        callback();
      }
    };
    //验证验证码
    var validateCode = (rule, value, callback) => {
      //过滤后的验证码
      this.ruleForm.code = stripScript(value);
      value = this.ruleForm.code;
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else if (checkCode(value)) {
        callback(new Error("验证码格式有误"));
      } else {
        callback();
      }
    };
    return {
      menuTab: [
        { txt: "登录", current: true, type: "login" },
        { txt: "注册", current: false, type: "register" },
      ],
      //模块
      model: "login",
      ruleForm: {
        username: "",
        password: "",
        password2: "",
        code: "",
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        password2: [{ validator: validatePassword2, trigger: "blur" }],
        code: [{ validator: validateCode, trigger: "blur" }],
      },
    };
  },
  created() {},
  mounted() {},
  methods: {
    toggleMenu(data) {
      this.menuTab.forEach((elem) => {
        elem.current = false;
      });
      data.current = true;
      this.model = data.type;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
#login {
  background-color: #344a5f;
  height: 100vh;
}
.login-wrap {
  width: 300px;
  margin: 0 auto;
}
.menu-tab {
  text-align: center;
  li {
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 16px;
    color: #fff;
    border-radius: 2px;
    cursor: pointer;
  }
  .current {
    background-color: rgba(0, 0, 0, 0.1);
  }
}
.login-form {
  margin-top: 29px;
  label {
    display: block;
    margin-bottom: 3px;
    font-size: 14px;
    color: white;
  }
  .item-form {
    margin-bottom: 13px;
  }
  .block {
    width: 100%;
    display: block;
  }
  .login-btn {
    margin-top: 19px;
  }
}
</style>
