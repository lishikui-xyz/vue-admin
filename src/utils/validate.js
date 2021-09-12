// 过滤特殊字符的方法
export function stripScript(str) {
    //过滤中英文单双引号以及空格(\s)
    var reg = /\\+|\~+|\!+|\@+|\#+|¥+|\￥+|\%+|\^+|\&+|\*+|\(+|\)+|\'+|(\")+|\$+|`+|\“+|\”+|\‘+|\’+|\s+/g;
    var res = str.replace(reg, "");
    return res;
}
/**
 * 验证邮箱
 */
export function validateEmail(value) {
    let reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    return !reg.test(value);
}
/**
 * 验证密码
 */
export function validatePass(value) {
    let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
    return !reg.test(value);
}
/**
 * 验证验证码
 */
export function checkCode(value) {
    let reg = /^[0-9a-z]{6}$/;
    return !reg.test(value);
}
