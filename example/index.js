const Action = require('../src/action')

const action = new Action({
    axios: {
        url: '/s/listen',
        method: 'POST',
        baseURL: 'http://service.wsd.ink',
    },
    params: {
        app: 'ApplicationName',
        from: 'baidu',
    }
})

action.event({
    app: 'AppName',
    mod: null,
    uid: null,
    tmp: null,
    pid: null,
    from: 'qq',
    action: '测试事件',
    result: 'ok',
    message: '测试事件描述',
    key: 'trade',
    value: '123',
    context: { a: 1 }
})

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
