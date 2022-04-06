const Login = {
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

exports.Login = Login;