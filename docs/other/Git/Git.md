# 第 `1` 章 `Git` 概述

`Git` 是一个免费的、开源的 [[分布式  版本控制   系统]]，可以快速高效地处理从小型到大型的各种项目。

`Git` 易于学习，占地面积小，性能极快。 它具有廉价的本地库，方便的暂存区域和多个工作流分支等特性。其性能优于 `Subversion`(`svn`)、`Control Version System`、`Perforce` 和 `ClearCase` 等版本控制工具。

## `1`. 何为版本控制

版本控制是一种记录文件内容变化，以便将来查阅特定版本修订情况的系统。

版本控制其实最重要的是可以记录文件修改历史记录，从而让用户能够查看历史版本，方便版本切换。

![img](https://img.xbin.cn/blog/wps2.jpg)

## `2`. 为什么需要版本控制

个人开发过渡到团队协作。

![img](https://img.xbin.cn/blog/wps6.jpg)

## `3`. 版本控制工具

- **集中式版本控制工具**

`CVS`、`SVN`(`Subversion`)、`VSS`……

集中化的版本控制系统诸如 `CVS`、`SVN` 等，都有一个单一的集中管理的服务器，保存所有文件的修订版本，而协同工作的人们都通过客户端连到这台服务器，取出最新的文件或者提交更新。多年以来，这已成为版本控制系统的标准做法。

这种做法带来了许多好处，每个人都可以在一定程度上看到项目中的其他人正在做些什么。而管理员也可以轻松掌控每个开发者的权限，并且管理一个集中化的版本控制系统，要远比在各个客户端上维护本地数据库来得轻松容易。

事分两面，有好有坏。这么做显而易见的缺点是中央服务器的单点故障。如果服务器宕机一小时，那么在这一小时内，谁都无法提交更新，也就无法协同工作。

![img](https://img.xbin.cn/blog/wps1.jpg)

- **分布式版本控制工具**

`Git`、`Mercurial`、`Bazaar`、`Darcs`……

像 `Git` 这种分布式版本控制工具，客户端提取的不是最新版本的文件快照，而是把代码仓库完整地镜像下来（本地库）。这样任何一处协同工作用的文件发生故障，事后都可以用其他客户端的本地仓库进行恢复。因为每个客户端的每一次文件提取操作，实际上都是一次对整个文件仓库的完整备份。

分布式的版本控制系统出现之后,解决了集中式版本控制系统的缺陷:

`1`. 服务器断网的情况下也可以进行开发（因为版本控制是在本地进行的）

`2`. 每个客户端保存的也都是整个完整的项目（包含历史记录，更加安全）

![img](https://img.xbin.cn/blog/wps3.jpg)

## `4`. `Git` 简史

![img](https://img.xbin.cn/blog/wps8.jpg)

## `5 Git` 工作机制

![img](https://img.xbin.cn/blog/wps7.jpg)

## `6 Git` 和代码托管中心

代码托管中心是基于网络服务器的远程代码仓库，一般我们简单称为远程库。

- **局域网**

  `GitLab`

- **互联网**

  `GitHub`（外网）

  `Gitee` 码云（国内网站）

# 第 `2` 章 `Git` 安装

​ 官网地址： https://git-scm.com/或https://github.com/git-for-windows/git/releases

​ **推荐安装 `git2.40.0` 版本**

​ 查看 `GNU` 协议，可以直接点击下一步。

![img](https://img.xbin.cn/blog/wps5.jpg)

选择 `Git` 安装位置，要求是非中文并且没有空格的目录，然后下一步。

![img](https://img.xbin.cn/blog/wps9.jpg)

`Git` 选项配置，推荐默认设置，然后下一步。

![img](https://img.xbin.cn/blog/wps10.jpg)

`Git` 安装目录名，不用修改，直接点击下一步。

![img](https://img.xbin.cn/blog/wps14.jpg)

`Git` 的默认编辑器，建议使用默认的 `Vim` 编辑器，然后点击下一步。

![img](https://img.xbin.cn/blog/wps16.jpg)

默认分支名设置，选择让 `Git` 决定，分支名默认为 `master`，下一步。

![img](https://img.xbin.cn/blog/wps13.jpg)

修改 `Git` 的环境变量，选第一个，不修改环境变量，只在 `Git Bash` 里使用 `Git`。

![img](https://img.xbin.cn/blog/wps11.jpg)

选择后台客户端连接协议，选默认值 `OpenSSL`，然后下一步。

![img](https://img.xbin.cn/blog/wps12.jpg)

配置 `Git` 文件的行末换行符，`Windows` 使用 `CRLF`，`Linux` 使用 `LF`，选择第一个自动转换，然后继续下一步。

![img](https://img.xbin.cn/blog/wps15.jpg)

选择 `Git` 终端类型，选择默认的 `Git Bash` 终端，然后继续下一步。

![img](https://img.xbin.cn/blog/wps17.jpg)

选择 `Git pull` 合并的模式，选择默认，然后下一步。

![img](https://img.xbin.cn/blog/wps21.jpg)

选择 `Git` 的凭据管理器，选择默认的跨平台的凭据管理器，然后下一步。

![img](https://img.xbin.cn/blog/image-20230627170844640.png)

其他配置，选择默认设置，然后下一步。

![img](https://img.xbin.cn/blog/wps19.jpg)

实验室功能，技术还不成熟，有已知的 `bug`，不要勾选，然后点击右下角的 `Install` 按钮，开始安装 `Git`。

![img](https://img.xbin.cn/blog/wps22.jpg)

点击 `Finsh` 按钮，`Git` 安装成功！

![img](https://img.xbin.cn/blog/wps18.jpg)

右键任意位置，在右键菜单里选择 `Git Bash Here` 即可打开 `Git Bash` 命令行终端。

![img](https://img.xbin.cn/blog/wps20.jpg)

在 `Git Bash` 终端里输入 `git` --`version` 查看 `git` 版本，如图所示，说明 `Git` 安装成功。

![image-20230627170844640](https://img.xbin.cn/blog/image-20230627131804454.png)

# 第 `3` 章 `Git` 常用命令

| **命令名称**                             | **作用\***     |
| ---------------------------------------- | -------------- |
| `git config` --`global user.name` 用户名 | 设置用户签名   |
| `git config` --`global user.email` 邮箱  | 设置用户邮箱   |
| `git init`                               | 初始化本地库   |
| `git status`                             | 查看本地库状态 |
| `git add` 文件名                         | 添加到暂存区   |
| `git commit` -`m` "日志信息" 文件名      | 提交到本地库   |
| `git reflog`                             | 查看历史记录   |
| `git reset` --`hard` 版本号              | 版本穿梭       |

## `1` 设置用户签名

### `1.1` 基本语法

`git config` --`global user.name` 用户名

`git config` --`global user.email` 邮箱

### `1.2` 案例实操

全局范围的签名设置：

```shell
git config --global user.name Layne
git config --global user.email Layne@atguigu.com
git config --list # 查看全局配置
cat ~/.gitconfig  # cat linux中查看文本的命令  ~ 家 [你当前用户的家]/ .gitconfig
```

说明：

签名的作用是区分不同操作者身份。用户的签名信息在每一个版本的提交信息中能够看到，以此确认本次提交是谁做的。`Git` 首次安装必须设置一下用户签名，否则无法提交代码。

※注意：这里设置用户签名和将来登录 `GitHub`（或其他代码托管中心）的账号没有任何关系。

## **`2`** **初始化本地库**

### `2.1` 基本语法

**`git init`**

### `2.2` 案例实操

![image-20230627131721466](https://img.xbin.cn/blog/image-20230627132215734.png)

结果查看

![image-20230627131804454](https://img.xbin.cn/blog/image-20230627132547573.png)

## **`3`** **查看本地库状态**

### `3.1` 基本语法

**`git status`**

### `3.2` 案例实操

#### （`1`）首次查看（工作区没有文件）

![image-20230627132109306](https://img.xbin.cn/blog/image-20230627132317963.png)

#### （`2`）新增文件

![image-20230627132215734](https://img.xbin.cn/blog/image-20230627132109306.png)

![image-20230627132317963](https://img.xbin.cn/blog/image-20230627133425162.png)

#### （`3`）再次查看（检测到未追踪文件）

![image-20230627132547573](https://img.xbin.cn/blog/image-20230627132954523.png)

## `4` 添加暂存区

### `4.1` 将工作区的文件添加到暂存区

#### （`1`）基本语法

**`git`** **`add`** **文件名**

#### （`2`）案例实操

![image-20230627132954523](https://img.xbin.cn/blog/image-20230627131721466.png)

### `4.2` 查看状态（检测到暂存区有新文件）

![image-20230627133040699](https://img.xbin.cn/blog/image-20230627133335748.png)

## `5` 提交本地库

### `5.1` 暂存区文件提交到本地库

#### （`1`）基本语法

**`git commit` -`m` "日志信息" 文件名**

#### （`2`）案例实操

![image-20230627133335748](https://img.xbin.cn/blog/image-20230627133937432.png)

### `5.2` 查看状态（没有文件需要提交）

![image-20230627133425162](https://img.xbin.cn/blog/image-20230627133907417.png)

## `6` 修改文件（`hello.txt`）

### `6.1` 查看状态（检测到工作区有文件被修改）

![image-20230627133644105](https://img.xbin.cn/blog/image-20230627133040699.png)

### `6.2` 将修改的文件再次添加暂存区

![image-20230627133907417](https://img.xbin.cn/blog/image-20230627133644105.png)

### `6.3` 查看状态（工作区的修改添加到了暂存区）

![image-20230627133937432](https://img.xbin.cn/blog/image-20230627134228811.png)

### `6.4` 将暂存区文件提交到本地库

![image-20230627134046013](https://img.xbin.cn/blog/image-20230627134046013.png)

## `7` 历史版本

### `7.1` 查看历史版本

#### （`1`）基本语法

**`git reflog`** **查看版本信息**

`git reflog` -`n` 数量

**`git log`** **查看版本详细信息**

#### （`2`）案例实操

![image-20230627134228811](https://img.xbin.cn/blog/image-20230627134422376.png)

### `7.2` 版本穿梭

#### （`1`）基本语法

**`git reset` --`hard`** **版本号**

#### （`2`）案例实操

--首先查看当前的历史记录，可以看到当前是在 `48f4e22` 这个版本

![image-20230627134422376](https://img.xbin.cn/blog/image-20230627134618381.png)

--切换到之前版本，`8ca80d7` 版本，也就是我们第一次提交的版本

![image-20230627134533136](https://img.xbin.cn/blog/image-20230627134649667.png)

--切换完毕之后再查看历史记录，当前成功切换到了 `8ca80d7` 版本

![image-20230627134618381](https://img.xbin.cn/blog/image-20230627134533136.png)

--然后查看文件 `hello.txt`，发现文件内容已经变化

![image-20230627134649667](https://img.xbin.cn/blog/wps25.jpg)

`Git` 切换版本，底层其实是移动的 `HEAD` 指针。

# 第 `4` 章 `Git` 分支操作

![img](https://img.xbin.cn/blog/image-20230627135331197.png)

## **`1`** **什么是分支**

在版本控制过程中，同时推进多个任务，为每个任务，我们就可以创建每个任务的单独分支。使用分支意味着程序员可以把自己的工作从开发主线上分离开来，开发自己分支的时候，不会影响主线分支的运行。对于初学者而言，分支可以简单理解为副本，一个分支就是一个单独的副本。（分支底层其实也是指针的引用）

![img](https://img.xbin.cn/blog/image-20230627135136847.png)

## **`2`** **分支的好处**

同时并行推进多个功能开发，提高开发效率。

各个分支在开发过程中，如果某一个分支开发失败，不会对其他分支有任何影响。失败的分支删除重新开始即可。

## **`3`** **分支的操作**

| **命令名称**          | **作用**                     |
| --------------------- | ---------------------------- |
| `git branch` 分支名   | 创建分支                     |
| `git branch` -`v`     | 查看分支                     |
| `git checkout` 分支名 | 切换分支                     |
| `git merge` 分支名    | 把指定的分支合并到当前分支上 |

### `3.1` 查看分支

#### （`1`）基本语法

**`git branch` -`v`**

#### （`2`）案例实操

![image-20230627135136847](https://img.xbin.cn/blog/image-20230627160720264.png)

### `3.2` 创建分支

#### （`1`）基本语法

**`git branch`** **分支名**

#### （`2`）案例实操

![image-20230627135331197](https://img.xbin.cn/blog/image-20230627160758345.png)

### `3.3` 修改分支

--在 `maste` 分支上做修改

![image-20230627160605046](https://img.xbin.cn/blog/image-20230627160605046.png)

--添加暂存区

![image-20230627160641155](https://img.xbin.cn/blog/image-20230627161238145.png)

--提交本地库

![image-20230627160720264](https://img.xbin.cn/blog/image-20230627161146988.png)

--查看分支

![image-20230627160758345](https://img.xbin.cn/blog/image-20230627160840253.png)

--查看 `master` 分支上的文件内容

![image-20230627160840253](https://img.xbin.cn/blog/image-20230627161502384.png)

### `3.4` 切换分支

#### （`1`）基本语法

**`git checkout`** **分支名**

#### （`2`）案例实操

--分支由 `master` 改为 `hot-fix`

![image-20230627161146988](https://img.xbin.cn/blog/image-20230627161342861.png)

--查看 `hot-fix` 分支上的文件内容发现与 `master` 分支上的内容不同

![image-20230627161238145](https://img.xbin.cn/blog/image-20230627161412040.png)

--在 `hot-fix` 分支上做修改

![image-20230627161342861](https://img.xbin.cn/blog/image-20230627161644314.png)

--添加暂存区

![image-20230627161412040](https://img.xbin.cn/blog/image-20230627161728843.png)

--提交本地库

![image-20230627161502384](https://img.xbin.cn/blog/image-20230627160641155.png)

### `3.5` 合并分支

#### （`1`）基本语法

**`git merge`** **分支名**

#### （`2`）案例实操

-- 切换回到 `master` 分支

![image-20230627161644314](https://img.xbin.cn/blog/image-20230627162115286.png)

-- 在 `master` 分支上合并 `hot-fix` 分支

![image-20230627161728843](https://img.xbin.cn/blog/image-20230627161950153.png)

### `3.6` 产生冲突

#### （`1`）冲突产生的表现

后面状态为 `MERGING`

![image-20230627161807459](https://img.xbin.cn/blog/image-20230627162314679.png)

#### （`2`）冲突产生的原因

合并分支时，两个分支在**同一个文件的同一个位置**有两套完全不同的修改。`Git` 无法替我们决定使用哪一个。必须**人为决定**新代码内容。

查看状态（检测到有文件有两处修改）

![image-20230627161950153](https://img.xbin.cn/blog/image-20230627162209093.png)

### `3.7` 解决冲突

#### （`1`）编辑有冲突的文件

删除特殊符号，决定要使用的内容

特殊符号：<<<<<<< HEAD 当前分支的代码 ======= 合并过来的代码 >>>>>>> `hot-fix`

![image-20230627162115286](https://img.xbin.cn/blog/wps27.jpg)

#### （`2`）添加到暂存区

![image-20230627162209093](https://img.xbin.cn/blog/image-20230627161807459.png)

#### （`3`）执行提交

注意：此时使用 `git commit` 命令时**不能带文件名**

![image-20230627162314679](https://img.xbin.cn/blog/wps29.jpg)

--发现后面 `MERGING` 消失，变为正常

## `4` 创建分支和切换分支图解

![img](https://img.xbin.cn/blog/wps32.jpg)

`master`、`hot-fix` 其实都是指向具体版本记录的指针。当前所在的分支，其实是由 `HEAD` 决定的。所以创建分支的本质就是多创建一个指针。

`HEAD` 如果指向 `master`，那么我们现在就在 `master` 分支上，`HEAD` 如果执行 `hotfix`，那么我们现在就在 `hotfix` 分支上。

所以切换分支的本质就是移动 `HEAD` 指针。

# 第 `5` 章 `Gitee`（码云）操作

## **`1 Git` 代码托管服务**

前面我们已经知道了 `Git` 中存在两种类型的仓库，即**本地仓库**和**远程仓库**。那么我们如何搭建 `Git` 远程仓库呢？我们可以借助互联网上提供的一些代码托管服务来实现，其中比较常用的有 `GitHub`、码云、`GitLab` 等。

`l gitHub`（ 地址：https://github.com/ ）

是一个面向开源及私有软件项目的托管平台，因为只支持 `Git` 作为唯一的版本库格式进行托管，故名 `gitHub`

`l` 码云（地址： https://gitee.com/ ）

是**国内**的一个代码托管平台，由于服务器在国内，所以相比于 `GitHub`，码云速度会更快

`l GitLab` （地址： https://about.gitlab.com/ ）

是一个用于仓库管理系统的开源项目，使用 `Git` 作为代码管理工具，并在此基础上搭建起来的 `web` 服务

## **`2 Gitee` 简介**

`1`.是什么： `gitee` 是一个 `git` 项目托管网站，主要提供基于 `git` 的版本托管服务

`2`.能干嘛： `gitee` 是一个基于 `git` 的代码托管平台， `Git` 并不像 `SVN` 那样有个中心服务器。目前我们使用到的 `Git` 命令都是在本地执行，如果你想通过 `Git` 分享你的代码或者与其他开发人员合作。 你就需要将数据放到一台其他开发人员能够连接的服务器上。

![img](https://img.xbin.cn/blog/wps30.jpg)

`3`.去哪下： https://gitee.com/

`4`.怎么玩：见课堂演示

前面执行的命令操作都是针对的本地仓库，本章节我们会学习关于远程仓库的一些操作，具体包括：

`l` 查看远程仓库

`l` 添加远程仓库

`l` 从远程仓库克隆

`l` 从远程仓库中抓取与拉取

`l` 推送到远程仓库

## **`3`** 码云帐号注册和登录

进入码云官网地址：https://gitee.com/，点击注册 `Gitee`

![img](https://img.xbin.cn/blog/wps28.jpg)

​ 输入个人信息，进行注册即可。

![img](https://img.xbin.cn/blog/image-20230627163625061.png)

​ 帐号注册成功以后，直接登录。

![img](https://img.xbin.cn/blog/image-20230627163438184.png) 登录以后，就可以看到码云官网首页了。

![img](https://img.xbin.cn/blog/image-20230627163519780.png)

## `4` 创建远程仓库

![img](https://img.xbin.cn/blog/wps33.jpg)

![image-20230627163438184](https://img.xbin.cn/blog/image-20230627164135658.png)

![image-20230627163519780](https://img.xbin.cn/blog/image-20230627163710074.png)

## `5` 远程仓库操作

| **命令名称\***                       | **作用**                                                 |
| ------------------------------------ | -------------------------------------------------------- |
| `git remote` -`v`                    | 查看当前所有远程地址别名                                 |
| `git remote add` 别名 远程地址       | 起别名                                                   |
| `git push` 别名 分支(本地分支名)     | 推送本地分支上的内容到远程仓库                           |
| `git clone` 远程地址                 | 将远程仓库的内容克隆到本地                               |
| `git pull` 远程库地址别名 远程分支名 | 将远程仓库对于分支最新内容拉下来后与当前本地分支直接合并 |

### `5.1` 创建远程仓库别名

#### （`1`）基本语法

**`git remote` -`v`** **查看当前所有远程地址别名**

**`git remote add`** **别名** **远程地址**

#### （`2`）案例实操

![image-20230627163625061](https://img.xbin.cn/blog/image-20230627163829931.png)

**https://gitee.com/boncda/git-demo1.git**

**\*\*这个地址在创建完远程仓库后生成的连接，如图所示红框中\*\***

![image-20230627163710074](https://img.xbin.cn/blog/image-20230627164353109.png)

### `5.2` 推送本地分支到远程仓库

#### （`1`）基本语法

**`git push`** **别名** **分支**

#### （`2`）案例实操

![image-20230627163829931](https://img.xbin.cn/blog/image-20230627163920349.png)

第一次需要输入**码云的用户名和密码**

此时发现已将我们 `master` 分支上的内容推送到 `Gitee` 创建的远程仓库。

![image-20230627163920349](https://img.xbin.cn/blog/wps42.jpg)

### `5.3` 克隆远程仓库到本地

#### （`1`）基本语法

**`git clone`** **远程地址**

#### （`2`）案例实操

**创建新文件夹，执行**

![image-20230627164105896](https://img.xbin.cn/blog/image-20230627164105896.png)

这个地址为远程仓库地址，克隆结果：初始化本地仓库

![image-20230627164135658](https://img.xbin.cn/blog/wps31.jpg)

进入 `git-demo1` 执行

![image-20230627164353109](https://img.xbin.cn/blog/wps45.jpg)

小结：`clone` 会做如下操作。`1`、拉取代码。`2`、初始化本地仓库。`3`、创建别名

### `5.4` 邀请加入团队

#### **（`1`）点击管理**

![img](https://img.xbin.cn/blog/wps43.jpg)

#### （`2`）选择仓库成员管理

![img](https://img.xbin.cn/blog/wps46.jpg)

#### （`3`）选择邀请用户

![img](https://img.xbin.cn/blog/wps44.jpg)

#### （`4`）有多种方式可以添加

下面演示直接添加

![img](https://img.xbin.cn/blog/wps49.jpg)

直接输入用户名称添加

![img](https://img.xbin.cn/blog/wps48.jpg)

指定权限，提交

![img](https://img.xbin.cn/blog/wps47.jpg)

![img](https://img.xbin.cn/blog/wps51.jpg)

![img](https://img.xbin.cn/blog/wps52.jpg)

#### （`5`）测试功能

第一，使用 `atguiguwz` 登录码云，修改文件

![img](https://img.xbin.cn/blog/wps50.jpg)

第二 `atguiguwz` 提交文件

第三 使用另外用户登录，发现文件已经更新

![img](https://img.xbin.cn/blog/wps58.jpg)

### `5.5` 拉取远程库内容

#### （`1`）基本语法

**`git pull`** **远程库地址别名** **远程分支名**

#### （`2`）案例实操

![img](https://img.xbin.cn/blog/wps54.jpg)

## `6 SSH` 免密登录（了解）

我们可以看到远程仓库中还有一个 `SSH` 的地址，因此我们也可以使用 `SSH` 进行访问。

你可以按如下命令来生成 `sshkey`:

`ssh-keygen` -`t ed25519` -`C` "xxxxx@xxxxx.com"

\# `Generating public`/`private ed25519 key pair`...

注意：这里的 xxxxx@xxxxx.com 只是生成的 `sshkey` 的名称，并不约束或要求具体命名为某个邮箱。现网的大部分教程均讲解的使用邮箱生成，其一开始的初衷仅仅是为了便于辨识所以使用了邮箱。

按照提示完成三次回车，即可生成 `ssh key`。通过查看 ~/.`ssh`/`id_ed25519.pub` 文件内容，获取到你的 `public key`

`cat` ~/.`ssh`/`id_ed25519.pub`

\# `ssh-ed25519 AAAAB3NzaC1yc2EAAAADAQABAAABAQC6eNtGpNGwstc`....

![img](https://img.xbin.cn/blog/wps56.jpg)

![img](https://img.xbin.cn/blog/wps59.jpg)

复制生成后的 `ssh key`，通过仓库主页 **「管理」->「部署公钥管理」->「添加部署公钥」** ，添加生成的 `public key` 添加到仓库中。

![img](https://img.xbin.cn/blog/wps53.jpg)

添加后，在终端（`Terminal`）中输入

`ssh` -`T` git@gitee.com

首次使用需要确认并添加主机到本机 `SSH` 可信列表。若返回 `Hi XXX`! `You`'`ve successfully authenticated`, `but Gitee.com does not provide shell access`. 内容，则证明添加成功。

![img](https://img.xbin.cn/blog/image-20230627171156663.png)

添加成功后，就可以使用 `SSH` 协议对仓库进行操作了。

# 第 `6` 章 `IDEA` 集成 `Git`（本地库）

## `1` 配置 `Git` 忽略文件

### `6.1 IDEA` 特定文件

![img](https://img.xbin.cn/blog/image-20230627171351854.png)

### `6.2 Maven` 工程的 `target` 目录

![img](https://img.xbin.cn/blog/wps55.jpg)

### `6.3` 为什么要忽略他们

与项目的实际功能无关，不参与服务器上部署运行。把它们忽略掉能够屏蔽 `IDE` 工具之间的差异。

### `6.4` 怎么忽略

#### （`1`）创建忽略规则文件

- **文件名称：`xxxx.ignore`**（前缀名随便起，建议是 `git.ignore`）

- 这个文件的存放位置原则上在哪里都可以，为了便于让~/.`gitconfig` 文件引用，建议也放在用户家目录下

- `git.ignore` 文件模版内容如下

```ignore
# Compiled class file
*.class

erdaye

# Log file
*.log

# BlueJ files
*.ctxt

# Mobile Tools for Java (J2ME)
.mtj.tmp/

# Package Files #
*.jar
*.war
*.nar
*.ear
*.zip
*.tar.gz
*.rar

# virtual machine crash logs, see http://www.java.com/en/download/help/error_hotspot.xml
hs_err_pid*

.classpath
.project
.settings
target
.idea
*.iml
```

#### （`2`）在.`gitconfig` 文件中引用

（此文件在 `Windows` 的家目录中）

```shell
[user]
	name = Layne
	email = Layne@atguigu.com
[core]
	excludesfile = C:/Users/asus/git.ignore   \\  \\  \\
```

注意：这里要使用正斜线（/），不要使用反斜线（\）

## `2` 定位 `Git` 程序

![image-20230627171100646](https://img.xbin.cn/blog/image-20230627171100646.png)

## `3` 初始化本地库

![image-20230627171156663](https://img.xbin.cn/blog/wps67.jpg)

选择要创建 `Git` 本地仓库的工程。

![image-20230627171258993](https://img.xbin.cn/blog/image-20230627171511686.png)

## `4` 添加到暂存区

右键点击项目选择 `Git` -> `Add` 将项目添加到暂存区。

![image-20230627171351854](https://img.xbin.cn/blog/wps66.jpg)

## `5` **提交到本地库**

![image-20230627171511686](https://img.xbin.cn/blog/wps70.jpg)

## `6` **切换版本**

查看历史版本

![img](https://img.xbin.cn/blog/wps71.jpg)

![img](https://img.xbin.cn/blog/image-20230627171258993.png)

右键选择要切换的版本，然后在菜单里点击 `Checkout Revision`。

![img](https://img.xbin.cn/blog/wps72.jpg)

## `7` 创建分支

选择 `Git`，在 `Repository` 里面，点击 `Branches` 按钮。

![img](https://img.xbin.cn/blog/wps69.jpg)

在弹出的 `Git Branches` 框里，点击 `New Branch` 按钮。

![img](https://img.xbin.cn/blog/wps68.jpg)

填写分支名称，创建 `hot-fix` 分支。

![img](https://img.xbin.cn/blog/wps77.jpg)

然后看到 `hot-fix`，说明分支创建成功，并且当前已经切换成 `hot-fix` 分支

![img](https://img.xbin.cn/blog/wps75.jpg)

## `8` **切换分支**

切换到 `master` 分支

![img](https://img.xbin.cn/blog/wps76.jpg)

## `9` **合并分支**

切换到 `master` 分支，将 `hot-fix` 分支合并到当前 `master` 分支。

![img](https://img.xbin.cn/blog/wps73.jpg)

如果代码没有冲突，分支直接合并成功，分支合并成功以后，代码自动提交，无需手动提交本地库。

![img](https://img.xbin.cn/blog/wps74.jpg)

## `10` **解决冲突**

如图所示，如果 `master` 分支和 `hot-fix` 分支都修改了代码，在合并分支的时候就会发生冲突。

![img](https://img.xbin.cn/blog/wps79.jpg)

![img](https://img.xbin.cn/blog/wps78.jpg)

我们现在站在 `master` 分支上合并 `hot-fix` 分支，就会发生代码冲突。

![img](https://img.xbin.cn/blog/wps82.jpg)

点击 `Conflicts` 框里的 `Merge` 按钮，进行手动合并代码。

![img](https://img.xbin.cn/blog/wps84.jpg)

手动合并完代码以后，点击右下角的 `Apply` 按钮。

![img](https://img.xbin.cn/blog/wps81.jpg)

代码冲突解决，自动提交本地库。

![img](https://img.xbin.cn/blog/wps83.jpg)

# 第 `7` 章 `IDEA` 集成 `Gitee`（码云）

## `1 IDEA` 安装码云插件

`Idea` 默认不带码云插件，我们第一步要安装 `Gitee` 插件

如图所示，在 `Idea` 插件商店搜索 `Gitee`，然后点击右侧的 `Install` 按钮。

![img](https://img.xbin.cn/blog/image-20230627192704469.png)

安装成功后，重启 `Idea`

![img](https://img.xbin.cn/blog/wps86.jpg)

​ `Idea` 重启以后在 `Version Control` 设置里面看到 `Gitee`，说明码云插件安装成功

![img](https://img.xbin.cn/blog/wps80.jpg)

​ 然后在码云插件里面添加码云帐号，我们就可以用 `Idea` 连接码云了。

![img](https://img.xbin.cn/blog/wps85.jpg)

![img](https://img.xbin.cn/blog/image-20230627192951068.png)

## `2 push` 推送本地库到远程库

首先在 `Idea` 里面创建一个工程，初始化 `git` 工程，然后将代码添加到暂存区，提交到本地库，这些步骤上面已经讲过，此处不再赘述。

将本地代码 `push` 到码云远程库

![image-20230627192612272](https://img.xbin.cn/blog/image-20230627192612272.png)

自定义远程库链接。

![image-20230627192704469](https://img.xbin.cn/blog/image-20230627192906905.png)

给远程库链接定义个 `name`，然后再 `URL` 里面填入码云远程库的链接即可

![image-20230627192906905](https://img.xbin.cn/blog/image-20230627193357500.png)

然后选择定义好的远程链接，点击 `Push` 即可

![image-20230627192951068](https://img.xbin.cn/blog/image-20230627193601024.png)

去码云远程库查看代码。

![image-20230627193119142](https://img.xbin.cn/blog/image-20230627193719625.png)

## `3 pull` 拉取远程库到本地库

（`1`）在码云上直接修改代码内容，之后提交，为了进行测试

![image-20230627193357500](https://img.xbin.cn/blog/image-20230627193119142.png)

（`2`）右键点击项目，可以将远程仓库的内容 `pull` 到本地仓库。

![image-20230627193430355](https://img.xbin.cn/blog/image-20230627193430355.png)

（`3`）选择远程库

![image-20230627193601024](https://img.xbin.cn/blog/image-20230627194316698.png)

（`4`）`pull` 了远程库中最新内容

![image-20230627193719625](https://img.xbin.cn/blog/image-20230627194402118.png)

注意：`pull` 是拉取远端仓库代码到本地，如果远程库代码和本地库代码不一致，会自动合并，如果自动合并失败，还会涉及到手动解决冲突的问题。

## `4 clone` 克隆远程库到本地

（`1`）选择 `Clone`

![image-20230627194402118](https://img.xbin.cn/blog/image-20230627194205652.png)

（`2`）输入远程码云仓库地址

![image-20230627194205652](https://img.xbin.cn/blog/wps26.png)

（`3`）完成 `clone` 操作

![image-20230627194316698](https://img.xbin.cn/blog/wps4.png)

`git`
