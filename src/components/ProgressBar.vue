<script setup lang="ts">
const props = defineProps({
    total: {type: Number, required: true},
    pending: {type: Number, required: true},
    complete: {type: Number, required: true},
    width: {type: String, required: true},
});

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
    background-color: #e0e0e0; /* Lighter background */
    position: relative;
    overflow: hidden; /* Hide overflow to prevent visual glitches */
}

.ProgressBar div {
    position: absolute;
    left: 0;
    border-radius: 0;
}

.PendingBar {
    background-color: #2979FF; /* Modern blue */
}

.CompleteBar {
    background-color: #67C23A; /* Modern green */
}
</style>