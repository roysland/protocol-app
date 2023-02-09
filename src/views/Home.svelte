<script>
import TodaysMedicine from "../components/medicine/TodaysMedicine.svelte";
import TodaysSupplement from "../components/supplements/TodaysSupplement.svelte";
import RegisterDayLevel from "../components/daylevel/RegisterDayLevel.svelte";
</script>
<div class="flex flex-col h-full py-2">
    <div class="card w-full bg-primary text-primary-content">
        <div class="card-body">
          <h2 class="card-title">Medisiner</h2>
          <TodaysMedicine></TodaysMedicine>
        </div>
      </div>

      <div class="card w-full bg-secondary text-secondary-content mt-4">
        <div class="card-body">
          <h2 class="card-title">Kosttilskudd</h2>
          <TodaysSupplement></TodaysSupplement>
        </div>
      </div>
    
    <!-- <RegisterDayLevel></RegisterDayLevel> -->
</div>

