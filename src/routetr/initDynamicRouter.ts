import { RouteRecordRaw } from 'vue-router';
import router from './index';
import { ElNotification } from "element-plus";
import {LOGIN_URL, ROUTER_WHITE_LIST} from '@/config/config';
import { useUserStore } from "@/store/modules/user";
import { useAuthStore } from "@/store/modules/auth";
