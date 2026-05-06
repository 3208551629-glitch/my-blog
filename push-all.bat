@echo off
REM 同时推送到 Gitee 和 GitHub

echo 推送到 Gitee...
git push origin master
if %errorlevel% neq 0 (
    echo Gitee 推送失败！
    pause
    exit /b 1
)

echo.
echo 推送到 GitHub...
git push github master
if %errorlevel% neq 0 (
    echo GitHub 推送失败！
    pause
    exit /b 1
)

echo.
echo 推送完成！
pause
