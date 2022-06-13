<script>
    import Client from './client.mjs';
    import Facets from './components/Facets.svelte';
    import Item from './components/Item.svelte';

    export let settings;

    const client = new Client(settings.domain, settings.params);

    function search() {
        currentPage = 0;
        // Add "AND" between each facet and searchQuery
        query = [...selectedFacets, searchQuery].filter(Boolean).join(" AND ");
    }

    function selectFacet(facet) { selectedFacets = [...selectedFacets, facet]; search(); }
    function unselectFacet(facet) { selectedFacets = selectedFacets.filter(f => f !== facet); search(); }
    function handleFacetEvent(event) { selectFacet(event.detail.key); }

    let query = "";
    let searchQuery = "";
    let selectedFacets = [];
    let currentPage = 0;
    $: fetch = client.getItems(query, currentPage);
</script>

{#if !settings.hideSearch}
    <form class="input-group input-group-lg mb-3" on:submit|preventDefault={search}>
        <input class="form-control" type="text" placeholder="Search..." bind:value={searchQuery}>
        <button class="btn btn-primary">Search</button>
    </form>
{/if}
{#if selectedFacets.length >= 1}
    <p class="d-flex flex-wrap" style="gap: 0.5rem;">
        {#each selectedFacets as facet}
            <span class="badge bg-secondary rounded-pill">
                {facet}
                <button type="button" class="btn-close btn-close-white ms-1" aria-label="Remove" on:click={() => unselectFacet(facet)}></button>
            </span>
        {/each}
    </p>
{/if}
{#await fetch}
    <div class="spinner-border text-primary mb-3"></div>
{:then result}
    {#if settings.params.show_facets && !settings.hideSearch}
        <Facets data={result.facets} on:message={handleFacetEvent}/>
    {/if}
    <p>{result.itemCount} items</p>
    <ul class="list-unstyled">
        {#each result.items as item}
            <li class="mb-3"><Item data={item}/></li>
        {/each}
    </ul>
    {#if result.pageCount > 1}
        <nav class="overflow-auto">
            <ul class="pagination">
                <li class="page-item" class:disabled={currentPage <= 0}><a class="page-link" href="#" on:click={() => currentPage -= 1}>Previous</a></li>
                {#each Array(result.pageCount) as _, i}
                    <li class="page-item" class:active={currentPage === i}><a class="page-link" href="#" on:click={() => currentPage = i}>{i + 1}</a></li>
                {/each}
                <li class="page-item" class:disabled={currentPage >= result.pageCount - 1}><a class="page-link" href="#" on:click={() => currentPage += 1}>Next</a></li>
            </ul>
        </nav>
    {/if}
{:catch error}
    <p>{error}</p>
{/await}
