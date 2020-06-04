// 引入joi模块
const joi = require('joi');

// 定义对象的验证规则
const schema = {
    username: joi.string().min(2).max(5).required().error(new Error('username属性没有通过验证')),
};


async function run() {
    // 实施验证
    try {
        await joi.validate({
            username: 'ab'
        }, schema);
    } catch (err) {
        console.log(err);
        return;
    }
    console.log('验证通过');
}
run()