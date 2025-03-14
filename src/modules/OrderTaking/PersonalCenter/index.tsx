import { HistoryOutlined, SettingOutlined, StarOutlined, TrophyOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Card, Col, Divider, List, message, Row, Statistic, Tabs, Tag, Typography } from 'antd'
import React, { useEffect, useState } from 'react'

const { Title } = Typography
const { TabPane } = Tabs

interface UserProfile {
  id: string
  name: string
  avatar: string
  role: string
  email: string
  phone: string
  skills: string[]
  rating: number
  completedOrders: number
  pendingOrders: number
  balance: number
  joinDate: string
}

// Mock data - would be replaced with API calls
const mockUserProfile: UserProfile = {
  id: '1',
  name: 'John Doe',
  avatar: '',
  role: 'Freelancer',
  email: 'john.doe@example.com',
  phone: '+1 234 567 890',
  skills: ['Web Development', 'UI/UX Design', 'Mobile App Development'],
  rating: 4.8,
  completedOrders: 47,
  pendingOrders: 3,
  balance: 2450.75,
  joinDate: '2023-01-15',
}

const mockRecentActivity = [
  { id: '1', type: 'order_completed', title: 'Completed Website Development', date: '2023-05-10', amount: 750 },
  { id: '2', type: 'order_accepted', title: 'Mobile App UI Design', date: '2023-05-08', amount: 500 },
  { id: '3', type: 'payment_received', title: 'Payment Received', date: '2023-05-05', amount: 1200 },
  { id: '4', type: 'order_published', title: 'Published Logo Design Task', date: '2023-05-01', amount: 300 },
]

const PersonalCenter: React.FC = () => {
  const [userProfile] = useState<UserProfile>(mockUserProfile)
  const [recentActivity] = useState(mockRecentActivity)

  useEffect(() => {
    // Here you would fetch the user profile data
    // Example: fetchUserProfile(userId).then(data => setUserProfile(data))
  }, [])

  const handleWithdraw = () => {
    message.success('Withdrawal request submitted successfully')
  }

  const handleEditProfile = () => {
    message.info('Edit profile functionality will be implemented')
  }

  return (
    <Row gutter={[24, 24]}>
      <Col xs={24} lg={8}>
        <Card title="Personal Center">
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <Avatar size={100} icon={<UserOutlined />} src={userProfile.avatar} />
            <Title level={3} style={{ marginTop: 16, marginBottom: 4 }}>{userProfile.name}</Title>
            <Tag color="blue">{userProfile.role}</Tag>
          </div>

          <Divider />

          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Statistic title="Rating" value={userProfile.rating} prefix={<StarOutlined />} precision={1} />
            </Col>
            <Col span={8}>
              <Statistic title="Completed" value={userProfile.completedOrders} prefix={<TrophyOutlined />} />
            </Col>
            <Col span={8}>
              <Statistic title="Pending" value={userProfile.pendingOrders} />
            </Col>
          </Row>

          <Divider />

          <div>
            <Title level={5}>Contact Information</Title>
            <p>
              <strong>Email:</strong>
              {' '}
              {userProfile.email}
            </p>
            <p>
              <strong>Phone:</strong>
              {' '}
              {userProfile.phone}
            </p>
            <p>
              <strong>Member since:</strong>
              {' '}
              {userProfile.joinDate}
            </p>
          </div>

          <Divider />

          <div>
            <Title level={5}>Skills</Title>
            <div>
              {userProfile.skills.map(skill => (
                <Tag key={skill} color="blue" style={{ margin: '0 8px 8px 0' }}>{skill}</Tag>
              ))}
            </div>
          </div>

          <Divider />

          <Button type="primary" block onClick={handleEditProfile}>
            Edit Profile
          </Button>
        </Card>
      </Col>

      <Col xs={24} lg={16}>
        <Card>
          <Tabs defaultActiveKey="1">
            <TabPane
              tab={(
                <span>
                  <HistoryOutlined />
                  {' '}
                  Recent Activity
                </span>
              )}
              key="1"
            >
              <List
                itemLayout="horizontal"
                dataSource={recentActivity}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      title={item.title}
                      description={`Date: ${item.date}`}
                    />
                    <div>
                      <Tag color={
                        item.type === 'order_completed'
                          ? 'green'
                          : item.type === 'order_accepted'
                            ? 'blue'
                            : item.type === 'payment_received' ? 'gold' : 'purple'
                      }
                      >
                        $
                        {item.amount}
                      </Tag>
                    </div>
                  </List.Item>
                )}
              />
            </TabPane>

            <TabPane
              tab={(
                <span>
                  <SettingOutlined />
                  {' '}
                  Account
                </span>
              )}
              key="2"
            >
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Card title="Balance">
                    <Row align="middle" justify="space-between">
                      <Col>
                        <Statistic
                          title="Available Balance"
                          value={userProfile.balance}
                          precision={2}
                          prefix="$"
                        />
                      </Col>
                      <Col>
                        <Button type="primary" onClick={handleWithdraw}>
                          Withdraw
                        </Button>
                      </Col>
                    </Row>
                  </Card>
                </Col>

                <Col span={24}>
                  <Card title="Account Settings">
                    <Button block style={{ marginBottom: 16 }}>Change Password</Button>
                    <Button block style={{ marginBottom: 16 }}>Notification Settings</Button>
                    <Button block>Privacy Settings</Button>
                  </Card>
                </Col>
              </Row>
            </TabPane>
          </Tabs>
        </Card>
      </Col>
    </Row>
  )
}

export default PersonalCenter
