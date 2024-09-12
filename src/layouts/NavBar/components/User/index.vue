<template>
  <el-dropdown @visible-change="onChange" @command="handleCommand">
    <div class="avatar-dropdown">
      <img class="user-avatar" :src="avatar" alt="" />
      <div class="user-name">{{ name }}</div>
      <el-icon class="up-down">
        <component :is="visible ? 'ArrowUp' : 'ArrowDown'" />
      </el-icon>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="logout">
          <svg-icon name="logout" size="16px" />
          <span>登出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useUserStore } from "@/store/modules/user";
import { ElMessage, ElMessageBox } from "element-plus";
import { LOGIN_URL } from "@/config/config";

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();
const { name, avatar } = userStore.userInfo || {};
const visible = ref(false);
const onChange = (show: boolean) => {
  visible.value = show;
};
const handleCommand = (command: string) => {
  if (command === "logout") {
    logout();
  }
};
const logout = () => {
  ElMessageBox.confirm("確定要登出嗎?", "提示", {
    confirmButtonText: "確認",
    cancelButtonText: "取消",
    type: "warning",
  }).then(async () => {
    await userStore.Logout();
    router.push({ path: LOGIN_URL, query: { redirect: route.fullPath } });
    ElMessage.success("登出成功!!");
  });
};
</script>

<style lang="scss" scoped>
.avatar-dropdown {
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  justify-items: center;
  height: 50px;
  padding: 0;

  .user-avatar {
    width: 40px;
    height: 40px;
    cursor: pointer;
    border-radius: 50%;
  }

  .user-name {
    position: relative;
    margin: 0 6px;
    cursor: pointer;
  }
}
</style>
