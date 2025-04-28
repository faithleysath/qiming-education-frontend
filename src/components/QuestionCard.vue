<script setup lang="ts">
import { type Question } from '@/models/questions';
import { computed, reactive, ref } from 'vue';
import VueMarkdown from './VueMarkdown.vue';
import Vditor from 'vditor';

const props = defineProps<{question?: Question;}>();

const question: Question = reactive({
    id: '11',
    text: "哈哈",
    explanation: '$e^x$',
    difficulty: 'easy',
    topic: '语文',
    tags: ['asda'],
    type: 'judgement',
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

const blankContent = ref('');
const judgeChoice = ref(null);
const singleChoice = ref(null);
const multipleChoice = ref([]);

const answerResult = ref(false);
const showResult = ref(true);

const submitBtnEnabled = computed(() => {
  return !!((blankContent.value !== '') || (judgeChoice.value !== null) || (singleChoice.value !== null) || (multipleChoice.value.length !== 0));
});
const showNextBtn = ref(false);

let vueEditor: Vditor|null = null;
function handleAfter(editor: Vditor) {
  vueEditor = editor;
//   vueEditor.disabledCache();
//   vueEditor.clearCache();
}

function print() {
    console.log(question.type);
}

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
            <VueMarkdown :source="question.text"></VueMarkdown>
        </div>
        <div class="SubmitSection">
            <input type="text" class="Blank" v-show="question.type === 'blank'" v-model="blankContent" id="blank">
            <VueVditor class="Essay" v-show="question.type === 'essay'" mode="full" @after="handleAfter" :options="{cache:{enable:false},counter:{enable:true,max:100},toolbar: ['headings', 'bold', 'italic', 'strike', 'link', '|', 'list', 'ordered-list', 'check', 'outdent', 'indent', '|', 'quote', 'line', 'code', 'inline-code', 'insert-before', 'insert-after', '|', 'upload', 'table', '|', 'undo', 'redo', '|', 'fullscreen', 'edit-mode', {name: 'more', toolbar: ['both', 'code-theme', 'content-theme', 'outline', 'preview']}]
}"></VueVditor>
            <div class="JudgementArea OptionList" v-show="question.type === 'judgement'">
                <label for="true" :class="{selected: judgeChoice == 'true'}">
                    <input type="radio" name="judge" id="true" value="true" v-model="judgeChoice">正确
                </label>
                <label for="false" :class="{selected: judgeChoice == 'false'}">
                    <input type="radio" name="judge" id="false" value="false" v-model="judgeChoice">错误
                </label>
            </div>
            <div class="SingleChoiceArea OptionList" v-show="question.type === 'single_choice'">
                <label v-for="(item, index) in question.options" :class="{selected: singleChoice === index}">
                    <input type="radio" name="single_choice" :value="index" v-model="singleChoice">
                    <VueMarkdown :source="item.text"></VueMarkdown>
                </label>
            </div>
            <div class="MultipleChoiceArea OptionList" v-show="question.type === 'multiple_choice'">
                <label v-for="(item, index) in question.options" :class="{selected: multipleChoice.includes(index)}">
                    <input type="checkbox" name="multiple_choice" :value="index" v-model="multipleChoice">
                    <VueMarkdown :source="item.text"></VueMarkdown>
                </label>
            </div>
            <div class="ExplanationBlock" v-show="showResult" :class="{incorrect:!answerResult, correct:answerResult}">
                <div>{{ answerResult ? "回答正确" : "回答错误" }}</div>
                <div class="explanation">
                    <VueMarkdown :source="question.explanation"></VueMarkdown>
                </div>
            </div>
            <div v-show="!showResult" style="margin: 20px;"></div>
            <button @click="print" class="submitBtn" :disabled="!submitBtnEnabled" v-show="!showNextBtn">提交</button>
            <button @click="print" class="nextBtn" v-show="showNextBtn">下一题</button>
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

.QuestionText {
    padding: 0 0.2rem;
}

.SubmitSection {
    margin-top: 1.5rem;
}

input.Blank {
    width: 100%;
    border: rgb(224,224,224) 1px solid;
    border-radius: 4px;
    padding: 0.5rem;
    font-size: 0.9rem;
}

/* div.Essay {
    width: 100%;
    min-height: 50px;
    height: auto;
    border: rgb(224,224,224) 1px solid;
    border-radius: 4px;
    padding: 0.5rem;
    font-size: 0.9rem;
} */

.OptionList {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.OptionList label {
    padding: 0.8rem;
    cursor: pointer;
    border: rgb(224,224,224) 1px solid;
    border-radius: 4px;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    gap: 0.6rem;
}

.OptionList label:hover {
    background: rgb(248, 249, 250);
    border-color: rgb(26, 115, 232);
}

.OptionList label.selected {
    background-color: #e8f0fe;
    border-color: #1a73e8;
}

:deep(.OptionList p) {
    margin: 0;
    padding: 0;
}

:deep(.vditor-toolbar) {
    padding-left: 10px !important;
}

:deep(pre.vditor-reset) {
    border: none;
}

@media screen and (max-width: 520px) {
    :deep(.vditor-toolbar__item) {
        padding: 0 6px;
    }
}

.ExplanationBlock {
    margin-top: 20px;
    margin-bottom: 20px;
    padding: 20px;
    border-radius: 4px;
}

.ExplanationBlock.incorrect {
    background-color: #fce8e6;
    color: #d93025;
    border: 1px solid #d93025;
}

.ExplanationBlock.correct {
    background-color: #e6f4ea;
    color: #137333;
    border: 1px solid #137333;
}

.explanation {
    margin-top: 15px;
    padding: 0 15px;
    background: #f8f9fa;
    border-radius: 4px;
    font-size: 14px;
    color: #5f6368;
    overflow: auto;
    box-shadow: inset 0px 2px 8px 2px #d5dee8;
}

.submitBtn {
    width: 100%;
    font-size: 1.2rem;
    line-height: 2.4rem;
    background-color: #1a73e8;
    color: #fff;
    border-radius: 4px;
    border: none;
    transition: all 0.3s ease;
    cursor: pointer;
}

.submitBtn:hover {
    background-color: #1557b0;;
}

.submitBtn:disabled {
    background-color: #cccccc;
  color: #666666;
  cursor: not-allowed;
  opacity: 0.7;
}

.nextBtn {
    width: 100%;
    font-size: 1.2rem;
    line-height: 2.4rem;
    background-color: #34a853;
    color: #fff;
    border-radius: 4px;
    border: none;
    transition: all 0.3s ease;
    cursor: pointer;
}

.nextBtn:hover {
    background-color: #2d9144;;
}
</style>