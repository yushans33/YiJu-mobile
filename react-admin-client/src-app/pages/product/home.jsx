import React, { Component } from 'react'
import { Card, Button, Table, Input, Select, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import LinkButton from '../../components/link-button'
import { reqProducts, reqSearchProducts, reqUpdateStatus } from '../../api'
import { PAGE_SIZE } from '../../utils/contants'
import { customHistory } from "../../utils/history";
/* prdouct的默认子路由组件 */
const Option = Select.Option
export default class ProductHome extends Component {
    state = {
        loading: false,//是否在获取商品
        products: [],//商品的数组
        total: 0,//商品的总数量
        searchName: '',//搜索的内容
        searchType: 'productName'//默认搜索按名称搜索


    }
    /* 初始化表格列的数组 */
    initColumns = () => {
        this.columns = [
            {
                title: '商品名称',
                dataIndex: 'name',
            },
            {
                title: '商品描述',
                dataIndex: 'desc',
            },
            {
                title: '价格',
                dataIndex: 'price',
                render: (price) => '¥' + price //// 当前指定了对应的属性, 传入的是对应的属性值
            },
            {
                width: 100,
                title: '状态',
                render: (product) => {
                    const { _id, status } = product
                    const newStatues = status === 1 ? 2 : 1
                    return (
                        <span>
                            <Button
                                type='primary'
                                onClick={() => this.updateStatus(_id, newStatues)}
                            >
                                {status === 1 ? '下架' : '上架'}
                            </Button>
                            <span>{status === 1 ? '在售' : '已下架'}</span>
                        </span>
                    )
                }
            },
            {
                width: 100,
                title: '操作',
                render: (product) => {
                    return (
                        <span>
                            {/* product对象通过state传递给目标路由组件 */}
                            <LinkButton onClick={() => customHistory.push('/product/detail', { product })}>详情</LinkButton>
                            <LinkButton onClick={() => customHistory.push('/product/addupdate', product)}>修改</LinkButton>
                        </span>
                    )
                }
            },
        ]
    }

    // 获取商品分类列表, 获取指定页码的列表数据显示
    getProducts = async (pageNum) => {
        this.pageNum = pageNum//保存当前请求页面，方便后面其他方法使用
        this.setState({ loading: true })
        const { searchName, searchType } = this.state
        let result
        // 如果searchName有值，按搜索获取商品分类列表
        if (searchName) {
            result = await reqSearchProducts({ pageNum, pageSize: PAGE_SIZE, searchName, searchType })
        } else {//一般获取
            result = await reqProducts(pageNum, PAGE_SIZE)
        }
        this.setState({ loading: false })
        // 取出分页数据, 更新状态, 显示分页列表
        if (result.status === 0) {
            const { total, list } = result.data
            this.setState({
                total,
                products: list
            })
        }
    }

    //改变商品的状态
    updateStatus = async (productId, status) => {
        const result = await reqUpdateStatus(productId, status)
        if (result.status === 0) {
            message.success('更新状态成功！')
            this.getProducts(this.pageNum)
        }

    }

    componentWillMount() {
        this.initColumns()
    }
    componentDidMount() {
        this.getProducts(1)
    }
    render() {
        const { products, total, loading, searchName, searchType } = this.state

        const title = (
            <span >
                <Select
                    value={searchType}
                    style={{ width: 150 }}
                    onChange={value => this.setState({ searchType: value })}>
                    <Option value='productName'>按名称搜索</Option>
                    <Option value='productDesc'>按描述搜索</Option>
                </Select>
                <Input placeholder='关键字'
                    style={{ width: 150, margin: '0 15px' }}
                    value={searchName}
                    onChange={event => this.setState({ searchName: event.target.value })}
                />
                {/*点击事件里的函数要传参数则要外面套一层回调函数 */}
                <Button type='primary' onClick={() => this.getProducts(1)}>搜索</Button>
            </span>

        )
        const extra = (
            <Button type='primary' onClick={() => customHistory.push('/product/addupdate')}>
                <PlusOutlined />
                添加商品
            </Button>
        )
        return (
            <Card title={title} extra={extra}>
                <Table

                    loading={loading}
                    rowKey='_id'
                    bordered
                    dataSource={products}
                    columns={this.columns}
                    pagination={{
                        current: this.pageNum,
                        defaultPageSize: PAGE_SIZE,
                        showQuickJumper: true,
                        total,
                        onChange: this.getProducts
                    }}
                />
            </Card>
        )
    }
}
