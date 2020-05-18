$(function () {

    function displayHoliday() {

        // store country code in a variable to create url string by string concatenation

        var country = $("#userCountry").val();

        // website https://www.calendarindex.com/api/v1/holidays

        // API key is d5c784e23d42541b3a4630cb7c79e8f2b4d1166e

        var my_url = "https://www.calendarindex.com/api/v1/holidays?country=" + country + "&year=2018&api_key=d5c784e23d42541b3a4630cb7c79e8f2b4d1166e";

        var records;

        // GET method is invoked to get response from API url

        $.get(my_url, function (data) {

            records = data; // store all data in the variable records

            // each record is displayed in a separate row. 

            //the name, date, day and type of holiday is displayed in separate columns

            if ((records.response.holidays).length == 0) {

                // If there are no holidays in current year in that country, display message

                $("#holiday").html(`<h3 class="text-center message-absent">Sorry no records available<br></h3>`);

            }

            else {

                // to retrieve image ,create url string by adding respective country code

                var country_url = "https://www.countryflags.io/" + $("#userCountry").val() + "/flat/64.png";

                $("#holiday").html(

                    `<h3 class="text-center heading-display">Holiday list for <img src= ${country_url}></h3>

                <h5 class="text-center sub-heading-display">Number of holidays = ${(records.response.holidays).length}</h5> 

                <table class="table">

                    <thead class="thead-dark">

                        <th class="col-3 table-heading-display text-center">Name</th>

                        <th class="col-3 table-heading-display text-center" >Date</th>

                        <th class="col-3 table-heading-display text-center">Day</th>

                        <th class="col-3 table-heading-display text-center">Type</th>

                    </thead>`);



                // every holiday is displayed in a separate row

                // each method goes through the array named holidays and picks each record v by index i

                $.each(records.response.holidays, function (i, v) {



                    // display 10 digit date without timestamp

                    var dateDisplay = (v.date).slice(0, 10);



                    // find out the day of the week for that particular date

                    var year = (v.date).slice(0, 4);

                    var month = ((v.date).slice(5, 7)) - 1; //JavaScript counts months from 0 to 11.

                    var day = (v.date).slice(8, 10)

                    var hr = (v.date).slice(11, 13);

                    var min = (v.date).slice(14, 14);

                    var sec = (v.date).slice(17, 19);

                    // create an instance of object Date by passing all arguments

                    var dateCalculate = new Date(year, month, day, hr, min, sec, 0);

                    // find out which day of the week that particular date is

                    var dayCount = dateCalculate.getDay();

                    // getDay returns a value between 0 to 6. Javascript counts days from 0 to 6, 0 being Sunday

                    switch (dayCount) {

                        case 0:

                            var dayDisplay = "Sunday";

                            break;

                        case 1:

                            var dayDisplay = "Monday";

                            break;

                        case 2:

                            var dayDisplay = "Tuesday";

                            break;

                        case 3:

                            var dayDisplay = "Wednesday";

                            break;

                        case 4:

                            var dayDisplay = "Thursday";

                            break;

                        case 5:

                            var dayDisplay = "Friday";

                            break;

                        case 6:

                            var dayDisplay = "Saturday";

                            break;

                    }

                    // if it is public holiday, display name in brown color 

                    if (v.type == "public") {

                        $("#holiday").append(

                            `<tr class="row"><td class="col-3 text-center" style="color:brown">${v.name}</td><td class="col-3  text-center">${dateDisplay}</td><td class="col-3 text-center">${dayDisplay}</td><td class="col-3 text-center">${v.type}</td></tr>`);

                    }

                    else { // if it is not public holiday, display name in default color

                        $("#holiday").append(

                            `<tr class="row"><td class="col-3 text-center">${v.name}</td><td class="col-3  text-center">${dateDisplay}</td><td class="col-3 text-center">${dayDisplay}</td><td class="col-3 text-center">${v.type}</td></tr>`);

                    }

                });

                $("#holiday").append(`</table>`);

            }



        });

    };

// when the button is clicked by user, the displayHoliday function is called

    $("#btn-show-holiday").on("click", function () {

        displayHoliday();

    });

});
