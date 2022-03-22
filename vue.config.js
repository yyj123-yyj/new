module.exports = {
  pages: {
    index: {
      // 入口
      entry: 'src/main.js'
    }
  },
  lintOnSave: false, // 关闭语法检查

  // 开启代理服务器：
  // !配置代理方式一：缺点：1、此方式不能配置多个代理 2、不能灵活控制走不走代理
  // devServer: {
  //   // 这里的 协议主机端口号，表示向哪个服务器发送请求，就写哪个服务器的 协议主机端端口号。
  //   // 且此处只需要写到端口号
  //   // 开启代理服务器后必须重新启动脚手架 npm run serve
  //   proxy: 'http://localhost:5000'
  // },

  // !配置代理方式二：
  // devServer: {
  //   proxy: {
  //     // 完整配置
  //     // !'/api'：请求前缀(可以自定义名称)，灵活控制是否走代理，加前缀就是走代理(需要向真正的服务器发送请求)，不加就是不走代理。
  //     '/api': {  
  //       // !target：请求地址，若要走代理，就想真正服务器发送请求
  //       target: 'http://localhost:5000',
  //       // !为了在发送请求时，不把前缀当作路径一起带过去，需要在这里配置 pathRewrite,值是对象里面是匹配正则。
  //       // !'^/api':'' -- 指匹配所有以api开头的路径，把api都变成空字符串. 
  //       // 不配置； /api/students  配置：/students
  //       pathRewrite: {'^/api':''},
  //       // !ws：用于支持websocket；客户端和服务器的一种通信方式。不配置默认就是true
  //       ws: true,
  //       // !changeOrigin： 用于控制请求头中的host值。不配置默认就是true (react里不配置默认是false)
  //         // true：就是代理服务器向真正服务器发送请求时，撒谎，告诉真正服务器该请求来自跟它一样的端口号。localhost:5000
  //         // false：就是实话实说，告诉真正服务器，该请求来自代理服务器。 localhost:8080
  //       changeOrigin: true  
  //     },

  //     // 可以配置多个代理：
  //     '/yuandao': {
  //       target: 'http://localhost:5001',
  //       pathRewrite: {'/yuandao':''},
  //       ws: true,
  //       changeOrigin: true
  //     }
  //     // 精简配置
  //     // '/foo': {
  //     //   target: '<other_url>'
  //     // }
  //   }
  // }
}