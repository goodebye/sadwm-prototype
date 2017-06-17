const _ = require("underscore");
const execSync = require("child_process").execSync;
const Window = require("./window.js");
const Workspace = require("./workspace.js");

windows = {};
workspaces = [];

workspaces.push(new Workspace(workspaces.length));
workspaces.push(new Workspace(workspaces.length));

let activeWorkspace = 0;

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
  const oldWorkspace = workspaces[activeWorkspace];
  const newWorkspace = workspaces[wsid];
  const oldVisibleWids = oldWorkspace.getWids();
  const newVisibleWids = newWorkspace.getWids();

  const widsToHide = _.difference(oldVisibleWids, newVisibleWids);

  console.log(widsToHide);
  
  activeWorkspace = wsid;
  workspaces[wsid].arrangeWindows(screenSize);
}

setTimeout(switchWorkspace.bind(null, 0), 200);
setTimeout(switchWorkspace.bind(null, 1), 2000);
