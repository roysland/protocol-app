<script>
    import { db, whens } from '../../store/api.js'
    import { createEventDispatcher } from 'svelte'
    import moment from 'moment';
    const dispatch = createEventDispatcher()
    let dosageAmount
    let dosageMeasure
    let form = {
        name: null,
        when: 'ved behov',
        active: "yes",
        fromDate: moment().format('YYYY-MM-DD'),
        toDate: null
    }
    
    async function addMedicine () {
        form.dosage = `${dosageAmount} ${dosageMeasure}`
        try {
            form.toDate = moment().add(10, 'year').unix()
            const med = await db.supplements.add(form)
            dispatch('close', form)
            form = {
                name: null,
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
            <input type="text" placeholder="Navn på kosttilskudd" bind:value={form.name} class="input input-bordered input-primary w-full">
        </label>
        <label class="input-label">
            <span>Når på dagen</span> 
            <select bind:value={form.when} class="select select-bordered w-full">
                {#each whens as when}
                <option value="{when.value}">{when.name}</option>
                
                {/each}
                <option value="ved behov">Ved behov</option>
            </select>
        </label>
    
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