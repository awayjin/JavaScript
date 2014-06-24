@echo off
echo ------------------------------
echo       SVN ^& Git Updater
echo    Author: janlay, 2009.09
echo ------------------------------
echo.

setlocal
rem setup working directory
set UPDATE_ROOT=%CD%
if not "%1"=="" set UPDATE_ROOT=%1
if not %CD%==%UPDATE_ROOT% (
	set OLD_PATH=%CD%
	cd %UPDATE_ROOT%
)

rem working
echo Working in [%CD%]
if exist .svn\entries (
	echo Update subversion in current directory...
	svn up
) else if exist .git\HEAD (
	echo Update git in current directory...
	git pull
) else (
	for /d %%i in (*) do (
		if exist %%i\.svn\entries (
			echo.
			echo -^> Updating subversion in %%i...
			svn up %%~fi
		)
		if exist %%i\.git\HEAD (
			cd %%i
			echo.
			echo -^> Updating git in %%i...
			git pull
			cd ..
		)
	)
)

rem restore environment
if not "%OLD_PATH%" == "" cd %OLD_PATH%
echo Done.
endlocal
