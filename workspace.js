const execSync = require("child_process").execSync

class Workspace {
  constructor(id) {
    this.focus = 0;
    this.id = id;
    this.windows = {};
    this.wids = [];
    this.focus = 0;
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
  getWids() {
    return this.wids;
  }
  arrangeWindows(screenSize) {
	  console.log(screenSize)
    this.wids.forEach((wid, index) => {
	    console.log("index", index)
      let pos = { x: screenSize.w / this.wids.length * index, y: 0 };
      let sz = { w: screenSize.w / this.wids.length, h: screenSize.h };
      console.log(pos, sz);
      execSync(`wtp ${pos.x} ${pos.y} ${sz.w} ${sz.h} ${wid}`);
    })
  }
}

module.exports = Workspace
