class AttendanceCounterComponent extends HTMLElement{
    connectedCallback(){
        this.classList.add('thumbnail-container-event');
        this.classList.add('attendance-background');
        this.classList.add('thumbnail-container-background');
        this.innerHTML = "";

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
            let numberOfVisits = 1;
            const cookiesNumberOfVisits = getCookie("numberOfVisits");
            if(cookiesNumberOfVisits) {
                numberOfVisits = parseInt(cookiesNumberOfVisits, 10) + 1;
            }
            setCookie("numberOfVisits", "" + numberOfVisits, 30);

            console.log(numberOfVisits);

            return numberOfVisits;
        }

        const numberOfVisits = handleCookies();

        this.innerHTML = ''
            + '<span class=" thumbnail-container-event-title">'
            + 'Túto stránku si za posledný <span class="bold-max">mesiac </span>navštívil: '
            + numberOfVisits
            +'krát</span> ';

    }
}


if(!customElements.get('attendance-counter')) {
    customElements.define('attendance-counter', AttendanceCounterComponent);
}