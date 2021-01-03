class ThreeLevelMenuComponent extends HTMLElement {


    menuContent;
    dom;

    constructor() {
        super();
        this.menuContent = {
            "id": "",
            "title": "",
            "path": "",
            "child": [],
        }
        this.dom = this.attachShadow({mode: 'open'});
        this.loadHtml().then(text => {
            this.dom.innerHTML = text;
            this.loadCss();
            this.loadMenuContent().then(json => {
                this.menuContent = json.menuContent;
                this.createListFromMenuContent();
            });
        });
    }

    getWebPrefix(prefixLength) {
        let pathPrefix = "";
        let pathNameArray = window.location.pathname.split("/");
        for (let i = 0; i <= prefixLength; i++) {
            pathPrefix += pathNameArray[i] + "/";
        }
        return pathPrefix;
    }

    getActualViewName() {
        let pathNameArray = window.location.pathname.split("/");
        return pathNameArray[pathNameArray.length - 1];
    }

    async loadHtml() {
        const response = await fetch(this.getWebPrefix(2) + "app/three-level-menu/three-level-menu.component.html")
        return await response.text();
    }

    getElementById(id) {
        return this.dom.querySelector('#' + id);

    }

    createCssLink(path) {
        let link = document.createElement("link");
        link.setAttribute("href", this.getWebPrefix(2) + path);
        link.setAttribute("rel", "stylesheet");
        this.dom.appendChild(link);
    }

    loadCss() {
        this.createCssLink("app/shared/css/header.css");
        this.createCssLink("app/three-level-menu/css/three-level-menu.component.css");
        this.createCssLink("style.css");
        this.createCssLink("app/shared/css/print.css");
        if (this.getActualViewName() === "game.html")
            this.createCssLink("app/shared/css/game-layout.css");
    }

    async loadMenuContent() {
        const response = await fetch(this.getWebPrefix(2) + "app/three-level-menu/menu-content.json");
        return await response.json();
    }


    createHtmlList() {
        let list = document.createElement("ul");
        list.classList.add("navigation-bar-inner-row");
        return list;
    }

    createHtmlListItem() {
        let listItem = document.createElement("li");
        listItem.classList.add("item");
        return listItem;
    }

    createHtmlLink() {
        return document.createElement("a");
    }


    createHtmlDiv() {
        let div = document.createElement("div");
        div.classList.add("item-link");
        return div;
    }

    setLinkActive(link) {
        if (link.href === window.location.href) {
            link.classList.add("item-active");
        }
    }

    areIdSame(item, itemId) {
        return item.normalize() === itemId;
    }

    setPathToLinkConsideringToExternalPaths(item, link) {
        let completePath = this.getWebPrefix(2) + item.path;
        if (this.areIdSame(item.id, "feiStu")) {
            completePath = item.path;
        }

        link.setAttribute("href", completePath);
        this.setLinkActive(link);
    }

    setAttributeAndTextOfLinkFromItem(link, item) {

        if (item.path) {
            this.setPathToLinkConsideringToExternalPaths(item, link);
        } else {
            link.classList.add("item-link-disabled");
        }
        link.innerText = item.title;
    }

    createListFromMenuContent() {
        let list = this.getElementById("menu");
        this.menuContent.forEach((item) => {
            this.createList(list, item, 0);
        });
    }

    searchInChildrenAndCreateListForGrandChild(item, listItem, childLevel) {
        let newList = this.createHtmlList();
        item.child.forEach((child) => {
            listItem.appendChild(newList);
            this.createList(newList, child, childLevel);
        })
    }

    createList(list, item, childLevel) {
        let listItem = this.createHtmlListItem();
        let link = this.createHtmlLink();
        let div = this.createHtmlDiv();
        this.setAttributeAndTextOfLinkFromItem(link, item);
        if (this.areIdSame(item.id, "home")) {
            div.classList.add("item-link-home");
        }
        div.appendChild(link)
        listItem.appendChild(div);
        list.appendChild(listItem);
        if (childLevel > 2) {
            list.classList.add("item-child-right");
        }
        if (item.child) {
            listItem.classList.add("item-root");
            this.searchInChildrenAndCreateListForGrandChild(item, listItem, childLevel + 1);
        }

    }
}


if (ThreeLevelMenuComponent)
    customElements.define('three-level-menu', ThreeLevelMenuComponent);

