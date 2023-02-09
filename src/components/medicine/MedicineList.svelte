<script>
    import { liveQuery } from "dexie";
    import { db } from "../../store/api.js";
  
    let checkedList = []

    let medicine = liveQuery(
      () => db.medicine.toArray()
    );

    const deleteMedicine = () => {
        checkedList.map(async (id) => {
            await db.medicine.delete(id)
        })
        checkedList = []
    }
  
</script>
<div class="bg-base-100 rounded-box">
    {#if $medicine && $medicine.length > 0}
    {#each $medicine as med (med.id)}
	<label class="flex items-center w-full py-2">

		<input type="checkbox" class="checkbox mx-4" value={med.id} bind:group={checkedList} />
		<span class="flex-auto">
			<strong>{med.name}</strong>
			<small>{med.dosage} - {med.when}</small>
		</span>
	</label>
    {/each}
    {/if}
    {#if $medicine && $medicine.length === 0}
    <p class="text-center">Ingen medisiner</p>

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