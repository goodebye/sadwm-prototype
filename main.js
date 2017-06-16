const _ = require("underscore");
const execSync = require("child_process").execSync;
const Window = require("./window.js");
const Workspace = require("./workspace.js");

const screenSize = {w: 0, h: 0}
screenSize.w = parseInt(execSync("wattr w $(lsw -r)"), 10);
screenSize.h = parseInt(execSync("wattr h $(lsw -r)"), 10);

windows = {};
workspaces = [];
let activeWorkspace = 0;

workspaces.push(new Workspace(workspaces.length));
workspaces.push(new Workspace(workspaces.length));

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
  const widsToShow = _.difference(newVisibleWids, oldVisibleWids);

  console.log("to hide", widsToHide);

  changeWindowVisibility(widsToHide, 'u');
  changeWindowVisibility(widsToShow, 'm');

  activeWorkspace = wsid;
  workspaces[wsid].arrangeWindows(screenSize);
}

function changeWindowVisibility(wids, type) {
  wids.forEach((wid) => {
    execSync(`mapw -${type + ' ' + wid}`);
  })
}

function randomWorkspace() {
  const newWsid = workspaces.push(new Workspace(workspaces.length));
  const numWindows = Math.floor(Math.random() * wids.length);

  for (let i = 0; i < numWindows; i++) {
    workspaces[newWsid - 1].addWindow(wids[i]);
  }
}

function randomWorkspaceSwitch() { 
  let newWsid = Math.floor(Math.random() * workspaces.length);
	console.log(newWsid);
  switchWorkspace(newWsid);
}

for (let i = 0; i < 10; i++) {
  randomWorkspace();
}

for (let i = 0; i < 10; i++) {
  setTimeout(randomWorkspaceSwitch, 1500 * i);
}
