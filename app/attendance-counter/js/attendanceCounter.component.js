class AttendanceCounterComponent extends HTMLElement {
    connectedCallback() {
        const numberOfVisits = handleAttendanceCookies();

        this.innerHTML = '<div class="attendance-counter-container">'
            + '<div class="attendance-counter-container-text" >'
            + ' <span>Stránky tohto webu si za posledný <span class="bold-max">mesiac </span> navštívil</span> '
            + ' </div> <br>'
            + '<div >'
            + '<span id="attendace-number">'
            + numberOfVisits
            + '</span>'
            + 'krát</div></div>';
    }
}


if (!customElements.get('attendance-counter')) {
    customElements.define('attendance-counter', AttendanceCounterComponent);
}
