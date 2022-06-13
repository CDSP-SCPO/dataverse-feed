# Dataverse Feed (PROTOTYPE)

Embed a feed of your Dataverse items (collections, datasets, files) in your webpage using the [search API](https://guides.dataverse.org/en/latest/api/search.html). JavaScript module built with Svelte and Snowpack.


## Goal

Create a simple customizable widget that can be seamlessly integrated to any website. This widget should adapt to the needs of the webpage feature-wise while respecting the design language.

Example of use cases:
- Integrate Dataverse's search engine to a page, with or without facets
- Display the latest uploaded datasets in a collection
- ...


## Demo

A demo is available here: https://cdsp-scpo.github.io/dataverse-feed/build.

### Use case examples

- Research center: https://cdsp-scpo.github.io/dataverse-feed/build/examples/center
- ...


## Getting started

Download the JavaScript file in `build/dist` and add the following snippet to the `<head>` of your webpage:
```html
<script type="module" defer>
    import createFeed from "/PATH_TO_JS";
    createFeed(
        document.getElementById('ELEMENT_ID'),
        {
            domain: "DATAVERSE_URL",
            params: {},
        },
    );
</script>
```

Default values for `params`:
```js
const defaultParams = {
    sort: "date",
    order: "desc",
    type: "dataset",
    per_page: 10,
    show_facets: false,
}
```

The full list of parameters are here: https://guides.dataverse.org/en/latest/api/search.html. 

We currently use Bootstrap 5, so you might want to add the CSS to your page: https://getbootstrap.com/docs/5.0/getting-started/introduction.


## Build and Development

Clone the repo...

Install the dependencies:
```bash
npm install
```

To start the server:
```bash
npm run start
```

To build the module:
```bash
npm run build
```


## Improvement ideas

- [ ] support for other search API parameters/values
- [ ] remove bootstrap
  - [ ] simplify template markup
  - [ ] add an optional simple CSS with customization options
- [ ] support for older browser
- [ ] allow to specify a query and hide the search field
- [ ] enable/disable autoloading
- [ ] add a button to go to Dataverse advanced search page
- [ ] add a link to the Dataverse instance
- [ ] create npm package
- [ ] improve code/components organization
- [ ] multilingual
