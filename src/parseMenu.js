let http = require('http')

class parseMenu {
    constructor(menuType) {
        this.menuType = menuType
        this.options = {
            hostname: 'crystalpot.cn',
            port: 80,
            path: '/menus/0',
            method: 'GET'
        }
    }

    async _init() {
        try {
            this.body = await this._httprequest()
            this.html = this._parseHtml()
            this.menuName = this._getName()
        } catch (error) {
            console.log(error)
        }
    }

    _getName() {
        return this.menuType == 1 ? '午餐' : '晚餐'
    }

    _parseHtml() {
        let html = this.body
        html = html.replace(/<[^>]+>/g, '')
        html = html.replace(/西可餐厅(.|\n|\r)*/, '')
        html = html.replace(/港式茶餐厅(.|\n|\r)*/, '')
        if (this.menuType == 2) {
            html = html.replace(/(.|\n|\r)*晚餐/g, '')
            html = html.replace(/夜宵(.|\n|\r)*/, '')
        } else {
            html = html.replace(/(.|\n|\r)*中餐/g, '')
            html = html.replace(/晚餐(.|\n|\r)*/, '')
        }

        html = html.replace(/&nbsp;/g, '')
        html = html.replace(/【/g, '\n【')
        html = html.replace(/1F/g, '\n1F')
        html = html.replace(/2F/g, '\n2F')
        return html
    }

    async res() {
        await this._init()
        return '小伙伴们吃饭啦！！' + this.menuName + '菜单:' + this.html
    }

    _httprequest() {
        return new Promise((resolve, reject) => {
            let req = http.request(this.options, function(res) {
                let wholeBody = ''
                res.setEncoding('utf8')
                res.on('data', function(chunk) {
                    wholeBody += chunk
                })
                res.on('end', function() {
                    resolve(wholeBody)
                })
            })

            req.on('error', function(e) {
                console.log(('请求失败: ' + e.message).red)
                reject(e.message)
            })

            req.write('data\n')
            req.write('data\n')
            req.end()
        })
    }
}

module.exports = parseMenu
