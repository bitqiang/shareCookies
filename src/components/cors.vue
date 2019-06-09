<!--
 * @author bitqiang<bitqiang@outlook.com>
 * @date 2019/6/9 15:36
 * @desc
 -->

<template>
	<div>
		<el-Form label-width="80px" label-position="top" class="form">
			<el-form-item label="请输入域名" class="form-source">
				<div class="input" v-for="(item, index) of form">
					<el-input v-model="form[index]">
			    </el-input>
				  <i
					  v-if="index !== 0" class="el-icon-circle-close delete-item" title="删除" @click="form.splice(index,1)"
				  ></i>
					<i v-else class="el-icon-circle-plus-outline delete-item" title="添加" @click="form.push('')"></i>
				</div>
		  </el-form-item>
		</el-Form>
	</div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component
export default class Cors extends Vue {
    form: Array<string> = ["baidu.com", "baidu1.com"];

    created() {
        chrome.storage.sync.get(null, (data: { cors: string; }) => {
            this.form = JSON.parse(data.cors);
        });
    }
}
</script>

<style scoped lang="less">
.form {
	width: 300px;
	padding-left: 10px;
	margin-right: 10px;
	
	.input {
		position: relative;
		margin-top: 10px;
		
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
</style>
