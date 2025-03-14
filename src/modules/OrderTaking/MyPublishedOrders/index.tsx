import type { ColumnsType } from 'antd/es/table'
import { CheckOutlined, CloseOutlined, DeleteOutlined, EditOutlined, EllipsisOutlined, EyeOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons'
import { Badge, Button, Card, Dropdown, Form, Input, Modal, Space, Table, Tag, Tooltip, Typography } from 'antd'
import React, { useState } from 'react'

const { TextArea } = Input

interface PublishedOrder {
  id: string
  title: string
  budget: number
  deadline: string
  status: 'open' | 'in_progress' | 'completed' | 'cancelled'
  applicants: number
  createdAt: string
  views: number
  category: string
}

// Mock data - would be replaced with API calls
const mockPublishedOrders: PublishedOrder[] = [
  {
    id: '1',
    title: 'Website Development for E-commerce Platform',
    budget: 2500,
    deadline: '2023-06-30',
    status: 'open',
    applicants: 12,
    createdAt: '2023-05-15',
    views: 156,
    category: 'Web Development',
  },
  {
    id: '2',
    title: 'Mobile App UI/UX Design',
    budget: 1800,
    deadline: '2023-06-15',
    status: 'in_progress',
    applicants: 8,
    createdAt: '2023-05-12',
    views: 98,
    category: 'Design',
  },
  {
    id: '3',
    title: 'Content Writing for Technology Blog',
    budget: 800,
    deadline: '2023-06-10',
    status: 'completed',
    applicants: 15,
    createdAt: '2023-05-10',
    views: 75,
    category: 'Writing',
  },
  {
    id: '4',
    title: 'Database Optimization for Web Application',
    budget: 1200,
    deadline: '2023-06-20',
    status: 'cancelled',
    applicants: 5,
    createdAt: '2023-05-08',
    views: 62,
    category: 'Database',
  },
]

const MyPublishedOrders: React.FC = () => {
  const [orders] = useState<PublishedOrder[]>(mockPublishedOrders)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [modalType, setModalType] = useState<'create' | 'edit'>('create')
  const [form] = Form.useForm()

  const showCreateModal = () => {
    setModalType('create')
    form.resetFields()
    setIsModalVisible(true)
  }

  const showEditModal = (order: PublishedOrder) => {
    setModalType('edit')
    form.setFieldsValue({
      title: order.title,
      budget: order.budget,
      deadline: order.deadline,
      category: order.category,
      description: 'Detailed description would be loaded here...',
    })
    setIsModalVisible(true)
  }

  const handleModalOk = () => {
    form.validateFields().then((_values) => {
      // In a real application, you would submit the form data to an API
      setIsModalVisible(false)
    }).catch((_info) => {
      // Handle validation errors
    })
  }

  const handleModalCancel = () => {
    setIsModalVisible(false)
  }

  const handleViewApplicants = (_orderId: string) => {
    // In a real application, you would navigate to a page showing applicants
  }

  const handleDeleteOrder = (_orderId: string) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this order?',
      content: 'This action cannot be undone.',
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk() {
        // In a real application, you would call an API to delete the order
      },
    })
  }

  const getStatusBadge = (status: PublishedOrder['status']) => {
    switch (status) {
      case 'open':
        return <Badge status="success" text="Open" />
      case 'in_progress':
        return <Badge status="processing" text="In Progress" />
      case 'completed':
        return <Badge status="default" text="Completed" />
      case 'cancelled':
        return <Badge status="error" text="Cancelled" />
      default:
        return null
    }
  }

  const columns: ColumnsType<PublishedOrder> = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <Tooltip title="View details">
          <a href={`/order/${record.id}`}>{text}</a>
        </Tooltip>
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
      sorter: (a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime(),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: status => getStatusBadge(status),
      filters: [
        { text: 'Open', value: 'open' },
        { text: 'In Progress', value: 'in_progress' },
        { text: 'Completed', value: 'completed' },
        { text: 'Cancelled', value: 'cancelled' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Applicants',
      dataIndex: 'applicants',
      key: 'applicants',
      render: (applicants, record) => (
        <Button
          type="link"
          onClick={() => handleViewApplicants(record.id)}
          icon={<UserOutlined />}
        >
          {applicants}
        </Button>
      ),
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
    {
      title: 'Views',
      dataIndex: 'views',
      key: 'views',
      sorter: (a, b) => a.views - b.views,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: category => <Tag color="blue">{category}</Tag>,
      filters: [
        { text: 'Web Development', value: 'Web Development' },
        { text: 'Design', value: 'Design' },
        { text: 'Writing', value: 'Writing' },
        { text: 'Database', value: 'Database' },
      ],
      onFilter: (value, record) => record.category === value,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          {record.status === 'open' && (
            <Tooltip title="Edit">
              <Button
                type="text"
                icon={<EditOutlined />}
                onClick={() => showEditModal(record)}
              />
            </Tooltip>
          )}
          <Tooltip title="View Details">
            <Button
              type="text"
              icon={<EyeOutlined />}
              href={`/order/${record.id}`}
            />
          </Tooltip>
          {record.status === 'open' && (
            <Tooltip title="Delete">
              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
                onClick={() => handleDeleteOrder(record.id)}
              />
            </Tooltip>
          )}
          <Dropdown
            menu={{
              items: [
                {
                  key: '1',
                  label: 'Mark as Completed',
                  icon: <CheckOutlined />,
                  disabled: record.status !== 'in_progress',
                },
                {
                  key: '2',
                  label: 'Cancel Order',
                  icon: <CloseOutlined />,
                  disabled: record.status !== 'open' && record.status !== 'in_progress',
                  danger: true,
                },
              ],
            }}
            trigger={['click']}
          >
            <Button type="text" icon={<EllipsisOutlined />} />
          </Dropdown>
        </Space>
      ),
    },
  ]

  return (
    <>
      <Card
        title="My Published Orders"
        extra={(
          <Button type="primary" icon={<PlusOutlined />} onClick={showCreateModal}>
            Create New Order
          </Button>
        )}
      >
        <Table
          columns={columns}
          dataSource={orders}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>

      <Modal
        title={modalType === 'create' ? 'Create New Order' : 'Edit Order'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={700}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please enter the order title' }]}
          >
            <Input placeholder="Enter a descriptive title for your order" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter the order description' }]}
          >
            <TextArea rows={6} placeholder="Provide detailed information about your requirements" />
          </Form.Item>

          <Space size="large" style={{ display: 'flex' }}>
            <Form.Item
              name="budget"
              label="Budget ($)"
              rules={[{ required: true, message: 'Please enter the budget' }]}
              style={{ width: '100%' }}
            >
              <Input type="number" min={1} placeholder="Enter budget amount" />
            </Form.Item>

            <Form.Item
              name="deadline"
              label="Deadline"
              rules={[{ required: true, message: 'Please select a deadline' }]}
              style={{ width: '100%' }}
            >
              <Input type="date" />
            </Form.Item>
          </Space>

          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: 'Please select a category' }]}
          >
            <Input placeholder="Select category" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default MyPublishedOrders
