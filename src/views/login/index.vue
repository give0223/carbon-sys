<template>
  <div class="login-container">
    <el-alert
      v-show="false"
      title="碳管理系統平台"
      type="success"
      :closable="false"
      style="position: fixed"
    ></el-alert>
    <el-row>
      <el-col :xs="24" :sm="24" :md="12" :lg="14" :xl="14">
        <div style="color: transparent">左側佔位測試</div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="10" :xl="10">
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          status-icon
          :rules="rules"
          class="login-form"
        >
          <div class="form-header">
            <div class="title-logo">
              <SvgIcon name="carbonlogo" :size="[200, 80]" />
            </div>
            <div class="title">碳管理系統平台</div>
          </div>
          <el-form-item prop="username">
            <el-input
              v-model="ruleForm.username"
              :prefix-icon="User"
              autocomplete="off"
              placeholder="請輸入帳號"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="ruleForm.password"
              type="password"
              show-password
              :prefix-icon="Lock"
              autocomplete="off"
              placeholder="請輸入密碼"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              class="login-btn"
              type="primary"
              size="large"
              :loading="loading"
              @click="submitForm(ruleFormRef)"
            >
              登入
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
import { useUserStore } from "@/store/modules/user";
import { ElNotification, type FormInstance } from "element-plus";
import { User, Lock } from "@element-plus/icons-vue";
import { LOGIN_URL } from "@/config/config";
import { login } from "@/api";
import SvgIcon from "@/components/SvgIcon/src/SvgIcon.vue";

defineOptions({
	name: "Login",
});

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
	username: "",
	password: "",
});
const loading = ref(false);
const validateUsername = (rule: any, value: any, callback: any) => {
	if (value === "") {
		callback(new Error("帳號不能為空"));
	} else if (value.length < 4) {
		callback(new Error("帳號至少4位數"));
	} else {
		callback();
	}
};
const validatePass = (rule: any, value: any, callback: any) => {
	if (value === "") {
		callback(new Error("密碼不能為空"));
	} else if (value.length < 6) {
		callback(new Error("密碼至少6位數"));
	} else {
		callback();
	}
};

const rules = reactive({
	username: [
		{ required: true, validator: validateUsername, trigger: "blur" },
	],
	password: [{ required: true, validator: validatePass, trigger: "blur" }],
});

const submitForm = async (formEl: FormInstance | undefined) => {
	console.log("送出帳號密碼:", formEl);
	if (!formEl) return;
	await formEl.validate(async (valid) => {
		if (!valid) return;
		try {
			loading.value = true;
			const { data } = await login(ruleForm);
			userStore.setToken(data.token);
			router.replace((route.query.redirect as string) || LOGIN_URL);
			ElNotification({
				title: "Success",
				message: "登入成功",
				type: "success",
				duration: 1000,
			});
		} catch (error) {
			console.log("error submit!", error);
		} finally {
			loading.value = false;
		}
	});
};
</script>

<style lang="scss" scoped>
@import url("@/styles/login/index.scss");
</style>
