import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../component/footer/Footer'

export default function Layout() {
    return (
        <div>
            <Outlet />
            {/* 底部导航 */}
            <div style={{ height: '1rem' }}>
                <Footer />
            </div>

        </div>
    )
}
