// 使用 Mock
var Mock = require('mockjs')

Mock.mock(/idea/, 'get', {
  "pageResponse":{
		"count":87,
		"pno":5,
		"pageSize":10,
		"pageCount":9
	},
  "list|10":[{
    "iid|1-20":100,
    "author":"@cname",
    "category":"@city",
    "content":"@Cparagraph",
    "time":"@time",
    "title":"@ctitle(5,15)",
    "img":"https://picsum.photos/300/200",
    "idea|1-20":100,
  }]
})
Mock.mock(/user/, 'get', {
  "pageResponse":{
		"count":27,
		"pageNo":1,
		"pageSize":10,
		"pageCount":3
	},
  "list|15":[{
    "uid|+1":1,
    "name":"@cname",
    "score|1-1000":100
  }]
})