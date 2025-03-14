import { ClockCircleOutlined, DollarOutlined, FilterOutlined, SearchOutlined, SortAscendingOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Badge, Button, Card, Col, Divider, Input, List, Rate, Row, Select, Space, Tag, Typography } from 'antd'
import React, { useState } from 'react'

const { Paragraph, Text } = Typography
const { Option } = Select

interface Order {
  id: string
  title: string
  description: string
  budget: number
  deadline: string
  skills: string[]
  status: 'open' | 'in_progress' | 'completed'
  publisher: {
    id: string
    name: string
    avatar: string
    rating: number
  }
  createdAt: string
  views: number
  applications: number
}

// Mock data - would be replaced with API calls
const mockOrders: Order[] = [
  {
    id: '1',
    title: 'Website Development for E-commerce Platform',
    description: 'Looking for an experienced developer to build a responsive e-commerce website with payment integration, user authentication, and product management.',
    budget: 2500,
    deadline: '2023-06-30',
    skills: ['React', 'Node.js', 'MongoDB', 'Payment API'],
    status: 'open',
    publisher: {
      id: '101',
      name: 'Tech Solutions Inc.',
      avatar: '',
      rating: 4.7,
    },
    createdAt: '2023-05-15',
    views: 156,
    applications: 12,
  },
  {
    id: '2',
    title: 'Mobile App UI/UX Design',
    description: 'Need a creative designer to create modern and intuitive UI/UX for a fitness tracking mobile application.',
    budget: 1800,
    deadline: '2023-06-15',
    skills: ['UI/UX', 'Figma', 'Mobile Design', 'Adobe XD'],
    status: 'open',
    publisher: {
      id: '102',
      name: 'FitLife Apps',
      avatar: '',
      rating: 4.9,
    },
    createdAt: '2023-05-12',
    views: 98,
    applications: 8,
  },
  {
    id: '3',
    title: 'Content Writing for Technology Blog',
    description: 'Seeking a skilled content writer to create engaging articles about the latest technology trends, innovations, and product reviews.',
    budget: 800,
    deadline: '2023-06-10',
    skills: ['Content Writing', 'SEO', 'Technology Knowledge'],
    status: 'open',
    publisher: {
      id: '103',
      name: 'TechBlog Media',
      avatar: '',
      rating: 4.5,
    },
    createdAt: '2023-05-10',
    views: 75,
    applications: 15,
  },
  {
    id: '4',
    title: 'Database Optimization for Web Application',
    description: 'Looking for a database expert to optimize our current database structure, improve query performance, and implement better indexing strategies.',
    budget: 1200,
    deadline: '2023-06-20',
    skills: ['SQL', 'Database Design', 'Performance Tuning'],
    status: 'open',
    publisher: {
      id: '104',
      name: 'DataSystems Co.',
      avatar: '',
      rating: 4.6,
    },
    createdAt: '2023-05-08',
    views: 62,
    applications: 5,
  },
]

const Marketplace: React.FC = () => {
  const [orders] = useState<Order[]>(mockOrders)
  const [searchText, setSearchText] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('newest')

  const handleSearch = (value: string) => {
    setSearchText(value)
    // In a real application, you would call an API with the search parameters
  }

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value)
    // In a real application, you would call an API with the filter parameters
  }

  const handleSortChange = (value: string) => {
    setSortBy(value)
    // In a real application, you would call an API with the sort parameters
  }

  const handleApply = (_orderId: string) => {
    // In a real application, you would handle the application process
    // Log the order ID for development purposes
  }

  return (
    <Card title="Marketplace">
      <Row gutter={[16, 24]}>
        <Col span={24}>
          <Row gutter={16} align="middle">
            <Col xs={24} sm={12} md={8} lg={10}>
              <Input
                placeholder="Search projects..."
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={e => handleSearch(e.target.value)}
                size="large"
              />
            </Col>
            <Col xs={24} sm={12} md={8} lg={7}>
              <Space>
                <Select
                  style={{ width: 150 }}
                  placeholder="Category"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  size="large"
                >
                  <Option value="all">All Categories</Option>
                  <Option value="web">Web Development</Option>
                  <Option value="mobile">Mobile Development</Option>
                  <Option value="design">Design</Option>
                  <Option value="writing">Writing</Option>
                  <Option value="marketing">Marketing</Option>
                </Select>
                <Select
                  style={{ width: 150 }}
                  placeholder="Sort by"
                  value={sortBy}
                  onChange={handleSortChange}
                  size="large"
                >
                  <Option value="newest">Newest First</Option>
                  <Option value="budget_high">Budget: High to Low</Option>
                  <Option value="budget_low">Budget: Low to High</Option>
                  <Option value="deadline">Deadline: Soonest</Option>
                </Select>
              </Space>
            </Col>
            <Col xs={24} sm={24} md={8} lg={7} style={{ textAlign: 'right' }}>
              <Space>
                <Button icon={<FilterOutlined />}>More Filters</Button>
                <Button type="primary" icon={<SortAscendingOutlined />}>Advanced Search</Button>
              </Space>
            </Col>
          </Row>
        </Col>

        <Col span={24}>
          <List
            itemLayout="vertical"
            size="large"
            pagination={{
              onChange: () => {
                // Handle pagination change
              },
              pageSize: 5,
            }}
            dataSource={orders}
            renderItem={item => (
              <List.Item
                key={item.id}
                actions={[
                  <Space key="views">
                    <ClockCircleOutlined />
                    {' '}
                    Deadline:
                    {' '}
                    {item.deadline}
                  </Space>,
                  <Space key="applications">
                    <UserOutlined />
                    {' '}
                    {item.applications}
                    {' '}
                    Applications
                  </Space>,
                  <Space key="budget">
                    <DollarOutlined />
                    {' '}
                    Budget: $
                    {item.budget}
                  </Space>,
                ]}
                extra={(
                  <Space direction="vertical" align="end">
                    <Button type="primary" onClick={() => handleApply(item.id)}>
                      Apply Now
                    </Button>
                    <Text type="secondary">
                      Posted on
                      {item.createdAt}
                    </Text>
                  </Space>
                )}
              >
                <List.Item.Meta
                  avatar={(
                    <Badge
                      count={item.status === 'open' ? 'OPEN' : item.status === 'in_progress' ? 'IN PROGRESS' : 'COMPLETED'}
                      style={{
                        backgroundColor: item.status === 'open'
                          ? '#52c41a'
                          : item.status === 'in_progress' ? '#1890ff' : '#d3adf7',
                      }}
                    >
                      <Avatar icon={<UserOutlined />} src={item.publisher.avatar} />
                    </Badge>
                  )}
                  title={<a href={`/order/${item.id}`}>{item.title}</a>}
                  description={(
                    <Space>
                      <Text>{item.publisher.name}</Text>
                      <Divider type="vertical" />
                      <Rate disabled defaultValue={item.publisher.rating} style={{ fontSize: 12 }} />
                      <Text>{item.publisher.rating}</Text>
                    </Space>
                  )}
                />
                <Paragraph ellipsis={{ rows: 2, expandable: true, symbol: 'more' }}>
                  {item.description}
                </Paragraph>
                <div>
                  {item.skills.map(skill => (
                    <Tag key={skill} color="blue" style={{ margin: '0 8px 8px 0' }}>{skill}</Tag>
                  ))}
                </div>
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </Card>
  )
}

export default Marketplace
