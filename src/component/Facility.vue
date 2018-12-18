<template>
  <section>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true">
        <el-form-item label="状态">
          <el-select v-model="form.online_status" placeholder="不限" @change="search(1)">
            <el-option v-for="status in item.status" :key="status.id" :label="status.name"
                       :value="status.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类" placeholder="请选择">
          <el-select v-model="form.classification">
            <el-option
              v-for="item in classification"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <!--<el-form-item label="服务商" v-if="permission>2">
           <el-select v-model="form.facilitatorid" placeholder="不限" @change="property('property')">
             <el-option v-for="facilitator in item.facilitator" :key="facilitator.id" :label="facilitator.name" :value="facilitator.id" ></el-option>
           </el-select>
         </el-form-item>
         <el-form-item label="物业" v-if="permission>1">
           <el-select v-model="form.propertyid" placeholder="不限" @change="search(1)">
             <el-option v-for="property in item.property" :key="property.id" :label="property.plot" :value="property.id" ></el-option>
           </el-select>
         </el-form-item>-->

        <el-form-item>
          <el-input v-model="form.classification_value" placeholder="请输入关键字" @change="search(1)"></el-input>
        </el-form-item>
        <div style="float: right" v-if="permission===3">
          <el-form-item>
            <el-button type="primary" @click="move('Add')">新增</el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-col>

    <!--表格部分-->
    <el-table :data="list" highlight-current-row style="width: 100%;">
      <el-table-column prop="name" label="设备名称" :span="4" align="center">
      </el-table-column>
      <el-table-column prop="sn" label="设备号" :span="3" align="center">
      </el-table-column>
      <el-table-column prop="propertyid.parentid.name" label="服务商" :span="3" align="center">
      </el-table-column>
      <el-table-column prop="propertyid.plot" label="投放物业" :span="3" align="center">
      </el-table-column>
      <el-table-column prop="online_status" label="在线状态" :span="3" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.online_status==0">离线</span>
          <span v-if="scope.row.online_status==1">在线</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" :span="3" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.status==1" @click="move('Check', scope.row)">待审核</span>
          <span v-if="scope.row.status==3">已通过</span>
          <span v-if="scope.row.status==2">未通过</span>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="设备备注" :span="3" align="center">
      </el-table-column>
      <el-table-column label="操作" :span="3" align="center">
        <template slot-scope="scope" v-if="permission>2">
          <el-button icon="el-icon-edit" size="small" @click="move('Edit', scope.row)"></el-button>
          <el-button icon="el-icon-delete" size="small" @click="del(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--弹窗部分-->
    <el-col :span="24" class="toolbar">
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="15" :total="total"
                     style="float:right;">
      </el-pagination>
    </el-col>
    <el-dialog :visible.sync="formVisible" :close-on-click-modal="false">

      <el-dialog
        width="1000px"
        title="地图"
        :visible.sync="innerVisible"
        append-to-body>
        <div id="container" class="map" tabindex="0"></div>
        <span slot="footer" class="dialog-footer">
        <el-button @click="mapCancle">取消</el-button>
        <el-button type="primary" @click.native="innerVisible = false">提交</el-button>
      </span>
      </el-dialog>
      <el-form :model="postlist" label-width="150px" :rules="rules" ref="postlist">
        <el-form-item label="设备名称" prop="name">
          <el-input v-model="postlist.name" :readonly="url=='update'"></el-input>
        </el-form-item>
        <el-form-item label="设备号" prop="sn">
          <el-input v-model="postlist.sn" :disabled="sign === 1"></el-input>
          <el-alert v-show="!sign" type="warning" :closable="false" title="由0-9的数字组成长为8位的整数，务必确认设备号存在，填写后不可修改"></el-alert>
        </el-form-item>
        <el-form-item label="服务商" prop="facilitatorid" v-if="permission>2">
          <el-select
            filterable
            remote
            :remote-method="remoteFacilitatorMethod"
            v-model="postlist.facilitatorid"
            @change="propertiesChange()"
            style="width:200px;">
            <el-option label="无" value=""></el-option>
            <el-option v-for="facilitator in item.facilitator" :key="facilitator.id" :label="facilitator.name"
                       :value="facilitator.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="投放物业" prop="propertyid" v-if="permission>1">
          <el-select
            filterable
            remote
            :remote-method="remotePropertyMethod"
            v-model="postlist.propertyid"
            style="width:200px;"
            @change="changeProperty">
            <el-option label="无" value=""></el-option>
            <el-option
              v-for="property in item.addproperty"
              :key="property.id"
              :label="property.plot"
              :value="property.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="价格套餐" prop="comboid">
          <el-select
            filterable
            remote
            :remote-method="remoteComboMethod"
            v-model="postlist.comboid">
            <el-option v-for="combo in item.combo" :key="combo.id" :label="combo.name" :value="combo.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="佣金比例" prop="ratio">
          <el-input v-model="postlist.ratio" :readonly="permission<3"></el-input>
          <label>佣金比例顺序 厂商:服务商:物业，服务商为空时请以0代替</label>
        </el-form-item>
        <el-form-item label="设备地址" prop="location">
          <el-input v-model="locationShow"></el-input>
          <el-button @click="showMap">地图选点</el-button>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="postlist.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click.native="sendData(true)" v-if="url=='Check'">已通过</el-button>
    <el-button type="primary" @click.native="sendData(false)" v-if="url=='Check'">未通过</el-button>
    <el-button @click.native="formVisible = false" v-if="url!='Check'">取消</el-button>
    <el-button type="primary" @click.native="sendData" v-if="url!='Check'">提交</el-button>
  </span>
    </el-dialog>
  </section>
</template>


<script>
  import AMap from 'AMap';

  export default {
    data () {
      const validateRadio = (rule, value, callback) => {
        if (value && value.split(':').length !== 3 && this.permission > 2) {
          callback(new Error('比率格式为x:y:z'));
        } else {
          callback();
        }
      };
      const equipmentNum = (rule, value, callback) => {
        if (!(/\d{8,8}$/.test(value))) {
          callback(new Error('设备号格式为8位整数'));
        } else {
          callback();
        }
        this.api('search/facilities?relations=propertyid.parentid', {
          page: 1,
          classification: 'equipment'
        }, null, 'get').then((res) => {
          if (res.data) {
            for (let i = 0; i < res.data.length; i++) {
              if (value && res.data[i].sn === value && this.sign === 0) {
                callback(new Error('该设备已存在'));
              } else {
                callback();
              }
            }
          }
        });
      };
      return {
        innerVisible: false,
        locationShow: '',
        permission: JSON.parse(this.cookie.getCookie('userinfo'))['permission'],
        list: [],
        classification: [],
        item: {
          'status': [
            {'id': 1, 'name': '在线'},
            {'id': 0, 'name': '离线'},
            {'name': '全部'}
          ],
          'property': [],
          'facilitator': [],
          'combo': [],
          'addproperty': []
        },
        formVisible: false,
        sign: null,//判断点击新增或者修改
        url: '',
        total: 1,
        form: {'facilitatorid': '', classification: 'equipment'},
        postlist: {},
        Picker: {},
        rules: {
          name: [
            {required: true, message: '请输入设备名称', trigger: 'blur'}
          ],
          sn: [
            {required: true, message: '请输入设备号', trigger: 'blur'},
            {validator: equipmentNum, trigger: 'blur'}
          ],
          // facilitatorid: [
          //   { type: 'number', message: '请选择服务商' }
          // ],
          propertyid: [
            {type: 'number', message: '请选择投放物业'}
          ],
          ratio: [
            {validator: validateRadio, trigger: 'blur'}
          ],
          comboid: [
            {type: 'number', message: '请选择套餐'}
          ]
        }
      };
    },
//  watch: {
//    sn () {
//      this.search(1)
//    }
//  },

    methods: {
      combo () {
        this.api('admin/Combo/index', {}, this)
          .then(res => {
            if (res.data) {
              this.item['combo'] = res.data;
            }
          });
      },
      changeProperty(event){//修改物业事件,获取物业位置经纬度放在postlist中
        console.log(event);
        const info = {};
        info.propertyid = this.postlist.propertyid;
        this.api('admin/Facility/getPropertyLocation', info, this)
          .then(data => {
            console.log(data.lng, data.lat);
            this.postlist.longitude = data.lng;
            this.postlist.latitude = data.lat;
          });
      },
      showMap () {
        if (!this.postlist.propertyid || this.postlist.propertyid === undefined) {
          this.$message({
            message: '请先选择物业',
            type: 'warning'
          });
        } else {
          this.innerVisible = true;
        }
        const that = this;
        // const info = {};
        AMapUI.loadUI(['misc/PositionPicker'], function (PositionPicker) {
          const map = new AMap.Map('container', {
            zoom: 16
          });
          const positionPicker = new PositionPicker({
            mode: 'dragMarker', // 设定为拖拽地图模式，可选'dragMap'、'dragMarker'，默认为'dragMap'
            map: map// 依赖地图对象
          });
          // TODO:事件绑定、结果处理等
          // if (that.url === 'Add') {
          //   info.propertyid = that.postlist.propertyid;
          //   that.api('admin/Facility/getPropertyLocation', info, this)
          //     .then(data => {
          //       positionPicker.start(new AMap.LngLat(data.lng, data.lat));
          //     });
          // } else {
          positionPicker.start(new AMap.LngLat(that.postlist.longitude, that.postlist.latitude));//地图开始定位
          // }

          positionPicker.on('success', function (positionResult) {//拖拽成功之后定位
            console.log('success', positionResult);
            that.postlist.location = positionResult.position;
            that.locationShow = positionResult.address;
          });
          positionPicker.on('fail', function () {
            // console.log('fail',positionResult);
          });
        });

        // 加载PositionPicker，loadUI的路径参数为模块名中 'ui/' 之后的部分
      },
      mapCancle () {//取消地图选点
        this.innerVisible = false;
        this.locationShow = '';
        this.postlist.location = {//默认初始值
          lng: this.postlist.longitude,
          lat: this.postlist.latitude
        };
      },
      property (type, change) {
        let data = '';
        if (type === 'property') {
          data = {'id': this.form['facilitatorid']};
          this.form['propertyid'] = '';
        } else {
          data = {'id': this.postlist['facilitatorid']};
          if (change) {
            this.postlist['propertyid'] = '';
          }
        }
        this.api('admin/AdminInfo/property', data, this)
          .then(data => {
            if (data) {
              if (this.list.propertyid) {
                this.postlist.propertyid = this.list.propertyid.plot;
              }
              this.item[type] = data.data;
              if (type === 'property') {
                this.search(1);
              }
            }
          });
      },
      buildHttpQueryParams(data) {
        const q = [];
        for (const key in data) {
          q.push(`${key}=${data[key]}`);
        }
        return q.join("&");
      },
      // 服务商列表
      facilitator () {
        this.api('admin/AdminInfo/facilitator', {}, this)
          .then(res => {
            if (res.data) {
              this.item['facilitator'] = res.data;
            }
          });
      },
      search (page) {
        this.form['page'] = page;
        this.api('search/facilities?relations=propertyid.parentid', this.form, null, 'get').then((res) => {
          if (res) {
            this.total = parseInt(res['total']);
            this.list = res.data;
          }
        });
      },
      handleCurrentChange: function (val) {
        this.search(val);
      },
      del: function (data) {
        this.$confirm('确认删除该设备？?', '删除设备', {
          type: 'warning'
        })
          .then(() => {
            this.api('admin/Facility/facilityDelete', data, this)
              .then(() => {
                this.search(1);
              });
          })
          .catch(() => {});
      },
      move: async function (type, row) {
        this.url = type;
        if (type === 'Add') {
          this.postlist = {
            sn: '',
            name: '',
            ratio: '',
            propertyid: null,
            remark: '',
            location: {}
          };
          this.locationShow = '';
          this.sign = 0;
        } else {
          this.locationShow = '';
          this.sign = 1;
          this.postlist = Object.assign({}, row);
          this.postlist.propertyid = this.postlist.propertyid.id;
          this.postlist.ratio = this.postlist.ratio.text;
          if (typeof row.propertyid === 'object' && typeof row.propertyid.parentid === 'object') {
            this.postlist.facilitatorid = row.propertyid.parentid.id;
          }
          if (this.postlist['facilitatorid'] === 1) {
            this.postlist['facilitatorid'] = '';
          }
          if (!this.postlist.location) {
            this.postlist.location = {};
            this.postlist.location.lng = this.postlist.longitude;
            this.postlist.location.lat = this.postlist.latitude;
          }
        }
        if (!(type === 'Check' && this.permission !== 3)) {
          this.formVisible = true;
          this.property('addproperty', false);
          /* this.$refs['postlist'].resetFields() */
          if (this.$refs['postlist'] !== undefined) {
            this.$refs['postlist'].resetFields();
          }
        }
      },
      sendData: function (pass) {
        if (this.url === 'Add') {
          if (this.locationShow === '' || this.location === {}) {
            this.$message({
              message: '请选择设备地址',
              type: 'warning'
            });
            return false;
          }
        }

        if (pass === true || pass === false) {
          this.postlist['type'] = pass;
        }
        this.$refs['postlist'].validate((valid) => {
          if (valid) {
            this.api('admin/Facility/facility' + this.url, this.postlist, this)
              .then(data => {
                if (data !== false) {
                  this.formVisible = false;
                  this.search(1);
                }
              });
          } else {
            return false;
          }
        });
      },
      remotePropertyMethod(q) {
        const data = {
          "fields[parentid]"  : this.postlist.facilitatorid,
          "fieldsOption[parentid]" : "eq"
        };
        if (q && q !== '') {
          data["fields[plot]"] = q;
          data["fieldsOption[plot]"] = "like";
        }
        this.api(`admin/AdminInfo/property?${this.buildHttpQueryParams(data)}`)
          .then(data => {
            if (data) {
              this.postlist.propertyid = "";
              this.item['addproperty'] = data.data;
            }
          });
      },
      remoteFacilitatorMethod(q) {
        const data = {};
        if (q && q !== '') {
          data["fields[name]"] = q;
          data["fieldsOption[name]"] = "like";
        }
        this.api(`admin/AdminInfo/facilitator?${this.buildHttpQueryParams(data)}`)
          .then(res => {
            if (res.data) {
              this.item['facilitator'] = res.data;
            }
          });
      },
      remoteComboMethod(q) {
        const data = {};
        if (q && q !== '') {
          data["fields[name]"] = q;
          data["fieldsOption[name]"] = "like";
        }
        this.api(`admin/Combo/index?${this.buildHttpQueryParams(data)}`)
          .then(res => {
            if (res.data) {
              this.item['combo'] = res.data;
            }
          });
      },
      propertiesChange() {
        const data = {
          "fields[parentid]"  : this.postlist.facilitatorid,
          "fieldsOption[parentid]" : "eq"
        };
        this.api(`admin/AdminInfo/property?${this.buildHttpQueryParams(data)}`)
          .then(res => {
            if (res) {
              this.postlist.propertyid = "";
              this.item['addproperty'] = res.data;
            }
          });
      }
    },
    mounted () {
      this.search(1);
      if (this.permission === 3) {
        this.facilitator();
        this.classification = [{value: 'property', label: '物业'}, {
          value: 'facilitator',
          label: '服务商'
        }, {value: 'equipment', label: '设备号'}];
      } else if (this.permission === 2) {
        this.classification = [{value: 'property', label: '物业'}, {value: 'equipment', label: '设备号'}];
      } else {
        this.classification = [{value: 'equipment', label: '设备号'}];
      }
      if (this.permission !== 1) {
        this.property('property');
      }
      this.combo();
    }
  };
</script>
<style scoped>
  .el-select {
    width: 100px
  }

  #container {
    width: 100%;
    height: 400px;
  }
</style>
