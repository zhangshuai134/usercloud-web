<template>
  <div class="b-login clf">
    <div class="b-login-bg">
      <div class="b-login-site">
        <div class="b-login-site-logo">
          <v-icon icon-class="logow"></v-icon>
        </div>
        <div class="b-login-site-info">
          {{ $i18nAdapt('login.introduction') }}
        </div>
      </div>
    </div>
    <div class="b-login-con">
      <v-lang class="b-login-lang" @changeLang="changeLang"/>
      <div v-if="!forgot" class="b-login-con-item">
        <el-form class="b-login-form" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" autocomplete="on" @keydown.enter.native="handleLogin">
          <h1>{{ $i18nAdapt('login.title') }}</h1>
          <el-form-item prop="loginName">
            <el-input name="username" type="text" v-model="loginForm.loginName" autocomplete="on" :placeholder="$i18nAdapt('form.userName')"/>
          </el-form-item>
          <el-form-item prop="pwd">
            <el-input name="password" type="password" v-model="loginForm.pwd" autocomplete="on" :placeholder="$i18nAdapt('form.password')"/>
          </el-form-item>
          <div class="b-login-form-check">
            <el-checkbox class="b-fc" v-model="loginForm.rememberMe">{{ $i18nAdapt('login.remember') }}</el-checkbox>
            <span class="fr forget" @click="forgot = true">{{ $i18nAdapt('login.forgotPass') }}</span>
          </div>
          <el-row class="login-code" type="flex" justify="space-between" v-if="showCode">
            <el-col :span="10">
              <el-tooltip effect="dark" :content="$i18nAdapt('login.captchaCodeTip')" placement="left-start">
                <img :src="codeSrc" alt="" @click="getCode"/>
              </el-tooltip>
            </el-col>
            <el-col :span="10">
              <div class="login-code-box">
                <div class="login-code-box-item">{{ loginForm.captchaCode[0] || placeholder }}</div>
                <div class="login-code-box-item">{{ loginForm.captchaCode[1] || placeholder }}</div>
                <div class="login-code-box-item">{{ loginForm.captchaCode[2] || placeholder }}</div>
                <div class="login-code-box-item">{{ loginForm.captchaCode[3] || placeholder }}</div>
                <input class="login-code-box-input" v-model="loginForm.captchaCode" type="text"/>
              </div>
            </el-col>
          </el-row>
          <el-button type="primary" class="b-login-form-btn" @click.native.prevent="handleLogin">
            {{ $i18nAdapt('login.logIn') }}
          </el-button>
        </el-form>
      </div>
      <!-- 忘记密码 -->
      <div v-else class="b-login-con-item">
                <span class="b-login-back" @click="forgot=false">
                    <i class="el-icon-back"></i>
                    {{ $i18nAdapt('login.backBtn') }}
                </span>
        <div class="b-login-form">
          <h1>{{ $i18nAdapt('login.passwordBack') }}</h1>
          <p>{{ $i18nAdapt('login.forgetPassTip') }}</p>
          <el-form ref="forgetForm" :model="forgetForm" :rules="forgetFormRules" autocomplete="on">
            <el-form-item label="" prop="email">
              <el-input v-model="forgetForm.email" :placeholder="$i18nAdapt('form.RegisteredMail')"></el-input>
            </el-form-item>
          </el-form>
          <el-button type="primary" class="b-login-form-btn" @click="sendMail('forgetForm')">{{ $i18nAdapt('login.confirm') }}</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
    name: 'Login',
    data() {
      var validName = (rule, value, callback) => {
        if (!value) {
          callback(new Error(this.$i18nAdapt('form.usernameTip1')));
        } else {
          callback();
        }
      }
      var validatePass = (rule, value, callback) => {
        if (!value) {
          callback(new Error(this.$i18nAdapt('form.passwordTip1')));
        } else {
          callback();
        }
      }
      var validateCode = (rule, value, callback) => {
        if (!value) {
          callback(new Error(this.$i18nAdapt('form.captchaCodeTip')));
        } else {
          callback();
        }
      }
      var validateEmail = (rule, value, callback) => {
        if (!value) {
          callback(new Error(this.$i18nAdapt('form.RegisteredMailTip1')));
        } else {
          !this.Tool.regs(value, 'isEmail') && callback(new Error(this.$i18nAdapt('form.RegisteredMailTip2')));
          this.Tool.regs(value, 'isEmail') && callback();
        }
      }
      return {
        forgot: false,
        showCode: false,
        loginForm: {
          loginName: null,
          pwd: null,
          captchaCode: '',
          rememberMe: false,
          lang: window.localStorage.getItem('lang') || 'en'
        },
        forgetForm: {
          email: null
        },
        placeholder: '-',
        codeSrc: null,
        codeToken: null,
        loginRules: {
          loginName: [{ validator: validName, trigger: 'blur' }],
          pwd: [{ validator: validatePass, trigger: 'blur' }],
          captchaCode: [{ validator: validateCode, trigger: 'blur' }]
        },
        forgetFormRules: {
          email: [{ validator: validateEmail, trigger: 'blur' }]
        }
      }
    },
    methods: {
      ...mapActions(['aLogin', 'aGetCode', 'aForgetPassword']),

      // 获取验证码
      getCode() {
        this.aGetCode({
          callback: (res) => {
            this.codeSrc = 'data:image/jpeg;base64,' + res.imgSrc;
            this.codeToken = res.token;
          },
          er: () => {
          }
        })
      },

      // 点击登录
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            const params = this.loginForm
            this.codeToken && (params.token = this.codeToken)
            this.aLogin({
              ops: params,
              callback: (res) => {
                if (res.type == 'ok') {
                  this.$changLang(this.loginForm.lang)
                  this.$router.push({path: '/'})
                } else {
                  this.getCode()
                  this.showCode = true
                }
              },
              er: () => {
              }
            })
          } else {
            return false
          }
        })
      },
      // 改变国际化语言
      changeLang(lang) {
        this.forgot && this.$refs['forgetForm'].resetFields();
        !this.forgot && this.$refs['loginForm'].resetFields();
        this.loginForm.lang = lang
      },
      // 忘记密码发送邮件
      sendMail(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            const params = {
              email: this.forgetForm.email,
              lang: this.loginForm.lang
            }
            this.aForgetPassword({
              ops: params,
              callback: (res) => {
                this.$message({
                  message: this.$i18nAdapt('login.sendTip1'),
                  type: 'success'
                });
              }
            })
          }
        })
      }
    }
  }
</script>
<style lang="less" scoped>
  // 验证码样式
  .login-code{
    position: relative;
    width: 100%;
    padding-top: 30px;
    &-box {
      position: relative;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      height:40px;
      &-input {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 10;
        width: 100%;
        height: 40px;
        outline: none;
        color: transparent;
        font-size: 10px;
        background-color: transparent;
      }
      &-item {
        width: 40px;
        height: 40px;
        line-height: 40px;
        font-size: 18px;
        text-align: center;
        background-color: #F6F7FA;
        border-radius: 4px;
        border: 1px solid #E4E6EC;
      }

    }
  }
</style>
