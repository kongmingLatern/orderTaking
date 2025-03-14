import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { PermissionProvider } from './modules/OrderTaking/PermissionControl/PermissionContext'
import router from './router'

function App() {
  return (
    <PermissionProvider initialRole="admin">
      <RouterProvider router={router} />
    </PermissionProvider>
  )
}

export default App
