<script>
    import AddMedicine from "../components/medicine/AddMedicine.svelte";
    import MedicineList from "../components/medicine/MedicineList.svelte";
    let modal
    const closeModal = () => {
        modal = false
    }
</script>

<div class="flex flex-col justify-between h-full pb-4">
    <MedicineList></MedicineList>
    <label for="my-modal" class="btn w-full">Legg til medisin</label>
    <input type="checkbox" bind:checked={modal} id="my-modal" class="modal-toggle" />
    <div class="modal">
        <div class="modal-box">
            <AddMedicine on:close={closeModal}></AddMedicine>
        </div>
    </div>
</div>