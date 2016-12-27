#!/bin/sh

echo "Packaging for Windows..."
electron-packager . --platform=win32 --arch=ia32 --icon=./assets/logo.ico --overwrite=true --ignore '(BUILD)|(linux)'
