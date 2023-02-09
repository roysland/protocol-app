<script>
import { Router, routes } from './routes.js'
import NavBar from "./lib/NavBar.svelte";
</script>
<NavBar></NavBar>
<main class="mx-4">
<Router {routes}></Router>
</main>

<style lang="scss">
main {
    height: block-size;
}
</style>