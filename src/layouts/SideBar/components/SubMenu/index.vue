<template>
  <template v-for="subItem in menuList" :key="subItem.path">
    <el-sub-menu
      v-if="subItem.children && subItem.children.length > 1"
      :index="subItem.path"
    >
      <template #title>
        <el-icon>
          <component :is="subItem.meta.icon"></component>
        </el-icon>
        <span>{{ subItem.meta.title }}</span>
      </template>
      <!-- 如果有children遞迴本組件 -->
      <sub-menu :menuList="subItem.children" />
    </el-sub-menu>
    <el-menu-item
      v-else-if="subItem.children && subItem.children.length == 1"
      :index="subItem.children[0].path"
      @click="handleClickMenu(subItem.children[0])"
    >
      <el-icon>
        <component :is="subItem.children[0].meta.icon"></component>
      </el-icon>
      <template #title>
        <span>{{ subItem.children[0].meta.title }}</span>
      </template>
    </el-menu-item>
    <el-menu-item v-else :index="subItem.path" @click="handleClickMenu(subItem)">
      <el-icon>
        <component :is="subItem.meta.icon"></component>
      </el-icon>
      <template #title>
        <span>{{ subItem.meta.title }}</span>
      </template>
    </el-menu-item>
  </template>
</template>

<script setup lang="ts">
import { Menu } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";

defineOptions({
  name: "SubMenu",
});

defineProps({
  menuList: {
    type: Menu.MenuOptions,
    default: () => [],
  },
});

const router = useRouter();
const handleClickMenu = (subItem: Menu.MenuOptions) => {
  // 跳轉外部連結
  if (subItem.meta.isLink) {
    return window.open(subItem.meta.isLink, "_blank");
  }
  router.push(subItem.path);
};
</script>

<style lang="scss" scoped></style>
