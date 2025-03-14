import { AdminLayout } from '@react18-vite-antd-ts/layouts'
import { Error403 } from '../modules/Error/Error403'
import { Error404 } from '../modules/Error/Error404'
import { Error500 } from '../modules/Error/Error500'
// 初始化路由
import { createHashRouter, Navigate } from 'react-router-dom'
import Deepseek from '../modules/Deepseek'
import Index from '../modules/Index/index'
import Index1 from '../modules/Index/index1'
import Login from '../modules/Login'
import UserManagement from '../modules/System/UserManagement'
import TabPage from '../modules/SystemFunction/TabPage'
// Order Taking Platform
import OrderTakingIndex from '../modules/Index/OrderTakingIndex'
import AcceptedOrders from '../modules/OrderTaking/AcceptedOrders'
import Marketplace from '../modules/OrderTaking/Marketplace'
import MyPublishedOrders from '../modules/OrderTaking/MyPublishedOrders'
import PersonalCenter from '../modules/OrderTaking/PersonalCenter'
import UserRoleManagement from '../modules/OrderTaking/UserRoleManagement'
// Permission Control
import { PermissionRoute } from '../modules/OrderTaking/PermissionControl/PermissionContext'

export const router = createHashRouter([
  {
    path: '/',
    children: [
      {
        index: true,
        element: <Navigate to="/home" replace />,
      },
      {
        path: 'home',
        element: <Index1 />,
      },
      {
        path: 'accepted-orders',
        element: <AcceptedOrders />,
      },
      {
        path: 'my-published-orders',
        element: <MyPublishedOrders />,
      },
      {
        path: 'marketplace',
        element: <Marketplace />,
      },
      {
        path: 'personal-center',
        element: <PersonalCenter />,
      },
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    // 重定向
    children: [
      {
        index: true,
        element: <Navigate to="/index" replace />,
      },
      {
        path: 'index',
        element: <Index />,
      },
      {
        path: 'deepseek',
        element: <Deepseek />,
      },
      {
        path: 'multi-level/first',
        element: <div>一级菜单</div>,
      },
      {
        path: 'multi-level/second',
        element: <div>二级父菜单</div>,
      },
      {
        path: 'multi-level/second/sub',
        element: <div>二级子菜单</div>,
      },
      {
        path: 'system/tabs',
        element: <TabPage />,
      },
      {
        path: 'error/403',
        element: <Error403 />,
      },
      {
        path: 'error/404',
        element: <Error404 />,
      },
      {
        path: 'error/500',
        element: <Error500 />,
      },
      {
        path: 'management/user',
        element: <UserManagement />,
      },
      {
        path: 'about',
        element: <UserManagement />,
      },
      // Order Taking Platform Routes
      {
        path: 'order-taking',
        element: <OrderTakingIndex />,
      },
      {
        path: 'order-taking/personal-center',
        element: <PermissionRoute permission="view_personal_center" element={<PersonalCenter />} />,
      },
      {
        path: 'order-taking/marketplace',
        element: <PermissionRoute permission="view_marketplace" element={<Marketplace />} />,
      },
      {
        path: 'order-taking/my-published-orders',
        element: <PermissionRoute permission="publish_order" element={<MyPublishedOrders />} />,
      },
      {
        path: 'order-taking/accepted-orders',
        element: <PermissionRoute permission="accept_order" element={<AcceptedOrders />} />,
      },
      {
        path: 'order-taking/user-role-management',
        element: <PermissionRoute permission="manage_users" element={<UserRoleManagement />} />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
])

export default router
