class AttendanceCounterComponent extends HTMLElement{
    connectedCallback(){
        const numberOfVisits = handleAttendanceCookies();

        this.innerHTML = ''
            + '<div class=" thumbnail-container-event-title">'
            + 'Stránky tohto webu si za posledný <span class="bold-max">mesiac </span>navštívil '
            + '<span id="attendace-number">'
            + numberOfVisits
            + '</span>'
            +'krát</div> ';
    }
}


if(!customElements.get('attendance-counter')) {
    customElements.define('attendance-counter', AttendanceCounterComponent);
}