<script>

let currentMood = "Glad"
</script>
<div class="flex flex-col items-center h-full">
<p class="currentMood">{currentMood}</p>
    <div class="rating rating-lg gap-1 mb-4">
        <input type="radio" name="rating-3" value="Deprimert" bind:group={currentMood} class="mask mask-heart bg-red-400" />
        <input type="radio" name="rating-3" value="Litt nedstemt" bind:group={currentMood} class="mask mask-heart bg-orange-400" />
        <input type="radio" name="rating-3" value="Midt på treet" bind:group={currentMood} class="mask mask-heart bg-yellow-400" />
        <input type="radio" name="rating-3" value="Glad" bind:group={currentMood} class="mask mask-heart bg-lime-400" />
        <input type="radio" name="rating-3" value="Kjempehumør" bind:group={currentMood} class="mask mask-heart bg-green-400" />
        <input type="radio" name="rating-3" value="Fantastisk" bind:group={currentMood} class="mask mask-heart bg-green-600" />
    </div>

    <div class="flex flex-col w-full mb-4">
        <p>Energinivå</p>
        <input type="range" min="0" max="100" value="40" class="range" />
    </div>

    <div class="flex flex-col w-full mb-4">
        <p>Fysisk helse</p>
        <input type="range" min="0" max="100" value="40" class="range" />
    </div>
    <div class="flex flex-col w-full mb-4">
        <p>Mental helse</p>
        <input type="range" min="0" max="100" value="40" class="range" />
    </div>
    <div class="flex flex-col w-full mb-4">
        <p>Matlyst</p>
        <input type="range" min="0" max="100" value="40" class="range" />
    </div>
</div>
<button class="btn w-full">Lagre</button>
<style lang="scss">
    .currentMood {
        font-size: 2rem;
        font-weight: 700;
    }
</style>