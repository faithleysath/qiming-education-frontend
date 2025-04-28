<script setup lang="ts">
defineProps<{
    logo: string;
    title: string;
    studentNumber: string;
    studentName: string;
}>()
</script>

<template>
    <header>
        <div class="headerContainer">
            <RouterLink class="logobox" to="/">
                <img :src="logo" alt="logo" class="logo">
                <h3>{{ title }}</h3>
            </RouterLink>
            <slot></slot>
            <div class="infobox" v-show="studentNumber && studentName">
                <div class="studentNumber" v-show="studentNumber"><font-awesome-icon icon="fa-solid fa-id-card" />{{ studentNumber }}</div>
                <div class="dropdown">
                    <div class="studentName" v-show="studentName"><font-awesome-icon icon="fa-solid fa-user" />{{ studentName }}</div>
                    <div class="dropdown-content">
                        <button class="logout"><font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket" />登出</button>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<style scoped>

h1, h2, h3 {
    margin: 0;
}

header {
    width: 100%;
    min-width: 350px;
    background-color: #1a73e8;
    border: #1a73e8 1px solid;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
}

.headerContainer {
    max-width: 1000px;
    margin: 10px auto;
    color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.logobox {
    display: flex;
    align-items: center;
    user-select: none;
    color: inherit;
    text-decoration: none;
    transition: opacity .25s;
    -webkit-user-drag: none;
}

.logobox:hover {
    opacity: 0.7;
}

.logo {
    width: auto;
    height: 30px;
    margin-right: 0.8rem;
    -webkit-user-drag: none;
}

.infobox {
    display: flex;
    user-select: none;
}

.infobox svg {
    margin-right: 0.5rem;
}

.dropdown {
    position: relative;
    cursor: pointer;
}

.dropdown-content {
    position: absolute;
    top: 23px;
    left: 50%;
    width: 100%;
    min-width: 4rem;
    height: 2rem;
    background-color: #f5f5f5;
    color: rgb(33, 53, 71);
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 0 0 5px rgba(0,0,0,0.3);
    opacity: 0;
    visibility: hidden;
    transition: all .25s;
    transform: translate(-50%, -4px);
}

.dropdown:hover .studentName {
    color: rgba(235, 235, 235, 0.8);
}

.dropdown:hover .dropdown-content {
    opacity: 1;
    visibility: visible;
    transform: translate(-50%, 0);
}

.logout {
    width: 100%;
    height: 100%;
    background-color: inherit;
    border: none;
    cursor: pointer;
    font-size: 0.9rem;
    transition: all .25s;
}

.logout:hover {
    background-color: #dcdcdc;
}

.studentNumber {
    margin-right: 1.5rem;
    cursor: default;
}

.studentName {
    transition: color .5s;
}

@media (max-width: 1080px) {
    .headerContainer {
        margin: 10px 40px;
    }
}

@media (max-width: 650px) {
    .logobox h3 {
        display: none;
    }
}

@media (max-width: 550px) {
    .studentNumber {
        display: none;
    }
}
</style>