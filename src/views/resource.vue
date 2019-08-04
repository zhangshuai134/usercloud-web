<template>
    <div class="b-con">
        <v-top :title="$i18nAdapt('route.resource')">
            <template slot="r">
                <el-button type="primary" icon="el-icon-circle-plus-outline" @click.native="handleCreate">添加一级菜单</el-button>
            </template>
        </v-top>
        <div class="b-table t-shadow" v-if="res && res.length">
            <el-table :data="res" border fit highlight-current-row style="width:100%;" header-row-class-name="b-thead" row-key="id" :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
                <el-table-column label="资源名称" min-width="40px" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.name }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="资源描述" min-width="60px" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.remark }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="资源路径" min-width="60px" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.href }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="资源类型" min-width="40px" align="center">
                    <template slot-scope="scope">
                        <el-tag type="primary" effect="dark" v-if="scope.row.type==1">{{typeList[0].label}}</el-tag>
                        <el-tag type="success" effect="dark" v-else>{{typeList[1].label}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="资源排序" min-width="40px" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.sort }}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作" min-width="60px" fixed="right">
                    <template slot-scope="scope">
                        <div class="b-table-action">
                            <span @click="addResource(scope.row)">添加</span>
                            <span @click="editResource(scope.row)">编辑</span>
                            <span @click="deleteResource(scope.row.id)">删除</span>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!--添加/编辑渠道弹框-->
        <el-dialog :title="isEdit? '编辑' : '添加'" :visible.sync="dialogChannelVisible" width="600px" class="b-dialog" @close="closeDialog('channelForm')">
            <el-form :rules="channelFormRules" ref="channelForm" :model="channelForm" label-position="right" label-width="100px" class="line-36">
                <el-form-item label="资源ID" v-show="false">
                    <el-input v-model="channelForm.id"></el-input>
                </el-form-item>
                <el-form-item label="父资源ID" v-show="false">
                    <el-input v-model="channelForm.parentId"></el-input>
                </el-form-item>
                <el-form-item label="资源名称" prop="name" required>
                    <el-input v-model="channelForm.name"></el-input>
                </el-form-item>
                <el-form-item label="资源描述" prop="remark" required>
                    <el-input v-model="channelForm.remark"></el-input>
                </el-form-item>
                <el-form-item label="资源路径" prop="href" required>
                    <el-input v-model="channelForm.href"></el-input>
                </el-form-item>
                <el-form-item label="资源类型" prop="type" required>
                    <el-select v-model="channelForm.type" placeholder="请选择" class="b-insm-input" prop="type" required>
                        <el-option v-for="(item, index) in typeList" :key="index" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="资源排序" prop="sort" required>
                    <el-input v-model.number="channelForm.sort"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogChannelVisible = false" plain>取消</el-button>
                <el-button type="primary" @click="submitForm('addResource')" v-if="!isEdit">保存</el-button>
                <el-button type="primary" @click="submitForm('updateResource')" v-else>保存</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import { mapState, mapActions } from 'vuex'
    export default {
        name: 'resource',
        filters: {
        },
        data() {
            return {
                res: [],
                isEdit: false,
                dialogChannelVisible: false,
                typeList: [{value: 1, label: '菜单'}, {value: 2, label: '按钮'}],
                channelForm: {
                    id: null,
                    name: null,
                    href: null,
                    sort: null,
                    type: null,
                    remark: null,
                    parentId: null
                },
                channelFormRules: {
                    name: [{ required: true, message: this.$i18nAdapt('form.emptyTip'), trigger: 'blur' }],
                    href: [{ required: true, message: this.$i18nAdapt('form.emptyTip'), trigger: 'blur' }],
                    sort: [{ required: true, message: this.$i18nAdapt('form.emptyTip'), trigger: 'blur' },
                        { type: 'number', message: 'please enter a number', trigger: 'blur'}
                    ],
                    selected: [{ required: true, message: this.$i18nAdapt('form.emptyTip'), trigger: 'blur' }],
                    remark: [{ required: true, message: this.$i18nAdapt('form.emptyTip'), trigger: 'blur' }]
                },
                id: null,
                name: null,
                sort: null,
                type: null,
                remark: null,
                parentId: null
            }
        },
        computed: {
            ...mapState(['resource'])
        },
        created() {
            this.getList()
        },
        methods: {
            ...mapActions(['aCommon']),
            getList() {
                const _this = this;
                this.aCommon({
                    ur: 'getResourceTable',
                    ops: {id: 0},
                    cb(list) {
                        _this.res = JSON.parse(JSON.stringify(list || {}));
                    }
                })
            },
            addResource(row) {
                this.isEdit = false
                this.dialogChannelVisible = true
                this.channelForm.parentId = row.id;
                this.channelForm.type = null;
            },
            // 弹框数据回填
            editResource(row) {
                this.isEdit = true;
                this.dialogChannelVisible = true
                this.channelForm.id = row.id;
                this.channelForm.name = row.name;
                this.channelForm.href = row.href;
                this.channelForm.sort = row.sort;
                this.channelForm.type = row.type;
                this.channelForm.remark = row.remark;
                this.channelForm.parentId = row.parentId;
            },
            // 弹框
            handleCreate() {
                this.isEdit = false
                this.dialogChannelVisible = true
                this.channelForm.type = null
            },
            deleteResource(val) {
                this.aCommon({
                    ur: 'deleteResource',
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
            // 资源表单创建提交
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
            initChannelForm() {
                this.channelForm = {
                    id: null,
                    name: null,
                    href: null,
                    sort: null,
                    type: null,
                    remark: null
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
