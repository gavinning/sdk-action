Action
---
事件上报SDK

### Install
```sh
npm i @4a/sdk-action
```

### Usage
```js
const Action = require('@4a/sdk-action')

const action = new Action({
    axios: {
        url: '/logo.gif',
        method: 'POST',
        baseURL: 'http://example.com',
    },
    params: {
        app: 'app',
        from: 'wechat',
    }
})

// PV上报
// 仅前端
action.pv()

// 通用事件上报
action.event({
    app: 'AppName',
    mod: 'mode',
    uid: 'gavinning',
    tmp: 'tmpid',
    pid: 'pid',
    from: 'qq',
    action: '测试事件',
    result: 'ok',
    message: '测试事件描述',
    key: 'trade',
    value: '123',
    context: { a: 1 }
})

// 通用异常上报
action.error({
    app: 'errorapp',
    mod: 'mode',
    uid: 'gavinning',
    tmp: 'tmpid',
    pid: 'pid',
    from: 'qq',
    action: '测试错误',
    result: 'fail',
    message: '测试错误描述',
    key: 'trade',
    value: '123',
    errid: '456',
    stack: 'stack',
    context: {b:1},
})
```

### API
```js
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
PV(params = {})


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
event(params)


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
error(params)
```