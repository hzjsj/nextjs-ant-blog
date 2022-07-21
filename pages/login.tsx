import Layouts from 'components/Layout'
import { Form, Input, Button, message, Spin, Card } from 'antd';
import fetchJson from 'lib/fetchJson'
import useUser from 'lib/useUser'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'


interface QRcodeInfo { QRcode: string, uid: string }
interface BodyInfo {
    username?: string;
    password?: string;
    uid?: string;
    type?: number;
}

export default function Login() {

    //const [qrInfo, setQrInfo] = useState<QRcodeInfo>({ QRcode: 'https://7777-ww-1252490684.tcb.qcloud.la/webLogin/1648042017273-260086.jpeg', uid: '1648042017273-260086' });
    const [count, setCount] = useState(0)
    const [qrInfo, setQrInfo] = useState<QRcodeInfo>({ QRcode: '', uid: '' });
    useEffect(() => {

        const getQRcode = async () => {

            const resInfo: QRcodeInfo = await fetchJson('/api/getQRcode', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            })
            console.log('resInfo', resInfo)
            setQrInfo(resInfo)
        }
        getQRcode()
    }, []);



    const { mutateUser } = useUser({
        redirectTo: '/editor/new',
        redirectIfFound: true,
    })

    const [loading, setLoading] = useState(true)

    const [activeTabKey1, setActiveTabKey1] = useState('tab1');


    const onTab1Change = (key: string) => {

        console.log(key)
        setActiveTabKey1(key);
        if (key == 'tab2') {
            logins()
            // setCount(Number(setInterval(tests, 5000)));
        }
    };
    const logins = async () => {

        let interval = setTimeout(logins, 5000)

        const result: { code: number, msg: string } = await fetchJson('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ uid: qrInfo.uid, type: 2 }),
        })
        if (result.code == 200) {
            clearTimeout(interval);
            message.success(result.msg);
            mutateUser()
        }
    }

    const getLogin = async (body: BodyInfo) => {
        try {
            const result: { code: number, msg: string } = await fetchJson('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            })

            if (result.code == 200) {

                message.success(result.msg);
                mutateUser()
            } else if (result.code == 404) {
                message.error(result.msg);
            }
            console.log(result)

        } catch (error) {
            console.error(error)
        }
    }



    const onFinish = async (values: any) => {
        console.log('Success:', values);
        const body: BodyInfo = {
            username: values.username,
            password: values.password,
            type: 1
        }
        await getLogin(body)
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const tabList = [
        {
            key: 'tab1',
            tab: '邮箱登入',
        },
        {
            key: 'tab2',
            tab: '微信登入',
        },
    ];

    const contentList: any = {
        tab1:

            <Form
                name="basic"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
                // initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="邮箱"
                    name="username"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="密码"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
                    <Button type="primary" htmlType="submit" block>
                        登入
                    </Button>
                </Form.Item>
            </Form>,
        tab2: <Spin spinning={loading}><div className='codeLogin'><Image src={qrInfo.QRcode} onLoadingComplete={() => { setLoading(false) }} alt="登入" width={"200px"} height={"200px"} /></div></Spin>

    };



    return (
        <Layouts>
            <Card
                style={{ width: '440px', height: "420px", margin: "120px auto ", padding: "20px" }}
                title={<h6 className='title'>登入</h6>}
                extra={<a href="#" onClick={() => onTab1Change("tab2")}>注册</a>}
                tabList={tabList}
                activeTabKey={activeTabKey1}
                onTabChange={key => {
                    onTab1Change(key);
                }}
            >
                {contentList[activeTabKey1]}
            </Card>

            <style jsx global>{`
             .site-card-border-less-wrapper {
                padding: 30px;
                background: #ececec;
              }
              .title{
                margin: 0 0 30px;
                color: #202d40;
                font-size: 24px;
                font-weight: 600;
              }
              .codeLogin{
                text-align: center;
            }
            `}</style>
        </Layouts>
    )
}