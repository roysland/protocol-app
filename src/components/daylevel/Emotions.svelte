<script>
let emotions = [
    "Trist", "Glad", "Frykt", "Angst", "Skam", "Skyld", "Motivert", "Sint", "Håpløs", "Ensom", "Takknemlig", "Overveldet"
]
</script>

{#each emotions as emotion}
<div class="form-control">
    <label class="cursor-pointer label">
        <input type="checkbox" class="checkbox checkbox-warning mr-4" />
        <span class="label-text flex-grow">{emotion}</span>
    </label>
  </div>
{/each}

