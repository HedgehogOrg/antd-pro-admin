/**
 * 把需要 mock 的 API 加到下方即可
 * 删除 API 即不 mock
 */
module.exports = {
  '/mock': {
    error_code: 0,
    error_msg: "SUCCESS",
    data: {
      hello: "world"
    }
  }
}
