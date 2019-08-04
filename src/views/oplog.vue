<template>
    <div class="b-con">
        <v-top :title="$i18nAdapt('route.oplog')"></v-top>
        <el-row :gutter="20" class="b-search">
            <el-col :span="6">
                <section class="b-insm">
                    <div class="b-insm-label">{{ $i18nAdapt('pop.time') }}</div>
                    <el-date-picker v-model="date" type="daterange" format="yyyy/MM/dd " value-format="yyyy-MM-dd"
                                    class="b-insm-input" range-separator="~"
                                    :start-placeholder="$i18nAdapt('pop.startp')"
                                    :end-placeholder="$i18nAdapt('pop.endp')" :picker-options="picker"></el-date-picker>
                </section>
            </el-col>
            <el-col :span="4">
                <section class="b-insm">
                    <div class="b-insm-label">{{ $i18nAdapt('oplog.userName') }}</div>
                    <el-input v-model="ca.userName" :placeholder="$i18nAdapt('pop.name')" clearable></el-input>
                </section>
            </el-col>
            <el-col :span="2">
                <section class="b-insm">
                    <div class="b-insm-label"></div>
                    <div class="b-insm-input">
                        <el-button type="primary" v-waves @click="handleFilter">{{ $i18nAdapt('pop.apply') }}
                        </el-button>
                    </div>
                </section>
            </el-col>
        </el-row>

        <div class="b-table t-shadow" v-if="res.result && res.result.length">
            <el-table :data="res.result || []" border fit highlight-current-row style="width:100%;"
                      header-row-class-name="b-thead">
                <el-table-column :label="$i18nAdapt('oplog.userName')" min-width="60px" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.userName }}</span>
                    </template>
                </el-table-column>
                <el-table-column :label="$i18nAdapt('oplog.description')" min-width="40px" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.description }}</span>
                    </template>
                </el-table-column>
                <el-table-column :label="$i18nAdapt('oplog.ip')" min-width="60px" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.ip }}</span>
                    </template>
                </el-table-column>
                <el-table-column :label="$i18nAdapt('oplog.methodName')" min-width="60px" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.methodName }}</span>
                    </template>
                </el-table-column>
                <el-table-column :label="$i18nAdapt('oplog.opTime')" min-width="60px" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.opTime }}</span>
                    </template>
                </el-table-column>
                <el-table-column :label="$i18nAdapt('oplog.className')" min-width="60px" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.className }}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" :label="$i18nAdapt('oplog.paramValues')" min-width="50px"
                                 fixed="right">
                    <template slot-scope="scope">
                        <div class="b-table-action">
                            <span class="el-icon-info" @click="oplogDetail(scope.row.paramValues)"></span>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <div class="b-page" v-if="res.totalCount && (res.totalCount > 10)">
                <el-pagination :current-page="query.pageNum" :page-sizes="[10, 20, 30, 40]" :page-size="query.pageSize"
                               :total="res.totalCount || 0" layout="prev, pager, next, sizes, total" background
                               @size-change="handleSizeChange" @current-change="handleCurrentChange"></el-pagination>
            </div>
        </div>
        <!-- 详情弹框 -->
        <el-dialog :title="$i18nAdapt('oplog.paramValues')" :visible.sync="dialogOpDetailVisible" width="600px"
                   class="b-dialog">
            <span><pre>{{ paramValues }}</pre></span>
        </el-dialog>
        <el-col :span="2">
            <section class="b-insm">
                <div class="b-insm-label"></div>
                <div class="b-insm-input">
                    <el-button type="primary" v-waves @click="sendEmail">点击获取验证码
                    </el-button>
                </div>
            </section>
        </el-col>
        <el-input v-model="contentQuery.code" placeholder="请输入email验证码"></el-input>
        <el-input
                type="textarea"
                autosize
                placeholder="请输入content"
                v-model="contentQuery.content">
        </el-input>
        <el-col :span="2">
            <section class="b-insm">
                <div class="b-insm-label"></div>
                <div class="b-insm-input">
                    <el-button type="primary" v-waves @click="getContent">{{ $i18nAdapt('pop.apply') }}
                    </el-button>
                </div>
            </section>
        </el-col>
        <div style="margin: 20px 0;"></div>
        <el-input
                type="textarea"
                :autosize="{ minRows: 1, maxRows: 20}"
                placeholder="请输入内容"
                v-model="textarea2">
        </el-input>
    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex'

    export default {
        name: 'oplog',
        filters: {},
        data() {
            return {
                res: {},
                date: [],
                query: {
                    userName: '',
                    startTime: '',
                    endTime: '',
                    pageNum: 1,
                    pageSize: 10
                },
                ca: {
                    userName: ''
                },
                dialogOpDetailVisible: false,
                paramValues: '',
                total: {},
                picker: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    }
                },
                contentQuery: {
                    code: '',
                    content: ''
                },
                textarea2: ''
            }
        },
        computed: {
            ...mapState(['oplog'])
        },
        created() {
            this.getList()
        },
        methods: {
            ...mapActions(['aCommon']),
            getList() {
                const _this = this;
                this.aCommon({
                    ur: 'getOplogList',
                    ops: this.query,
                    cb(list) {
                        (!list.result || !list.result.length)
                        _this.res = JSON.parse(JSON.stringify(list || {}));
                        _this.total = JSON.parse(JSON.stringify(list.dataTotal || {}));
                    }
                })
            },
            oplogDetail(paramValues) {
                this.dialogOpDetailVisible = true;
                this.paramValues = JSON.parse(paramValues);
            },
            handleFilter() {
                this.query.startTime = (this.date && this.date.length >= 2 && this.date[0]) || '';
                this.query.endTime = (this.date && this.date.length >= 2 && this.date[1]) || '';
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
            sendEmail() {
                this.aCommon({
                    ur: 'sendEmail',
                    cb: (res) => {
                        console.log(res);
                    }
                })
            },
            getContent() {
                this.aCommon({
                    ur: 'getContent',
                    ops: this.contentQuery,
                    cb: (contentRes) => {
                        (!contentRes)
                        this.textarea2 = JSON.stringify(contentRes);
                    }
                })
            }
        }
    }
</script>
<style>
    .line-36 .el-form-item__label {
        line-height: 36px !important;
    }
</style>
