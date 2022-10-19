<div class="navbar">
    <div class="loading">
        <span class="loader" class:navigating={$navigating} class:finish-loading={!$navigating}></span>
    </div>
    <div class="nav-item-container">
        <span class="material-icons sidemenu p-8">menu</span>
        <!-- <div class="logo">
            LOGO
        </div> -->
        <div class="search-bar">
            <form action="/results" method="get">
                <input type="text" name="search_query" placeholder="Search" required><br><br>
                <input type="submit" class="p-8" value="search">
            </form>
        </div>
        <div class="right-container">
            <span on:click={()=>{$IS_DARK_THEME = !$IS_DARK_THEME}} class="material-icons p-8">{$IS_DARK_THEME ? "dark_mode" : "light_mode"}</span>
            <span class="material-icons p-8">more_vert</span>
        </div>
    </div>
</div>

<style>
.navbar{
    position: sticky;
    width: 100%;
    background-color: var(--translucent-bg);
    z-index: 1;
    top: 0;
}
.loading{
    height: 2px;
}
.loader{
    background-color: red;
    width: 0;
    display: block;
    height: 100%;
    border-radius: 0 3px 3px 0;
}
.nav-item-container{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 56px;
    font-size: 24px;
}
.search-bar{
    max-width: 644px;
    flex-grow: 1;
    margin: 0 16px;
    margin-left: auto;
}
.search-bar form{
    display: flex;
    width: 100%;
    height: 40px;
}
.search-bar input[type="text"]{
    width: 100%;
    font-size: 16px;
    padding: 0 4px;
    border-radius: 4px;
    border-top-right-radius: 0;
    border: 1px solid var(--gray);
    border-bottom-right-radius: 0;
    background-color: var(--translucent-bg);
    color: var(--bg-invert);
    z-index:1;
}
.search-bar input[type="submit"]{
    font-size: 24px;
    border-radius: 4px;
    border-top-left-radius: 0;
    border: 1px solid var(--gray);
    border-bottom-left-radius: 0;
    border-left: 0px;
    font-family: 'Material Icons';
    background-color: var(--translucent-bg);
    color: var(--bg-invert);
}
/* .logo{
    margin-right: auto;
    margin-left: 18px;
} */
.right-container{
    margin-left: auto;
    display: flex;
}
</style>

<script>
import { navigating } from '$app/stores';
import { onMount } from 'svelte';
import { IS_DARK_THEME } from '../store/store';

onMount(()=>{
    IS_DARK_THEME.subscribe((val)=>{
        if(val){
            document.body.classList.add("dark-theme");
            document.body.classList.remove("light-theme");
        }
        if(!val){
            document.body.classList.add("light-theme");
            document.body.classList.remove("dark-theme");
        }
    })
})
</script>