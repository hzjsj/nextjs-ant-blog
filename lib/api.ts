import tcb from './cloudBase';
const db = tcb.database();

const fileds = {
    _id: true,
    cover: true,
    desc: true,
    title: true,
    _createTime: true,
    _updateTime: true
}
export const getHomeBlogs = async () => {

    const result = await db.collection("blogs").where({ isShow: true }).field(fileds).orderBy('_createTime', 'desc').get();

    return result
};


export const getDetails = async (id: string) => {
    const result = await db.collection("blogs").where({ _id: id, isShow: true }).field(fileds).get();

    return result;
};
