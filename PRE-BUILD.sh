#!/bin/sh

echo "Packaging for Windows..."
electron-packager . --platform=win32 --arch=ia32 --icon=./assets/logo.ico --overwrite=true --ignore '(BUILD)|(linux|darwin)'

echo "Packaging for macOS..."
electron-packager . --platform=darwin --arch=x64 --icon=./assets/logo.icns --overwrite=true --ignore '(BUILD)|(linux|windows)'

echo "Packaging for Linux i386..."
electron-packager . --platform=linux --arch=ia32 --icon=./assets/logo.icns --overwrite=true --ignore '(BUILD)|(darwin|windows)'

echo "Packaging for Linux amd64..."
electron-packager . --platform=linux --arch=x64 --icon=./assets/logo.icns --overwrite=true --ignore '(BUILD)|(darwin|windows)'
