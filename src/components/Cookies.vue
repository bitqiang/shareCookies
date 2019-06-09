<!--
 * @author bitqiang<bitqiang@outlook.com>
 * @date 2019/6/7 9:22
 * @desc
 -->

<template>
<div class="cookie">
	<el-button @click="cookiesArray.push({source:[' '],target:[' ']})" size="mini" round type="primary">添加</el-button>

	<div v-for="(item,index) of cookiesArray" :key="index" @click="changeFrom(index,item)">
		<el-card shadow="hover" class="detail-card">
		  <p>来源IP：{{item.source.join('；')}}</p>
		  <p>目标IP：{{item.target.join('；')}}</p>
				  <el-switch
					  style="display: block"
					  v-model="item.status"
					  active-color="#13ce66"
					  inactive-color="#ff4949"
					  active-text="启用"
					  inactive-text="停用"
				  >
				</el-switch>
    </el-card>
	</div>
	
		<el-form v-if="showForm" label-width="80px" label-position="top" class="form">
			<i class="el-icon-close clone-form" title="关闭" @click="showForm = false"></i>
		 
			<el-form-item label="来源URL" class="form-source">
				<div class="input-source" v-for="(item, index) of form.source">
					<el-input v-model="form.source[index]">
			     <template slot="prepend">http://</template>
			    </el-input>
				  <i
					  v-if="index !== 0" class="el-icon-circle-close delete-item" title="关闭" @click="form.source.splice(index,1)"
				  ></i>
					<i v-else class="el-icon-circle-plus-outline delete-item" @click="form.source.push('')"></i>

				</div>
		  </el-form-item>
			
		  <el-form-item label="目标URL" class="form-target">
			  <i class="el-icon-circle-plus-outline"></i>
				<div class="input-target" v-for="(item, index) of form.target">
					<el-input v-model="form.target[index]">
			     <template slot="prepend">http://</template>
		     </el-input>
			     <i
				     v-if="index !== 0" class="el-icon-circle-close delete-item" title="关闭" @click="form.target.splice(index,1)"
			     ></i>
					<i v-else class="el-icon-circle-plus-outline delete-item" @click="form.target.push('')"></i>
				</div>
		  </el-form-item>
		</el-form>
	
</div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component
export default class Cookies extends Vue {

    showForm: boolean = false;
    status: boolean = false;
    cookiesArray: Array<Object> = [
        {
            source: ["baidu.com", "qq.com"],
            target: ["192.168.1.1"],
            status: false
        },
        {
            source: ["element.eleme.cn", "qq.com"],
            target: ["192.168.1.1"],
            status: false
        }
    ];

    curFrom: number = 999;

    form: object = {
        source: ["baidu.com", "qq.com"],
        target: ["192.168.1.1"],
    };

    changeFrom(index: number, form: object): void {
        this.curFrom = index;
        this.form = form;
        this.showForm = true;
    }

    created() {
        chrome.storage.sync.get(null, (data: { cookies: string; }) => {
            this.cookiesArray = JSON.parse(data.cookies);
        });
    }

    mounted() {
    }
}
</script>

<style scoped lang="less">
	.cookie {
		.detail-card {
			width: 300px;
			cursor: pointer;
			
			p {
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}
		
		.form {
			width: 300px;
			padding-left: 10px;
			margin-right: 10px;
			/*border: 1px solid red;*/
			position: relative;
			
			.clone-form {
				position: absolute;
				top: 10px;
				right: 10px;
				z-index: 2;
				cursor: pointer;
			}
			
			.form-source, .form-target {
				position: relative;
				
				.el-icon-circle-close {
					position: absolute;
				}
			}
			
			.input-source, .input-target {
				position: relative;
				margin-top: 10px;
				width: 277px;
				
				.delete-item {
					display: none;
					position: absolute;
					top: 15px;
					right: 4px;
					cursor: pointer;
				}
				
				&:hover {
					.delete-item {
						display: inline-block;
					}
				}
			}
		}
	}
</style>

<style>
	.el-card__body {
		padding: 10px;
	}
</style>
