import Layout from 'components/Layout'
import { Row, Col, List, Card, Affix, Avatar } from 'antd';
import Link from 'next/link'
import moment from 'moment'

import { getHomeBlogs } from '../lib/api'
interface resBlog {
  _id: string;
  cover: string;
  desc: string;
  title: string;
  _createTime: number;
  _updateTime: number;
}
const style = { margin: '20px 0' };

const imageMogr = (imgUrl: string) => {

  return imgUrl.split("?")[0] + "?imageMogr2/thumbnail/!20p"
}

export default function Home({ resualt }: { resualt: any }) {

  const listData: resBlog[] = resualt.data;

  return (
    <Layout>
      <Row style={style}>
        <Col xs={24} md={16} >
          <Card title="最新文章">
            <List
              itemLayout="vertical"
              size="large"
              pagination={{
                onChange: page => {
                  console.log(page);
                },
                pageSize: 6,
              }}
              dataSource={listData}
              renderItem={item => (

                <List.Item
                  key={item.title}
                  actions={[
                    <div className='info xsWidth' key={item._updateTime}>
                      <span>发布日期：{moment(item._updateTime).format("YYYY-MM-DD HH:mm")}</span>
                    </div>
                  ]}
                  extra={
                    <Link href={`/details/${item._id}`}>
                      <a>
                        <img src={imageMogr(item.cover)} className="coverImg" alt={item.title} />
                         {/* <Image src={imageMogr(item.cover)} alt={item.title} width={"200px"} height={"140px"} /> */}
                      </a>
                    </Link>
                  }
                >

                  <Link href={`/details/${item._id}`}>
                    <a><h1 className='title xsWidth'>{item.title}</h1></a>
                  </Link>
                  <div className='context xsWidth'>{item.desc}</div>


                </List.Item>

              )}
            />
          </Card>
        </Col>
        <Col style={{ padding: '0 20px' }} xs={0} md={8}>
          <Affix offsetTop={84}>
            <Card title="个人信息" bordered={false} >
              <Card.Meta
                avatar={<Avatar size="large" src="/avatar.png" />}
                title="城南旧事"
                description=" Talk is cheap，Show me the code！"
              />
            </Card>
          </Affix>
        </Col>
      </Row>

      <style jsx>{`
                .xsWidth{
                    width:460px;
                }
                @media screen  and (max-width:750px){
                  .xsWidth{width:100%; }
              }
                .title{
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 1;
                    overflow: hidden;
                    
                }
                .context{
                    font-size: 14px;
                    line-height: 22px;
                    color: #4e5969;
                    margin: 0 0 12px;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 3;
                    overflow: hidden;
                    
                }
                .info{
                    
                    display: inline-flex;
                    justify-content:space-between;
                }
                .coverImg{
                  width:200px;
                  height:140px;
                }
            `}</style>
    </Layout>
  )
}

//构建静态文件使用： getStaticProps
export const getServerSideProps = async () => {

  const resualt = await getHomeBlogs()

  return {
    props: {
      resualt
    }
  }

}
