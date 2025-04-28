<script setup lang="ts">
import HeaderBar from '@/components/HeaderBar.vue';
import FooterBar from '@/components/FooterBar.vue';
import ProgressBar from '@/components/ProgressBar.vue';
import QuestionCard from '@/components/QuestionCard.vue';
</script>

<template>
    <div class="PageContent">
        <main>
            <HeaderBar :logo="'/logo.png'" :title="'启明教育平台'" :student-number="'202283250010'" :student-name="'李大师'">
                <ProgressBar width="33%" :total="100" :pending="70" :complete="30"></ProgressBar>
            </HeaderBar>
            <div class="PracticeContainer">
                <QuestionCard></QuestionCard>
            </div>
        </main>
        <FooterBar></FooterBar>
    </div>
</template>

<style scoped>
.PageContent {
    min-height: 100vh;
    position: relative;
}

main {
    padding-bottom: 6.6rem;
}

.PracticeContainer {
    max-width: 800px;
    margin: 0 auto;
    margin-top: 20px;
}

@media (max-width: 880px) {
    .PracticeContainer {
        margin: 0 40px;
        margin-top: 20px;
    }
}
</style>