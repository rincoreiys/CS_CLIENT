
echo off
set action=%1


IF "%action%"=="push" (
    git add --all
    git commit -m "PUSH"
    git remote add origin https://github.com/rincoreiys/CS_CLIENT.git
    git push
)

@REM IF %F%==1 IF %C%==0 (
@REM     ::moving the file c to d
@REM     move "%sourceFile%" "%destinationFile%"
@REM     )
