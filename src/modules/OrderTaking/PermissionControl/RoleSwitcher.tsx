import type { UserRole } from './PermissionContext'
import { Card, Select, Space, Tag, Typography } from 'antd'
import React from 'react'
import { usePermission } from './PermissionContext'

const { Option } = Select
const { Text, Title } = Typography

const RoleSwitcher: React.FC = () => {
  const { userRole, setUserRole, userPermissions } = usePermission()

  const handleRoleChange = (value: UserRole) => {
    setUserRole(value)
  }

  const getRoleColor = (role: UserRole): string => {
    switch (role) {
      case 'admin':
        return 'red'
      case 'client':
        return 'blue'
      case 'freelancer':
        return 'green'
      case 'guest':
        return 'default'
      default:
        return 'default'
    }
  }

  return (
    <Card title="Role & Permissions" style={{ marginBottom: 16 }}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <div>
          <Text strong>Current Role: </Text>
          <Tag color={getRoleColor(userRole)}>{userRole?.toUpperCase()}</Tag>
        </div>

        <div>
          <Text>Switch Role:</Text>
          <Select
            value={userRole}
            onChange={handleRoleChange}
            style={{ width: 200, marginLeft: 8 }}
          >
            <Option value="admin">Admin</Option>
            <Option value="client">Client</Option>
            <Option value="freelancer">Freelancer</Option>
            <Option value="guest">Guest</Option>
          </Select>
        </div>

        <div>
          <Title level={5}>Current Permissions:</Title>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {userPermissions?.map(permission => (
              <Tag key={permission} color="blue">{permission}</Tag>
            ))}
          </div>
        </div>
      </Space>
    </Card>
  )
}

export default RoleSwitcher
