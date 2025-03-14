import type { ReactNode } from 'react'
import React, { createContext, useContext, useMemo, useState } from 'react'
import { Navigate } from 'react-router-dom'

// Define user roles
export type UserRole = 'admin' | 'client' | 'freelancer' | 'guest'

// Define permission types
export type Permission =
  | 'view_marketplace'
  | 'view_personal_center'
  | 'publish_order'
  | 'edit_order'
  | 'delete_order'
  | 'accept_order'
  | 'submit_work'
  | 'manage_users'
  | 'manage_roles'

// Define the permission map for each role
const rolePermissions: Record<UserRole, Permission[]> = {
  admin: [
    'view_marketplace',
    'view_personal_center',
    'publish_order',
    'edit_order',
    'delete_order',
    'accept_order',
    'submit_work',
    'manage_users',
    'manage_roles',
  ],
  client: [
    'view_marketplace',
    'view_personal_center',
    'publish_order',
    'edit_order',
    'delete_order',
  ],
  freelancer: [
    'view_marketplace',
    'view_personal_center',
    'accept_order',
    'submit_work',
  ],
  guest: [
    'view_marketplace',
  ],
}

// Define the context type
interface PermissionContextType {
  userRole: UserRole
  setUserRole: (role: UserRole) => void
  hasPermission: (permission: Permission) => boolean
  userPermissions: Permission[]
}

// Create the context
const PermissionContext = createContext<PermissionContextType | undefined>(undefined)

// Create a provider component
interface PermissionProviderProps {
  children: ReactNode
  initialRole?: UserRole
}

export const PermissionProvider: React.FC<PermissionProviderProps> = ({
  children,
  initialRole = 'guest',
}) => {
  const [userRole, setUserRole] = useState<UserRole>(initialRole)

  console.log('userRole', userRole, initialRole)

  // Get permissions for the current role
  const userPermissions = rolePermissions[userRole] || []

  // Check if user has a specific permission
  const hasPermission = (permission: Permission): boolean => {
    return userPermissions.includes(permission)
  }

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    userRole,
    setUserRole,
    hasPermission,
    userPermissions,
  }), [userRole, userPermissions])

  return (
    <PermissionContext.Provider value={contextValue}>
      {children}
    </PermissionContext.Provider>
  )
}

// Create a hook to use the permission context
export function usePermission(): PermissionContextType {
  const context = useContext(PermissionContext)
  if (context === undefined) {
    throw new Error('usePermission must be used within a PermissionProvider')
  }
  return context
}

// Create a permission-based component wrapper
interface WithPermissionProps {
  permission: Permission
  fallback?: React.ReactNode
  children: React.ReactNode
}

export const WithPermission: React.FC<WithPermissionProps> = ({
  permission,
  fallback = null,
  children,
}) => {
  const { hasPermission } = usePermission()

  return hasPermission(permission) ? <>{children}</> : <>{fallback}</>
}

// Create a permission-based route guard
interface PermissionRouteProps {
  permission: Permission
  fallbackPath?: string
  element: React.ReactNode
}

export const PermissionRoute: React.FC<PermissionRouteProps> = ({
  permission,
  fallbackPath = '/error/403',
  element,
}) => {
  const { hasPermission } = usePermission()

  if (!hasPermission(permission)) {
    return <Navigate to={fallbackPath} />
  }

  return <>{element}</>
}
