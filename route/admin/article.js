// 将文章集合的构造函数导入到当前文件中
const {
    Article
} = require('../../model/article');

// 导入mongoose-sex-page模块
const pagination = require('mongoose-sex-page');

module.exports = async (req, res) => {
    // 接收客户端传递过来的页码
    const page = req.query.page;
    req.app.locals.currentLink = 'article';
    // 查询所有文章数据
    // page方法指定当前页
    // size指定每页显示的数据条数
    // display指定客户端要显示的页码数量
    // exec向数据库发送查询请求
    let articles = await pagination(Article).find().page(1).size(1).display(3).populate('author').exec();
    res.render('admin/article', {
        articles,
    })
}