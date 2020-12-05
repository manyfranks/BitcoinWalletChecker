machine-uuid-sync
--------

A synchronous version of [machine-uuid](https://github.com/mhzed/machine-uuid).

Get machine's hardware UUID.

## Install

npm install machine-uuid-sync

## Basic example

    uuid = require("machine-uuid-sync")();

    console.log(uuid);

## Another example

You can set the location where you want the `.nodemid` file to be created if the module can't retrieve the serial number.

    uuid = require("machine-uuid")("/another/folder/")

This can example be useful in an [electron](https://github.com/electron/electron) application when you compile your app in asar.
