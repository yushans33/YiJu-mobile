import React, { Component } from 'react'
import { Card, List } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import LinkButton from '../../components/link-button'
import { customHistory } from "../../utils/history";
import { BASE_IMG_URL } from '../../utils/contants';
import { reqCategory } from '../../api/index'
const Item = List.Item
/* product的详情页面组件 */
export default class ProductDetail extends Component {
    state = {
        cName1: '',//一级分类名称
        cName2: '',//二级分类名称

    }
    async componentWillMount() {
        //根据id获取到分类名称
        const { pCategoryId, categoryId } = customHistory.location.state.product
        if (pCategoryId === '0') {// 一级分类下的商品
            const result = await reqCategory(categoryId)
            const cName1 = result.data.name
            this.setState({ cName1 })
        } else {// 二级分类下的商品
            //多个await同时请求：后一个请求只有当前一个请求成功返回之后才发送--效率低
            /*      const result1 = await reqCategory(pCategoryId)//获取一级商品的名称
                 const result2 = await reqCategory(categoryId)//获取二级商品的名称
                 const cName1 = result1.data.name
                 const cName2 = result2.data.name
                 this.setState({ cName1, cName2 }) */

            //一次性发送多个请求, 只有都成功了, 才正常处理
            const results = await Promise.all([reqCategory(pCategoryId), reqCategory(categoryId)])
            const cName1 = results[0].data.name
            const cName2 = results[1].data.name
            this.setState({ cName1, cName2 })
        }

    }

    render() {
        //接受传递过来的product
        // console.log(customHistory)---先不能测试因为不是从详情点进去没有传product对象
        const { name, desc, price, imgs, detail } = customHistory.location.state.product
        // console.log(typeof (detail))
        const { cName1, cName2 } = this.state
        const title = (
            <span>
                <LinkButton>
                    <ArrowLeftOutlined
                        style={{ marginRight: 10, fontSize: 20 }}
                        onClick={() => customHistory.back()}
                    />
                </LinkButton>

                <span >商品详情</span>
            </span>
        )

        return (
            <Card title={title} className='product-detail'>
                <List grid={{ gutter: 20 }}>
                    <Item >
                        <span className='left'>商品名称:</span>
                        <span >{name}</span>
                    </Item>
                    <Item >
                        <span className='left'>商品描述:</span>
                        <span>{desc}</span>
                    </Item>
                    <Item >
                        <span className='left'>商品价格:</span>
                        <span>{price}元</span>
                    </Item>
                    <Item >
                        <span className='left'>所属分类:</span>
                        <span>{cName1}{cName2 ? '-->' + cName2 : ''}</span>
                    </Item>
                    <Item >
                        <span className='left'>商品图片:</span>
                        <span>
                            {
                                imgs.map((img) => (
                                    <img
                                        key={img}
                                        src={BASE_IMG_URL + img}
                                        alt="img" className='product-img' />
                                )
                                )
                            }
                        </span>


                    </Item>
                    <Item >
                        <span className='left'>商品详情:</span>
                        <span dangerouslySetInnerHTML={{ __html: detail }}>
                        </span>
                    </Item>
                </List>
            </Card>
        )
    }
}
