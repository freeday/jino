module.exports = {
  getMaxWidthBody: function () {
    return Math.max(
      document.documentElement.scrollWidth,
      document.documentElement.offsetWidth,
      document.documentElement.clientWidth
    );
  },
  getMaxWidthHint: function () {
    return Math.min(1092, this.getMaxWidthBody());
  }
}
