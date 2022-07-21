// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from "iron-session/next";
import tcb from '../../lib/cloudBase';
const db = tcb.database();

type Data = {
    code: number,
    msg: string
}
const getDatetime = Date.parse(new Date().toString())
export default withIronSessionApiRoute(

    async function handler(
        req: NextApiRequest,
        res: NextApiResponse<Data>
    ) {
        if (!req.session.user) {
            return res.status(500).json({ code: 500, msg: 'error' })
        }
        const { title, desc, cover } = await req.body
        console.log(123456, req.session.user)
        const { _openid, nickName, avatarUrl } = req.session.user
        try {
            const result = await db.collection("blogs").add({
                title: title,
                desc: desc,
                cover: cover ? cover : 'https://7777-ww-1252490684.tcb.qcloud.la/cloudbase-cms/upload/2022-03-24/zsava9i57jtmwtb12mwjbtkqpd1esu5a_.png',
                _createTime: getDatetime,
                _updateTime: getDatetime,
                isShow: false,
                _openid: _openid,
            });
            if (result) {
                res.status(200).json({ code: 200, msg: '文章添加成功' })
            }

        } catch (error) {
            res.status(500).json({ code: 500, msg: 'error' })

        }
    },
    {
        cookieName: "myapp_cookiename",
        password: "complex_password_at_least_32_characters_long",
        // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
        cookieOptions: {
            secure: process.env.NODE_ENV === "production",
        },
    },
);