rd /s /q www
call ionic cordova build android --prod  --release

xcopy .\platforms\android\app\build\outputs\apk\release\app-release.apk E:\OneDrive\App\NH\ /y
del E:\OneDrive\App\NH\nh-base.apk
ren E:\OneDrive\App\NH\app-release.apk nh-base.apk
explorer E:\OneDrive\App\NH\

choice /c er /m "Press E to Exit, Press R to Restart"
if errorlevel 2 %0
if errorlevel 1 exit
pause