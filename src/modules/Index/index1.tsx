import { Button, Card, Space, Typography } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import RoleSwitcher from '../OrderTaking/PermissionControl/RoleSwitcher'
/**
 * 这里是一段对该页面的描述
 *
 * @description 首页
 */

const { Title, Paragraph } = Typography

const data = [
  { hour: '00:00', uv: 4000, pv: 2400 },
  { hour: '03:00', uv: 3000, pv: 1398 },
  { hour: '06:00', uv: 2000, pv: 9800 },
  { hour: '09:00', uv: 2780, pv: 3908 },
  { hour: '12:00', uv: 1890, pv: 4800 },
  { hour: '15:00', uv: 2390, pv: 3800 },
  { hour: '18:00', uv: 3490, pv: 4300 },
  { hour: '21:00', uv: 3490, pv: 4300 },
]

const pieData = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

const Index: React.FC = () => {
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
              <Link to="/personal-center">Personal Center</Link>
            </Button>
            <Button type="link">
              <Link to="/marketplace">Marketplace</Link>
            </Button>
            <Button type="link">
              <Link to="/my-published-orders">My Published Orders</Link>
            </Button>
            <Button type="link">
              <Link to="/accepted-orders">Accepted Orders</Link>
            </Button>
          </Space>
        </Space>
      </Card>

    </>
  )
}

export default Index
