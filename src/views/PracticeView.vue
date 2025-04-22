<script setup lang="ts">
import HeaderBar from '@/components/HeaderBar.vue';
import FooterBar from '@/components/FooterBar.vue';
import ProgressBar from '@/components/ProgressBar.vue';
</script>

<template>
    <div class="PageContent">
        <main>
            <HeaderBar :logo="'/logo.png'" :title="'启明教育平台'" :student-number="'202283250010'" :student-name="'李大师'">自由刷题界面</HeaderBar>
            <div class="PracticeContainer">
                <ProgressBar :width="'500px'" :total="100" :pending="70" :complete="30"></ProgressBar>
            </div>
        </main>
        <FooterBar></FooterBar>
    </div>
</template>