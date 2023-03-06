/**
 * File: account.js
 * Project: sd-console-web
 * FilePath: /mock/account.js
 * Created Date: 2022-04-12 14:21:09
 * Author: diya
 * -----
 * Last Modified: 2022-04-20 13:45:54
 * Modified By: diya
 * -----
 * Description:
 */


const Mock = require('mockjs')

const { Random, mock } = Mock

module.exports = {
  GET: {
    '/accounts': async (req, res) => {
      console.log('user account request info:', req)
      const data = Mock.mock(
        {
          'items|60': [function () {
            return {
              'name': mock('@cname(3, 5)'),
              'id': mock('@id'),
              'account': mock('@string(20)'),
              'roleId': mock('@id'),
              'role': {
                'id': mock('@id'),
                'name': mock('@ctitle(3, 5)'),
              },
              departmentIds: mock('@range(50)'),
              'departments': {
                'name': mock('@ctitle(3, 5)'),
                'id': mock('@id'),
              },
              'remark': mock('@ctitle'),
              'avatar': mock('@url'),
              'status': Random.integer(0, 1),
              'createdAt': parseInt((new Date().getTime() - Math.random() * 3600000) / 1000),
              'creator': mock('@cname(3, 5)'),
            }
          }

          ],
          'total': 60,
          'page': mock('@natural()'),
          'pageSize': 10,
        })
      setTimeout(() => {
        console.log('account:', data)
        return res.json(data)
      }, 500)
    },
    '/listAll/roles': async (req, res) => {
      console.log('所有角色', req)
      let rolesData = []
      for (let i = 1; i < 50; i++) {
        rolesData.push(
          mock(
            {
              'name': mock('@ctitle(3, 5)'),
              'id': i,
              'description': mock('@ctitle'),
              'status': Random.integer(0, 1),
              // 'createdAt': parseInt((new Date().getTime() - Math.random() * 3600000) / 1000),
              'creator': mock('@cname(3, 5)'),
            }
          )
        )
      }
      setTimeout(() => {
        console.log('roles:', rolesData)
        return res.json(rolesData)
      }, 500)
    },
    '/treeList/departments': async (req, res) => {
      console.log('部门树形列表', req)
      let departments = []
      for (let i = 1; i < 5; i++) {
        departments.push(
          mock(
            {
              'name': mock('@ctitle(3, 5)'),
              'id': i,
              'parentId': mock('@id'),
              'children': [{
                'id': i,
                'name': mock('@ctitle(3, 5)'),
                'parentId': mock('@id'),
                'children': [{
                  'id': i,
                  'name': mock('@ctitle(3, 5)'),
                  'parentId': mock('@id'),
                  "status": Random.integer(0, 1),
                }],
                "status": Random.integer(0, 1),
              }],
              'createdAt': parseInt((new Date().getTime() - Math.random() * 3600000) / 1000),
              'creator': mock('@cname(3, 5)'),
            },
          )
        )
      }
      setTimeout(() => {
        console.log('部门树形列表:', departments)
        return res.json(departments)
      }, 500)
    },
  },
  POST: {
    '/accounts': async (req, res) => {
      setTimeout(() => {
        const data = mock({
          'name': mock('@ctitle(3, 5)'),
          'id': mock('@id'),
          'account': mock('@string(20)'),
          'remark': mock('@ctitle'),
          'avatar|32': mock('@url'),
          'status': Random.integer(0, 1),
          'createdAt': parseInt((new Date().getTime() - Math.random() * 3600000) / 1000),
          'creator': mock('@cname(3, 5)'),
        })
        console.log('新建账号:', data)
        return res.json(data)
      }, 500)
    },
    '/accounts/1/status': async (req, res) => {
      setTimeout(() => {
        res.status(204).send('NO ACCOUNT')
        console.log('删除账号:')
        return res.json()
      }, 500)
    },
  },
  PUT: {
    '/accounts/1': async (req, res) => {
      setTimeout(() => {
        const data = mock({
          'name': mock('@ctitle(3, 5)'),
          'id': mock('@id'),
          'account': mock('@string(20)'),
          'remark': mock('@ctitle'),
          'avatar|32': mock('@url'),
          'status': Random.integer(0, 1),
          'createdAt': parseInt((new Date().getTime() - Math.random() * 3600000) / 1000),
          'creator': mock('@cname(3, 5)'),
        })
        console.log('编辑账号:', data)
        return res.json(data)
      }, 500)
    },
  },
  DELETE: {
    '/accounts/1': async (req, res) => {
      setTimeout(() => {
        res.status(204).send('NO ACCOUNT')
        console.log('删除账号:', data)
        return res.json(data)
      }, 500)
    },
  },

}
