const exec = require("child_process").exec;
const execSync = require("child_process").execSync;
const Window = require("./window.js");
const Workspace = require("./workspace.js");

windows = {};
workspaces = [];

workspaces.push(new Workspace(workspaces.length))

let activeWorkspace = 0;

// lets grab screen height n width first!

const screenSize = {w: 0, h: 0}
screenSize[w] = execSync("wattr w $(lsw -r)");
screenSize[h] = execSync("wattr h $(lsw -r)")

console.log(screenSize);


exec("lsw", (error, stdout, stderr) => {
  if (!error) {
    stdout.split("\n").map((wid) => {
      if (wid.length > 0) {
        windows[wid] = new Window(wid);
        workspaces[activeWorkspace].addWindow(wid)
      }
        // create instance of Window class, push it to array of Windows
    });
    console.log(windows);
  }
})

function switchWorkspace(wsid) {
  activeWorkspace = wsid;
  workspaces[wsid].arrangeWindows(screenSize);
}
