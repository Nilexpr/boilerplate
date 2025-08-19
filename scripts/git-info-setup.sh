#!/bin/bash
# setup-git-config.sh

echo "1. 获取GitHub用户信息..."
GITHUB_USER=$(gh api user --jq .login)
GITHUB_EMAIL=$(gh api user/emails --jq '.[0].email')

echo "2. 设置Git配置..."
git config --global user.name "$GITHUB_USER"
git config --global user.email "$GITHUB_EMAIL"

echo "3. 配置完成："
echo "用户名: $(git config user.name)"
echo "邮箱: $(git config user.email)"