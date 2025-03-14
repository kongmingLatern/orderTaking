import type { ColumnsType } from 'antd/es/table'
import { ClockCircleOutlined, DollarOutlined, EyeOutlined, FileTextOutlined, MessageOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Badge, Button, Card, Divider, Modal, Progress, Space, Table, Tabs, Tag, Tooltip, Typography } from 'antd'
import React, { useState } from 'react'

const { Text, Title, Paragraph } = Typography
const { TabPane } = Tabs

interface AcceptedOrder {
  id: string
  title: string
  client: {
    id: string
    name: string
    avatar: string
    rating: number
  }
  budget: number
  deadline: string
  status: 'in_progress' | 'under_review' | 'completed' | 'disputed'
  progress: number
  category: string
  startDate: string
  description: string
}

// Mock data - would be replaced with API calls
const mockAcceptedOrders: AcceptedOrder[] = [
  {
    id: '1',
    title: 'E-commerce Website Development',
    client: {
      id: '101',
      name: 'Tech Solutions Inc.',
      avatar: '',
      rating: 4.7,
    },
    budget: 2500,
    deadline: '2023-06-30',
    status: 'in_progress',
    progress: 65,
    category: 'Web Development',
    startDate: '2023-05-20',
    description: 'Developing a responsive e-commerce website with payment integration, user authentication, and product management.',
  },
  {
    id: '2',
    title: 'Mobile App UI Design',
    client: {
      id: '102',
      name: 'FitLife Apps',
      avatar: '',
      rating: 4.9,
    },
    budget: 1800,
    deadline: '2023-06-15',
    status: 'under_review',
    progress: 100,
    category: 'Design',
    startDate: '2023-05-18',
    description: 'Creating modern and intuitive UI/UX for a fitness tracking mobile application.',
  },
  {
    id: '3',
    title: 'SEO Content Writing',
    client: {
      id: '103',
      name: 'TechBlog Media',
      avatar: '',
      rating: 4.5,
    },
    budget: 800,
    deadline: '2023-06-10',
    status: 'completed',
    progress: 100,
    category: 'Writing',
    startDate: '2023-05-15',
    description: 'Writing engaging articles about the latest technology trends, innovations, and product reviews.',
  },
  {
    id: '4',
    title: 'Database Optimization',
    client: {
      id: '104',
      name: 'DataSystems Co.',
      avatar: '',
      rating: 4.6,
    },
    budget: 1200,
    deadline: '2023-06-20',
    status: 'disputed',
    progress: 80,
    category: 'Database',
    startDate: '2023-05-12',
    description: 'Optimizing database structure, improving query performance, and implementing better indexing strategies.',
  },
]

const AcceptedOrders: React.FC = () => {
  const [orders] = useState<AcceptedOrder[]>(mockAcceptedOrders)
  const [activeTab, setActiveTab] = useState<string>('all')
  const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<AcceptedOrder | null>(null)

  const handleTabChange = (key: string) => {
    setActiveTab(key)
  }

  const showOrderDetails = (order: AcceptedOrder) => {
    setSelectedOrder(order)
    setIsDetailsModalVisible(true)
  }

  const handleModalCancel = () => {
    setIsDetailsModalVisible(false)
  }

  const handleSubmitWork = (_orderId: string) => {
    Modal.confirm({
      title: 'Submit Work for Review',
      content: 'Are you sure you want to submit this work for client review? The client will be notified.',
      okText: 'Submit',
      cancelText: 'Cancel',
      onOk() {
        // In a real application, you would call an API to submit the work
      },
    })
  }

  const handleMessageClient = (_clientId: string) => {
    // In a real application, you would open a messaging interface
  }

  const getStatusBadge = (status: AcceptedOrder['status']) => {
    switch (status) {
      case 'in_progress':
        return <Badge status="processing" text="In Progress" />
      case 'under_review':
        return <Badge status="warning" text="Under Review" />
      case 'completed':
        return <Badge status="success" text="Completed" />
      case 'disputed':
        return <Badge status="error" text="Disputed" />
      default:
        return null
    }
  }

  const filteredOrders = activeTab === 'all'
    ? orders
    : orders.filter(order => order.status === activeTab)

  const columns: ColumnsType<AcceptedOrder> = [
    {
      title: 'Order',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <Space direction="vertical" size={0}>
          <a onClick={() => showOrderDetails(record)}>{text}</a>
          <Text type="secondary">{record.category}</Text>
        </Space>
      ),
    },
    {
      title: 'Client',
      dataIndex: 'client',
      key: 'client',
      render: client => (
        <Space>
          <Avatar icon={<UserOutlined />} src={client.avatar} />
          <Text>{client.name}</Text>
        </Space>
      ),
    },
    {
      title: 'Budget',
      dataIndex: 'budget',
      key: 'budget',
      render: budget => `$${budget}`,
      sorter: (a, b) => a.budget - b.budget,
    },
    {
      title: 'Deadline',
      dataIndex: 'deadline',
      key: 'deadline',
      render: (deadline, record) => (
        <Space direction="vertical" size={0}>
          <Text>{deadline}</Text>
          <Text type="secondary">
            Started:
            {record.startDate}
          </Text>
        </Space>
      ),
      sorter: (a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime(),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: status => getStatusBadge(status),
      filters: [
        { text: 'In Progress', value: 'in_progress' },
        { text: 'Under Review', value: 'under_review' },
        { text: 'Completed', value: 'completed' },
        { text: 'Disputed', value: 'disputed' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Progress',
      dataIndex: 'progress',
      key: 'progress',
      render: progress => <Progress percent={progress} size="small" />,
      sorter: (a, b) => a.progress - b.progress,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Tooltip title="View Details">
            <Button
              type="text"
              icon={<EyeOutlined />}
              onClick={() => showOrderDetails(record)}
            />
          </Tooltip>
          <Tooltip title="Message Client">
            <Button
              type="text"
              icon={<MessageOutlined />}
              onClick={() => handleMessageClient(record.client.id)}
            />
          </Tooltip>
          {record.status === 'in_progress' && (
            <Tooltip title="Submit Work">
              <Button
                type="primary"
                size="small"
                onClick={() => handleSubmitWork(record.id)}
              >
                Submit
              </Button>
            </Tooltip>
          )}
        </Space>
      ),
    },
  ]

  return (
    <>
      <Card title="My Accepted Orders">
        <Tabs activeKey={activeTab} onChange={handleTabChange}>
          <TabPane tab="All Orders" key="all" />
          <TabPane tab="In Progress" key="in_progress" />
          <TabPane tab="Under Review" key="under_review" />
          <TabPane tab="Completed" key="completed" />
          <TabPane tab="Disputed" key="disputed" />
        </Tabs>

        <Table
          columns={columns}
          dataSource={filteredOrders}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>

      <Modal
        title="Order Details"
        open={isDetailsModalVisible}
        onCancel={handleModalCancel}
        footer={[
          <Button key="close" onClick={handleModalCancel}>
            Close
          </Button>,
          selectedOrder?.status === 'in_progress' && (
            <Button
              key="submit"
              type="primary"
              onClick={() => selectedOrder && handleSubmitWork(selectedOrder.id)}
            >
              Submit Work
            </Button>
          ),
        ]}
        width={700}
      >
        {selectedOrder && (
          <div>
            <Title level={4}>{selectedOrder.title}</Title>
            <Tag color="blue">{selectedOrder.category}</Tag>

            <Divider />

            <Space size="large" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
              <Space direction="vertical">
                <Text type="secondary">Status</Text>
                {getStatusBadge(selectedOrder.status)}
              </Space>

              <Space direction="vertical">
                <Text type="secondary">Budget</Text>
                <Text strong>
                  <DollarOutlined />
                  {' '}
                  $
                  {selectedOrder.budget}
                </Text>
              </Space>

              <Space direction="vertical">
                <Text type="secondary">Deadline</Text>
                <Text>
                  <ClockCircleOutlined />
                  {' '}
                  {selectedOrder.deadline}
                </Text>
              </Space>

              <Space direction="vertical">
                <Text type="secondary">Progress</Text>
                <Progress percent={selectedOrder.progress} size="small" style={{ width: 120 }} />
              </Space>
            </Space>

            <Divider />

            <Space direction="vertical" style={{ width: '100%' }}>
              <Text strong>Client</Text>
              <Space>
                <Avatar icon={<UserOutlined />} src={selectedOrder.client.avatar} />
                <Text>{selectedOrder.client.name}</Text>
              </Space>
            </Space>

            <Divider />

            <Space direction="vertical" style={{ width: '100%' }}>
              <Text strong>
                <FileTextOutlined />
                {' '}
                Description
              </Text>
              <Paragraph>{selectedOrder.description}</Paragraph>
            </Space>

            <Divider />

            <Space>
              <Button
                icon={<MessageOutlined />}
                onClick={() => handleMessageClient(selectedOrder.client.id)}
              >
                Message Client
              </Button>
            </Space>
          </div>
        )}
      </Modal>
    </>
  )
}

export default AcceptedOrders
