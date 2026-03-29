// 第三方增强能力配置，按需开启。
export const featureConfig = {
  /* 访客统计 */
  visitor: {
    /** 统计 id（单独页面的统计会作为前缀使用）*/
    // badgeId: 'maomao1996.vitepress-nav-template',
  },
  /**
   * giscus 评论配置
   *  请根据 https://giscus.app/zh-CN 生成内容填写
   */
  comment: {
    /** github 仓库地址 */
    repo: '',
    /** giscus 仓库 ID */
    repoId: '',
    /** Discussion 分类 */
    category: '',
    /** giscus 分类 ID */
    categoryId: '',
  },
}
