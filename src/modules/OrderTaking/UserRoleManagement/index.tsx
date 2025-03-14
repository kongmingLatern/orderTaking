import type { ColumnsType } from 'antd/es/table'
import { DeleteOutlined, EditOutlined, LockOutlined, PlusOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Card, Divider, Form, Input, Modal, Select, Space, Switch, Table, Tabs, Tag, Typography } from 'antd'
import React, { useState } from 'react'

const { Title, Text } = Typography
const { TabPane } = Tabs
const { Option } = Select

interface User {
  id: string
  username: string
  email: string
  role: 'admin' | 'client' | 'freelancer'
  status: 'active' | 'inactive' | 'suspended'
  createdAt: string
}

interface Role {
  id: string
  name: string
  description: string
  permissions: Permission[]
  userCount: number
}

interface Permission {
  id: string
  name: string
  description: string
  module: string
}

// Mock data - would be replaced with API calls
const mockUsers: User[] = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@example.com',
    role: 'admin',
    status: 'active',
    createdAt: '2023-01-01',
  },
  {
    id: '2',
    username: 'johndoe',
    email: 'john.doe@example.com',
    role: 'freelancer',
    status: 'active',
    createdAt: '2023-01-15',
  },
  {
    id: '3',
    username: 'janedoe',
    email: 'jane.doe@example.com',
    role: 'client',
    status: 'active',
    createdAt: '2023-02-05',
  },
  {
    id: '4',
    username: 'bobsmith',
    email: 'bob.smith@example.com',
    role: 'freelancer',
    status: 'suspended',
    createdAt: '2023-02-20',
  },
]

const mockRoles: Role[] = [
  {
    id: '1',
    name: 'Admin',
    description: 'Full system access with all permissions',
    permissions: [
      { id: '1', name: 'user_create', description: 'Create users', module: 'User Management' },
      { id: '2', name: 'user_read', description: 'View users', module: 'User Management' },
      { id: '3', name: 'user_update', description: 'Update users', module: 'User Management' },
      { id: '4', name: 'user_delete', description: 'Delete users', module: 'User Management' },
      { id: '5', name: 'role_manage', description: 'Manage roles', module: 'User Management' },
      { id: '6', name: 'order_approve', description: 'Approve orders', module: 'Order Management' },
    ],
    userCount: 1,
  },
  {
    id: '2',
    name: 'Client',
    description: 'Can publish orders and manage own account',
    permissions: [
      { id: '7', name: 'order_create', description: 'Create orders', module: 'Order Management' },
      { id: '8', name: 'order_read', description: 'View orders', module: 'Order Management' },
      { id: '9', name: 'order_update', description: 'Update own orders', module: 'Order Management' },
      { id: '10', name: 'order_delete', description: 'Delete own orders', module: 'Order Management' },
    ],
    userCount: 1,
  },
  {
    id: '3',
    name: 'Freelancer',
    description: 'Can accept orders and manage own account',
    permissions: [
      { id: '11', name: 'order_read', description: 'View orders', module: 'Order Management' },
      { id: '12', name: 'order_accept', description: 'Accept orders', module: 'Order Management' },
      { id: '13', name: 'order_submit', description: 'Submit completed work', module: 'Order Management' },
    ],
    userCount: 2,
  },
]

const mockPermissions: Permission[] = [
  { id: '1', name: 'user_create', description: 'Create users', module: 'User Management' },
  { id: '2', name: 'user_read', description: 'View users', module: 'User Management' },
  { id: '3', name: 'user_update', description: 'Update users', module: 'User Management' },
  { id: '4', name: 'user_delete', description: 'Delete users', module: 'User Management' },
  { id: '5', name: 'role_manage', description: 'Manage roles', module: 'User Management' },
  { id: '6', name: 'order_approve', description: 'Approve orders', module: 'Order Management' },
  { id: '7', name: 'order_create', description: 'Create orders', module: 'Order Management' },
  { id: '8', name: 'order_read', description: 'View orders', module: 'Order Management' },
  { id: '9', name: 'order_update', description: 'Update own orders', module: 'Order Management' },
  { id: '10', name: 'order_delete', description: 'Delete own orders', module: 'Order Management' },
  { id: '11', name: 'order_accept', description: 'Accept orders', module: 'Order Management' },
  { id: '12', name: 'order_submit', description: 'Submit completed work', module: 'Order Management' },
]

const UserRoleManagement: React.FC = () => {
  const [users] = useState<User[]>(mockUsers)
  const [roles] = useState<Role[]>(mockRoles)
  const [permissions] = useState<Permission[]>(mockPermissions)
  const [activeTab, setActiveTab] = useState<string>('users')
  const [isUserModalVisible, setIsUserModalVisible] = useState(false)
  const [isRoleModalVisible, setIsRoleModalVisible] = useState(false)
  const [userForm] = Form.useForm()
  const [roleForm] = Form.useForm()

  const handleTabChange = (key: string) => {
    setActiveTab(key)
  }

  // User management functions
  const showCreateUserModal = () => {
    userForm.resetFields()
    setIsUserModalVisible(true)
  }

  const handleUserModalOk = () => {
    userForm.validateFields().then((_values) => {
      // In a real application, you would submit the form data to an API
      setIsUserModalVisible(false)
    }).catch((_info) => {
      // Handle validation errors
    })
  }

  const handleUserModalCancel = () => {
    setIsUserModalVisible(false)
  }

  const handleDeleteUser = (_userId: string) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this user?',
      content: 'This action cannot be undone.',
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk() {
        // In a real application, you would call an API to delete the user
      },
    })
  }

  const handleEditUser = (_userId: string) => {
    // In a real application, you would fetch user data and open edit modal
  }

  // Role management functions
  const showCreateRoleModal = () => {
    roleForm.resetFields()
    setIsRoleModalVisible(true)
  }

  const handleRoleModalOk = () => {
    roleForm.validateFields().then((_values) => {
      // In a real application, you would submit the form data to an API
      setIsRoleModalVisible(false)
    }).catch((_info) => {
      // Handle validation errors
    })
  }

  const handleRoleModalCancel = () => {
    setIsRoleModalVisible(false)
  }

  const handleDeleteRole = (_roleId: string) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this role?',
      content: 'This will affect all users with this role. This action cannot be undone.',
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk() {
        // In a real application, you would call an API to delete the role
      },
    })
  }

  const handleEditRole = (_roleId: string) => {
    // In a real application, you would fetch role data and open edit modal
  }

  const getRoleTag = (role: User['role']) => {
    switch (role) {
      case 'admin':
        return <Tag color="red">Admin</Tag>
      case 'client':
        return <Tag color="blue">Client</Tag>
      case 'freelancer':
        return <Tag color="green">Freelancer</Tag>
      default:
        return null
    }
  }

  const getStatusTag = (status: User['status']) => {
    switch (status) {
      case 'active':
        return <Tag color="success">Active</Tag>
      case 'inactive':
        return <Tag color="default">Inactive</Tag>
      case 'suspended':
        return <Tag color="error">Suspended</Tag>
      default:
        return null
    }
  }

  const userColumns: ColumnsType<User> = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: role => getRoleTag(role),
      filters: [
        { text: 'Admin', value: 'admin' },
        { text: 'Client', value: 'client' },
        { text: 'Freelancer', value: 'freelancer' },
      ],
      onFilter: (value, record) => record.role === value,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: status => getStatusTag(status),
      filters: [
        { text: 'Active', value: 'active' },
        { text: 'Inactive', value: 'inactive' },
        { text: 'Suspended', value: 'suspended' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEditUser(record.id)}
          />
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteUser(record.id)}
          />
        </Space>
      ),
    },
  ]

  const roleColumns: ColumnsType<Role> = [
    {
      title: 'Role Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Permissions',
      dataIndex: 'permissions',
      key: 'permissions',
      render: permissions => (
        <span>
          {permissions.length}
          {' '}
          permissions assigned
        </span>
      ),
    },
    {
      title: 'Users',
      dataIndex: 'userCount',
      key: 'userCount',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEditRole(record.id)}
          />
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteRole(record.id)}
            disabled={record.name === 'Admin'} // Prevent deleting the Admin role
          />
        </Space>
      ),
    },
  ]

  const permissionColumns: ColumnsType<Permission> = [
    {
      title: 'Permission Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Module',
      dataIndex: 'module',
      key: 'module',
      filters: [
        { text: 'User Management', value: 'User Management' },
        { text: 'Order Management', value: 'Order Management' },
      ],
      onFilter: (value, record) => record.module === value,
      render: module => <Tag>{module}</Tag>,
    },
  ]

  return (
    <>
      <Card title="User & Role Management">
        <Tabs activeKey={activeTab} onChange={handleTabChange}>
          <TabPane
            tab={(
              <span>
                <UserOutlined />
                {' '}
                Users
              </span>
            )}
            key="users"
          >
            <div style={{ marginBottom: 16, textAlign: 'right' }}>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={showCreateUserModal}
              >
                Add User
              </Button>
            </div>
            <Table
              columns={userColumns}
              dataSource={users}
              rowKey="id"
              pagination={{ pageSize: 10 }}
            />
          </TabPane>

          <TabPane
            tab={(
              <span>
                <TeamOutlined />
                {' '}
                Roles
              </span>
            )}
            key="roles"
          >
            <div style={{ marginBottom: 16, textAlign: 'right' }}>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={showCreateRoleModal}
              >
                Add Role
              </Button>
            </div>
            <Table
              columns={roleColumns}
              dataSource={roles}
              rowKey="id"
              pagination={{ pageSize: 10 }}
              expandable={{
                expandedRowRender: record => (
                  <div style={{ margin: 0 }}>
                    <Title level={5}>Permissions</Title>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {record.permissions.map(permission => (
                        <Tag key={permission.id} color="blue">{permission.name}</Tag>
                      ))}
                    </div>
                  </div>
                ),
              }}
            />
          </TabPane>

          <TabPane
            tab={(
              <span>
                <LockOutlined />
                {' '}
                Permissions
              </span>
            )}
            key="permissions"
          >
            <Table
              columns={permissionColumns}
              dataSource={permissions}
              rowKey="id"
              pagination={{ pageSize: 10 }}
            />
          </TabPane>
        </Tabs>
      </Card>

      {/* User Modal */}
      <Modal
        title="Add User"
        open={isUserModalVisible}
        onOk={handleUserModalOk}
        onCancel={handleUserModalCancel}
        width={600}
      >
        <Form
          form={userForm}
          layout="vertical"
        >
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: 'Please enter a username' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please enter an email' },
              { type: 'email', message: 'Please enter a valid email' },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Please enter a password' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>

          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: 'Please select a role' }]}
          >
            <Select placeholder="Select a role">
              <Option value="admin">Admin</Option>
              <Option value="client">Client</Option>
              <Option value="freelancer">Freelancer</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="status"
            label="Status"
            initialValue="active"
          >
            <Select>
              <Option value="active">Active</Option>
              <Option value="inactive">Inactive</Option>
              <Option value="suspended">Suspended</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      {/* Role Modal */}
      <Modal
        title="Add Role"
        open={isRoleModalVisible}
        onOk={handleRoleModalOk}
        onCancel={handleRoleModalCancel}
        width={700}
      >
        <Form
          form={roleForm}
          layout="vertical"
        >
          <Form.Item
            name="name"
            label="Role Name"
            rules={[{ required: true, message: 'Please enter a role name' }]}
          >
            <Input placeholder="Role Name" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter a description' }]}
          >
            <Input.TextArea rows={3} placeholder="Role Description" />
          </Form.Item>

          <Divider orientation="left">Permissions</Divider>

          <div style={{ marginBottom: 16 }}>
            <Text>Select the permissions for this role:</Text>
          </div>

          {['User Management', 'Order Management'].map(module => (
            <div key={module} style={{ marginBottom: 16 }}>
              <Title level={5}>{module}</Title>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                {permissions
                  .filter(permission => permission.module === module)
                  .map(permission => (
                    <Form.Item
                      key={permission.id}
                      name={['permissions', permission.id]}
                      valuePropName="checked"
                      style={{ marginBottom: 8 }}
                    >
                      <Switch
                        checkedChildren={permission.name}
                        unCheckedChildren={permission.name}
                      />
                    </Form.Item>
                  ))}
              </div>
            </div>
          ))}
        </Form>
      </Modal>
    </>
  )
}

export default UserRoleManagement
