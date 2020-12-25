class AttendanceCounterComponent extends HTMLElement{
    connectedCallback(){
        const numberOfVisits = handleAttendanceCookies();

        this.innerHTML = ''
            + '<span class=" thumbnail-container-event-title">'
            + 'Stránky tohto webu si za posledný <span class="bold-max">mesiac </span>navštívil: '
            + numberOfVisits
            +'krát</span> ';
    }
}


if(!customElements.get('attendance-counter')) {
    customElements.define('attendance-counter', AttendanceCounterComponent);
}