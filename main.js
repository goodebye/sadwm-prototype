const exec = require("child_process").exec;
const execSync = require("child_process").execSync;
const Window = require("./window.js");
const Workspace = require("./workspace.js");

windows = {};
workspaces = [];

workspaces.push(new Workspace(workspaces.length));
workspaces.push(new Workspace(workspaces.length));

let activeWorkspace = 0;

// lets grab screen height n width first!

const screenSize = {w: 0, h: 0}
screenSize.w = parseInt(execSync("wattr w $(lsw -r)"), 10);
screenSize.h = parseInt(execSync("wattr h $(lsw -r)"), 10);

let wids = execSync("lsw").toString().split("\n").map((wid) => {
  if (wid.length > 0) {
    windows[wid] = new Window(wid);
    workspaces[activeWorkspace].addWindow(wid);
    return wid;
  }
});

workspaces[1].addWindow(wids[Math.floor(Math.random() * wids.length)]);

function switchWorkspace(wsid) {
  activeWorkspace = wsid;
  workspaces[wsid].arrangeWindows(screenSize);
}

setTimeout(switchWorkspace.bind(null, 0), 200);
setTimeout(switchWorkspace.bind(null, 1), 2000);
