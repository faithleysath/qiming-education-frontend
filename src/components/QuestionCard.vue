<script setup lang="ts">
import { type Question } from '@/models/questions';
import { reactive } from 'vue';
import VueMarkdown from './VueMarkdown.vue';

const props = defineProps<{question?: Question;}>();

const question: Question = reactive({
    id: '11',
    text: '床前明月光的下雨句',
    explaination: '以山山水水',
    difficulty: 'easy',
    topic: '语文',
    tags: ['asda'],
    type: 'blank',
    correct: 1,
    wrong: 0
});

const question2display = {
    "blank": "填空题",
    "essay": "问答题",
    "judgement": "判断题",
    "single_choice": "单选题",
    "multiple_choice": "多选题"
};

const difficulty2bool = {
    "easy": [true, false, false],
    "medium": [true, true, false],
    "hard": [true, true, true]
};

</script>

<template>
    <div class="QuestionCard">
        <div class="QuestionHeader">
            <div :class="`QuestionType ${question.type}`">{{ question2display[question.type] }}</div>
            <div class="QuestionHeaderRight">
                <div class="StatBadge correct" :class="{active: question.correct > 0}">
                    <i class="stat-icon">✓</i>
                    <span class="StatCorrect">{{ question.correct }}</span>
                </div>
                <div class="StatBadge wrong">
                    <i class="stat-icon">✕</i>
                    <span class="StatWrong">{{ question.wrong }}</span>
                </div>
                <div :class="`difficulty ${question.difficulty}`">
                    <i class="difficulty-dot" v-for="active in difficulty2bool[question.difficulty]" :class="{active: active}"></i>
                </div>
            </div>
        </div>
        <div class="QuestionText">
            <VueMarkdown source="$ e^x $"></VueMarkdown>
        </div>
    </div>
</template>

<style scoped>
.QuestionCard {
    width: 100%;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    padding: 1.5rem;
    user-select: none;
    -webkit-user-drag: none;
}

.QuestionHeader {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.QuestionType {
    height: 2rem;
    font-size: 0.9rem;
    font-weight: 500;
    line-height: 2rem;
    padding: 0 0.7rem;
    border-radius: 0.9rem;
}

.single_choice { background: #e8f0fe; color: #1a73e8; }
.multiple_choice { background: #fce8e6; color: #d93025; }
.judgement { background: #e6f4ea; color: #137333; }
.blank {background: #fff3e0; color: #e65100;}
.essay { background: #f3e8fd; color: #9334e6; }

.QuestionHeaderRight {
    display: flex;
}

.StatBadge {
    display: flex;
    align-items: center;
    gap: 0.15rem;
    font-size: 0.8rem;
    padding: 2px 8px;
    border-radius: 12px;
}

.StatBadge.correct {
    background-color: #e6f4ea;
    color: #137333;
    margin-right: 0.5rem;
    transition: all 0.25s ease;
}

.StatBadge.correct.active {
    cursor: pointer;
}

.StatBadge.correct.active:hover {
    transform: scale(1.1);
}

.StatBadge.wrong {
    background-color: #fce8e6;
    color: #d93025;
    margin-right: 1.5rem;
}

.stat-icon {
    font-size: 0.7rem;
    font-style: normal;
}

.difficulty {
    display: flex;
    gap: 0.2rem;
    align-items: center;
    transition: all 0.3s ease;
}

.difficulty-dot {
    display: inline-block;
    width: 0.6rem;
    height: 0.6rem;
    background-color: #e0e0e0;
    border-radius: 50%;
    box-shadow: 0 1px 2px rgba(0,0,0,0.1);
}

/* 简单难度 */
.difficulty.easy .difficulty-dot.active { background: #34a853; }
/* 中等难度 */
.difficulty.medium .difficulty-dot.active { background: #fbbc04; }
/* 困难难度 */
.difficulty.hard .difficulty-dot.active { background: #ea4335; }
</style>