#!/bin/bash

# 同时推送到 Gitee 和 GitHub
echo "推送到 Gitee..."
git push origin master

echo "推送到 GitHub..."
git push github master

echo "推送完成！"
