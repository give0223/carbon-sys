<template>
  <el-breadcrumb class="app-breadcrumb" separator-icon="ArrowRight">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in matchedList" :key="item.path + 'page'">
        <el-icon size="14">
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span
          v-if="item.redirect === 'noRedirect' || index == matchedList.length - 1"
          class="no-redirect"
        >
          {{ item.meta.title }}
        </span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { useRoute, useRouter, RouteRecordRaw } from "vue-router";

defineOptions({
  name: "Breadcrumb",
});

const route = useRoute();
const router = useRouter();
const handleLink = (item: RouteRecordRaw) => {
  router.push({
    path: item.path,
  });
};

const matchedList = computed(() => {
  return route.matched.filter((item) => {
    return (
      item.meta &&
      item.meta.title &&
      item.meta.breadcrumb !== false &&
      item.children.length !== 1
    );
  });
});
</script>

<style lang="scss" scoped>
.app-breadcrumb {
  margin-left: 20px;
}
.breadcrumb-enter-active {
  transition: all 0.8s;
}

.breadcrumb-leave-active {
  transition: all 0.25s;
}

.breadcrumb-enter-from,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(30px);
}
.breadcrumb-leave-active {
  position: absolute;
}
:deep(.el-breadcrumb__inner) {
  display: flex;

  > i {
    margin-right: 3px;
  }
}
</style>
