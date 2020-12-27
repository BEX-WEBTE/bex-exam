function changeView(path) {
    location.href = path;
}

function onLoad() {
    customElements.define('three-level-menu',ThreeLevelMenuComponent);
}
