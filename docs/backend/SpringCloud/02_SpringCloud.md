# `1 Gateway` 组件

## `1.1 Gateway` 简介

### `1.1.1` 官网

- https://docs.spring.io/spring-cloud-gateway/docs/4.0.x/reference/html/

![image-20230721090940955](https://img.xbin.cn/blog/image-20230721091835236.png)

### `1.1.2` 概述

- `Gateway` 是在 `spring` 生态系统之上构建的 `API` 网关服务，基于 `Spring5`，`SpringBoot2` 和 `Project Reactor` 等技术。`Gateway` 旨在提供一种简单而有效的方式来对 `API` 进行路由，以及提供一些强大的过滤器功能，例如：熔断、限流、重试等
- `SpringCloud Gateway` 是 `SpringCloud` 的一个全新项目，基于 `Spring5.X`+`SpringBoot2.X` 和 `Project Reactor` 等技术开发的网关，它旨在为微服务架构提供一种简单有效的统一的 `API` 路由管理方式。
- 为了提升网关的性能，`SpringCloud Gatway` 是基于 `WebFlux` 框架实现的，而 `WebFlux` 框架底层则使用了高性能的 `Reactor` 模式通讯框架 `Netty`。
- `SpringCloud Gateway` 的目标提供统一的路由方式且基于 `Filter` 链的方式提供了网关基本的功能，例如：安全、监控/指标、和限流。

### `1.1.3` 架构图

![image-20230624161556300](https://img.xbin.cn/blog/image-20230721091858141.png)

## `1.2` 三大核心概念

### `1.2.1 Route`(路由)

路由是构建网关的基本模块，它由 `ID`，目标 `URI`，一系列的断言和过滤器组成，如果断言为 `true` 则匹配该路由

![image-20230721091801547](https://img.xbin.cn/blog/image-20230721091801547.png)

### `1.2.2 Predicate`（断言）

参考的是 `java8` 的 `java.util.function.Predicate` 开发人员可以匹配 `HTTP` 请求中的所有内容（例如请求头或请求参数），如果请求与断言相匹配则进行路由

![image-20230721091835236](https://img.xbin.cn/blog/image-20230624161556300.png)

### `1.2.3 Filter`（过滤）

指的是 `Spring` 框架中 `GatewayFilter` 的实例，使用过滤器，可以在请求被路由前或者之后对请求进行修改。

![image-20230721091858141](https://img.xbin.cn/blog/image-20230721092129655.png)

## `1.3` 工作流程

![image-20230721092104682](https://img.xbin.cn/blog/image-20230721090940955.png)

![image-20230721092129655](https://img.xbin.cn/blog/image-20230721101439700.png)

- 客户端向 `Spring Cloud Gateway` 发出请求。然后在 `Gateway Handler Mapping` 中找到与请求匹配的路由，将其发送到 `Gateway Web Handler`.
- `Handler` 再通过指定的过滤器链来将请求发送给我们实际的服务执行业务逻辑，然后返回。
- 过滤器之间用虚线分开是因为过滤器可能会在发送代理请求之前（"`pre`"）或之后("`post`")执行业务逻辑。
- `Filter` 在"`pre`"类型的过滤器可以做参数校验、权限校验、流量监控、日志输出、协议转换等，在"`post`"类型的过滤器中可以做响应内容、响应头的修改，日志的输出，流量控制等有着非常重要的作用

## `1.4 Gateway` 入门案例

下面，我们就演示下网关的基本路由功能。基本步骤如下：

- `1`、在 `spzx-cloud-parent` 下创建子模块 `spzx-cloud-gateway`

![image-20230721101439700](https://img.xbin.cn/blog/image-20230624163155679.png)

- `2`、引入如下依赖：

```xml
<!--网关-->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-gateway</artifactId>
</dependency>

<!--nacos服务发现依赖-->
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
</dependency>

<!-- 负载均衡组件 -->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-loadbalancer</artifactId>
</dependency>
```

![image-20230721092532222](https://img.xbin.cn/blog/image-20230721092104682.png)

- `3`、编写启动类

```java
// com.atguigu.spzx.cloud.gateway
@SpringBootApplication
public class GatewayApplication {

	public static void main(String[] args) {
		SpringApplication.run(GatewayApplication.class, args);
	}
}
```

- `4`、在 `application.yml` 配置文件中编写基础配置和路由规则

```yaml
server:
  port: 8222
spring:
  application:
    name: spzx-cloud-gateway
  cloud:
    gateway:
      discovery:
        locator:
          enabled: true
      routes:
        - id: spzx-cloud-user # 路由id，可以自定义，只要唯一即可
          uri: lb://spzx-cloud-user # 路由的目标地址 lb就是负载均衡，后面跟服务名称
          predicates:
            - Path=/*/user/** # 路径匹配
        - id: spzx-cloud-order
          uri: lb://spzx-cloud-order
          predicates:
            - Path=/*/order/** # 路径匹配
    nacos:
      discovery:
        server-addr: 127.0.0.1:8848
```

- `5`、重启测试

重启网关，访问 `http://localhost:8222/api/user/findUserByUserId/1` 时，符合 `/api/user/**` 规则，

请求转发到 `uri`：http://spzx-cloud-user/api/user/findUserByUserId/1，得到了结果：

![image-20230624163155679](https://img.xbin.cn/blog/image-20230721092532222.png)

## `1.5 Gateway` 负载均衡测试

- **通过 `idea` 部署两个用户微服务**

![image-20251216093214430](https://img.xbin.cn/blog/image-20251216093818393.png)

- **`UserController` 添加代码（为了测试）**

```java
@RestController
@RequestMapping(value = "/api/user")
public class UserController {

    @Autowired
    private UserService userService ;

    //获取服务器的端口号
    @Value("${server.port}")
    private String port;

    @GetMapping(value = "/findUserByUserId/{userId}")
    public User findUserByUserId(@PathVariable(value = "userId") Long userId) {
        //输出端口号
        System.out.println(port);
        return userService.findUserByUserId(userId) ;
    }

}
```

- **启动网关和两个用户微服务测试**

访问地址：`http://localhost:8222/api/user/findUserByUserId/1`

![image-20251216093818393](https://img.xbin.cn/blog/image-20230624163811030.png)

![image-20251216093733330](https://img.xbin.cn/blog/image-20251216093214430.png)

## `1.6 Predicate` 的使用

- 启动网关服务后，在控制台可以看到如下信息：

![image-20230721101903404](https://img.xbin.cn/blog/image-20230624171530387.png)

- 思考问题：我们在配置文件中只是配置了一个访问路径的规则，怎么就可以实现路由呢?

底层原理：框架底层会自动读取配置文件中的内容，然后通过制定的路由工厂将其转换成对应的判断条件，然后进行判断。在 `Gateway` 中提供了很多的路由工厂如下所示：https://docs.spring.io/spring-cloud-gateway/docs/4.0.6/reference/html/#gateway-request-predicates-factories

![image-20230624163811030](https://img.xbin.cn/blog/image-20251216093733330.png)

大致有 `12` 个，每一种路由工厂的使用 `Spring Cloud` 的官网都给出了具体的示例代码，我们可以参考示例代码进行使用。以 `After Route Predicate`

`Factory` 路由工厂举例，如下所示：

```yaml
spring:
  cloud:
    gateway:
      routes:
        - id: spzx-cloud-user
          uri: lb://spzx-cloud-user
          predicates:
            - Path=/api/user/**
            - After=2023-07-21T10:23:06.978038800+08:00[Asia/Shanghai] # 系统时间在2023-07-21之后才可以进行访问
```

```java
//获取当前时区时间代码
ZonedDateTime zonedDateTime = ZonedDateTime.now();
System.out.println(zonedDateTime);
```

- 总结

`Spring Cloud Gateway` 将路由匹配作为 `Spring WebFlux HandlerMapper` 基础框架的一部分。 `Spring Cloud Gateway` 包括许多内置的 `Route Predicate` 工厂。所有这些 `Predicate` 都与 `HTTP` 请求的不同属性匹配。多个 `Route Predicate` 工厂可以进行组合 `Spring Cloud Gateway` 创建 `Route` 对象时，使用 `RoutePredicateFactory` 创建 `Predicate` 对象，`Predicate` 对象可以赋值给 `Route`。`Spring Cloud Gateway` 包含许多内置的 `Route Predicate Factories`。所有这些谓词都匹配 `HTTP` 请求的不同属性。多种谓词工厂可以组合，并通过逻辑 `and` 。

## `1.6` 过滤器

### `1.6.1` 过滤器简介

在 `gateway` 中要实现其他的功能：权限控制、流量监控、统一日志处理等。就需要使用到 `gateway` 中所提供的过滤器了。过滤器，可以对进入网关的请求和微服务返回的响应做处理：

![image-20230624164230054](https://img.xbin.cn/blog/image-20230721101903404.png)

### `1.6.2` 内置过滤器

`spring gateway` 提供了 `30` 多种不同的过滤器。

官网地址：https://docs.spring.io/spring-cloud-gateway/docs/4.0.x/reference/html/#gatewayfilter-factories

例如：

| **名称**               | **说明**                     |
| ---------------------- | ---------------------------- |
| `AddRequestHeader`     | 给当前请求添加一个请求头     |
| `RemoveRequestHeader`  | 移除请求中的一个请求头       |
| `AddResponseHeader`    | 给响应结果中添加一个响应头   |
| `RemoveResponseHeader` | 从响应结果中移除有一个响应头 |
| `RequestRateLimiter`   | 限制请求的流量               |

在 `Gateway` 中提供了三种级别的类型的过滤器：

`1`、路由过滤器：只针对当前路由有效

`2`、默认过滤器：针对所有的路由都有效

`3`、全局过滤器：针对所有的路由都有效，需要进行自定义

### `1.6.3` 路由过滤器

需求：给所有进入 `spzx-cloud-user` 的请求添加一个请求头：`Truth`=`atguigu`

实现：

`1`、修改 `gateway` 服务的 `application.yml` 文件，添加路由过滤

```yaml
spring:
  cloud:
    gateway:
      routes:
        - id: spzx-cloud-user
          uri: lb://spzx-cloud-user
          predicates:
            - Path=/api/user/**
          filters:
            - AddRequestHeader=Truth, atguigu # 配置路由基本的过滤器，给访问user微服务的所有接口添加Truth请求头
```

当前过滤器写在 `spzx-cloud-user` 路由下，因此仅仅对访问 `spzx-cloud-user` 的请求有效。

`2`、在 `spzx-cloud-user` 的接口方法中读取请求头数据，进行测试

```java
@GetMapping(value = "/findUserByUserId/{userId}")
public User findUserByUserId(@PathVariable(value = "userId") Long userId , @RequestHeader(name = "Truth")String header) {
    log.info("UserController...findUserByUserId方法执行了... ,header: {} " , header);
    return userService.findUserByUserId(userId) ;
}
```

### `1.6.4` 默认过滤器

如果要对所有的路由都生效，则可以将过滤器工厂写到 `default` 下。格式如下：

```yml
spring:
  cloud:
    gateway:
      routes:
        - id: spzx-cloud-user
          uri: lb://spzx-cloud-user
          predicates:
            - Path=/api/user/**
            - After=2017-01-20T17:42:47.789-07:00[America/Denver]
      default-filters:
        - AddRequestHeader=Truth, atguigu is good
```

### `1.6.5` 全局过滤器

- 概述

上述的过滤器是 `gateway` 中提供的默认的过滤器，每一个过滤器的功能都是固定的。但是如果我们希望拦截请求，做自己的业务逻辑，默认的过滤器就没办法实现。此时就需求使用全局过滤器，全局过滤器的作用也是处理一切进入网关的请求和微服务响应，与 `GatewayFilter` 的作用一样。区别在于 `GatewayFilter` 通过配置定义，处理逻辑是固定的；而 `GlobalFilter` 的逻辑需要自己写代码实现。

- 需求：定义全局过滤器，拦截请求，判断请求的参数是否满足下面条件：

**请求参数中是否有 `username`，如果同时满足则放行，否则拦截**

- 步骤分析：

`1`、定义一个类实现 `GlobalFilter` 接口

`2`、重写 `filter` 方法

`3`、将该类纳入到 `spring` 容器中

`4`、实现 `Ordered` 接口定义该过滤器的顺序

- 实现代码：

```java
@Component
public class AuthorizationFilter implements GlobalFilter, Ordered {

    //实现过滤器逻辑
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        String username = exchange.getRequest().getQueryParams().getFirst("username");
        if(!StringUtils.hasText(username)){
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        }
        return chain.filter(exchange);
    }

    //定义该过滤器的顺序
    @Override
    public int getOrder() {
        return 0;
    }
}
```

### `1.6.6` 过滤器执行顺序

请求进入网关会碰到三类过滤器：当前路由的过滤器、`DefaultFilter`、`GlobalFilter`

请求路由后，会将当前路由过滤器和 `DefaultFilter`、`GlobalFilter`，合并到一个过滤器链（集合）中，排序后依次执行每个过滤器：

![image-20230624170925571](https://img.xbin.cn/blog/image-20230624170925571.png)

排序的规则是什么呢？

`1`、按照 `order` 的值进行排序，`order` 的值越小，优先级越高，执行顺序越靠前。

`2`、路由过滤器和默认过滤器会按照 `order` 的值进行排序，这个值由 `spring` 进行指定，默认是按照声明顺序从 `1` 递增

`3`、当过滤器的 `order` 值一样时，会按照 `globalFilter` > `defaultFilter` > 路由过滤器的顺序执行

核心源码分析：`org.springframework.cloud.gateway.handler.FilteringWebHandler`#`handle` 方法会加载全局过滤器，与前面的过滤器合并后根据 `order` 排序，组织过滤器链

```java
public Mono<Void> handle(ServerWebExchange exchange) {
    Route route = (Route)exchange.getRequiredAttribute(ServerWebExchangeUtils.GATEWAY_ROUTE_ATTR);

    // 获取路由级别的过滤器和默认过滤器的集合
    List<GatewayFilter> gatewayFilters = route.getFilters();

    // 获取全局过滤器的集合
    List<GatewayFilter> combined = new ArrayList(this.globalFilters);

    // 将取路由级别的过滤器和默认过滤器的集合中的元素添加到全局过滤器的集合中
    combined.addAll(gatewayFilters);

    // 进行排序
    AnnotationAwareOrderComparator.sort(combined);
    if (logger.isDebugEnabled()) {
        logger.debug("Sorted gatewayFilterFactories: " + combined);
    }

    // 调用过滤器链中的filter方法
    return (new DefaultGatewayFilterChain(combined)).filter(exchange);
}
```

# `2 Nacos` 配置中心

`Nacos` 除了可以做注册中心，同样可以做配置管理来使用。

## `2.1` 统一配置管理

当微服务部署的实例越来越多，达到数十、数百时，逐个修改微服务配置就显得十分的不方便，而且很容易出错。我们需要一种统一配置管理方案，可以集中管理所有实例的配置。

![image-20230624171403235](https://img.xbin.cn/blog/image-20230624200928589.png)

`nacos` 一方面可以将配置集中管理，另一方可以在配置变更时，及时通知微服务，实现配置的热更新。

## `2.2 Nacos` 入门

### `2.2.1 Nacos` 中添加配置

在 `Nacos` 服务端创建一个配置，如下所示：

![image-20230624171530387](https://img.xbin.cn/blog/image-20230624164230054.png)

然后在弹出的表单中，填写配置信息：

![image-20210714164856664](https://img.xbin.cn/blog/image-20210714164856664.png)

### `2.2.2` 微服务集成配置中心

微服务需要进行改造，从 `Nacos` 配置中心中获取配置信息进行使用。

步骤：

`1`、在 `spzx-cloud-user` 微服务中，引入 `spring-cloud-starter-alibaba-nacos-config` 依赖

```xml
<!-- nacos作为配置中心时所对应的依赖 -->
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-nacos-config</artifactId>
</dependency>
```

`2`、在 `spzx-cloud-user` 项目的 /`src`/`main`/`resources`/`application.yml` 配置文件中配置 `Nacos Config` 地址并引入服务配置

```yml
# 配置数据库的连接信息
spring:
  cloud:
    nacos:
      config:
        server-addr: 192.168.136.142:8848
  config:
    import:
      - nacos:spzx-cloud-user-dev.yml
```

### `2.2.3` 读取自定义配置

#### @`Value`

通过@`Value` 注解读取自定义配置，如下所示：

```java
@RestController
@RequestMapping(value = "/api/user")
@Slf4j
public class UserController {

    @Autowired
    private UserService userService ;

    @Value("${pattern.dateformat}")
    private String pattern ;

    @GetMapping(value = "/findUserByUserId/{userId}")
    public User findUserByUserId(@PathVariable(value = "userId") Long userId , @RequestHeader(name = "Truth")String header) {
        log.info("UserController...findUserByUserId方法执行了... ,header: {} , dateformat: {} " , header , pattern);
        return userService.findUserByUserId(userId) ;
    }

}
```

#### @`ConfigurationProperties`

也可以通过实体类，配合@`ConfigurationProperties` 注解读取自定义配置，代码如下所示：

`1`、定义一个实体类，代码如下所示：

```java
@Data
@ConfigurationProperties(prefix = "pattern")
public class PatternProperties {

    private String dateformat ;

}
```

`2`、在启动类上添加@`EnableConfigurationProperties` 注解，如下所示：

```java
@SpringBootApplication
@EnableConfigurationProperties(value = { PatternProperties.class })
public class UserApplication {

    public static void main(String[] args) {
        SpringApplication.run(UserApplication.class , args) ;
    }

}
```

`3`、使用该实体类，代码如下所示：

```java
@RestController
@RequestMapping(value = "/api/user")
@Slf4j
public class UserController {

    @Autowired
    private UserService userService ;

    @Value("${pattern.dateformat}")
    private String pattern ;

    @Autowired   // 注入实体类
    private PatternProperties patternProperties ;

    @GetMapping(value = "/findUserByUserId/{userId}")
    public User findUserByUserId(@PathVariable(value = "userId") Long userId , @RequestHeader(name = "Truth")String header) {
        log.info("UserController...findUserByUserId方法执行了... ,header: {} , dateformat: {} " , header , patternProperties.getDateformat());
        return userService.findUserByUserId(userId) ;
    }

}
```

## `2.3` 配置热更新

我们最终的目的，是修改 `Nacos` 中的配置后，微服务中无需重启即可让配置生效，也就是**配置热更新**。实现配置的热更新有两种方式：

> 方式一：在@`Value` 注入的变量所在类上添加注解**@`RefreshScope`**

![image-20230624200928589](https://img.xbin.cn/blog/image-20230624171403235.png)

> 方式二：通过实体类，配合@`ConfigurationProperties` 注解读取配置信息，**自动**支持热更新

## `2.4` 配置优先级

思考问题：如果在 `application.yml` 文件中和 `Nacos` 配置中心中都定义了相同的配置内容，那么哪一个配置的优先级较高呢?

优先级顺序：`Nacos` 配置中心的配置(后导入的配置 > 先导入的配置) > `application.yml`

# `3 Sentinel` 组件

## `3.1` 初识 `sentinel`

### `3.1.1` 雪崩效应

概述：在微服务系统架构中，服务间调用关系错综复杂，一个微服务往往依赖于多个其它微服务。一个服务的不可用导致整个系统的不可用的现象就被称之为雪崩效应。

如下图所示：

![image-20230624203044831](https://img.xbin.cn/blog/image-20230624203153340-16882902699943.png)

当服务 `D` 出现了问题了以后，调用服务 `D` 的服务 `A` 的线程就得不到及时的释放，在高并发情况下，随着时间的不断推移服务 `A` 的系统资源会被线程耗尽，最终导致服务 `A` 出现了问题，同理就会导致其他的服务也不能进行访问了。

### `3.1.2` 解决方案

#### 超时处理

超时处理：设定超时时间，请求超过一定时间没有响应就返回错误信息，不会无休止等待

![image-20230624203153340](https://img.xbin.cn/blog/image-20230624203222353-16882902699932.png)

#### 隔离处理

隔离处理：将错误隔离在可控的范围之内，不要让其影响到其他的程序的运行。

这种设计思想，来源于船舱的设计，如下图所示：

![image-20230624203222353](https://img.xbin.cn/blog/image-20230624203256590-16882902699944.png)

船舱都会被隔板分离为多个独立空间，当船体破损时，只会导致部分空间进入，将故障控制在一定范围内，避免整个船体都被淹没。于此类似，我们业务系统也可以使用这种思想来防止出现雪崩效应，常见的隔离方式：线程隔离

![image-20230624203256590](https://img.xbin.cn/blog/image-20230624203044831-16882902699931.png)

#### 熔断处理

熔断处理：由**断路器**统计业务执行的异常比例，如果超出阈值则会**熔断**该业务，拦截访问该业务的一切请求。

断路器会统计访问某个服务的请求数量，异常比例如下所示：

![image-20230624203334370](https://img.xbin.cn/blog/image-20230624203334370-16882902699945.png)

请求了三次，两次出现异常，一次成功。当发现访问服务 `D` 的请求异常比例过高时，认为服务 `D` 有导致雪崩的风险，会拦截访问服务 `D` 的一切请求，形成熔断：

![image-20230624203409785](https://img.xbin.cn/blog/image-20230624203508014-16882902699947.png)

触发熔断了以后，当在访问服务 `A` 的时候，就不会在通过服务 `A` 去访问服务 `D` 了，立马给用户进行返回，返回的是一种默认值，这种返回就是一种兜底方案。这种兜底方案也将其称之为降级逻辑。

#### 流量控制

流量控制：限制业务访问的 `QPS`(每秒的请求数)，避免服务因流量的突增而故障。

![image-20230624203508014](https://img.xbin.cn/blog/image-20230624203409785-16882902699946.png)

限流是一种**预防**措施，避免因瞬间高并发流量而导致服务故障，进而避免雪崩。其他的处理方式是一种**补救**措施，在部分服务故障时，将故障控制在一定范围，避免雪崩。

### `3.1.3 sentinel` 介绍

官网地址：https://sentinelguard.io/zh-cn/

随着微服务的流行，服务和服务之间的稳定性变得越来越重要。`Sentinel` 以流量为切入点，从流量控制、熔断降级、系统负载保护等多个维度保护服务的稳定性。

- `Sentinel` 的历史：

\- `2012` 年，`Sentinel` 诞生，主要功能为入口流量控制。

\- `2013-2017` 年，`Sentinel` 在阿里巴巴集团内部迅速发展，成为基础技术模块，覆盖了所有的核心场景。`Sentinel` 也因此积累了大量的流量归整场景以及生产实践。

\- `2018` 年，`Sentinel` 开源，并持续演进。

\- `2019` 年，`Sentinel` 朝着多语言扩展的方向不断探索，推出 `C`++ 原生版本，同时针对 `Service Mesh` 场景也推出了 `Envoy` 集群流量控制支持，以解决 `Service Mesh` 架构下多语言限流的问题。

\- `2020` 年，推出 `Sentinel Go` 版本，继续朝着云原生方向演进。

- `Sentinel` 分为两个部分:

\- 核心库（`Java` 客户端）不依赖任何框架/库，能够运行于所有 `Java` 运行时环境，同时对 `Dubbo` / `Spring Cloud` 等框架也有较好的支持。

\- 控制台（`Dashboard`）基于 `Spring Boot` 开发，打包后可以直接运行，不需要额外的 `Tomcat` 等应用容器。

![image-20230624203655208](https://img.xbin.cn/blog/image-20230624215403344-168829026999411.png)

具有的特征:

![image-20230624203730680](https://img.xbin.cn/blog/image-20230624215635555-168829026999412.png)

## `3.2 sentinel` 入门

### `3.2.1` 下载 `sentinel` 控制台

`sentinel` 管理后台下载地址：https://github.com/alibaba/Sentinel/releases

![image-20230624215112184](https://img.xbin.cn/blog/image-20230624215112184-168829026999410.png)

下载完毕以后就会得到一个 `jar` 包

![image-20230624215403344](https://img.xbin.cn/blog/image-20230624203655208-16882902699948.png)

### `3.2.2` 启动 `sentinel`

- 将 `jar` 包放到任意非中文目录，执行命令：

```shell
java -jar sentinel-dashboard-2.0.0-alpha-preview.jar
```

- 如果要修改 `Sentinel` 的默认端口、账户、密码，可以通过下列配置：

| **配置项**                         | **默认值** | **说明**   |
| ---------------------------------- | ---------- | ---------- |
| `server.port`                      | `8080`     | 服务端口   |
| `sentinel.dashboard.auth.username` | `sentinel` | 默认用户名 |
| `sentinel.dashboard.auth.password` | `sentinel` | 默认密码   |

- 例如，修改端口：

```sh
java -Dserver.port=8090 -jar sentinel-dashboard-2.0.0-alpha-preview.jar
```

### `3.2.3` 访问 `sentinel`

访问http://localhost:8080页面，就可以看到 `sentinel` 的控制台了：

![image-20230624215635555](https://img.xbin.cn/blog/image-20230624203730680-16882902699949.png)

需要输入账号和密码，默认都是：`sentinel`

登录后，发现一片空白，什么都没有：因为还没有监控任何服务。另外，`sentinel` 是懒加载的，如果服务没有访问，看不到该服务信息。

![image-20230624215704921](https://img.xbin.cn/blog/image-20230628115300889-168829026999417.png)

### `3.2.4` 整合 `sentinel`

我们在 `spzx-cloud-user` 中整合 `sentinel`，并连接 `sentinel` 的控制台，步骤如下：

`1`、引入 `sentinel` 依赖

```xml
<!--sentinel-->
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-sentinel</artifactId>
</dependency>
```

`2`、配置控制台

修改 `application.yaml` 文件，添加下面内容

```yml
spring:
  cloud:
    sentinel:
      transport:
        dashboard: localhost:8080 # 配置sentinel控制台地址
```

`3`、访问 `spzx-cloud-user` 的任意接口

打开浏览器，访问 `http://localhost:10100/api/user/findUserByUserId/1`，这样才能触发 `sentinel` 的监控。然后再访问 `sentinel` 的控制台，查看效果：

![image-20230624220303385](https://img.xbin.cn/blog/image-20230624215704921-168829026999413.png)

## `3.3` 流量控制

雪崩问题虽然有四种方案，但是限流是避免服务因突发的流量而发生故障，是对微服务雪崩问题的预防。我们先学习这种模式。

### `3.3.1` 相关概念

**簇点链路**：当请求进入微服务时，首先会访问 `DispatcherServlet`，然后进入 `Controller`、`Service`、`Mapper`，这样的一个调用链就叫做簇点链路。

**资源**：簇点链路中被监控的每一个接口就是一个资源，流控、熔断等都是针对簇点链路中的资源来设置的。

默认情况下 `sentinel` 会监控 `spring mvc` 的每一个端点（`Endpoint`，也就是 `controller` 中的方法），因此 `spring mvc` 的每一个端点就是调用链路中的一个资源。

例如，我们刚才访问的 `spzx-cloud-user` 中的 `UserController` 中的端点：/`api`/`user`/`findUserByUserId`/{`userId`}

![image-20230624220603571](https://img.xbin.cn/blog/image-20230628090407483-168829026999416.png)

我们可以点击对应资源后面的按钮来设置规则：

`1`、流控：流量控制

`2`、降级：降级熔断

`3`、热点：热点参数限流，是限流的一种

`4`、授权：请求的权限控制

### `3.3.2` 快速入门

需求：给 /`api`/`user`/`findUserByUserId`/{`userId`}这个资源设置流控规则，`QPS` 不能超过 `5`，然后测试。

步骤：

`1`、首先在 `sentinel` 控制台添加限流规则

![image-20230628090407483](https://img.xbin.cn/blog/image-20230624220303385-168829026999414.png)

`2`、利用 `jmeter` 测试(模拟并发请求)

> `Apache JMeter` 是 `Apache` 组织基于 `Java` 开发的压力测试工具，用于对软件做**压力测试**。
>
> 下载地址：https://archive.apache.org/dist/jmeter/binaries/

课前资料提供了编写好的 `Jmeter` 测试样例

![image-20230628115300889](https://img.xbin.cn/blog/image-20230624220603571-168829026999415.png)

通过如下命令打开 `jmeter`

```shell
java -jar ApacheJMeter.jar
```

导入课前资料提供的测试样例

![image-20220320111824238](https://img.xbin.cn/blog/image-20220320111955904-168829026999419.png)

选择流控入门

![image-20220320111955904](https://img.xbin.cn/blog/image-20220320111824238-168829026999418.png)

`10` 个线程，`1` 秒内运行完，`QPS` 是 `10`，超过了 `5`。

选中**流控入门，`QPS`<`5`**右键运行

![image-20220320112040803](https://img.xbin.cn/blog/image-20220320112040803-168829026999420.png)

注意：不要点击菜单中的执行按钮来运行。

点击查看结果树，理想的请求执行结果应该如下所示：

![image-20220320112142379](https://img.xbin.cn/blog/image-20220320112142379-168829026999421.png)

可以看到，成功的请求每次只有 `5` 个。

**注意：如果测试结果不是上述情况，那是因为 `sentinel` 在统计请求的时候，把一部分的请求统计到了下一秒中导致的。**

### `3.3.3` 流控模式

#### 流控模式简介

在添加限流规则时，点击高级选项，可以选择三种**流控模式**：

`1`、直接：统计当前资源的请求，触发阈值时对当前资源直接限流，也是默认的模式

`2`、关联：统计与当前资源相关的另一个资源，触发阈值时，对当前资源限流

`3`、链路：统计从指定链路访问到本资源的请求，触发阈值时，对指定链路限流

如下所示：

![image-20230628091856122](https://img.xbin.cn/blog/image-20230628092034118-168829026999423.png)

快速入门测试的就是直接模式。

#### 关联模式

关联模式：统计与当前资源相关的另一个资源，触发阈值时，对当前资源限流

配置方式：

![image-20230628092034118](https://img.xbin.cn/blog/image-20230628091856122-168829026999422.png)

语法说明：对/`api`/`user`/`updateUserById` 资源的请求进行统计，当访问流量超过阈值时，就对/`api`/`user`/`findUserByUserId`/{`userId`}进行限流，避免影响/`api`/`user`/`updateUserById` 资源。

使用场景：比如用户支付时需要修改订单状态，同时用户要查询订单。查询和修改操作会争抢数据库锁，产生竞争。业务需求是优先支付和更新订单的业务，因此当修改订单业务触发阈值时，需要对查询订单业务限流。

案例实现：

`1`、在 `UserController` 新建一个端点：/`api`/`user`/`updateUserById`，无需实现业务

```java
// 修改用户数据端点
@GetMapping(value = "/updateUserById")
public String updateUserById() {
    return "修改用户数据成功";
}
```

`2`、重启服务，访问对应的端点，让其产生簇点链路

![image-20230628092515666](https://img.xbin.cn/blog/image-20230628092515666-168829026999424.png)

`3`、配置流控规则，当/`api`/`user`/`updateUserById` 资源被访问的 `QPS` 超过 `5` 时，对/`api`/`user`/`findUserByUserId`/`1` 请求限流。对哪个端点限流，就点击哪个端点后面的按钮。我们是对用户查询/`api`/`user`/`findUserByUserId`/`1` 限流，因此点击它后面的按钮：

![image-20230628092751648](https://img.xbin.cn/blog/image-20230628093126793-168829026999427.png)

`4`、在 `Jmeter` 中进行测试

选择《流控模式-关联》：

![image-20220320114459422](https://img.xbin.cn/blog/image-20230628093300378-168829026999428.png)

可以看到 `1000` 个线程，`100` 秒，因此 `QPS` 为 `10`，超过了我们设定的阈值：`5`

查看 `http` 请求：

![image-20230628093126793](https://img.xbin.cn/blog/image-20220320114459422-168829026999426.png)

请求的目标是/`api`/`user`/`updateUserById`，这样这个端点就会触发阈值。但限流的目标是/`api`/`user`/`findUserByUserId`/`1`，我们在浏览器访问，可以发现：

![image-20230628093300378](https://img.xbin.cn/blog/image-20230628092751648-168829026999425.png)

确实被限流了。

关联流控模式的使用场景：

`1`、两个有竞争关系的资源

`2`、一个优先级较高，一个优先级较低

对高优先级的资源的流量进行统计，当超过阈值对低优先级的资源进行限流。

#### 链路模式

链路模式：只针对从指定链路访问到本资源的请求做统计，判断是否超过阈值，如果超过阈值对从该链路请求进行限流。

配置方式：

`1`、/`api`/`user`/`save` --> `users`

`2`、/`api`/`user`/`query` --> `users`

如果只希望统计从/`api`/`user`/`query` 进入到 `users` 的请求，并进行限流操作，则可以这样配置：

![image-20230628095013326](https://img.xbin.cn/blog/image-20230628094306219-168829026999430.png)

案例实现：

`1`、在 `UserService` 中添加一个 `queryUsers` 方法，不用实现业务

```java
public void queryUsers(){
    System.err.println("查询用户");
}
```

`2`、在 `UserController` 中，添加两个端点，在这两个端点中分别调用 `UserService` 中的 `queryUsers` 方法

```java
@GetMapping(value = "/save")
public String save() {
    userService.queryUsers();
    System.out.println("保存用户");
    return "订单保存成功" ;
}

@GetMapping(value = "/query")
public String query() {
    userService.queryUsers();
    System.out.println("查询用户");
    return "查询用户成功" ;
}
```

`4`、通过**@`SentinelResource`**标记 `UserService` 中的 `queryUsers` 方法为一个 `sentinel` 监控的资源(默认情况下，`sentinel` 只监控 `controller` 方法)

```java
@SentinelResource("users")
public void queryUsers(){
    System.err.println("查询用户");
}
```

`5`、更改 `application.yml` 文件中的 `sentinel` 配置

链路模式中，是对不同来源的两个链路做监控。但是 `sentinel` 默认会给进入 `spring mvc` 的所有请求设置同一个 `root` 资源，会导致链路模式失效。因此需要关闭这种资源整合。

```yml
spring:
  cloud:
    sentinel:
      web-context-unify: false # 关闭context整合
```

`6`、重启服务，访问/`api`/`user`/`save` 和/`api`/`user`/`query`，可以查看到 `sentinel` 的簇点链路规则中，出现了新的资源

![image-20230628094306219](https://img.xbin.cn/blog/image-20230628095013326-168829026999429.png)

`7`、添加流控规则

点击 `users` 资源后面的流控按钮，在弹出的表单中填写下面信息：

![image-20230628094433574](https://img.xbin.cn/blog/image-20220320150559229-168829026999432.png)

只统计从/`api`/`user`/`query` 进入/`users` 的资源，`QPS` 阈值为 `2`，超出则被限流。

`8`、`jmeter` 测试

选择《流控模式-链路》

![image-20220320150559229](https://img.xbin.cn/blog/image-20230628094648097-168829026999433.png)

可以看到这里 `200` 个线程，`50` 秒内发完，`QPS` 为 `4`，超过了我们设定的阈值 `2`。

一个 `http` 请求是访问/`api`/`user`/`save`

![image-20230628094648097](https://img.xbin.cn/blog/image-20230628094713655-168829026999434.png)

另一个是访问/`api`/`user`/`query`

![image-20230628094713655](https://img.xbin.cn/blog/image-20230628094814795-168829026999435.png)

运行测试，察看结果树：

访问/`api`/`user`/`save`,没有进行限流

![image-20230628094814795](https://img.xbin.cn/blog/image-20230628094857374-168829026999536.png)

访问/`api`/`user`/`query`,进行限流了

![image-20230628094857374](https://img.xbin.cn/blog/image-20230628094433574-168829026999431.png)

### `3.3.4` 流控效果

在流控的高级选项中，还有一个流控效果选项

![image-20230628095109686](https://img.xbin.cn/blog/image-20230628095109686-168829026999537.png)

流控效果是指请求达到流控阈值时应该采取的措施，包括三种：

`1`、快速失败：达到阈值后，新的请求会被立即拒绝并抛出 `FlowException` 异常，是默认的处理方式

`2`、`warm up`：预热模式，对超出阈值的请求同样是拒绝并抛出异常，但这种模式阈值会动态变化，从一个较小值逐渐增加到最大阈值

`3`、排队等待：让所有的请求按照先后次序进入到一个队列中进行排队，当某一个请求最大的预期等待时间超过了所设定的超时时间时同样是拒绝并抛出异常

#### `warm up`

阈值一般是一个微服务能承担的最大 `QPS`，但是一个服务刚刚启动时，一切资源尚未初始化（**冷启动**），如果直接将 `QPS` 跑到最大值，可能导致服务瞬间宕机。

`warm up` 也叫**预热模式**，是应对服务冷启动的一种方案。**阈值会动态变化**，从一个较小值逐渐增加到最大阈值。

**工作特点**：请求阈值初始值是 `maxThreshold` / `coldFactor`, 持续指定时长(预热时间)后，逐渐提高到 `maxThreshold` 值，而 `coldFactor` 的默认值是 `3`。

例如，我设置 `QPS` 的 `maxThreshold` 为 `10`，预热时间为 `5` 秒，那么初始阈值就是 `10` / `3` ，也就是 `3`，然后在 `5` 秒后逐渐增长到 `10`。

![image-20220320152944101](https://img.xbin.cn/blog/image-20220320153409220-168829026999540.png)

**案例需求**：给/`api`/`user`/`findUserByUserId`/{`userId`}这个资源设置限流，最大 `QPS` 为 `10`，利用 `warm up` 效果，预热时长为 `5` 秒

`1`、配置流控规则

![image-20230628095505037](https://img.xbin.cn/blog/image-20230628095505037-168829026999539.png)

`2`、`jmeter` 测试

选择《流控效果，`warm up`》

![image-20220320153409220](https://img.xbin.cn/blog/image-20220320153522505-168829026999541.png)

`QPS` 为 `10`

刚刚启动时，大部分请求失败，成功的只有 `3` 个，说明 `QPS` 被限定在 `3`：

![image-20220320153522505](https://img.xbin.cn/blog/image-20230628100049968-168829026999545.png)

随着时间推移，成功比例越来越高

![image-20220320153646510](https://img.xbin.cn/blog/image-20220320153646510-168829026999542.png)

到 `sentinel` 控制台查看实时监控

![image-20230628095925921](https://img.xbin.cn/blog/image-20230628095925921-168829026999543.png)

#### 排队等待

**排队等待**：让所有的请求按照先后次序进入到一个队列中进行排队，当某一个请求最大的预期等待时间超过了所设定的超时时间时同样是拒绝并抛出异常

例如：`QPS` = `5`，意味着每 `200ms` 处理一个队列中的请求；`timeout` = `2000`，意味着**预期等待时长**超过 `2000ms` 的请求会被拒绝并抛出异常。

那什么叫做预期等待时长呢？

比如现在一下子来了 `12` 个请求，因为每 `200ms` 执行一个请求，那么：

`1`、第 `6` 个请求的**预期等待时长** = `200` \* （`6` - `1`） = `1000ms`

`2`、第 `12` 个请求的预期等待时长 = `200` \* （`12-1`） = `2200ms`

现在，第 `1` 秒同时接收到 `10` 个请求，但第 `2` 秒只有 `1` 个请求，此时 `QPS` 的曲线这样的：

![image-20230628100019712](https://img.xbin.cn/blog/image-20220320152944101-168829026999538.png)

如果使用队列模式做流控，所有进入的请求都要排队，以固定的 `200ms` 的间隔执行，`QPS` 会变的很平滑

![image-20230628100049968](https://img.xbin.cn/blog/image-20220320154801992-168829026999547.png)

平滑的 `QPS` 曲线，对于服务器来说是更友好的。

**案例需求**：给/`api`/`user`/`findUserByUserId`/{`userId`}这个资源设置限流，最大 `QPS` 为 `10`，利用排队的流控效果，超时时长设置为 `5s`

`1`、添加流控规则

![image-20230628100313331](https://img.xbin.cn/blog/image-20230628100019712-168829026999544.png)

`2`、`jmeter` 测试

![image-20220320154801992](https://img.xbin.cn/blog/image-20230628100313331-168829026999546.png)

`QPS` 为 `15`，已经超过了我们设定的 `10`。

运行测试用例，察看结果树：

![image-20220320155103019](https://img.xbin.cn/blog/image-20220320155202523-168829026999549.png)

全部都通过了。

再去 `sentinel` 查看实时监控的 `QPS` 曲线

![image-20220320155202523](https://img.xbin.cn/blog/image-20220320155103019-168829026999548.png)

`QPS` 非常平滑，一致保持在 `10`，但是超出的请求没有被拒绝，而是放入队列。因此**响应时间**（等待时间）会越来越长。

### `3.3.5` 热点参数限流

#### 配置介绍

之前的限流是统计访问某个资源的所有请求，判断是否超过 `QPS` 阈值。而热点参数限流是**分别统计参数值相同的请求**，判断是否超过 `QPS` 阈值。

例如，一个根据 `id` 查询商品的接口：

![image-20230628100914491](https://img.xbin.cn/blog/image-20230628100914491-168829026999550.png)

访问/`goods`/{`id`}的请求中，`id` 参数值会有变化，热点参数限流会根据参数值分别统计 `QPS`，统计结果：

![image-20230628101012945](https://img.xbin.cn/blog/image-20230628101331468-168829026999553.png)

当 `id`=`1` 的请求触发阈值被限流时，`id` 值不为 `1` 的请求不受影响。

配置方式(点击资源中的热点按钮)：

![image-20230628101216576](https://img.xbin.cn/blog/image-20230628101012945-168829026999551.png)

代表的含义是：对 `hot` 这个资源的 `0` 号参数（第一个参数）做统计，每 `1` 秒**相同参数值**的请求数不能超过 `2`。这种配置是对查询商品这个接口的所有商品一视同仁，`QPS` 都限定为 `5`。而在实际开发中，可能部分商品是热点商品，例如秒杀商品，我们希望这部分商品的 `QPS` 限制与其它商品不一样，高一些。那就需要配置热点参数限流的高级选项了：

![image-20230628101331468](https://img.xbin.cn/blog/image-20230628101216576-168829026999552.png)

#### 案例演示

**案例需求**：给/`api`/`user`/`findUserByUserId`/{`userId`}这个资源添加热点参数限流，规则如下：

`1`、默认的热点参数规则是每 `1` 秒请求量不超过 `2`

`2`、给 `2` 这个参数设置例外：每 `1` 秒请求量不超过 `4`

`3`、给 `3` 这个参数设置例外：每 `1` 秒请求量不超过 `10`

**注意事项**：热点参数限流对默认的 `spring mvc` 资源无效，需要利用@`SentinelResource` 注解标记资源

实现步骤：

`1`、标记资源

给 `UserController` 中的/`api`/`user`/`findUserByUserId`/{`userId`}资源添加注解：

```java
@SentinelResource("hot")  // 声明资源名称
@GetMapping(value = "/findUserByUserId/{userId}")
public User findUserByUserId(@PathVariable(value = "userId") Long userId ,
                             @RequestHeader(name = "Truth" , required = false)String header) {
    log.info("UserController...findUserByUserId方法执行了... ,header: {} , dateformat: {} " , header , patternProperties.getDateformat());
    return userService.findUserByUserId(userId) ;
}
```

`2`、热点参数限流规则

访问该接口，可以看到我们标记的 `hot` 资源出现了

![image-20230628101715773](https://img.xbin.cn/blog/image-20230628102031276-168829026999555.png)

这里不要点击 `hot` 后面的按钮，页面有 `BUG`

点击左侧菜单中**热点规则**菜单：

![image-20230628102031276](https://img.xbin.cn/blog/image-20230628101715773-168829026999554.png)

`3`、`jmeter` 测试

选择《热点参数限流 `QPS1`》

![image-20220320162420189](https://img.xbin.cn/blog/image-20220320162905731.png)

这里发起请求的 `QPS` 为 `5`。

包含三个请求，参数分别为：`101` ， `102` ， `103`，运行测试程序，察看结果树：

| `101` | ![image-20220320162905731](https://img.xbin.cn/blog/image-20220320163002195.png) |
| --- | --- |
| `102` | ![image-20220320163002195](https://img.xbin.cn/blog/image-20230503182339408.png) |
| `103` | ![image-20220320163023729](https://img.xbin.cn/blog/image-20220320162420189-168829026999556.png) |

# `4` 高级特性

## `4.1 Nacos` 高级特性

### `4.1.1` 服务集群

#### 集群概述

在实际生产环境中，为了保证每一个服务的高可用，那么此时就需要去构建服务集群，但是并不是说把所有的服务都部署在一个机房里。而是将多个服务分散的部署到不同的机房中，每一个机房的服务可以看做成是一个集群。如下所示：

![image-20230503182339408](https://img.xbin.cn/blog/image-20230503182806794.png)

微服务互相访问时，应该尽可能访问同集群实例，因为本地访问速度更快。当本集群内不可用时，才访问其它集群。例如：上海机房内的 `order` 微服务应该优先访问同机房的 `user` 微服务。

![image-20230503182806794](https://img.xbin.cn/blog/image-20230809102346561.png)

#### 集群配置

- 修改 `spzx-cloud-user` 的 `application.yml` 文件，添加集群配置：

```YAML
spring:
  cloud:
    nacos:
      discovery:
        cluster-name: SH		# 配置服务所属集群
```

启动三个服务 `user` 微服务实例，实例所属集群分配情况：实例 `1` 属于 `SH`，实例 `2` 和实例 `3` 属于 `BJ`

- 通过添加添加 `JVM` 参数更改服务实例所属集群，启动实例 `2` 和实例 `3`

![image-20230809102346561](https://img.xbin.cn/blog/image-20220320163023729.png)

实例 `2`：`10101`

```shell
-Dserver.port=10101 -Dspring.cloud.nacos.discovery.cluster-name=BJ
```

实例 `3`：`10103`

```shell
-Dserver.port=10103 -Dspring.cloud.nacos.discovery.cluster-name=BJ
```

- 启动三个用户微服务实例，查看实例分配情况：

![image-20230503183655565](https://img.xbin.cn/blog/image-20230503185416608.png)

![image-20230503183721175](https://img.xbin.cn/blog/image-20230503183721175.png)

#### 集群访问

需求：当 `order` 服务优先访问 `SH` 集群中的 `user` 微服务实例，当 `SH` 集群中的 `user` 微服务实例出现问题以后，在访问 `BJ` 集群中的实例。

步骤：

`1`、给 `order` 微服务的 `application.yml` 文件，添加集群配置：

```yaml
spring:
  cloud:
    nacos:
      discovery:
        cluster-name: SH # 配置服务所属集群
```

`2`、`order` 微服务在 `loadbalancer` 组件中集成 `nacos`

```yaml
spring:
  # 配置nacos注册中心的地址
  cloud:
    loadbalancer:
      nacos: # 集成nacos的负载均衡算法
        enabled: true
```

### `4.1.2` 权重配置

实际部署中会出现这样的场景：服务器设备性能有差异，部分实例所在机器性能较好，另一些较差，我们希望性能好的机器承担更多的用户请求。

但默认情况下 `Nacos` 的负载均衡算法是同集群内随机挑选，不会考虑机器的性能问题。

因此，`Nacos` 提供了权重配置来**控制访问频率**，权重越大则访问频率越高。

- 在 `Nacos` 控制台，找到 `spzx-cloud-user` 的实例列表，点击编辑，即可修改权重：

![image-20230503185416608](https://img.xbin.cn/blog/image-20230503190738675.png)

权重取值范围：`0`~`100`

- 在配置文件中进行权重配置：

```yaml
spring:
  cloud:
    nacos:
      discovery:
        weight: 0.1
```

**注意**：如果权重修改为 `0`，则该实例永远不会被访问

### `4.1.3` 环境隔离

#### 环境隔离概述

在实际的开发过程中，可能会存在很多个软件环境：开发环境、测试环境、生产环境。

`nacos` 也是支持多环境隔离配置的，在 `nacos` 是通过**`namespace`**来实现多环境的隔离。

完整的服务注册数据存储结构如下所示：

![image-20230503185847770](https://img.xbin.cn/blog/image-20230503183655565.png)

`namespace` + `group` 才可以确定具体的微服务实例。默认情况下，所有 `service`、`group` 都在同一个 `namespace`，名为 `public`。如下所示：

![image-20230503190738675](https://img.xbin.cn/blog/image-20230503185847770.png)

#### 创建名称空间

我们也可以创建新的名称空间，来将不同的服务隔离到不同的环境下面，如下所示：

![image-20230503191050511](https://img.xbin.cn/blog/image-20230503191050511.png)

#### 微服务配置名称空间

给微服务添加名称空间的配置，来指定该微服务所属环境。

例如，修改 `spzx-cloud-order` 的 `application.yml` 文件：

```yaml
spring:
  # 配置nacos注册中心的地址
  cloud:
    nacos:
      discovery:
        namespace: 4a88035e-acf3-45a9-924f-2421acbff67a # 配置服务实例所属名称空间
```

此时 `order` 微服务所对应的服务实例就属于新的名称空间，`user` 微服务所对应的服务实例属于 `public` 的名称空间，那么此时在进行远程调用的时候，就会出现如下的错误：

![image-20230503191655562](https://img.xbin.cn/blog/image-20230503213502251.png)

## `4.2 LoadBalancer`

### `4.2.1 LoadBalancer` 简介

`Spring Cloud LoadBalancer` 是 `Spring Cloud` 中负责客户端负载均衡的模块，其主要原理是通过选择合适的服务实例来实现负载均衡。

客户端负载均衡：就是负载均衡算法由客户端提供

如下图所示：

![image-20230503213502251](https://img.xbin.cn/blog/image-20230503191655562.png)

### `4.2.2 LoadBalancer` 负载均衡测试

- `Feign` 已内置 `LoadBalancer`，无需额外配置，只需引入依赖并定义接口

`1 order` 模块引入 `LoadBalancer` 依赖

```xml
<!-- 负载均衡组件 -->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-loadbalancer</artifactId>
</dependency>
```

`2` 启动 `order` 模块和两个 `user` 模块测试

![image-20251216100338315](https://img.xbin.cn/blog/image-20251216100338315.png)

- 访问地址：`http://localhost:10200/api/order/findOrderByOrderId/101`

### `4.2.3 LoadBalancer` 原理

`Spring Cloud LoadBalancer` 的底层采用了一个拦截器【`LoadBalancerInterceptor`】，拦截了发出的请求，对地址做了修改。用一幅图来总结一下：

![image-20230503222331245](https://img.xbin.cn/blog/image-20230503222331245.png)

执行流程说明：

`1`、通过 `LoadBalancerInterceptor` 请求拦截器拦截我们的请求：http://spzx-cloud-user/api/user/findUserByUserId/1

`2`、获取请求的 `url`，然后从请求的 `url` 中获取服务提供方的主机名称

`3`、然后调用 `LoadBalancerClient` 中的 `execute` 方法，将服务提供方的名称传递过去

`4`、在 `LoadBalancerClient` 的 `choose` 方法中通过 `ReactiveLoadBalancer.Factory` 从 `Nacos` 注册中心中获取服务列表以及负载均衡算法实例对象

`5`、通过 `ReactiveLoadBalancer` 从服务列表中选择一个服务实例地址，然后发起远程调用

### `4.2.4` 源码跟踪

> `LoadBalancerInterceptor`

核心源码如下所示：

![image-20230503223822056](https://img.xbin.cn/blog/image-20230503223822056.png)

可以看到这里的 `intercept` 方法，拦截了用户的 `HttpRequest` 请求，然后做了几件事：

`1`、`request.getURI()`：获取请求 `uri`，本例中就是 http://spzx-cloud-user/api/user/findUserByUserId/1

`2`、`originalUri.getHost()`：获取 `uri` 路径的主机名，其实就是服务 `id`，`spzx-cloud-user`

`3`、`this.loadBalancer.execute()`：处理服务 `id`，和用户请求。

这里的 `this.loadBalancer` 是 `BlockingLoadBalancerClient` 类型，我们继续跟入。

> `BlockingLoadBalancerClient`

核心源码如下所示：

![image-20230503224702411](https://img.xbin.cn/blog/image-20230503224702411.png)

`ReactiveLoadBalancer.Factory` 的 `getInstance` 方法做了两件事情：

`1`、获取了一个具体的负载均衡算法对象

`2`、根据服务的 `id` 从 `Nacos` 注册中心中获取服务地址列表

紧跟着调用了 `RoundRobinLoadBalancer`#`choose` 方法，从服务列表中选择一个服务实例对象。

默认的负载均衡算法：`RoundRobinLoadBalancer`

### `4.2.5` 更改负载均衡算法

`Spring Cloud LoadBalancer` 默认提供两种负载均衡策略：

- `RoundRobinLoadBalancer`：轮询（默认）；
- `RandomLoadBalancer`：随机。

如果想更改默认的负载均衡算法，那么此时需要向 `Spring` 容器中注册一个 `Bean`，并且配置负载均衡的使用者。

代码如下所示：

`1`、在 `Spring` 容器中注册一个 `Bean`

```java
@Configuration
public class CustomLoadBalancerConfiguration {

    /**
     * @param environment: 用于获取环境属性配置，其中LoadBalancerClientFactory.PROPERTY_NAME表示该负载均衡器要应用的服务名称。
     * @param loadBalancerClientFactory: 是Spring Cloud中用于创建负载均衡器的工厂类，通过getLazyProvider方法获取ServiceInstanceListSupplier对象，以提供可用的服务列表。
     * ServiceInstanceListSupplier：用于提供ServiceInstance列表的接口，可以从DiscoveryClient或者其他注册中心中获取可用的服务实例列表。
     * @return
     */
    @Bean
    ReactorLoadBalancer<ServiceInstance> randomLoadBalancer(Environment environment, LoadBalancerClientFactory loadBalancerClientFactory) {
        String name = environment.getProperty(LoadBalancerClientFactory.PROPERTY_NAME);
        return new RandomLoadBalancer(loadBalancerClientFactory.getLazyProvider(name, ServiceInstanceListSupplier.class), name);
    }
}
```

`2`、配置负载均衡算法的使用者

```java
@LoadBalancerClient(name = "spzx-cloud-user",
        configuration = CustomLoadBalancerConfiguration.class)
@Configuration
public class LoadBalancerConfig {

}
```
