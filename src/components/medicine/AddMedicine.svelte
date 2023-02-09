<script>
import { db, whens } from '../../store/api.js'
import { createEventDispatcher } from 'svelte'
    import moment from 'moment';
const dispatch = createEventDispatcher()
let dosageAmount
let dosageMeasure
let form = {
    name: null,
    dosage: null,
    when: null,
    active: "yes",
    fromDate: moment().format('YYYY-MM-DD'),
    toDate: null
}

async function addMedicine () {
    form.dosage = `${dosageAmount} ${dosageMeasure}`
    try {
        form.fromDate = moment(form.fromDate).unix()
        form.toDate = moment().add(10, 'year').unix()
        const med = await db.medicine.add(form)
        dispatch('close', form)
        form = {
            name: null,
            dosage: null,
            when: null,
            active: "yes",
            fromDate: moment().format('YYYY-MM-DD'),
            toDate: null
        }
    } catch (error) {
        console.log(error)
    }
}
</script>
<article>
<form on:submit|preventDefault={addMedicine}>
    <label class="input-label">
        <span>Navn</span> 
        <input type="text" placeholder="Navn på medisin" bind:value={form.name} class="input input-bordered input-primary w-full">
    </label>
    <label class="input-label">
        <span>Når på dagen</span> 
        <select bind:value={form.when} class="select select-bordered w-full">
            {#each whens as when}
            <option value="{when.value}">{when.name}</option>
            {/each}
        </select>
    </label>
    <label class="input-label">
        <span>Start dato</span> 
        <input type="date" bind:value={form.fromDate}  class="input input-bordered input-primary w-full">
    </label>
    <label class="input-label">
        <span>Sluttdato (valgfritt)</span> 
        <input type="date" bind:value={form.toDate}  class="input input-bordered w-full">
    </label>
    <div class="flex items-center justify-start">
        <label class="input-label grow mr-8">
            <span>Dose</span> 
            <input type="number" bind:value={dosageAmount} class="input input-bordered input-primary w-full">
        </label>
        <label class="input-label">
            <span>Måleenhet</span> 
            <select bind:value={dosageMeasure} class="select select-bordered w-full">
                <option value="tablet">tablett(er)</option>
                <option value="ml">ml</option>
                <option value="mg">mg</option>
            </select>
        </label>
    </div>

    <div class="flex justify-between">
        <button type="reset" class="btn" on:click={() => { dispatch('close')}}>Avbryt</button>
        <button type="submit" class="btn">Legg til</button>
    </div>
</form>
</article>
<style lang="scss">
    .input-label {
        display: block;
        margin-bottom: 1rem;
        span {
            display: block;
        }
    }
</style>