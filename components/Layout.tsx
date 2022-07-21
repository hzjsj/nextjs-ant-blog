import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import { Layout, Menu, BackTop } from 'antd';
const { Header, Content, Footer } = Layout;
export default function Layouts({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Head>
                <title>计算机小站</title>
                <link rel="icon" href="/favicon.ico" />
                <meta name="description" content="分享计算机相关知识,记录个人学习经验" />
            </Head>
            <style jsx global>{`
                
            `}</style>
            <Layout className="layout">
                <Header style={{ position: 'fixed', zIndex: 1, width: '100%', padding: '0 10%' }}>
                    <Menu theme="dark" mode="horizontal" >
                        <Menu.Item key="home"><Link href="/"> 计算机小站</Link></Menu.Item>
                    </Menu>
                </Header>

                <Content className="site-layout" style={{ padding: '0 10%', marginTop: 64 }}>

                    {children}

                </Content>
                <BackTop />
                <Footer style={{ textAlign: 'center' }}>
                    <div>
                        <a href="http://beian.miit.gov.cn/" target="_blank" rel="noreferrer" ><span>皖ICP备19000000号</span></a>
                    </div>
                    <div>
                        ©2022 Created by next and Ant ui
                    </div>

                </Footer>
            </Layout>
        </>
    )
}
