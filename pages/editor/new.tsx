import Layouts from 'components/Layout'
import { Editor, Viewer } from '@bytemd/react'
import { useState } from 'react'
import { message, Input, Button, Divider, Row, Col } from 'antd';

import 'bytemd/dist/index.min.css'
import gfm from '@bytemd/plugin-gfm'
import highlight from '@bytemd/plugin-highlight-ssr'
import '../../styles/editor.module.css'
import fetchJson from 'lib/fetchJson'
import useUser from 'lib/useUser'
import Link from 'next/link'

const plugins = [
    gfm(),
    highlight(),
    // Add more plugins here
]

export default function New() {
    const { user } = useUser({
        redirectTo: '/login',
    })


    const [title, setTitle] = useState('')
    const [cover, setCover] = useState('')
    const [value, setValue] = useState('')



    const newPost = async () => {
        if (value == "" || title == "") {
            return
        }
        let body: {
            title: string;
            desc: string;
            cover: string
        } = {
            title: title,
            desc: value,
            cover: cover
        }

        const res: {
            code: number,
            msg: string
        } = await fetchJson('/api/new', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        })
        if (res.code == 200) {
            message.success(res.msg);
        } else {
            message.error(res.msg);
        }
    }

    return (
        <Layouts>
            <Row>
                <Col flex={3}>
                    <Divider orientation="left" orientationMargin="0" plain>标题</Divider>
                    <Input value={title} onChange={(e) => {
                        setTitle(e.target.value)
                    }} placeholder="请输入标题" />
                    <Divider orientation="left" orientationMargin="0" plain>封面URL</Divider>
                    <Input value={cover} onChange={(e) => {
                        setCover(e.target.value)
                    }} placeholder="请输入封面URL(可不填) " />

                    <Divider orientation="left" orientationMargin="0" plain>内容</Divider>
                </Col>
                <Col flex={2}>
                    <Divider orientation="right" orientationMargin="0" dashed >
                        <Button className='sumbuit'>
                            <Link href="/api/logout"><a >登出</a></Link>
                        </Button>
                        <br />
                        <br />
                        <Button type="primary" className='sumbuit' onClick={() => newPost()}>提交</Button>

                    </Divider>
                </Col>
            </Row>



            <div className='desc'>
                <Editor
                    value={value}
                    plugins={plugins}
                    onChange={(v) => {
                        setValue(v)
                    }}
                />
            </div>
            <div className='title'>
                这是文章标题
            </div>
            <style jsx global>{`
        
        .bytemd {
            height: 560px;
        }
        .sumbuit{
            text-align: right;
            margin:20 auto;
        }
      `}</style>

        </Layouts>
    )
}
