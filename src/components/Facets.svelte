<script>
    import { createEventDispatcher } from 'svelte';
    export let data;

    const dispatch = createEventDispatcher();
    function selectFacet(key) {
        dispatch('message', {
            key: key,
        });
    }
</script>

<form class="accordion mb-3" id="filters">
    {#each data as facet}
        <div class="accordion-item">
            <h2 class="accordion-header" id="{facet.key}">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#{facet.key}-collapse" aria-expanded="false" aria-controls="{facet.key}-collapse">
                    {facet.name}
                </button>
            </h2>
            <div id="{facet.key}-collapse" class="accordion-collapse collapse" aria-labelledby="{facet.key}" data-bs-parent="#filters">
                <div class="accordion-body">
                    {#each facet.values as value}
                        <div class="mb-3 form-check">
                            <input type="checkbox" class="form-check-input" id="{value.key}" on:click={() => selectFacet(value.queryName)}>
                            <label class="form-check-label" for="{value.key}">{value.name} <span class="badge rounded-pill bg-light text-dark">{value.count}</span></label>
                        </div>
                    {/each}
                </div>
            </div>
        </div>
    {/each}
</form>
