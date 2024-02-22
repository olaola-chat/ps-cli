# [React](https://zh-hans.reactjs.org/) + [Typescript](https://www.typescriptlang.org/zh/) 活动模板

此模板使用[vite](https://cn.vitejs.dev/)开发和打包, 并提供了以下特性:

- scope css: 以scoped.css结尾的样式文件将被视为局部样式, 效果类似Vue单文件组件中style标签的scoped属性
- 样式单位转换: 使用[postcss-px-to-viewport](https://github.com/evrone/postcss-px-to-viewport/blob/master/README_CN.md)插件, 提供了样式单位转换功能, 可以将CSS中的px单位转化为vw
- 多语言babel插件: 使用[@ola/zh-scanner](https://dev-page.iambanban.com/registry/-/web/detail/@ola/zh-scanner)提供了多语言扫描, 自动替换功能
- ola平台sdk: 
- 使用[vConsole](https://github.com/Tencent/vConsole)提供了移动端调试方法
  

此外, 模板还封装了一些通用的业务组件及方法, 均存放在common目录中:
- Navigation: app全面屏时的通用导航栏
- Share: 通用的页面分享组件
- tags: 平台app等级&爵位图标
- setReport: 数数上报方法

## 关于状态管理
模板中在context目录使用React.useContext做了简单的状态管理, 应对一般的活动已经足够, 如果你有更复杂的状态管理需求, 可以自行添加状态管理方案

## 关于多语言
项目配置了scanner脚本, 运行scanner脚本扫描出项目文案后, 将扫描出的源文案提交到[crowdin](https://olaparty.crowdin.com/)(翻译协作网站)等待翻译, 翻译完成后将翻译好的文案下载到项目中即可. (crowdin账号有限,已不再新增, 需要crowdin账号的找组内同学共享账号)

## 错误上报

Sentry免费版有次数限制(每月5k条)，所以请求返回业务异常不上报到sentry。主要统计低端机兼容性、JS异常问题

https://sentry.io/

账号：fe@olaola.chat
密码：banban2022
