const guard = (req, res, next) => {
    // 判断用户访问的是否时登陆页面
    // 判断用户的登陆状态
    // 如果时登陆的 就请求放行
    // 如果不是登陆的 将请求重定向到登陆页面
    if (req.url != '/login' && !req.session.username) {
        res.redirect('/admin/login');
    } else {
        if (req.session.role == 'normal') {
            // 如果用户是普通用户
            // 跳转至博客首页 阻止程序向下执行
            return res.redirect('/home/')
        }
        // 用户是登陆状态 放行
        next();
    }
}
module.exports = guard;