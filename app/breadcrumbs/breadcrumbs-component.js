const template = document.createElement('template');
template.innerHTML = `
    <div>
       <ul id="breadcrumbs-list"></ul>
    </div>
    
    <style>
        @import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");
        ul{
            padding:0;
            margin:0;
            list-style-type: none;
            font-family: "Roboto", sans-serif;
        }
        @media screen and (max-width: 600px) {
            ul {
                padding:0;
                margin:0;
                list-style-type: none;
                font-family: "Roboto", sans-serif;
              
            }
        }
        li {float: left; margin-left: 10px;list-style-type: ">"; padding: 0 10px; }  
    
        a:link {
            color: black !important;
        }

        a:link, a:visited {
            text-decoration: none;
            color: inherit;
        }
    
        .active{
            font-weight: bold;
        }
        
        .first-li{
            float: left; 
            list-style-type: none; 
            padding: 0 10px 0 0;
        }
    </style>
    
`;

class BreadcrumbsComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        document.addEventListener("DOMContentLoaded", () => {

            let breadcrumbs = getCookie("breadcrumbs-cookies");
            if (breadcrumbs) {
                breadcrumbs = JSON.parse(breadcrumbs);
                if (!compareBreadcrumbs(breadcrumbs[breadcrumbs.length - 1], getActiveBreadcrumb())) {
                    if (breadcrumbs.length > 4) {
                        breadcrumbs.shift();
                    }
                    breadcrumbs.push(getActiveBreadcrumb());
                }
            } else {
                breadcrumbs = [getActiveBreadcrumb()];
            }

            setCookie("breadcrumbs-cookies", JSON.stringify(breadcrumbs), 1);
            let breadcrumbsList = this.shadowRoot.getElementById("breadcrumbs-list");
            breadcrumbs.forEach((item, index) => {
                let breadcrumb = document.createElement("li");

                if (index === 0) {
                    breadcrumb.classList = "first-li"
                }

                if (index === breadcrumbs.length - 1) {
                    let lastBreadcrumb = document.createElement("span");
                    lastBreadcrumb.append(item.title);
                    lastBreadcrumb.classList = "active";
                    breadcrumb.append(lastBreadcrumb);
                } else {
                    let link = document.createElement("a");
                    link.setAttribute("href", item.href);
                    link.append(item.title);
                    breadcrumb.appendChild(link);
                }
                breadcrumbsList.appendChild(breadcrumb);
            })
        })
    }
}

window.customElements.define('breadcrumbs-component', BreadcrumbsComponent);


function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function compareBreadcrumbs(lastBreadcrumb, activeBreadcrumb) {
    return lastBreadcrumb.href === activeBreadcrumb.href && lastBreadcrumb.title === activeBreadcrumb.title;
}

function getActiveBreadcrumb() {
    return {"href": window.location.href, "title": document.title};
}
