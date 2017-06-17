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
}

module.exports = Workspace
