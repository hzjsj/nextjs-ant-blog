// pages/api/login.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from "iron-session/next";
import tcb from 'lib/cloudBase';
const db = tcb.database();

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      _openid?: string;
      email?: string;
      nickName?: string;
      avatarUrl?: string;
    };
  }
}

export default withIronSessionApiRoute(
  async function loginRoute(req: NextApiRequest,res: NextApiResponse) {

    const { type, uid, username, password } = await req.body
    console.log(type, uid, username, password,)



    if (type == 1) {
      const result = await db.collection("user").where({ 'email': username, 'password': password }).get();
      if (result.data.length === 0) {
        console.log(username, password, 9999, result.data)
        res.status(200).json({ code: 404, msg: '用户名或密码错误!' })
      } else {

        const { _openid, email, nickName, avatarUrl } = result.data[0]

        req.session.user = { _openid, email, nickName, avatarUrl };
        await req.session.save();
        res.status(200).json({ code: 200, msg: '登入成功!' })

      }

    }
    if (type == 2) {
      const result = await db.collection("user").where({ 'uid': uid }).get();
      if (result.data.length === 0) {
        res.status(200).json({ code: 400, msg: '用户名或密码错误!' })
      } else {

        const { _openid, email, nickName, avatarUrl } = result.data[0]

        req.session.user = { _openid, email, nickName, avatarUrl };
        await req.session.save();
        res.status(200).json({ code: 200, msg: '登入成功!' })

      }
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