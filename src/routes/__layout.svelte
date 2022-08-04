<svelte:head>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto&display=swap">
</svelte:head>

<Navbar/>
<slot></slot>

<script>
import "../css/global.css"
import "../css/typography.css"
import "../css/utility.css"

import Navbar from "../components/Navbar.svelte";
</script>