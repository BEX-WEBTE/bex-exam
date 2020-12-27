class ThreeLevelMenuComponent extends HTMLElement {

    constructor() {
        super();
        this.dom = this.attachShadow({mode: 'open'});
        this.loadHtml();
    }

    loadHtml() {
        fetch("app/three-level-menu/three-level-menu.component.html")
            .then(response => response.text())
            .then(text => {
                this.dom.innerHTML = text;
            });
    }

    getElementById(id) {
        return this.dom.querySelector('#' + id);

    }
}
