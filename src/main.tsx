import { ThemeProvider, useTheme } from '@react18-vite-antd-ts/theme'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { PermissionProvider } from './modules/OrderTaking/PermissionControl/PermissionContext'
import router from './router'
import 'uno.css'
import './index.scss'

function App() {
  const { theme } = useTheme()

  return (
    <ConfigProvider
      locale={zhCN}
      theme={theme}
    >
      <PermissionProvider initialRole="admin">
        <RouterProvider router={router} />
      </PermissionProvider>
    </ConfigProvider>
  )
}

function Root() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<Root />)
