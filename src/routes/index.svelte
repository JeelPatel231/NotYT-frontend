<input type="text" bind:value={query}>

<a style="display: block;" href={`/results?search_query=${query}`}>
<button>
    SEARCH
</button>
</a>

<script lang="ts">
let query:string;
</script>