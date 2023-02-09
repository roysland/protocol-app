<script>
    import { db, stoolTypes } from '../../store/api.js'
    import { createEventDispatcher } from 'svelte'
    const dispatch = createEventDispatcher()

    const addStool = async (stoolType) => {
        await db.stool.add({
            registerDate: new Date().getTime(),
            stoolType: stoolType.bristolValue,
            stool: stoolType,
            notes: ''
        })
        dispatch('close')
    }

    </script>
    <article>
        <ul class="menu bg-base-100 w-full rounded-box">
            {#each $stoolTypes as stool}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <li on:click={() => addStool(stool)}>
                <div class="flex items-center flex-row">
                  <img src={stool.image} alt={stool.description} class="w-24" />
                  <strong class="text-sm">{stool.name}</strong>
                </div>
              </li>
            {/each}
        </ul>
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