const axios = require('axios')

class Action {

    /**
     * @param {Object} params 公共参数
     */
    constructor({ axios, params, debug }) {
        this.axios = axios
        this.debug = debug || false
        this.params = Object.assign({ result: 'ok' }, params)
    }

    /**
     * PV 仅前端可用
     * @param {Object} params 可选
     * @param {String} params.uid 关联用户id
     * @param {String} params.pid 关联PV记录id
     * @param {String} params.tmp 关联用户临时id
     * @param {String} params.url 当前PV地址
     * @param {String} params.screen 当前终端分辨率
     * @param {String} params.referrer referrer
     */
    PV(params = {}) {
        return this.$track(Object.assign({ type: 'pv' }, this.$params(), params))
    }

    /**
     * Event上报
     * @param {Object | String} params 字符串默认处理为action
     * @param {String} params.app 项目名称
     * @param {String} params.mod 项目模块
     * @param {String} params.uid 关联用户id
     * @param {String} params.tmp 关联用户临时id
     * @param {String} params.pid 关联PV记录id
     * @param {String} params.from 关联来源
     * @param {String} params.action 上报事件简述
     * @param {String} params.result 上报事件状态
     * @param {String} params.message 上报事件详细描述
     * @param {String} params.key 关键字段
     * @param {String} params.value 关键字段值
     * @param {Object | String} params.context 上报事件上下文
     */
    event(params) {
        if (typeof params === 'string') {
            params = { action: params }
        }
        return this.$track(Object.assign({ type: 'event' }, this.$params(), params))
    }

    /**
     * Error上报
     * @param {Object | String} params 字符串默认处理为action
     * @param {String} params.app 项目名称
     * @param {String} params.mod 项目模块
     * @param {String} params.uid 关联用户id
     * @param {String} params.tmp 关联用户临时id
     * @param {String} params.pid 关联PV记录id
     * @param {String} params.from 关联来源
     * @param {String} params.action 上报事件简述
     * @param {String} params.result 上报事件状态
     * @param {String} params.message 上报事件详细描述
     * @param {String} params.key 关键字段
     * @param {String} params.value 关键字段值
     * @param {String} params.errid 错误记录id
     * @param {String} params.stack 错误栈
     * @param {Object | String} params.context 上报事件上下文
     */
    error(params) {
        if (typeof params === 'string') {
            params = { action: params }
        }
        return this.$track(Object.assign({ type: 'error' }, this.$params(), params))
    }

    async $track(params) {
        if (this.debug) {
            console.log('params:', params)
        }
        if (typeof params.context) {
            params.context = JSON.stringify(params.context)
        }
        const options = Object.assign({}, this.axios, { data: params })
        return axios(options).catch(() => {
            axios(options).catch(err => console.error('Error Action:', err))
        })
    }

    $params() {
        return this.$isNodejs() ? this.params : {
            ...this.params,
            url: location.href,
            uid: localStorage['uid'] || localStorage['user'] || localStorage['username'],
            tmp: localStorage['tmp'],
            pid: sessionStorage['pid'],
            from: sessionStorage['from'],
            screen: `${window.screen.width}*${window.screen.height}`,
            referrer: document.referrer,
        }
    }

    $isNodejs() {
        return !this.$isBrowser()
    }

    $isBrowser() {
        return typeof window === 'object' && typeof window.document === 'object'
    }
}

module.exports = Action
