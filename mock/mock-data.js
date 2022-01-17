/**
 * 把需要 mock 的 API 加到下方即可
 * 删除 API 即不 mock
 */
module.exports = {
  '/mock': {
    code: 0,
    message: "SUCCESS",
    data: {
      hello: 'world'
    }
  },
  '/login': {
    code: 0,
    message: "SUCCESS",
    data: {
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
        }]
      }, {
        menu: 'role',
        children: [{
          menu: 'role-list'
        }]
      }]
    }
  }
}
