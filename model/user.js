const bcrypt = require('bcrypt');
// 创建用户集合
const mongoose = require('mongoose');

const joi = require('joi');
// 创建 设计集合规则
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        // 指定最小长度
        minlength: 2,
        maxlength: 20,
    },
    email: {
        type: String,
        required: true,
        // 保证邮箱的值不重复
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    // admin 管理员
    // 普通用户
    role: {
        type: String,
        required: true,
    },

    // 0 为启用状态
    // 1 为禁用状态
    state: {
        type: Number,
        default: 0,
    }
})

// 创建集合规则
const User = mongoose.model('User', userSchema);

const validateUser = user => {
    const schema = {
        username: joi.string().min(2).max(12).required().error(new Error('用户名不符合验证规则')),
        email: joi.string().email().error(new Error('邮箱格式不符合要求')),
        password: joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('密码格式不符合要求')),
        role: joi.string().valid('normal', 'admin').required().error(new Error('角色值非法')),
        state: joi.number().valid(0, 1).required().error(new Error('状态值非法'))
    }

    // 实施验证
    return joi.validate(user, schema);
}
// async function createUser() {
//     const salt = await bcrypt.genSalt(10);
//     const pass = await bcrypt.hash('123456', salt);
//     const user = await User.create({
//         username: 'Zy',
//         email: '27@qq.com',
//         password: pass,
//         role: 'admin',
//         state: 0
//     })
// }
// User.create({
//     username: 'Zy',
//     email: '22107@qq.com',
//     password: pass,
//     role: 'admin',
//     state: 0
// }).then(() => {
//     console.log('用户创建成功');
// }).catch(() => {
//     console.log('用户创建失败');
// })

// createUser();
// 将用户集合作为模块成员进行导出
module.exports = {
    // User:User 在ES6中对象键值一样就可以省略掉值
    User,
    validateUser
};