<template>
  <Fragment v-if="hasPermission">
    <slot />
  </Fragment>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/store/modules/auth";

defineOptions({
	name: "Auth",
});

// 定義 props
const props = defineProps({
	value: {
		type: Array<string>,
		required: true,
		default: () => [],
	},
});

// 使用 authStore
const authStore = useAuthStore();

// 取得當前頁面的角色權限列表
const currentPageRoles = authStore.authButtonList ?? [];

// 計算是否有權限
const hasPermission = computed(() => {
	return props.value.every((item) => item && currentPageRoles.includes(item));
});
</script>

<style lang="scss" scoped></style>
