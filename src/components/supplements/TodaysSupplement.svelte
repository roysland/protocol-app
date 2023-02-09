<script>
    import { db } from "../../store/api";
    import moment from "moment";
    import { liveQuery } from "dexie";

    const includeWhens = [
        "Morgen",
        "Formiddag",
        "Ettermiddag",
        "Kveld",
        "til måltid",
        "ved behov"
    ];

    let medicineToday = liveQuery(async () => {
        const medicines = await db.supplements.toArray();

        const withDiary = await Promise.all(
            medicines.map(async (med) => {
                const m = db.supplementsDiary
                    .where("supplementId")
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
            await db.supplementsDiary.delete(med.history.id)
        } else {
            await db.supplementsDiary.add({
                medicineId: med.id,
                checked: true,
                checkedDate: new Date().getTime()
            })
        }
    }
</script>
{#if $medicineToday}
{#each $medicineToday as med (med.id)}
<label class="flex items-center mb-2">
    <input type="checkbox" class="toggle toggle-success mr-4" checked={med.history && med.history.checked} on:change={(e) => checkMedicine(med, e)} />
    <span class="text-base font-medium">{med.name}</span>
</label>
{/each}
{/if}