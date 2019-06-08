<!--
 * @author bitqiang<bitqiang@outlook.com>
 * @date 2019/6/7 9:19
 * @desc
 -->

<template>
	 <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="cookie共享" name="cookie">
	    <Cookies />
    </el-tab-pane>
    <el-tab-pane label="跨域配置" name="cors">fasf</el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import Cookies from "components/Cookies.vue";

@Component({
    components: {Cookies},
})
export default class HelloWorld extends Vue {
    activeName: string = "cookie";

    handleClick() {
        console.log(arguments);
    }
}
</script>

<style scoped>

</style>
