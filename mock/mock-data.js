/**
 * 把需要 mock 的 API 加到下方即可
 * 删除 API 即不 mock
 * 可直接是json对象：{}
 * 也可以是自定义函数：async (req, res) => { res.status(200).end() }
 */
module.exports = {
  GET: {
    '/mock': {
      hello: 'world'
    }
  },
  POST: {
    '/login-test': async (req, res) => {
      setTimeout(() => {
        res.json({
          username: 'admin',
          permission: [{
            menu: 'dashboard'
          }, {
            menu: 'user',
            children: [{
              menu: 'user-list',
              children: [{
                menu: 'user-detail'
              }, {
                menu: 'user-new'
              }]
            }, {
              menu: 'user-setting'
            }]
          }, {
            menu: 'role',
            children: [{
              menu: 'role-list'
            }]
          }]
        })
      }, 2000)
    }
  }
}
