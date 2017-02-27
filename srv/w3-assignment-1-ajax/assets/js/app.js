(function(){
    "use strict";
    // Store API data
    var dataStore = null;
    var loader = document.getElementById("loader");
    var responseContainer = document.getElementById("response");

    var request = {
        countries: function () {
            var apiURL = "https://restcountries.eu/rest/v2/all";
            aja()
                .method('get')
                .url(apiURL)
                .on('200', function (response) {
                    dataStore = response;
                    // Start routers
                    routers.listen();
                    // Remove loader
                    loader.remove();
                    // Fade in response
                    responseContainer.style.opacity = 1;
                })
                .on('40x', function (response) {
                    console.log(response);
                    routers.failed();
                })
                .on('500', function (response) {
                    console.log(response);
                    routers.failed();
                })
                .go();
        }
    };

    var app = {
        init: function () {
            // Get hash from url
            var route = window.location.hash;
            // If no hash is in the URL add default hash
            if (!route) {
                route = "#countries";
                window.location.href  = window.location.href + route
            }
            request.countries();
        }
    };

    var routers ={
        listen: function () {
            // Routers
            routie({
                'countries': function() {
                    // Overview of all the countries
                    sections.overviewCountries();
                    // hide not selected sections
                    sections.hide();
                    // Add active to the section that needs te be displayed
                    document.getElementById("countries").classList.add("active");
                },
                'countries/:country': function() {
                    // Overview of single country
                    sections.singulairCountries();
                    // hide not selected sections
                    sections.hide();
                    // Add active to the section that needs te be displayed
                    document.getElementById("country").classList.add("active");
                }
            });
        },
        failed: function () {
            console.log("fail");
        }
    };

    // Sections
    var sections = {
        hide: function () {
            // Hide other sections
            var hidden = document.getElementsByTagName("section");
            //ES6 for loop
            for (var hide of hidden) {
                // Hide other sections
                hide.classList.remove("active");
            }
        },
        overviewCountries: function () {
            filters.regionCountryButtons();
            // Default render with all regions
            var filteredRegion = dataStore;

            // Render country name and link with alpha3Code
            var countrySingle = {
                country: {
                    text: function() {
                        return this.name;
                    },
                    value: function() {
                        return this.name;
                    },
                    href: function() {
                        return window.location.href + '/' + this.alpha3Code;
                    }
                }
            };
            // Render HTML
            Transparency.render(document.getElementById("countriesOverview"), filteredRegion, countrySingle);
            Transparency.render(document.getElementById("countriesSearch"), filteredRegion, countrySingle);

            // Select region with the filters
            document.getElementById("allClickButtons").addEventListener("click",function (e) {
                filters.regionActive(e);
            });
        },
        singulairCountries: function () {
            // Get the right country by hash
            var initialPage = window.location.hash;
            var countryLink = initialPage.split('/')[1];
            // Filter the selected country
            var singleCountry = dataStore.filter(function(value) {
                return value.alpha3Code == countryLink;
            });
            Transparency.render(document.getElementById('countryContainer'), singleCountry);
            // Google maps update
            var latValue = singleCountry[0].latlng[0];
            var lngValue = singleCountry[0].latlng[1];
            this.googleMaps(latValue, lngValue);

            var x = singleCountry.reduce(function(object) {
                return object.region + object.region;
            }, 'Summery');
            console.log(x);
        },
        googleMaps: function (lat, lng) {
            // Needed to reload Google Maps, because if the marker updates it needed a redraw.
            var latlng = new google.maps.LatLng(lat, lng);
            var mapOptions = {
                center: latlng,
                zoom: 3,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                disableDefaultUI: true
            };
            var map = new google.maps.Map(document.getElementById("map"), mapOptions);

            var marker = new google.maps.Marker({
                position: latlng,
                map: map
            });
        }
    };

    var filters = {
        regionCountryButtons: function () {
            var regions = dataStore.map(function(objectItem) {
                return { region: objectItem.region };
            });

            var regionArray = [], regionOutput = [], l = regions.length, i;
            for( i=0; i<l; i++) {
                if( regionArray[regions[i].region]) continue;
                regionArray[regions[i].region] = true;
                // Do not add empty values
                if(regions[i].region != "") {
                    regionOutput.push(regions[i].region);
                }
            }
            // Render regions for filter
            var filterButtons = {
                    region: {
                        text: function() {
                            return this.value;
                        },
                        value: function() {
                            return this.value;
                        },
                        for: function() {
                            return this.value;
                        }
                    },
                    regionGroup: {
                        value: function() {
                            return this.value;
                        },
                        id: function() {
                            return this.value;
                        }
                    }

            };
            // Render HTML
            Transparency.render(document.getElementById("filterButtons"), regionOutput, filterButtons);
        },
        regionActive: function (e) {
            if (e.target && e.target.matches(".regionRadio")) {
                // Filter on region

                var filteredRegion;
                if (e.target.value == "all") {
                    filteredRegion = dataStore;
                } else {
                    filteredRegion = dataStore.filter(function(value) {
                        return value.region == e.target.value;
                    });
                }

                // Render country name and link with alpha3Code
                var countrySingle = {
                    country: {
                        text: function() {
                            return this.name;
                        },
                        value: function() {
                            return this.name;
                        },
                        href: function() {
                            return window.location.href + '/' + this.alpha3Code;
                        }
                    }
                };
                // Render HTML
                Transparency.render(document.getElementById("countriesOverview"), filteredRegion, countrySingle);
                Transparency.render(document.getElementById("countriesSearch"), filteredRegion, countrySingle);
            }
        }
    };

    app.init();

    /* STRUCTURE
    Ajax load countries API
        Load Overview
            (Optinal: load continents)
            Map countries
            Filter on Continent
        Load autocomplete countries
        Click on country
            Filter to the selected country
            Load Google maps for country
            Reduce summery

    Ajax load Google Maps
    */

}());