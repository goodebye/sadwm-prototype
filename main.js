const exec = require("child_process").exec;
const Window = require("./window.js");
const Workspace = require("./workspace.js");

windows = {};
workspaces = [];

workspaces.push(new Workspace(workspaces.length))

let activeWorkspace = 0;


exec("lsw", (error, stdout, stderr) => {
  if (!error) {
    stdout.split("\n").map((wid) => {
      windows[wid] = new Window(wid);
      workspaces[activeWorkspace].addWindow(wid)

      // create instance of Window class, push it to array of Windows
    })
    console.log(windows);
  }
})

function switchWorkspace(wsid) {
  activeWorkspace = wsid;
  workspaces[wsid].arrangeWindows();
}
