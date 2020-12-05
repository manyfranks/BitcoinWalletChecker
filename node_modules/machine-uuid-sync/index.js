
const {execSync} = require("child_process");
const os = require("os");

let uuid;

const uuidRegex = /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/;

let defaultUuidFolder = __dirname;

module.exports = function(filepath) {
  if (filepath) { defaultUuidFolder = filepath; }

  if (uuid) { return uuid; }
  const platFormSpecific = {
    'darwin': osxUuid,
    'win32': winUuid,
    'win64': winUuid,
    'linux': linuxUuid
  };
  const platformGetUuid = platFormSpecific[os.platform()];
  if (platformGetUuid) {
      try {
        var id = platformGetUuid();
      } catch (err) {
        return defaultUuid();
      }

      return uuid = id;
  } else {
    return defaultUuid();
  }
};

var linuxUuid = function() {
  try {
    const fs = require("fs");
    var content = fs.readFileSync("/var/lib/dbus/machine-id", "utf-8")
    if (content) {  // clean, add - and remove whitespace
        uuid = content.toString().replace(/\s+/, '');
        if ((!/-/.test(uuid)) && (uuid.length > 20)) {
          uuid = uuid.slice(0, 8) + '-' + uuid.slice(8, 12) + '-' + uuid.slice(12, 16) + '-' + uuid.slice(16, 20) + '-' + uuid.slice(20);
        }
    }

    return content ? uuid : defaultUuid();
  } catch (e) {
    return defaultUuid();
  }
};

var osxUuid = function() {
  var stdout = execSync("ioreg -rd1 -c IOPlatformExpertDevice").toString();
  for (let line of Array.from(stdout.split("\n"))) {
    if (/IOPlatformUUID/.test(line) && uuidRegex.test(line)) {
      return uuidRegex.exec(line)[0];
    }
  }

  throw Error("No match");
};

var winUuid = function() {
  var stdout = execSync("wmic CsProduct Get UUID").toString();
  for (let line of Array.from(stdout.split("\n"))) {
    if (uuidRegex.test(line)) {
      return uuidRegex.exec(line)[0];
    }
  }

  throw Error("No match");
};

var defaultUuid = function() {
  const path = require("path");
  const fs = require("fs");
  const f = path.resolve(defaultUuidFolder, '.nodemid');
  if (fs.existsSync(f)) {
    return fs.readFileSync(f).toString();
  } else {
    const id = require('node-uuid').v1();
    fs.writeFileSync(f, id);
    return id;
  }
};
