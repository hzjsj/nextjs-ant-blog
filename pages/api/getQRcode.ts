/* eslint-disable import/no-anonymous-default-export */
const axios = require('axios')
import tcb from '../../lib/cloudBase';
import { NextApiRequest, NextApiResponse } from 'next'

const db = tcb.database();
const APPID = "wxe516039246822ce2"  //换成你的小程序appid
const APPSECRET= "2e45d7476e960ee33eca6d80568d8b9f" //换成你的小程序key

export default async (req: NextApiRequest, response: NextApiResponse) => {

    try {
        const uid =  `${Date.now()}-${Math.floor(Math.random() * 10000000)}`
        const tokenurl = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${APPSECRET}`
        const res = await axios.get(tokenurl)
        const {access_token} = res.data
    
        const qrcodeurl=`https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=${access_token}`
        const wxacodeResult = await axios({
          method: 'post',
          url: qrcodeurl,
          responseType: 'arraybuffer',
          data: {
            scene:uid,
            page:"pages/login/login"
          }
        });
    
       // console.log("return值",wxacodeResult)
        const uploadResult:any = await tcb.uploadFile({
          cloudPath: `webLogin/${uid}.jpeg`,
          fileContent: wxacodeResult.data
        })

        const results:any = await tcb.getTempFileURL({
            fileList: [uploadResult.fileID]
        })
        
        // console.log('随机时间戳',uid)
        // console.log(results)
        const QRcode =  results.fileList[0].tempFileURL
        //return {QRcode,uid}
        response.status(200).json({ QRcode,uid })
    } catch (error) {
        console.log(error);
    }
};

