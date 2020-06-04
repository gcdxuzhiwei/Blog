// 将用户输入的值变成对象的形式
function serializeToJson(form) {
    var result = {};
    // 获取表单中用户输入的内容
    // 返回数组[{name:'email',value:'用户输入的内容'}]
    var f = form.serializeArray();

    // {email:'22107@qq.com',password:'123456'}

    f.forEach(function (item) {
        result[item.name] = item.value;
    })

    return result;
}