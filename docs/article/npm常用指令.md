# npm包管理工具

## npm常用命令

| 命令                                                   |                                            功能                                            |
| ------------------------------------------------------ | :----------------------------------------------------------------------------------------: |
| npm -v                                                 |                                     查看npm安装的版本                                      |
| npm help                                               |                                          查看帮助                                          |
| npm help json                                          |                                查看package.json文件内容格式                                |
| npm init                                               |                           初始化，引导你创建一个package.json文件                           |
| npm install                                            |  安装package.json中的中的模块（目录中存在package.json，将安package.json配置号的版本模块）  |
| npm install -g                                         |                                     更新本机npm的版本                                      |
| npm install moduleName                                 |                        安装模块（install可简写为i）仅在当前目录安装                        |
| npm install moduleName -g                              |                               全局安装（可在所有目录下使用）                               |
| npm install moduleName --save-dev                      | 安装到开发环境依赖（例如一些预编译包，如sass-loader, less-loader等，仅在开发环境中会用到） |
| npm install moduleName --save                          |                                     安装到生成环境依赖                                     |
| npm list                                               |                                查看当前目录下已安装的node包                                |
| npm outdated                                           |               检查模块是否已经过时（列出所有有新版本的模块，方便对包的更新）               |
| npm rebuild moduleName                                 |                                        重新安装模块                                        |
| npm root                                               |                                 查看当前目录模块的安装路径                                 |
| npm root -g                                            |                                 查看全局安装模块的安装路径                                 |
| npm search moduleName                                  |                                 检查npm线上是否存在该模块                                  |
| npm update moduleName                                  |                                          更新模块                                          |
| npm uninstall moduleName                               |                              卸载模块（uninstall可简写为un）                               |
| npm config list                                        |                                      显示所有配置信息                                      |
| npm list -global                                       |                                       npm的本地仓库                                        |
| npm config set registry=http://registry.npm.taobao.org |                                         配置镜像站                                         |