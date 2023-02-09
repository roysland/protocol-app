<script>
import { onMount, onDestroy, createEventDispatcher } from 'svelte'
export let label
export let checked
const dispatch = createEventDispatcher()
let swiper
let swiperTop
let swiperBg
let mouseIsDown = false
let initialMouse = 0
let slideMovementTotal = 0
const startSwipe = (event) => {
    mouseIsDown = true
    slideMovementTotal = swiper.offsetWidth - swiperTop.offsetWidth + 50
}
const endSwipe = (event) => {
    if (!mouseIsDown) return
    mouseIsDown = false
    let currentMouse = event.clientX || event.changedTouches[0].pageX
    let relativeMouse = currentMouse - initialMouse
    let slidePercent = 1 - (relativeMouse / slideMovementTotal)
    if (relativeMouse >= slideMovementTotal + 150) {
        swiper.classList.add('checked')
        swiperTop.style.left = `40px`
        dispatch('checked')
        dismountListeners()
    } else {
        swiperTop.style.left = 0
        dispatch('unchecked')
    }

    swiperTop.style.opacity = 1
}

const moveSwipe = (event) => {
    if (!mouseIsDown) return
    let currentMouse = event.clientX || event.touches[0].pageX
    
    let relativeMouse = currentMouse - initialMouse
    let slidePercent = 1 - (relativeMouse / slideMovementTotal)
    swiperBg.style.opacity = -( slidePercent / 5)
    if (relativeMouse <= 0) {
        swiperTop.style.left = '10px'
    }
    if (relativeMouse >= slideMovementTotal + 150) {
        swiperBg.style.opacity = 1
        return
    }
    
    swiperTop.style.left = `${relativeMouse}px`
}

const dismountListeners = () => {
    swiperTop.removeEventListener('mousedown', startSwipe)
    swiperTop.removeEventListener('mouseup', endSwipe)
    swiperTop.removeEventListener('mousemove', moveSwipe)
    swiperTop.removeEventListener('touchstart', startSwipe)
    swiperTop.removeEventListener('touchend', endSwipe)
    swiperTop.removeEventListener('touchmove', moveSwipe)
}

onMount(() => {
    if (!checked) {

        swiperTop.addEventListener('mousedown', startSwipe)
        swiperTop.addEventListener('mouseup', endSwipe)
        swiperTop.addEventListener('mousemove', moveSwipe)
        swiperTop.addEventListener('touchstart', startSwipe)
        swiperTop.addEventListener('touchend', endSwipe)
        swiperTop.addEventListener('touchmove', moveSwipe)
    }
})
onDestroy(() => {
    dismountListeners()
})
</script>

<div class="swipe-check shadow bg-base-100" data-checked={checked} bind:this={swiper}>
    <div class="swipe-check-bg" bind:this={swiperBg}>
        <span>✓</span>
    </div>
    <div class="swipe-top shadow bg-base-100" bind:this={swiperTop}>
        {label}
    </div>
</div>

<style lang="scss">
    .swipe-check {
        position: relative;
        background-color: #ccc;
        margin-bottom: 1rem;
        overflow: hidden;
        border-radius: var(--rounded-btn, 0.5rem);
        margin: 1rem;
        border: 1px solid hsl(var(--n));
        .swipe-check-bg {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            opacity: 0;
            font-size: 2rem;
            color: #fff;
            padding: 0 0.5rem;
            background-color: hsl(var(--su));
        }
        .swipe-top {
            background-color: hsl(var(--b1));
            display: block;
            position: relative;
            z-index: 2;
            padding: 0.5rem 1rem;
            user-select: none;
            cursor: grab;
            border-radius: var(--rounded-btn, 0.5rem);
            font-weight: bold;
            
        }
        &[data-checked] {
            .swipe-top {
                left: 40px;
                color: hsl(var(--su));
            }
            .swipe-check-bg {
                opacity: 1;
            }
        }
    }
</style>