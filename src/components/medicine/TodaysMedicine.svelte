<script>
    import { db } from "../../store/api.js";
    import { liveQuery } from "dexie";
    import SwipeCheck from "../SwipeCheck.svelte";
    import moment from "moment";
    const includeWhens = [
        "Morgen",
        "Formiddag",
        "Ettermiddag",
        "Kveld",
        "til måltid",
    ];
    let medicineToday = liveQuery(async () => {
        const medicines = await db.medicine
            .where("active")
            .equals("yes")
            .and((medicine) => {
                const today = moment().unix();
                return medicine.fromDate <= today && today <= medicine.toDate;
            })
            .toArray();


        const withDiary = await Promise.all(
            medicines.map(async (med) => {
                const m = db.medicineDiary
                    .where("medicineId")
                    .equals(med.id)
                    .last()
                    .then((data) => {
                        med.history = data;
                        return med;
                    });
                return await m;
            })
        );
        return withDiary;
    });

    const checkMedicine = async (med, e) => {
        if (med.history && 'id' in med.history) {
            await db.medicineDiary.delete(med.history.id)
        } else {
            await db.medicineDiary.add({
                medicineId: med.id,
                checked: true,
                checkedDate: new Date().getTime()
            })
        }
    }

</script>

{#if $medicineToday}
    {#each includeWhens as whens}
        {#if $medicineToday.filter((m) => m.when === whens).length > 0}
        <p class="text-xs font-medium my-2">{whens}</p>
        {#each $medicineToday.filter((m) => m.when === whens) as med (med.id)}
            <label class="flex items-center mb-2">
                <input type="checkbox" class="toggle toggle-success mr-4" checked={med.history && med.history.checked} on:change={(e) => checkMedicine(med, e)} />
                <span class="text-base font-medium">{med.name}</span>
                <span class="text-xs ml-2">{med.dosage}</span>
            </label>
        {/each}
        {/if}
    {/each}
{/if}
