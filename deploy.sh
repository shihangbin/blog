#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 进入生成的文件夹
cd docs/.vitepress/dist

# 如果是发布到自定义域名
echo 'blog.xbin.cn' > CNAME

# 初始化 git 并强制提交到仓库 
git init 
git add -A
git commit -m "更新文章"

# git remote add origin git@github.com:shihangbin/vitepress-notes.git
git remote add origin https://github.com/shihangbin/vitepress-notes.git
git push -f origin main:gh-pages 

cd -

rm -rf docs/.vitepress/dist