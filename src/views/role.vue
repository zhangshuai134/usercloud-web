<template>
    <div class="b-con">
        <v-top :title="$i18nAdapt('route.role')"></v-top>
        <el-row :gutter="20" class="b-search">
            <el-col :span="4">
                <section class="b-insm">
                    <div class="b-insm-label">中文名</div>
                    <el-input v-model="ca.name" placeholder="中文名" clearable></el-input>
                </section>
            </el-col>
            <el-col :span="2">
                <section class="b-insm">
                    <div class="b-insm-label"></div>
                    <div class="b-insm-input">
                        <el-button type="primary" v-waves @click="handleFilter">搜索</el-button>
                    </div>
                </section>
            </el-col>
            <el-col :span="18" style="text-align: right">
                <section class="b-insm">
                    <div class="b-insm-label"></div>
                    <div class="b-insm-input">
                        <el-button type="primary" icon="el-icon-circle-plus-outline" @click.native="handleCreate">添加</el-button>
                    </div>
                </section>
            </el-col>
        </el-row>

        <div class="b-table t-shadow" v-if="res.result && res.result.length">
            <el-table :data="res.result || []" border fit highlight-current-row style="width:100%;" header-row-class-name="b-thead">
                <el-table-column label="角色ID" min-width="20px" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.id }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="中文名" min-width="40px" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.name }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="英文名" min-width="80px" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.enname }}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作" min-width="100px" fixed="right">
                    <template slot-scope="scope">
                        <div class="b-table-action">
                            <span @click="editRole(scope.row)">编辑</span>
                            <span @click="deleteRole(scope.row.id)">删除</span>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <div class="b-page" v-if="res.totalCount && (res.totalCount > 10)">
                <el-pagination :current-page="query.pageNum" :page-sizes="[10, 20, 30, 40]" :page-size="query.pageSize" :total="res.totalCount || 0" layout="prev, pager, next, sizes, total" background @size-change="handleSizeChange" @current-change="handleCurrentChange"></el-pagination>
            </div>
        </div>
        <!--添加/编辑渠道弹框-->
        <el-dialog :title="isEdit? '编辑' : '添加'" :visible.sync="dialogChannelVisible" width="600px" class="b-dialog" @close="closeDialog('channelForm')">
            <el-form :rules="channelFormRules" ref="channelForm" :model="channelForm" label-position="right" label-width="100px" class="line-36">
                <el-form-item label="角色ID" v-show="false">
                    <el-input v-model="channelForm.id"></el-input>
                </el-form-item>
                <el-form-item label="中文名" prop="name" required>
                    <el-input v-model="channelForm.name"></el-input>
                </el-form-item>
                <el-form-item label="英文名" prop="enname" required>
                    <el-input v-model="channelForm.enname"></el-input>
                </el-form-item>
                <el-form-item label="角色权限">
                    <el-tree :props="defaultProps" :data="treeData" show-checkbox node-key="id" ref="tree" :default-checked-keys="defaultSelectNode"></el-tree>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogChannelVisible = false" plain>取消</el-button>
                <el-button type="primary" @click="submitForm('addRole')" v-if="!isEdit">保存</el-button>
                <el-button type="primary" @click="submitForm('updateRole')" v-else>保存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    export default {
        name: 'role',
        filters: {
        },
        data() {
            return {
                res: {},
                date: [],
                query: {
                    name: '',
                    pageNum: 1,
                    pageSize: 10
                },
                ca: {
                    name: ''
                },
                total: {},
                isEdit: false,
                dialogChannelVisible: false,
                channelForm: {
                    id: null,
                    name: null,
                    enname: null,
                    resourceIds: []
                },
                channelFormRules: {
                    name: [{ required: true, message: this.$i18nAdapt('form.emptyTip'), trigger: 'blur' }],
                    enname: [{ required: true, message: this.$i18nAdapt('form.emptyTip'), trigger: 'blur' }]
                },
                id: null,
                name: null,
                enname: null,
                defaultSelectNode: [],
                defaultProps: {
                    label: 'remark',
                    children: 'children'
                },
                treeData: []
            }
        },
        computed: {
            ...mapState(['role'])
        },
        created() {
            this.getList()
        },
        methods: {
            ...mapActions(['aCommon']),
            getTree() {
                const _this = this;
                this.aCommon({
                    ur: 'getResourceTree',
                    ops: {id: 0},
                    cb(list) {
                       _this.treeData = JSON.parse(JSON.stringify(list || {}));
                    }
                })
            },
            getCheckedKeys() {
                this.channelForm.ids = this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys());
                console.log("半选节点为： " + this.channelForm.ids)
            },
            getList() {
                const _this = this;
                this.aCommon({
                    ur: 'getRolesList',
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
            deleteRole(val) {
                this.aCommon({
                    ur: 'deleteRoleById',
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
            // Job弹框数据回填
            editRole(row) {
                this.isEdit = true;
                this.dialogChannelVisible = true
                this.channelForm.id = row.id;
                this.channelForm.name = row.name;
                this.channelForm.enname = row.enname;
                this.getTree();
                this.getRoleResource(row.id);
            },
            getRoleResource(val) {
                const _this = this;
                this.aCommon({
                    ur: 'getRoleResource',
                    ops: {id: val},
                    cb(list) {
                        _this.defaultSelectNode = list;
                    }
                })
            },
            // 角色表单创建提交
            submitForm(api) {
                this.$refs['channelForm'].validate((valid) => {
                    if (valid) {
                        this.channelForm.resourceIds = this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys());
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
            // 弹框
            handleCreate() {
                this.isEdit = false
                this.dialogChannelVisible = true
                this.getTree()
            },
            initChannelForm() {
                this.channelForm = {
                    id: null,
                    name: null,
                    enname: null
                }
                this.$refs.tree.setCheckedKeys([]);
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
