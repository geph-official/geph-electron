#!/bin/sh

VERSION="v0.2.4"

echo "Updating Windows binary..."
curl https://dl.geph.io/XGO_BUILD/geph-$VERSION-windows-4.0-386.exe > ./assets/binaries/win-ia32/geph.exe

echo "Updating Linux 64-bit binary..."
curl https://dl.geph.io/XGO_BUILD/geph-$VERSION-linux-amd64 > ./assets/binaries/linux-x64/geph
chmod +x ./assets/binaries/linux-x64/geph

echo "Updating Linux 32-bit binary..."
curl https://dl.geph.io/XGO_BUILD/geph-$VERSION-linux-386 > ./assets/binaries/linux-ia32/geph
chmod +x ./assets/binaries/linux-ia32/geph

echo "Updating macOS 64-bit binary..."
curl https://dl.geph.io/XGO_BUILD/geph-$VERSION-darwin-10.6-amd64 > ./assets/binaries/mac-x64/geph
chmod +x ./assets/binaries/mac-x64/geph
