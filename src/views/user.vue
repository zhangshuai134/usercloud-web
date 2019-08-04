<template>
    <div class="b-con">
        <v-top :title="$i18nAdapt('route.user')"></v-top>
        <el-row :gutter="20" class="b-search">
            <el-col :span="4">
                <section class="b-insm">
                    <div class="b-insm-label">{{ $i18nAdapt('user.loginName') }}</div>
                    <el-input v-model="ca.loginName" :placeholder="$i18nAdapt('pop.all')" clearable></el-input>
                </section>
            </el-col>
            <el-col :span="2">
                <section class="b-insm">
                    <div class="b-insm-label"></div>
                    <div class="b-insm-input">
                        <el-button type="primary" v-waves @click="handleFilter">{{ $i18nAdapt('pop.apply') }}</el-button>
                    </div>
                </section>
            </el-col>
            <el-col :span="18" style="text-align: right">
                <section class="b-insm">
                    <div class="b-insm-label"></div>
                    <div class="b-insm-input">
                        <el-button type="primary" icon="el-icon-circle-plus-outline" @click.native="handleCreate">{{ $i18nAdapt('user.create') }}</el-button>
                    </div>
                </section>
            </el-col>
        </el-row>

        <div class="b-table t-shadow" v-if="res.result && res.result.length">
            <el-table :data="res.result || []" border fit highlight-current-row style="width:100%;" header-row-class-name="b-thead">
                <el-table-column :label="$i18nAdapt('user.loginName')" min-width="60px" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.loginName }}</span>
                    </template>
                </el-table-column>
                <el-table-column :label="$i18nAdapt('user.name')" min-width="60px" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.name }}</span>
                    </template>
                </el-table-column>
                <el-table-column :label="$i18nAdapt('user.email')" min-width="60px" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.email }}</span>
                    </template>
                </el-table-column>
                <el-table-column :label="$i18nAdapt('user.roleName')" min-width="40px" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.enname }}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" :label="$i18nAdapt('activeTable.actions')" min-width="50px" fixed="right">
                    <template slot-scope="scope">
                        <div class="b-table-action">
                            <span class="el-icon-edit" @click="editUser(scope.row)"></span>
                            <span class="el-icon-delete" @click="deleteUser(scope.row.id)"></span>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <div class="b-page" v-if="res.totalCount && (res.totalCount > 10)">
                <el-pagination :current-page="query.pageNum" :page-sizes="[10, 20, 30, 40]" :page-size="query.pageSize" :total="res.totalCount || 0" layout="prev, pager, next, sizes, total" background @size-change="handleSizeChange" @current-change="handleCurrentChange"></el-pagination>
            </div>
        </div>
        <!--添加/编辑渠道弹框-->
        <el-dialog :title="isEdit ? $i18nAdapt('form.edit') : $i18nAdapt('form.create')" :visible.sync="dialogChannelVisible" width="600px" class="b-dialog" @close="closeDialog('channelForm')">
            <el-form :rules="channelFormRules" ref="channelForm" :model="channelForm" label-position="right" label-width="100px" class="line-36">
                <el-form-item label="User ID" v-show="false">
                    <el-input v-model="channelForm.id"></el-input>
                </el-form-item>
                <el-form-item :label="$i18nAdapt('user.loginName')" prop="loginName" required >
                    <el-input v-model="channelForm.loginName"></el-input>
                </el-form-item>
                <el-form-item :label="$i18nAdapt('user.password')" prop="password" required v-if="passwordShow">
                    <el-input type="password" readonly onfocus="this.removeAttribute('readonly');" v-model="channelForm.password"></el-input>
                </el-form-item>
                <el-form-item :label="$i18nAdapt('user.name')" prop="name" required>
                    <el-input v-model="channelForm.name"></el-input>
                </el-form-item>
                <el-form-item :label="$i18nAdapt('user.email')" prop="email" required>
                    <el-input v-model="channelForm.email"></el-input>
                </el-form-item>
                <el-form-item :label="$i18nAdapt('user.phone')">
                    <el-input v-model="channelForm.phone"></el-input>
                </el-form-item>
                <el-form-item :label="$i18nAdapt('user.roleName')">
                    <el-select v-model="channelForm.roleId" :label="$i18nAdapt('activeMag.select')" class="b-insm-input" prop="type" required>
                        <el-option v-for="item in roleList" :key="item.id" :label="item.enname" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogChannelVisible = false" plain>{{ $i18nAdapt('form.cancel') }}</el-button>
                <el-button type="primary" @click="submitForm('addUser')" v-if="!isEdit">{{ $i18nAdapt('form.save') }}</el-button>
                <el-button type="primary" @click="submitForm('updateUser')" v-else>{{ $i18nAdapt('form.save') }}</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    export default {
        name: 'user',
        filters: {
        },
        data() {
            return {
                res: {},
                date: [],
                query: {
                    loginName: '',
                    pageNum: 1,
                    pageSize: 10
                },
                ca: {
                    loginName: ''
                },
                chanlist: [],
                total: {},
                isEdit: false,
                dialogChannelVisible: false,
                passwordShow: true,
                roleList: [],
                channelForm: {
                    id: null,
                    loginName: null,
                    password: null,
                    name: null,
                    email: null,
                    phone: null,
                    roleId: null
                },
                channelFormRules: {
                    loginName: [{ required: true, message: this.$i18nAdapt('form.emptyTip'), trigger: 'blur' }],
                    password: [{ required: true, message: this.$i18nAdapt('form.emptyTip'), trigger: 'blur' }],
                    name: [{ required: true, message: this.$i18nAdapt('form.emptyTip'), trigger: 'blur' }],
                    email: [{ required: true, message: this.$i18nAdapt('form.RegisteredMailTip1'), trigger: 'blur' },
                            { type: 'email', message: this.$i18nAdapt('form.RegisteredMailTip2'), trigger: ['blur', 'change']}
                            ]
                },
                id: null,
                loginName: null,
                password: null,
                name: null,
                email: null,
                phone: null
            }
        },
        computed: {
            ...mapState(['user'])
        },
        created() {
            this.getList()
            this.getRole()
        },
        methods: {
            ...mapActions(['aCommon']),
            getRole() {
                const _this = this;
                this.aCommon({
                    ur: 'getRoleAll',
                    ops: {},
                    cb(list) {
                        _this.roleList = JSON.parse(JSON.stringify(list || {}));
                    }
                })
            },
            getList() {
                const _this = this;
                this.aCommon({
                    ur: 'getUserList',
                    ops: this.query,
                    cb(list) {
                        (!list.result || !list.result.length)
                        _this.res = JSON.parse(JSON.stringify(list || {}));
                        _this.total = JSON.parse(JSON.stringify(list.dataTotal || {}));
                    }
                })
            },
            handleFilter() {
                this.query = {...this.query, ...this.ca}
                this.query.pageNum = 1
                this.getList()
            },
            handleSizeChange(val) {
                this.query.pageNum = 1
                this.query.pageSize = val
                this.getList()
            },
            handleCurrentChange(val) {
                this.query.pageNum = val
                this.getList()
            },
            deleteUser(val) {
                this.aCommon({
                    ur: 'deleteUserById',
                    ops: {id: val},
                    cb: t => {
                        this.$message.success(this.$i18nAdapt('relateb.gok'));
                        this.getList();
                        this.otip = false;
                    },
                    er: er => {
                        this.otip = false;
                    }
                })
            },
            // 弹框数据回填
            editUser(row) {
                this.isEdit = true;
                this.dialogChannelVisible = true;
                this.passwordShow = false;
                this.channelForm.id = row.id;
                this.channelForm.loginName = row.loginName;
                this.channelForm.password = row.password;
                this.channelForm.name = row.name;
                this.channelForm.email = row.email;
                this.channelForm.phone = row.phone;
                this.channelForm.roleId = row.roleId;
            },
            // 用户表单创建提交
            submitForm(api) {
                this.$refs['channelForm'].validate((valid) => {
                    if (valid) {
                        const params = JSON.parse(JSON.stringify(this.channelForm))
                        this.aCommon({
                            ur: api,
                            ops: params,
                            cb: t => {
                                this.$message.success(this.$i18nAdapt('relateb.gok'));
                                this.dialogChannelVisible = false
                                this.getList();
                                this.otip = false;
                            },
                            er: er => {
                                this.otip = false;
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                })
            },
            // jobt弹框
            handleCreate() {
                this.isEdit = false
                this.dialogChannelVisible = true
                this.passwordShow = true
            },
            initChannelForm() {
                this.channelForm = {
                    id: null,
                    loginName: null,
                    password: null,
                    name: null,
                    email: null,
                    phone: null,
                    roleId: null
                }
            },
            closeDialog(formName) {
                this.$nextTick(() => {
                    this.$refs[formName].resetFields()
                    this.initChannelForm()
                })
            }
        }
    }
</script>
<style>
    .line-36 .el-form-item__label {line-height: 36px !important;}
</style>
