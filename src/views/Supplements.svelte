<script>
    import RegisterSupplement from "../components/supplements/RegisterSupplement.svelte";
    import SupplementList from "../components/supplements/SupplementList.svelte";
    let modal
    const closeModal = () => {
        modal = false
    }
</script>
<div class="flex flex-col justify-between h-full pb-4">
    <SupplementList></SupplementList>
    <label for="my-modal" class="btn w-full">Legg til kosttilskudd</label>
    <input type="checkbox" bind:checked={modal} id="my-modal" class="modal-toggle" />
    <div class="modal">
        <div class="modal-box">
        <RegisterSupplement on:close={closeModal}></RegisterSupplement>
        </div>
    </div>
</div>