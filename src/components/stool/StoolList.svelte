<script>
    import { liveQuery } from "dexie";
    import { db } from "../../store/api.js";
    import moment from 'moment'

    $: stools = liveQuery(
      async () => {
        const stools = await db.stool.toArray()
        const grouped = {}
        stools.reverse().forEach((stool) => {
            const date = moment(stool.registerDate).format('YYYY-MM-DD')
            if (!grouped[date]) {
                grouped[date] = []
            }
            grouped[date].push(stool)
            return grouped
        })
        return grouped
      }
    );
</script>

<div class="bg-base-100 p-2 rounded-box">
    {#if $stools}
    {#each Object.keys($stools) as day}
        {#if $stools[day].length > 0}
        <p class="text-xs">{moment(day).format('DD MMMM')} ({moment(day).fromNow('days')})</p>
        {#each $stools[day] as stool}
            
            <div class="flex items-center w-full p-2">
                <div class="indicator">
                    <span class="indicator-item indicator-middle indicator-start badge badge-secondary"></span>
                </div>
                <span class="flex-auto ml-8">
                    <strong>{stool.stool.description}</strong>
                    <small>{stool.stool.name}</small>
                </span>
            </div>
            {/each}
        {/if}
    {/each}
    
    {/if}
</div>
