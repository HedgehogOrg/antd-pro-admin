const Mock = require('mockjs')
const { mock } = Mock;

module.exports = {
  GET: {
    "/roles": async (req, res) => {
      let id = 1;
      setTimeout(() => {
        res.json(mock({
          'page': 1,
          'pageSize': 10,
          'total': 88,
          'items|88': [function () {
            return {
              'id': id++,
              'name': mock('@ctitle(5, 20)'),
              'userCount': mock('@integer(0, 20)'),
              'description': mock('@csentence(5, 50)'),
              'status': mock('@integer(0, 1)'),
              'createdAt': parseInt((new Date().getTime() - Math.random() * 3600000) / 1000),
              'updatedAt': parseInt((new Date().getTime() - Math.random() * 3600000) / 1000),
            }
          }]
        }))
      }, 500);
    },
    "/roles/1": async (req, res) => {
      setTimeout(() => {
        res.json(mock({
          'id': 1,
          'name': mock('@ctitle(5, 20)'),
          'description': mock('@csentence(5, 50)'),
          'scopeType': 2,
          'acls': [
            {
              'id': 1,
            },
            {
              'id': 2,
            },
            {
              'id': 3,
            },
            {
              'id': 4,
            },
            {
              'id': 6,
            },
            {
              'id': 8,
            },
            {
              'id': 9,
            },
            {
              'id': 10,
            },
            {
              'id': 11,
            },
            {
              'id': 14,
            },
            {
              'id': 15,
            },
            {
              'id': 20,
            },
            {
              'id': 26,
            },
          ],
          'organizationIds': [3, 8],
          'status': mock('@integer(0, 1)'),
          'createdAt': parseInt((new Date().getTime() - Math.random() * 3600000) / 1000),
          'updatedAt': parseInt((new Date().getTime() - Math.random() * 3600000) / 1000),
        }))
      }, 200);
    },
    "/listAll/organizations": async (req, res) => {
      let organizations = [];

      for(let i = 1; i < 20; i++) {
        organizations.push(
          mock({
            id: i,
            name: mock('@ctitle(8, 12)')
          })
        );
      }

      setTimeout(() => {
        res.json(organizations)
      }, 100);
    },
    '/isExist/roles': async (req, res) => {
      setTimeout(() => {
        const name = req.query.name
        
        if(name === '系统管理员') {
          res.json({
            'isExist': true
          });
        } else {
          res.json({
            'isExist': false
          })
        }
      }, 500);
    },
    '/treeList/acls': async (req, res) => {
      setTimeout(() => {
        res.json([{
          'id': 1,
          'parentId': 0,
          'name': '系统管理',
          'type': 1,
          'children': [
            {
              'id': 2,
              'parentId': 1,
              'name': '组织管理',
              'type': 1,
              'children': [
                {
                  'id': 8,
                  'parentId': 2,
                  'name': '组织列表',
                  'type': 1,
                  'children': [
                    {
                      'id': 4,
                      'parentId': 8,
                      'name': '查看',
                      'type': 2,
                      'action': '04',
                    },
                    {
                      'id': 5,
                      'parentId': 8,
                      'name': '新增',
                      'type': 2,
                      'action': '01',
                    },
                    {
                      'id': 6,
                      'parentId': 8,
                      'name': '编辑',
                      'type': 2,
                      'action': '02',
                    },
                    {
                      'id': 7,
                      'parentId': 8,
                      'name': '删除',
                      'type': 2,
                      'action': '03',
                    },
                  ],
                },
                {
                  'id': 14,
                  'parentId': 2,
                  'name': '编辑组织',
                  'type': 1,
                  'children': [
                    {
                      'id': 15,
                      'parentId': 14,
                      'name': '查看',
                      'type': 2,
                      'action': '04',
                    },
                    {
                      'id': 16,
                      'parentId': 14,
                      'name': '新增',
                      'type': 2,
                      'action': '01',
                    },
                    {
                      'id': 17,
                      'parentId': 14,
                      'name': '编辑',
                      'type': 2,
                      'action': '02',
                    },
                    {
                      'id': 18,
                      'parentId': 14,
                      'name': '删除',
                      'type': 2,
                      'action': '03',
                    },
                  ],
                },
              ]
            },
            {
              'id': 3,
              'parentId': 1,
              'name': '部门管理',
              'type': 1,
              'children': [
                {
                  'id': 9,
                  'parentId': 3,
                  'name': '部门列表',
                  'type': 1,
                  'children': [
                    {
                      'id': 10,
                      'parentId': 9,
                      'name': '查看',
                      'type': 2,
                      'action': '04',
                    },
                    {
                      'id': 11,
                      'parentId': 9,
                      'name': '新增',
                      'type': 2,
                      'action': '01',
                    },
                    {
                      'id': 12,
                      'parentId': 9,
                      'name': '编辑',
                      'type': 2,
                      'action': '02',
                    },
                    {
                      'id': 13,
                      'parentId': 9,
                      'name': '删除',
                      'type': 2,
                      'action': '03',
                    },
                  ]
                },
              ]
            },
          ]
        }, 
        {
          'id': 19,
          'parentId': 0,
          'name': '用户管理',
          'type': 1,
          'children': [
            {
              'id': 21,
              'parentId': 19,
              'name': '用户列表',
              'type': 1,
              'children': [
                {
                  'id': 22,
                  'parentId': 21,
                  'name': '查看',
                  'type': 2,
                  'action': '04',
                },
                {
                  'id': 23,
                  'parentId': 21,
                  'name': '新增',
                  'type': 2,
                  'action': '01',
                },
                {
                  'id': 24,
                  'parentId': 21,
                  'name': '编辑',
                  'type': 2,
                  'action': '02',
                },
                {
                  'id': 25,
                  'parentId': 21,
                  'name': '删除',
                  'type': 2,
                  'action': '03',
                },
              ]
            }
          ]
        },
        {
          'id': 20,
          'parentId': 0,
          'name': '系统信息',
          'type': 1,
          'children': [
            {
              'id': 26,
              'parentId': 20,
              'name': '查看',
              'type': 2,
              'action': '04',
            },
          ]
        }])
      }, 200);
    },
  },
  POST: {
    '/roles/1': async (req, res) => {
      setTimeout(() => {
        // res.status(204).send('NO CONTENT')
        res.json({
          "id": 1,
          "name": '系统管理员2',
          "description": '描述描述描述啊',
          "scopeType": 0,
          "status": 1,
          "createdAt": 1647846587,
          "updatedAt": 1647846587,
        });
      }, 1000);
    }
  },
  PUT: {
    '/roles/1': async (req, res) => {
      setTimeout(() => {
        // res.status(204).send('NO CONTENT')
        res.json({
          "id": 1,
          "name": '系统管理员2',
          "description": '描述描述描述啊',
          "scopeType": 0,
          "status": 1,
          "createdAt": 1647846587,
          "updatedAt": 1647846587,
        });
      }, 1000);
    }
  },
  DELETE: {
    '/roles/1': async (req, res) => {
      setTimeout(() => {
        res.status(204).send('NO CONTENT')
      }, 1000);
    }
  }
}