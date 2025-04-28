<script setup lang="ts">
import HeaderBar from '@/components/HeaderBar.vue';
import FooterBar from '@/components/FooterBar.vue';
import { reactive } from 'vue';

const menuItems = reactive([
    {
        title : "自由练习",
        desc : "在老师指定的题库范围内自由练习",
        buttonText : "开始练习",
        buttonUrl : "/practice"
    },
    {
        title : "Markdown演示",
        desc : "VueMarkdown组件的使用示例",
        buttonText : "查看演示",
        buttonUrl : "/markdown-demo"
    },
    {
        title : "测验中心",
        desc : "查看当前或历史的测验",
        buttonText : "进入测验",
        buttonUrl : "/exam"
    },
    {
        title : "测验中心",
        desc : "查看当前或历史的测验",
        buttonText : "进入测验",
        buttonUrl : "/exam"
    }
]);
</script>

<template>
    <div class="PageContent">
        <main>
            <HeaderBar :logo="'/logo.png'" :title="'启明教育平台'" :student-number="'202283250010'" :student-name="'李大师'"></HeaderBar>
            <div class="HomeContainer">
                <div class="WelcomeSection">
                    <h1 class="MainTitle">欢迎使用启明教育平台</h1>
                    <p class="SubTitle">选择下方功能开始你的学习之旅</p>
                </div>
                <ul class="MenuCardGroup">
                    <li class="MenuCard" v-for="menuItem in menuItems">
                        <h2>{{ menuItem.title }}</h2>
                        <span class="MenuDesc">{{ menuItem.desc }}</span>
                        <RouterLink :to="menuItem.buttonUrl">{{ menuItem.buttonText }}</RouterLink>
                    </li>
                </ul>
            </div>
        </main>
        <FooterBar></FooterBar>
    </div>
</template>

<style scoped>
h1, h2, h3 {
    margin: 0;
}

.PageContent {
    min-height: 100vh;
    position: relative;
}

main {
    padding-bottom: 6.6rem;
}

.HomeContainer {
    max-width: 1000px;
    margin: 0 auto;
    text-align: center;
}

@media (max-width: 1080px) {
    .HomeContainer {
        margin: 0 40px;
    }
}

.WelcomeSection {
    margin: 40px 0;
    user-select: none;
}

.MainTitle {
    color: #1a73e8;
    margin-bottom: 1rem;
}

.SubTitle {
    margin: 0;
}

.MenuCardGroup {
    padding: 0;
    list-style: none;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
}

.MenuCard {
    display: flex;
    flex-direction: column;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    padding: 1.5rem;
    align-items: center;
    cursor: pointer;
    transition: all 0.3s ease;
    user-select: none;
    -webkit-user-drag: none;
}

.MenuCard:hover {
    transform: translateY(-5px);
}

.MenuCard h2 {
    color: #1a73e8;
    margin-bottom: 0.8rem;
}

.MenuDesc {
    color: #5f6368;
    margin-bottom: 1.3rem;
}

.MenuCard a {
    display: block;
    text-decoration: none;
    background-color: #1a73e8;
    color: #fff;
    width: 80%;
    height: 2.5rem;
    text-align: center;
    font-size: 1rem;
    line-height: 2.5rem;
    border-radius: 4px;
    transition: all 0.3s ease;
}

.MenuCard a:hover {
    background-color: #1557b0;
    -webkit-user-drag: none;
}
</style>
