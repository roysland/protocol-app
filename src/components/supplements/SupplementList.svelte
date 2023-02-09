<script>
    import { liveQuery } from "dexie";
    import { db } from "../../store/api.js";
  
    let checkedList = []

    let supplements = liveQuery(
      () => db.supplements.toArray()
    );

    const deleteMedicine = () => {
        checkedList.map(async (id) => {
            await db.supplements.delete(id)
        })
        checkedList = []
    }
  
</script>
<div class="bg-base-100 rounded-box">
    {#if $supplements && $supplements.length > 0}
    {#each $supplements as med (med.id)}
	<label class="flex items-center w-full py-2">

		<input type="checkbox" class="checkbox mx-4" value={med.id} bind:group={checkedList} />
		<span class="flex-auto">
			<strong>{med.name}</strong>
			<small>{med.when}</small>
		</span>
	</label>
    {/each}
    {/if}
    {#if $supplements && $supplements.length === 0}
    <p class="text-center">Ingen kosttilskudd</p>

    {/if}
</div>
{#if checkedList.length > 0}
<div class="drawer bg-base-300 p-4">
    <div class="flex justify-between items-center">
        <p>Slett {checkedList.length} medisiner?</p>
        <button class="btn" on:click={deleteMedicine}>Slett</button>
    </div>
</div>
{/if}

<style lang="scss">
.drawer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: auto;
}
</style>