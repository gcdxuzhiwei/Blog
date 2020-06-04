const {
    User
} = require('../../model/user');
const bcrypt = require('bcrypt');

module.exports = async (req, res, next) => {
    // 接受客户端传递过来的参数
    const {
        username,
        email,
        role,
        state,
        password
    } = req.body;
    // 即将要修改的用户id
    const id = req.query.id;
    let user = await User.findOne({
        _id: id
    })

    // 密码比对
    const isValid = await bcrypt.compare(password, user.password);

    // 密码比对成功
    if (isValid) {
        // 将用户信息更新到数据库中
        await User.updateOne({
            _id: id
        }, {
            username: username,
            email: email,
            role:role,
            state: state
        })
        // 重定向到用户列表页面
        res.redirect('/admin/user')
    } else {
        // 密码比对失败
        let obj = {
            path: '/admin/user-edit',
            message: '密码比对失败,不能进行用户信息的修改',
            id: id
        };
        // next方法只能接收一个字符串
        next(JSON.stringify(obj));
    }
}