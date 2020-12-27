class NameDayFinderComponent extends HTMLElement{
    connectedCallback(){
        this.innerHTML = '<div id="text-div">'
                            + '<span id="intro-text-name" class="thumbnail-container-event-title ">Dnes '
                            + '<em id="text-today" class="bold-max">24.12.</em> meniny oslavuje:'
                            + '<br><em id="text-name" class="bold-max"> Matej </em>'
                            + '<span class="button-with-icon">'
                            + '<button id="more-names-button">'
                            + '<a id="more-names-a" data-toggle="collapse" href="#more-names" aria-expanded="false" aria-controls="more-names" >všetky mená</a>'
                            + '<i class="far fa-caret-square-down"></i>'
                            + '</button>'
                            + '</span>'
                            + '</span>'
                            + '<p id="more-names" class="collapse">Žiadne ďalšie mená</p>'
                            + '<br><span id="intro-text-holiday" class="thumbnail-container-event-title ">Dnes oslavujeme sviatok:'
                            + '<br><em id="text-holiday" class="bold-max"> Vianoce </em></span></div>';


        this.innerHTML += '<div class="nameday-input-div"><label for="date-input">Dňa  </label>'
                            + '<input class="nameday-input" type="date" id="date-input" name="date-input"></div>';

        this.innerHTML += '<div class="nameday-input-div"><label for="holiday-input">Sviatok  </label>'
            + '<input class="nameday-input" type="text" id="holiday-input" name="holiday-input" disabled></div>';


        this.innerHTML += '<div class="nameday-input-div"><label for="name-input">Meno  </label>'
                            + '<input class="nameday-input" type="text" id="name-input" name="name-input">';

        this.innerHTML += '<div id="more-names-under-input-div"><em class="bold-max">Všetky mená: </em>'
                            + '<span id="more-names-under-input">gfdgffdgfd</span>'
                            + '</div>'

        this.innerHTML += '<ul id="country-chooser">'
                            + '<li class="active-country country"><span>SK</span></li>'
                            + '<li class="country"><span>CZ</span></li>'
                            + '<li class="country"><span>HU</span></li>'
                            + '<li class="country"><span>PL</span></li>'
                            + '<li class="country"><span>AT</span></li>'
                            + '</ul>'



        function initDateInput(){
            const dateInput = document.getElementById("date-input");
            dateInput.valueAsDate = new Date();

            showTodayDate();

            dateInput.addEventListener("input", dateInputChanged);
        }

        function showTodayDate(){
            const textToday = document.getElementById("text-today");
            const date = getTodayDate();
            const formattedDate = getFormattedDate(date);

            const month = formattedDate.substring(0, 2);
            const day = formattedDate.substring(2, 4);

            textToday.innerText = day + "." + month + ".";
        }

        function dateInputChanged(){
            const dateInput = document.getElementById("date-input");

            showNameInput();
            showHolidaysInput();
        }

        function showNameInput(){
            const nameInput = document.getElementById("name-input");
            const moreNames = document.getElementById("more-names-under-input");
            const moreNamesDiv = document.getElementById("more-names-under-input-div");


            let date = document.getElementById("date-input").value;
            date = getFormattedDate(date);

            let activeCountry = document.getElementsByClassName("active-country")[0].innerText;
            if(activeCountry === "SK")
                activeCountry = "SKd";

            const names = getNames(date, activeCountry);
            const dividedNames = names.split(",");

            if(dividedNames.length > 1){
                nameInput.value = dividedNames[0]
                moreNames.innerText = names;
                moreNamesDiv.style.display = "unset";
            }
            else {
                nameInput.value = names;
                moreNames.innerText = names;
                moreNamesDiv.style.display = "none";
            }
        }

        function showHolidaysInput(){
            const holidaysInput = document.getElementById("holiday-input");
            const activeCountry = document.getElementsByClassName("active-country")[0].innerText;
            let date = document.getElementById("date-input").value;
            date = getFormattedDate(date);

            const holidays = getHolidays(date, activeCountry);
            holidaysInput.value = holidays;
        }

        function initNameInput(){
            showTextNames();
            showNameInput();
        }

        function showTextNames(){
            const textName = document.getElementById("text-name");
            const activeCountry = document.getElementsByClassName("active-country")[0].innerText;
            let date = getTodayDate();
            date = getFormattedDate(date);

            const names = getNames(date, activeCountry);
            textName.innerText = names;

            if(activeCountry === "SK")
                showSlovakExtendedNames(date);
            else{
                const moreNamesButton = document.getElementById("more-names-button");
                moreNamesButton.style.display = "none";
            }
        }

        function getTodayDate(){
            const date = new Date();
            const input = document.createElement("INPUT");
            input.setAttribute("type", "date");
            input.valueAsDate = date;

            return input.value;
        }


        function showSlovakExtendedNames(date){
            const slovakExtendedNames = getNames(date, "SKd");
            const moreNames = document.getElementById("more-names");
            const moreNamesButton = document.getElementById("more-names-button");
            moreNamesButton.style.display = "unset";

            moreNames.innerText = slovakExtendedNames;
        }

        function getFormattedDate(date){
            const splitDate = date.split("-");

            return splitDate[1] + splitDate[2];
        }

        function getNames(date, country){
            const xml = getLoadedXml();
            const allZaznam = xml.getElementsByTagName("zaznam");
            const zaznam = getZaznam(allZaznam, date);

            if(zaznam === '<zaznam></zaznam>')
                return "-";

            const allNamesCountry = zaznam.getElementsByTagName(country);

            let names;
            if(allNamesCountry.length > 0)
                names = allNamesCountry[0].innerHTML;
            else
                return "-";

            return names;
        }

        function getLoadedXml(){
            let xmlhttp;
            if (window.XMLHttpRequest) {
                xmlhttp = new XMLHttpRequest();
            } else {
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            }

            xmlhttp.open("GET", "app/xml/meniny.xml", false);
            xmlhttp.send();
            return  xmlhttp.responseXML;
        }

        function getZaznam(allZaznam, date) {
            for (let zaznam of allZaznam) {
                const den = zaznam.getElementsByTagName("den")[0];
                if (den.innerHTML === date)
                    return zaznam;
            }

            return '<zaznam></zaznam>';
        }


        function initHolidayInput(){
            showTextHolidays();
            showHolidaysInput();
        }


        function showTextHolidays(){
            const holidayInput = document.getElementById("holiday-input");
            const textHoliday = document.getElementById("text-holiday");
            const activeCountry = document.getElementsByClassName("active-country")[0].innerText;
            let date = getTodayDate();
            date = getFormattedDate(date);

            const holidays = getHolidays(date, activeCountry);

            holidayInput.value = holidays;
            textHoliday.innerText = holidays;
        }

        function getHolidays(date, country){
            const xml = getLoadedXml();
            const allZaznam = xml.getElementsByTagName("zaznam");
            const zaznam = getZaznam(allZaznam, date);

            if(zaznam === '<zaznam></zaznam>')
                return "-";

            let allSviatky;
            if(country === "SK")
                allSviatky = zaznam.getElementsByTagName("SKsviatky");
            else if(country === "CZ")
                allSviatky = zaznam.getElementsByTagName("CZsviatky");
            else
                return  "-";

            let holidays;
            if(allSviatky.length > 0)
                holidays = allSviatky[0].innerHTML;
            else
                return "-";

            if(!holidays)
                return "-";

            return holidays;
        }

        function initCountryChooser(){
            const allCountries = document.getElementsByClassName("country");

            for(let country of allCountries)
                country.addEventListener("click", function (){changeNameDayCountry(country)});

        }

        function changeNameDayCountry(country){
            const activeCountry = document.getElementsByClassName("active-country");
            activeCountry[0].classList.remove("active-country");

            country.classList.add("active-country");

            showTextNames();
            showNameInput();
            showTextHolidays();
            showHolidaysInput();
        }


        initDateInput();
        initNameInput();
        initHolidayInput();
        initCountryChooser();
    }
}


if(!customElements.get('nameday-finder')) {
    customElements.define('nameday-finder', NameDayFinderComponent);
}