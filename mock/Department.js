/**
 * Author: Alvin
 * Modified By: Alvin
 * Created Date: 2022-04-14 17:21:07
 * Last Modified: 2022-04-18 15:28:51
 * Description:
 */

const Mock = require('mockjs')

const { mock, Random } = Mock

module.exports = {
  GET: {
    '/departments': async (req, res) => {
      const department = () => {
        return mock({
          id: Random.increment(),
          name: Random.ctitle(3, 8),
          parentId: Random.integer(1, 100),
          currentPeopleNum: Random.integer(1, 30),
          childPeopleNum: Random.integer(1, 30),
          status: Random.integer(0, 1),
          createdAt: parseInt(Random.datetime('T'), 10),
          updatedAt: parseInt(Random.datetime('T'), 10),
        })
      }

      const departments = () => {
        return mock({
          id: Random.increment(),
          name: Random.ctitle(3, 8),
          parentId: Random.integer(1, 100),
          currentPeopleNum: Random.integer(1, 30),
          childPeopleNum: Random.integer(1, 30),
          status: Random.integer(0, 1),
          'children|3-5': [department],
          createdAt: parseInt(Random.datetime('T'), 10),
          updatedAt: parseInt(Random.datetime('T'), 10),
        })
      }

      const data = mock({
        page: Random.integer(1, 100),
        pageSize: 10,
        limit: 10,
        offset: Random.integer(1, 10),
        total: Random.integer(30, 500),
        'items|5-15': [
          function () {
            return mock({
              id: Random.increment(),
              name: Random.ctitle(3, 8),
              parentId: Random.integer(1, 100),
              currentPeopleNum: Random.integer(1, 30),
              childPeopleNum: Random.integer(1, 30),
              status: Random.integer(0, 1),
              'children|3-5': [departments],
              createdAt: parseInt(Random.datetime('T'), 10),
              updatedAt: parseInt(Random.datetime('T'), 10),
            })
          },
        ],
      })
      res.json(data)
    },
    '/api/departments/1': async (req, res) => {
      res.json({
        'id|+1': 1,
        name: Random.ctitle(3, 8),
        parentId: Random.integer(1, 100),
        status: Random.integer(0, 1),
        createdAt: parseInt(Random.datetime('T'), 10),
        updatedAt: parseInt(Random.datetime('T'), 10),
      })
    },

  },
  POST: {
    '/departments': async (req, res) => {
      res.json({
        'id|+1': 1,
        name: Random.ctitle(3, 8),
        parentId: Random.integer(1, 100),
        status: Random.integer(0, 1),
        createdAt: parseInt(Random.datetime('T'), 10),
        updatedAt: parseInt(Random.datetime('T'), 10),
      })
    },
  },
  PUT: {
    '/departments/1': async (req, res) => {
      res.json({
        'id|+1': 1,
        name: Random.ctitle(3, 8),
        parentId: Random.integer(1, 100),
        status: Random.integer(0, 1),
        createdAt: parseInt(Random.datetime('T'), 10),
        updatedAt: parseInt(Random.datetime('T'), 10),
      })
    },
  },
  DELETE: {
    '/departments/1': async (req, res) => {
      res.status(204).send('NO CONTENT')
    },
  },
}
