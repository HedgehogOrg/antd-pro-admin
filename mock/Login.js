/**
 * 把需要 mock 的 API 加到下方即可
 * 可直接是json对象：{}
 * 也可以是自定义函数：async (req, res) => { res.status(200).end() }
 */

/**
 * Mockjs官网：http://mockjs.com/
 * 示例：http://mockjs.com/examples.html
*/

const Mock = require('mockjs')

const Login = {
  GET: {
    '/mock': Mock.mock({
      'list|1-10': [{
          'id|+1': 1
      }]
    })
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
      }, 500)
    }
  }
}

console.log(Login.GET['/mock']);

exports.Login = Login;