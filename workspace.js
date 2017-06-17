const execSync = require("child_process").execSync

class Workspace {
  constructor(id) {
    this.focus = 0;
    this.id = id;
    this.windows = {};
    this.wids = [];
  }
  addWindow(wid) {
    this.wids.push(wid);
    this.windows[wid] = {
      wid: wid,
    }
  }
  removeWindow(wid) {
    this.windows[wid] = undefined;
  }
  closeWindow(wid) {
    
  }
  arrangeWindows(screenSize) {
    this.windows.forEach((wid, index) => {
      let pos = { x: screenSize.w / windows.length * index, y: 0 };
      let sz = { w: screenSize.w / windows.length, h: screenSize.h };
      execSync(`wtp ${wid} ${pos.x} ${pos.y} ${pos.w} ${pos.h}`);
    })
  }
}

module.exports = Workspace
