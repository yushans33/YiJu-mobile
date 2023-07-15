/* 商品管理路由 */
import React, { Component } from 'react'
import { Route, Routes } from "react-router-dom";
import ProductHome from './home';
import ProductAddUpdate from './add-update';
import ProductDetail from './detail';
import './product.css'

export default class Product extends Component {
    render() {
        return (
            <Routes>
                <Route path="/*" element={<ProductHome />} />
                <Route path="/addupdate" element={<ProductAddUpdate />} />
                <Route path="/detail" element={<ProductDetail />} />
            </Routes>
        )
    }
}
