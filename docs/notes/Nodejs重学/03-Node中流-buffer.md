# Buffer

## Buffer 和二进制

我们会发现，对于前端开发来说，通常`很少会和二进制直接打交道`，但是对于服务器端为了做很多的功能，我们`必须直接去操作其二进制的数据`；

所以 Node 为了可以方便开发者完成更多功能，提供给了我们一个类 Buffer，并且它是全局的。

我们前面说过，Buffer 中存储的是二进制数据，那么到底是如何存储呢？

- 我们可以将 Buffer 看成是一个存储二进制的数组；
- 这个数组中的`每一项`，可以`保存 8 位二进制`： 0000 0000

为什么是 8 位呢？

- 在计算机中，`很少的情况我们会直接操作一位二进制`，因为`一位二进制存储的数据是非常有限的`；
- 所以通常会`将 8 位合在一起作为一个单元`，这个单元称之为`一个字节（byte）`；
- `也就是说 1byte = 8bit`，1kb=1024byte，1M=1024kb；
- 比如很多编程语言中的 `int 类型是 4 个字节`，`long 类型时 8 个字节`；
- 比如 `TCP 传输的是字节流`，在`写入和读取时都需要说明字节的个数`；
- 比如 `RGB 的值分别都是 255`，所以`本质上在计算机中都是用一个字节存储的`；

## Buffer 和字符串

Buffer 相当于是一个字节的数组，数组中的每一项对应一个字节的大小：
![](https://img.xbin.cn/images/2023/09/11-16-21-f0c06a.png)

如果我们希望将一个字符串放入到 Buffer 中，是怎么样的过程呢？
![](https://img.xbin.cn/images/2023/09/11-16-21-d80997.png)

它是怎么样的过程呢？
![](https://img.xbin.cn/images/2023/09/11-16-21-9c3371.png)

## 如果是中文呢？

默认编码：utf-8
![](https://img.xbin.cn/images/2023/09/11-16-22-4c4122.png)

如果编码和解码不同：
![](https://img.xbin.cn/images/2023/09/11-16-22-e5cbb7.png)

## Buffer.alloc

来看一下 Buffer.alloc:

- 我们会发现创建了一个 8 位长度的 Buffer，里面所有的数据默认为 00；

![](https://img.xbin.cn/images/2023/09/11-16-23-b2cc1e.png)

我们也可以对其进行操作
![](https://img.xbin.cn/images/2023/09/11-16-23-0d1b57.png)

## Buffer 和文件读取

文本文件的读取
![](https://img.xbin.cn/images/2023/09/11-16-24-1d699c.png)

图片文件的读取
![](https://img.xbin.cn/images/2023/09/11-16-24-487661.png)

## Buffer 的创建过程

事实上我们创建 Buffer 时，并不会频繁的向操作系统申请内存，它会默认先申请一个 8 \* 1024 个字节大小的内存，也就是 8kb
![](https://img.xbin.cn/images/2023/09/11-16-25-13df5a.png)

## Buffer.from 源码

假如我们调用 Buffer.from 申请 Buffer：

- 这里我们以从字符串创建为例
- node/lib/buffer.js：290 行

![](https://img.xbin.cn/images/2023/09/11-16-26-f1a3bb.png)

## fromString 的源码

![](https://img.xbin.cn/images/2023/09/11-16-26-9216b9.png)

## fromStringFast

接着我们查看 fromStringFast：

- 这里做的事情是判断剩余的长度是否还足够填充这个字符串；
- 如果不足够，那么就要通过 createPool 创建新的空间；
- 如果够就直接使用，但是之后要进行 poolOffset 的偏移变化；
- node/lib/buffer.js：428 行

![](https://img.xbin.cn/images/2023/09/11-16-26-9bfa6c.png)

![](https://img.xbin.cn/images/2023/09/11-16-27-72fc32.png)
