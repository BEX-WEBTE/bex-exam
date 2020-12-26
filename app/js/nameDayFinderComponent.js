class NameDayFinderComponent extends HTMLElement{
    connectedCallback(){
        this.innerHTML = '<span class="thumbnail-container-event-title ">Dnes meniny oslavuje </span>';
    }
}


if(!customElements.get('nameday-finder')) {
    customElements.define('nameday-finder', NameDayFinderComponent);
}