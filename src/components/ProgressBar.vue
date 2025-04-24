<script setup lang="ts">
const props = defineProps<{
    total: number;
    pending: number;
    complete: number;
    width: string;
}>();

const pendingWidth = props.pending / props.total * 100 + '%';
const completeWidth = props.complete / props.total * 100 + '%';
</script>

<template>
    <div class="ProgressBar" :style="{'width': width}">
        <div class="PendingBar" :style="{'width': pendingWidth}"></div>
        <div class="CompleteBar" :style="{'width': completeWidth}"></div>
    </div>
</template>

<style scoped>
div {
    height: 10px; /* Slightly taller for better visibility */
    border-radius: 5px; /* More rounded corners */
    transition: width 0.3s ease; /* Smooth transition */
}

.ProgressBar {
    background-color: #E6E8EB; /* Lighter background */
    position: relative;
    overflow: hidden; /* Hide overflow to prevent visual glitches */
}

.ProgressBar div {
    position: absolute;
    left: 0;
    border-radius: 0;
}

.PendingBar {
    background-color: #67C23A; /* Modern blue */
}

.CompleteBar {
    background-color: rgb(82.4, 155.2, 46.4); /* Modern green */
}
</style>