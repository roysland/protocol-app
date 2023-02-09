import Router from 'svelte-spa-router'
import Home from './views/Home.svelte'
import MedicinePage from './views/Medicine.svelte'
import SupplementsPage from './views/Supplements.svelte'
import StoolPage from './views/Stool.svelte'
const routes = {
    '/': Home,
    '/medicine': MedicinePage,
    '/stool': StoolPage,
    '/supplements': SupplementsPage
}

export {
    Router, routes
}