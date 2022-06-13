export default class Client {
    constructor(domain, params) {
        this.url = new URL("/api/search", domain);
        const defaultParams = {
            sort: "date",
            order: "desc",
            type: "dataset",
            per_page: 10,
            show_facets: false,
        };
        this.params = Object.assign(defaultParams, params);
        this.url.search = new URLSearchParams(this.params);
    }

    async getItems(query, page) {
        // Initialize values
        if (!this.params.q) this.params.q = "";
        if (!query) query = "";
        let finalQuery = "";

        // If both the initial query and current query are set, join them
        if (this.params.q && query) finalQuery = [this.params.q, query].join(" AND ");
        // Else add them together (only one is set)
        else finalQuery = this.params.q + query;
        // If the final query is empty, set it to "*"
        if (!finalQuery || finalQuery === "") finalQuery = "*";

        // Set the search parameters
        this.url.searchParams.set('q', finalQuery);
        this.url.searchParams.set('start', (page * this.params.per_page).toString());

        const response = await fetch(this.url.toString());
        const responseJSON = await response.json();
        console.log(this.url.toString());
        console.log(responseJSON);

        if (response.status === 200) {
            let result = {
                items: responseJSON.data.items,
                itemCount: responseJSON.data.total_count,
                pageCount: Math.ceil(responseJSON.data.total_count / this.params.per_page),
                status: response.status,
            };
            if (this.params.show_facets) {
                let facets = [];
                for (const [key, value] of Object.entries(responseJSON.data.facets[0])) {
                    const values = [];
                    for (const [index, label] of value.labels.entries()) {
                        const facetName = Object.keys(label)[0];
                        const queryName = `${key.replace(/_ss$/, "")}:"${facetName}"`;
                        // Remove facet if already selected
                        if (!query.includes(queryName)) {
                            values.push({
                                key: `${key}-${index}`,
                                queryName: queryName,
                                name: facetName,
                                count: Object.values(label)[0],
                            })
                        }
                    }
                    // Remove facet category if there is no facet
                    if (values.length > 0) {
                        facets.push({
                            key: key,
                            name: value.friendly,
                            values: values,
                        });
                    }
                }
                result.facets = facets;
            }
            console.log(result);
            return result;
        } else {
            throw new Error("API call failed.");
        }
    }
}
