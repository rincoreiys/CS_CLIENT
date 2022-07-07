
echo off
set action=%1

IF "%action%"=="push" (
    git add --all
    git commit -m "PUSH"
    git remote add origin https://github.com/rincoreiys/CS_CLIENT.git
    git push
)

IF "%action%"=="pull" (
    git checkout .
    git pull
)



