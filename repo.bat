
echo off
set action=%1

@REM git remote add origin https://github.com/rincoreiys/CS_CLIENT.git
IF "%action%"=="push" (
    git add --all
    git commit -m "PUSH"
    
    git push
)

IF "%action%"=="pull" (
    git checkout .
    git pull
)



