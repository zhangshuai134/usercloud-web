<template>
    <div class="b-con">
        <v-top :title="$i18nAdapt('accountSetting.accountSetting')"></v-top>
        <el-form ref="form" :model="form" :rules="rules" label-position="top" class="b-form t-border-top">
            <v-fitem :title="$i18nAdapt('accountSetting.basicInfo')" :desc="$i18nAdapt('accountSetting.basicInfoTip')">
                <el-form-item :label="$i18nAdapt('accountSetting.accountName')" prop="name">
                    <el-input v-model="form.name" type="text" maxlength="20"></el-input>
                </el-form-item>
                <el-form-item :label="$i18nAdapt('accountSetting.accountAuth')" prop="auth">
                    <el-input v-model="form.roleName" type="text" disabled></el-input>
                </el-form-item>
                <el-form-item :label="$i18nAdapt('accountSetting.email')" prop="email">
                    <el-input v-model="form.email" type="text" disabled></el-input>
                </el-form-item>
            </v-fitem>
            <v-fitem :title="$i18nAdapt('accountSetting.language')" :desc="$i18nAdapt('accountSetting.languageTip')">
                <el-form-item :label="$i18nAdapt('accountSetting.selectLanguage')" prop="language">
                    <el-select v-model="form.lang">
                        <el-option v-for="item in languageList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
            </v-fitem>
            <v-fitem :title="$i18nAdapt('accountSetting.changePass')" :desc="$i18nAdapt('accountSetting.changePassTip')">
                <el-form-item :label="$i18nAdapt('accountSetting.oldPass')" prop="oldPassword">
                    <el-input v-model="form.oldPassword" type="password" :placeholder="$i18nAdapt('accountSetting.oldPassPlaceholder')" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item :label="$i18nAdapt('accountSetting.newPass')" prop="newPassword">
                    <el-input v-model="form.newPassword" type="password" :placeholder="$i18nAdapt('accountSetting.newPassPlaceholder')" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item :label="$i18nAdapt('accountSetting.confirmPass')" prop="confirmPassword">
                    <el-input v-model="form.confirmPassword" type="password" :placeholder="$i18nAdapt('accountSetting.confirmPassPlaceholder')" autocomplete="off"></el-input>
                </el-form-item>
            </v-fitem>
        </el-form>
        <div class="b-input-foot">
            <el-col :span="16" :offset="8" class="t-txl">
                <el-button type="primary" v-waves @click="submitForm('form')" :loading="loading">{{ $i18nAdapt('form.confirm') }}</el-button>
                <el-button type="primary" v-waves plain @click="resetForm('form')">{{ $i18nAdapt('form.reset') }}</el-button>
            </el-col>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapState } from 'vuex'
    export default {
        name: 'accountSetting',
        data() {
            var validName = (rule, value, callback) => {
                if (!value) {
                    callback(new Error(this.$i18nAdapt('accountSetting.nameErrorTip')));
                } else {
                    callback();
                }
            }
            var validateOldPass = (rule, value, callback) => {
                if (this.form.newPassword) {
                    !value && callback(new Error(this.$i18nAdapt('accountSetting.oldPassErrorTip1')))
                    value && callback();
                } else {
                    callback();
                }
            }
            var validateNewPass = (rule, value, callback) => {
                if (value) {
                    !this.Tool.regs(value, 'isPassword') && callback(new Error(this.$i18nAdapt('accountSetting.passwordRuleError')));
                    (value === this.form.oldPassword) && callback(new Error(this.$i18nAdapt('accountSetting.passwordRuleError')));
                    (this.Tool.regs(value, 'isPassword') && (value !== this.form.oldPassword)) && callback();
                } else {
                    this.form.oldPassword && callback(new Error(this.$i18nAdapt('accountSetting.newPassErrorTip1')));
                    !this.form.oldPassword && callback();
                }
            }
            var validatePass = (rule, value, callback) => {
                if (this.form.newPassword && value !== this.form.newPassword) {
                    callback(new Error(this.$i18nAdapt('accountSetting.newPassErrorTip3')));
                } else {
                    callback();
                }
            }
            return {
                loading: false,
                form: {
                    name: null,
                    auth: null,
                    email: null,
                    roleName: '',
                    lang: window.localStorage.getItem('lang') || 'en',
                    oldPassword: null,
                    newPassword: null,
                    confirmPassword: null
                },
                languageList: [
                    { label: this.$i18nAdapt('accountSetting.chinese'), value: 'zh' },
                    { label: this.$i18nAdapt('accountSetting.English'), value: 'en' },
                    { label: this.$i18nAdapt('accountSetting.Japanese'), value: 'ja' }
                ],
                rules: {
                    name: [
                        { validator: validName, trigger: 'blur' }
                    ],
                    oldPassword: [
                        { validator: validateOldPass, trigger: 'blur' }
                    ],
                    newPassword: [
                        { validator: validateNewPass, trigger: 'blur' }
                    ],
                    confirmPassword: [
                        { validator: validatePass, trigger: 'blur' }
                    ]
                }
            }
        },
        computed: {
            ...mapState(['userInfos'])
        },
        created() {
            this.getInfo()
        },
        methods: {
            ...mapActions(['aGetAccountInfo', 'aUpdateAccount']),
            getInfo() {
                this.form = { ...this.form, ...this.userInfos }
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.loading = true
                        const params = {
                            oldPwd: this.form.oldPassword,
                            newPwd: this.form.newPassword,
                            userName: this.form.name,
                            lang: this.form.lang
                        }
                        this.aUpdateAccount({
                            ops: params,
                            callback: (res) => {
                                this.loading = false
                                this.$changLang(this.form.lang)
                                this.aGetAccountInfo(() => {
                                    this.resetForm('form')
                                })
                                this.$message({
                                    message: this.$i18nAdapt('tips.operationOk'),
                                    type: 'success'
                                });
                            },
                            er: () => {
                                this.loading = false
                                this.$message({
                                    message: this.$i18nAdapt('tips.operationFail'),
                                    type: 'error'
                                });
                            }
                        })
                    } else {
                        console.log('error submit!!', this.form);
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.getInfo()
            }
        }
    }
</script>
<style lang="less" scoped>
    .b-form{
        padding-top: 20px;
    }
</style>
