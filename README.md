## 将包变成全局的

1. 先创建可执行的脚本 #！/usr/bin/env node
2. 配置 package.json 中的 bin 字段
3. npm link 链接到本地环境(默认以 name 为基准)

> link 相当于将当前本地模块链接到 npm 目录下，这个 npm 目录可以直接访问

## 安装的命令

1. 配置可执行命令 commander
