class ThreeLevelMenuComponent extends HTMLElement {


    menuContent;


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
        this.createCssLink("app/css/header.css");
        this.createCssLink("app/three-level-menu/css/three-level-menu.component.css");
        this.createCssLink("style.css");
        this.createCssLink("app/css/print.css");
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

    setAttributeAndTextOfLinkFromItem(link, item) {

        if (item.path) {
            link.setAttribute("href", this.getWebPrefix(2) + item.path)
            this.setLinkActive(link);

        } else {
            link.classList.add("item-link-disabled");
        }
        link.innerText = item.title;
    }

    createListFromMenuContent() {
        let list = this.getElementById("menu");
        this.menuContent.forEach((item) => {
            this.createList(list, item);
        });
    }

    searchInChildrenAndCreateListForGrandChild(item, listItem) {
        let newList = this.createHtmlList();
        item.child.forEach((child) => {
            listItem.appendChild(newList);
            this.createList(newList, child);
        })
    }

    createList(list, item) {
        let listItem = this.createHtmlListItem();
        let link = this.createHtmlLink();
        let div = this.createHtmlDiv();
        this.setAttributeAndTextOfLinkFromItem(link, item);
        div.appendChild(link)
        listItem.appendChild(div);
        list.appendChild(listItem);

        if (item.child) {
            this.searchInChildrenAndCreateListForGrandChild(item, listItem);
        }

    }
}

customElements.define('three-level-menu', ThreeLevelMenuComponent);

