<script>
    import AddStool from "../components/stool/AddStool.svelte";
    import StoolList from "../components/stool/StoolList.svelte";
    let modal
    const closeModal = () => {
        modal = false
    }
    </script>
    
    <div class="flex flex-col justify-between h-full pb-4">
        <StoolList></StoolList>
        <div class="sticky bottom-4 z-10">
            <label for="my-modal" class="btn w-full">Legg til dobesøk</label>
            <input type="checkbox" bind:checked={modal} id="my-modal" class="modal-toggle" />
            <div class="modal">
                <div class="modal-box">
                    <AddStool on:close={closeModal}></AddStool>
                </div>
            </div>
        </div>
    </div>