# 这是一个 next.js 开发的博客

#### 介绍

#### 技术架构

- React 框架 [next.js](https://nextjs.org/)

- React UI 组件库 [Ant Design](https://ant.design/)

- 云开发 [CloudBase](https://cloudbase.net/)

#### 预览地址

**用户端**

首页： [http://123.60.78.78/](http://123.60.78.78/)
![首页.png](.\images\kMLhy9h4ID4lm8E0afyL4eEklaRaeH6D_.png)

详情页面
![详情页面.png](.\images\EYVo_tAzlxmj1D0uZhKmfcEa51G645zh_.png)

登入页面：[http://123.60.78.78/login](http://123.60.78.78/login)

支持微信小程序扫码注册登入

测试账号：70106377@qq.com 

密码：70106377

![登入页面.png](.\images\K-GO0Rn6_US_KqyX9r8ZqgA9Rqbf10Lr_.png)


文章发布页面

现在只有发布文章功能，后期会开发其它功能。
![文章发布页面.png](.\images\hgdVP936J8tC8W4w-4-SZt3cbUe05dqN_.png)

**运营端**

云开发 CloudBase 提供的一个内容管理 CMS，不是自己写的代码.

自己配置的数据库，管理数据，用户发布文章审核通过才会显示 yy70106377

登入: [https://ww-1252490684.tcloudbaseapp.com/admin/#](https://ww-1252490684.tcloudbaseapp.com/admin/#)

测试账号：yy70106377 

密码：yy70106377

![运营.png](.\images\Wc9ljM0jU5SgExrDIlEpjvSQspM2sUKO_.png)


#### 安装教程

```
npm install
```

### 本地开发
```
npm run dev
```

### 打包发布
```
npm run build
```

### 本地运行
```
npm run start
```

#### 使用说明

1.  配置 `/lib/cloudBase.ts` 文件
2.  tcbConfig 信息获取地址，环境ID：[env](https://console.cloud.tencent.com/tcb)、api 密钥 [secretId 和 secretKey ](https://console.cloud.tencent.com/cam/capi)
3.  在环境ID中数据库，创建记录 user 和 blogs
4. 云开发环境安装扩展，[CloudBase CMS](https://docs.cloudbase.net/cms/intro)，导入模型文件`schema-user-blog.json`
5. 微信小程序扫码登入需要部署小程序[仓库地址](https://github.com/hzjsj/wx-blogs.git)

#### 参与贡献

1.  Fork 本仓库
2.  新建 Feat_xxx 分支
3.  提交代码
4.  新建 Pull Request

