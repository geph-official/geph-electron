#!/bin/sh

VERSION=$(node -e "console.log(require('./package.json').version);")

rm -rfv RELEASE/PreOutput
mkdir -p RELEASE/Output
mkdir -p RELEASE/PreOutput

echo "Packaging for Linux 64-bit..."
node_modules/.bin/build --linux --x64
mv dist/*.AppImage RELEASE/Output/geph-linux64-$VERSION.AppImage
rm -rf dist

echo "Packaging for Linux 32-bit..."
node_modules/.bin/build --linux --ia32
mv dist/*.AppImage RELEASE/Output/geph-linux32-$VERSION.AppImage
rm -rf dist

echo "Packaging for macOS 64-bit..."
node_modules/.bin/build --mac --x64
mv dist/mac RELEASE/PreOutput/geph-macos-$VERSION
rm -rf dist

echo "Packaging for Windows 32-bit..."
node_modules/.bin/build --win --ia32
mv dist/win-ia32-unpacked RELEASE/PreOutput/geph-windows-$VERSION
rm -rf dist

echo "** NOTE: Go to a Windows box and a Mac box to finish packaging **"
