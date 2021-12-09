<script>
    export let data;

    const descriptionMaxLength = 400;
    if (data.description.length > descriptionMaxLength) {
        data.description = `${data.description.slice(0, descriptionMaxLength).trim()}...`;
    }
</script>

<div class="card">
    <div class="card-body">
        <h5 class="card-title">{data.name}</h5>
        <h6 class="card-subtitle mb-3 text-muted">{data.citation}</h6>
        <p class="card-text">{data.description}</p>
        <a href="{data.url}" class="btn btn-primary">View</a>
    </div>
    <div class="card-footer text-muted">
        {data.global_id}
    </div>
</div>
