const Mock = require('mockjs')

const { Random, mock } = Mock

module.exports = {
  GET: {
    '/logs': async (req, res) => {
      console.log('user account request info:', req)
      const data = Mock.mock(
        {
          'items|60': [function () {
            return {
              'menuName': mock('@ctitle(3, 5)'),
              'id': mock('@id'),
              'operatorName': mock('@cname(3, 5)'),
              'description': mock('@string(10)'),
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

  },

}