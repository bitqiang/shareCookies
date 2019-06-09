<!--
 * @author bitqiang<bitqiang@outlook.com>
 * @date 2019/6/7 9:19
 * @desc
 -->

<template>
	<div class="app-tab">
			<el-button @click="saveData" size="mini" round type="primary">保存</el-button>
			 <el-tabs v-model="activeName" @tab-click="handleClick">
		    <el-tab-pane label="cookie共享" name="cookie">
			    <Cookies ref="cookies" />
		    </el-tab-pane>
		    <el-tab-pane label="跨域配置" name="cors">
			    <Cors ref="cors" />
		    </el-tab-pane>
		  </el-tabs>
	</div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import Cookies from "components/Cookies.vue";
import Cors from "components/cors.vue";

@Component({
    components: {Cookies, Cors},
})

export default class App extends Vue {
    activeName: string = "cors";

    handleClick() {
        console.log(arguments);
    }

    beforeCreate() {
        // chrome.storage.onChanged.addListener(function(changes: any, namespace: any) {
        //     for (const key in changes) {
        //         const storageChange = changes[key];
        //         console.log("存储123键“%s”（位于“%s”命名空间中）已更改。" +
        //             "原来的值为“%s”，新的值为“%s”。",
        //             key,
        //             namespace,
        //             storageChange.oldValue,
        //             storageChange.newValue);
        //     }
        // });

    }

    saveData() {
        let {cookiesArray} = this.$refs.cookies;
        let {form} = this.$refs.cors;

        console.log("form", form);
        let pass = form.every((item: { match: (arg0: RegExp) => void; }) => item.match(/\w+\.\w+/));
		    
        if (pass) {
            chrome.storage.sync.set({cookies: JSON.stringify(cookiesArray), cors: JSON.stringify(form)}, res => {
                chrome.runtime.sendMessage({type: "update", value: {cookiesArray, form}});
                console.log("res", res);
            });
        } else {
            this.$notify.error({
                title: "",
                message: "请输入正确的域名",
                duration: 500
            });
        }

    }

    mounted() {
        // console.log("1123", 1123);
        // addEventListener("beforeunload", this.saveData);
    }
}
</script>

<style scoped>
.app-tab {
	width: 320px;
}
</style>
