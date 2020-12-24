class AttendanceCounterComponent extends HTMLElement{
    connectedCallback(){
        this.numberOfVisits = 0;
        this.classList.add('thumbnail-container-event');
        this.classList.add('attendance-background');
        this.classList.add('thumbnail-container-background');
        this.innerHTML = ''
            + '<span class=" thumbnail-container-event-title">'
            + 'Túto stránku si za posledný <span class="bold-max">mesiac </span>navštívil: '
            + this.numberOfVisits
            +'krát</span> ';


        function setCookie(cname, cvalue, exdays) {
            const date = new Date();
            date.setTime(date.getTime() + (exdays*24*60*60*1000));
            const expires = "expires="+ date.toUTCString();
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        }

        function getCookie(cname) {
            const name = cname + "=";
            const decodedCookie = decodeURIComponent(document.cookie);
            const ca = decodedCookie.split(';');
            for(let i = 0; i <ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) === ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) === 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        }

        function handleCookies(){
            const cookiesNumberOfVisits = getCookie("numberOfVisits");
            if(cookiesNumberOfVisits) {

                console.log("yeah")
            }

           this.numberOfVisits = 5;
        }

        handleCookies();
    }
}


if(!customElements.get('attendance-counter')) {
    customElements.define('attendance-counter', AttendanceCounterComponent);
}