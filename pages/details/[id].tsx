import Head from 'next/head'
/* eslint-disable react/no-children-prop */
import Layout from 'components/Layout'
import fetchJson from "../../lib/fetchJson";
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
//import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import MarkdownNavbar from 'markdown-navbar';
import 'markdown-navbar/dist/navbar.css';

import { Card, Image } from 'antd';
import { Row, Col, Affix } from 'antd';
import { getDetails } from '../../lib/api'


const style = { margin: '20px 0' };

interface resBlog {
    _id: string;
    cover: string;
    desc: string;
    title: string;
    _createTime: number;
    _updateTime: number;
}
export default function Details({ data }: { data: resBlog }) {
    console.log(123456,data)
    return (
        <Layout>
            <Head>
                <title>{data.title}</title>
            </Head>
            <Row style={style}>
                <Col xs={24} md={16}>
                    <Card title={data.title} bordered={false} >


                        <ReactMarkdown children={data.desc} remarkPlugins={[remarkGfm]}
                            components={{
                                img({ ...props }) {
                                    // eslint-disable-next-line jsx-a11y/alt-text
                                    return <Image src={props.src} />
                                },
                                code({ node, inline, className, children, ...props }) {
                                    const match = /language-(\w+)/.exec(className || '')
                                    return !inline && match ? (
                                        <SyntaxHighlighter children={String(children).replace(/\n$/, '')}
                                            language={match[1]}
                                            PreTag="div"
                                            {...props}
                                        />
                                    ) : (
                                        <code className={className} {...props}>
                                            {children}
                                        </code>
                                    )
                                }
                            }}
                        />

                    </Card>
                </Col>
                <Col style={{ padding: '0 20px' }} xs={0} md={8}>
                    <Affix offsetTop={84}>
                        <Card title="目录" bordered={false} >
                            <MarkdownNavbar source={data.desc} ordered={false} />
                        </Card>
                    </Affix>
                </Col>
            </Row>
            <style jsx>{`
        
      `}</style>
        </Layout>
    )
}

export const getServerSideProps = async ({ params }: {
    params: {
        id: string;
    }
}) => {
    const resualt = await getDetails(params.id)
  
    return {
        props: { data:resualt.data[0] }
    }
}


/**
 *  下面两个函数用于，构建静态文件时使用
 * **/
// export async function getStaticPaths() {
//     const blogs: any = await fetchJson('https://ww.service.tcloudbase.com/request/v1.0/blogs', {
//         method: 'GET',
//         headers: { 'Content-Type': 'application/json' },
//     })
//     const paths = blogs.data.map((post: resBlog) => ({
//         params: { id: post._id },
//     }))
//     return { paths, fallback: false }
// }
//
// export const getStaticProps = async ({ params }: {
//     params: {
//         id: string;
//     }
// }) => {
//     console.log(params)
//
//     const resData: any = await fetchJson(`https://ww.service.tcloudbase.com/request/v1.0/blogs/${params.id}`, {
//         method: 'GET',
//         headers: { 'Content-Type': 'application/json' },
//     })
//
//     const data: resBlog = resData.data
//     return {
//         props: { data }
//     }
//
// }
