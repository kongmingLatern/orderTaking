import { Button, Card, Space, Typography } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import RoleSwitcher from '../OrderTaking/PermissionControl/RoleSwitcher'

const { Title, Paragraph } = Typography

const OrderTakingIndex: React.FC = () => {
  return (
    <>
      <RoleSwitcher />

      <Card title="Order Taking Platform">
        <Space direction="vertical" style={{ width: '100%' }}>
          <Title level={3}>Welcome to the Order Taking Platform</Title>
          <Paragraph>
            This platform allows clients to publish orders and freelancers to accept and complete them.
            Use the role switcher above to test different user roles and permissions.
          </Paragraph>

          <Title level={4}>Available Pages:</Title>
          <Space direction="vertical">
            <Button type="link">
              <Link to="/order-taking/personal-center">Personal Center</Link>
            </Button>
            <Button type="link">
              <Link to="/order-taking/marketplace">Marketplace</Link>
            </Button>
            <Button type="link">
              <Link to="/order-taking/my-published-orders">My Published Orders</Link>
            </Button>
            <Button type="link">
              <Link to="/order-taking/accepted-orders">Accepted Orders</Link>
            </Button>
            <Button type="link">
              <Link to="/order-taking/user-role-management">User & Role Management</Link>
            </Button>
          </Space>
        </Space>
      </Card>
    </>
  )
}

export default OrderTakingIndex
