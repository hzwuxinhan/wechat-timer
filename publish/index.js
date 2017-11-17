function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Wechat = require('./chat/index');

// 全局配置
Wechat.config({
    autoLogin: true, // 是否保存cookie 以便自动登录
    openBrowser: false // 是否在浏览器中打开二维码链接 (默认在terminal中显示)
});

// 初始化程序
Wechat.run(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var memberList, userInfo, ownUserName, sendStatus;
    return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    _context.next = 2;
                    return Wechat.getContact();

                case 2:
                    memberList = _context.sent;
                    _context.next = 5;
                    return Wechat.getOwnerInfo();

                case 5:
                    userInfo = _context.sent;


                    // 给指定用户发送消息(这里测试自己给自己发)
                    ownUserName = userInfo.User.UserName;
                    _context.next = 9;
                    return Wechat.sendMsg(ownUserName, ownUserName, 'hello word! \u73B0\u5728\u7684\u65F6\u95F4\u662F:' + new Date());

                case 9:
                    sendStatus = _context.sent;

                    if (sendStatus) {
                        console.log('消息发送成功!');
                    }

                    // 自动回复消息
                    Wechat.listener.on('message', function (data) {
                        console.log('\u6536\u5230\u6765\u81EA: ' + data.fromUser.NickName + ' \u7684\u6D88\u606F: ' + data.msg);
                        Wechat.sendMsg(ownUserName, data.fromUser.UserName, data.msg);
                    });

                case 12:
                case 'end':
                    return _context.stop();
            }
        }
    }, _callee, undefined);
})));