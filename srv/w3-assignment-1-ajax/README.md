# Country finder

With the country finder you can find every country in the world, where it is located and some basic knowledge is provided. You can filter by continent or just scroll down the list of all countries the choice is yours.

## Why does this application have a purpose?
You can find the countries really fast and see where they're located and on the same page you can learn some basic knowledge about the selected country all in one.

## How does it works
When you landed on the page you can filter (on continent), select or just click on a country to see more information about it. The user sees basic knowledge and a world map with the selected country pinned in the middle.

## Usage
Download the assets folder and place this in the project of your choice. Then import the modules in the your HTML file like this:

```html
<!-- HTML -->
    <script src="assets/js/routie.min.js"></script>
    <script src="assets/js/transparency.min.js"></script>
    <script src="assets/js/aja.min.js"></script>
    <script src="https://maps.googleapis.com/maps/api/js?key=YOURAPICODE"></script>
    <script src="assets/js/maps.config.js"></script>
    <script src="assets/js/modules/requests.js"></script>
    <script src="assets/js/modules/routers.js"></script>
    <script src="assets/js/modules/sections.js"></script>
    <script src="assets/js/modules/filters.js"></script>
    <script src="assets/js/modules/app.js"></script>
</body>
```
Note: For Google Maps you need to place an API key instead of "YOURAPICODE".

### You need some selectors to get it to work use this as example:

#### To load the response of the API Call
- id="loader" to place the loading indicator.
- id="response" where the country data will be rendered.

```html
<div id="loader"><span>Loading...</span></div>
    <div id="response">
        <!-- HTML -->
    </div>
</main>
</section>
<div id="map"></div>
```

#### If the response failed use this
- id="failed" when the API gives no data.
- class="hide" hide by default (need to style in CSS).

```html
<section id="failed" class="hide">
    <h2>Failed to load the content, please try to load the page again.</h2>
</section>
```

#### Countries overview selector
- id="countries" to indicate the container where the countries will be rendered.

```html
<section id="countries">
    <!-- HTML -->
</section>
```

#### Overview filter
- id="showFilters" to show the continent filters.
- id="allClickButtons" where continents will be rendered.
- class="regionRadio" where every single continent will be rendered.

```html
<label class="filterLabel" for="showFilters">Show/hide filters</label>
<input type="checkbox" class="showFilters" value="showFilters" id="showFilters" />
<ul id="allClickButtons">
    <li>
        <input type="radio" class="regionRadio" name="regionGroup" value="all" id="all" checked />
        <label class="region" for="all">All</label>
    </li>
    <div id="filterButtons">
        <li>
            <input type="radio" class="regionRadio" name="regionGroup" />
            <label class="region"></label>
        </li>
    </div>
</ul>
```

#### Countries dropdown select option
- id="countriesSearch" the container of the dropdown for all the country names.
- class="country" where every single country will be rendered.

```html
<select id="countriesSearch">
    <option class="country" value=""></option>
</select>
```

#### List all countries on the page
- id="countriesOverview" the container for the list of countries.
- class="country" where every single country will be rendered.

```html
<div id="countriesOverview">
    <a class="country"></a>
</div>
```

#### Country singulair selector
- id="country" to indicate the container where the singulair country will be rendered.

```html
<section id="country">
    <!-- HTML -->
</section>
```

#### Country singulair information
- id="name" rendered the country name.
- id="listInfoCountry" indicate the detail information container for the selected country.
- class="alpha3Code" where the alpha3Code will be rendered.
- class="population" where the population will be rendered.
- class="area" where the surface will be rendered.
- class="capital" where the capital city will be rendered.
- class="region" where the continent will be rendered.
- class="demonym" where the main language will be rendered.

```html
<h1 id="name"></h1>
<div id="listInfoCountry">
    <ul>
        <li><label>Alpha3Code: </label><span class="alpha3Code"></span></li>
        <li><label>Population: </label><span class="population"></span></li>
        <li><label>Surface: </label><span class="area"></span> km&#178;</li>
        <li><label>Capital city: </label><span class="capital"></span></li>
        <li><label>Continent: </label><span class="region"></span></li>
        <li><label>Main language: </label><span class="demonym"></span></li>
    </ul>
</div>
```

#### Country singulair summery
- id="summery" indicate the summery container for the selected country.
- class="inner" where the summery will be rendered.

```html
<article id="summery">
    <h2>Summary:</h2>
    <div class="inner">
    </div>
</article>
```

## Flow diagram
![alt text](https://github.com/TimoVerkroost/minor-web-app-from-scratch/blob/master/srv/w3-assignment-1-ajax/assets/images/flow-diagram-webapp.png "Flow diagram")

## Interaction diagram
![alt text](https://github.com/TimoVerkroost/minor-web-app-from-scratch/blob/master/srv/w3-assignment-1-ajax/assets/images/interaction-diagram-webapp.png "Interaction diagram")

## Resources
The application is mostly build with native JavaScript only 2 micro libraries are added. beside the JavaScript, the application gets it's information from an external API.
- [Aja.js](http://krampstudio.com/aja.js/) - Ajax without XML Asynchronous JavaScript And JSON.
- [TransparencyJS](https://github.com/leonidas/transparency) - A semantic template engine for the browser. It maps JSON objects to DOM elements by id, class and data-bind attributes.
- [REST Countries API](https://restcountries.eu/) - Get information about countries via a RESTful API.
- [Google Maps API](https://developers.google.com/maps/documentation/javascript/adding-a-google-map) - Embed Google Maps features and functionality in your sites.

## Wishlist
- Dropdown searchbar so the user doesn't have to scroll down the whole dropdown.
- Country flags.
- More detailed information about the countries.
- Load all modules in one JS file and not the HTML file.
- Make selectors in JS flexible for the user, most of them are hardcoded.

## Live demo
- https://timoverkroost.github.io/minor-web-app-from-scratch/srv/w3-assignment-1-ajax/
