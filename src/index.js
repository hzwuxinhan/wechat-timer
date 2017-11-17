const Wechat = require('./chat/index')
const parseMenu = require('./parseMenu')
let schedule = require('node-schedule')

let lunch = new schedule.RecurrenceRule()
lunch.dayOfWeek = [1, 2, 3, 4, 5]
lunch.hour = 11
lunch.minute = 20

let dinner = new schedule.RecurrenceRule()
dinner.dayOfWeek = [1, 2, 3, 4, 5]
dinner.hour = 17
dinner.minute = 30

// 全局配置
Wechat.config({
    autoLogin: true, // 是否保存cookie 以便自动登录
    openBrowser: false, // 是否在浏览器中打开二维码链接 (默认在terminal中显示)
})

// 初始化程序
Wechat.run(async () => {
    // 获取联系人列表
    // let memberList = await Wechat.getContact(true)
    // console.log(memberList)

    // 获取自己的个人信息
    let userInfo = await Wechat.getOwnerInfo()
    var ownUserName = userInfo.User.UserName;

    schedule.scheduleJob(lunch, async () => {
        console.log("===> lunch ===>")
        const Menu = new parseMenu(1)
        const content = await Menu.res()
        // memberList.map(async item => {
        Wechat.sendMsg(ownUserName,"@@0c88cddbee3f4420936e6960a8306b9746bd6b9ace04c18d29a9d26223aacc43",content)
        // })
    })
    
    schedule.scheduleJob(dinner, async () => {
        console.log("===> dinner ===>")
        const Menu = new parseMenu(2)
        const content = await Menu.res()
        // memberList.map(async item => {
        Wechat.sendMsg(ownUserName,"@@0c88cddbee3f4420936e6960a8306b9746bd6b9ace04c18d29a9d26223aacc43",content)
        // })
    })

    // 自动回复消息
    Wechat.listener.on('message', data => {
        console.log(`收到来自: ${data.fromUser.NickName} 的消息: ${data.msg}`)
    })
})

