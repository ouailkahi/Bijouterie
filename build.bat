@echo off
setlocal enabledelayedexpansion

echo Starting build process...

REM Define paths
set REACT_PATH=C:\Users\DELL\Desktop\projets\ktami\frontend
set SPRING_PATH=C:\Users\DELL\Desktop\projets\ktami\backend\bijoux

REM Build the React application
echo Building React application...
cd  %REACT_PATH%
npm install
npm run build

REM Package the Electron application
echo Packaging Electron application...
npm run electron:build

REM Build the Kotlin Spring Boot application using Maven
echo Building Kotlin Spring Boot application...
cd  %SPRING_PATH%
mvn clean package


echo Build process completed successfully.

endlocal
