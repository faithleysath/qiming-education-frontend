export interface BaseQuestion {
    id: string;
    text: string;
    explaination: string;
    difficulty: "easy" | "medium" | "hard";
    topic: string;
    tags: string[];
    correct: number;
    wrong: number;
}

export interface JudgementQuestion extends BaseQuestion {
    type: "judgement";
    answer?: boolean;
}

export interface SingleChoiceQuestion extends BaseQuestion {
    type: "single_choice";
    options: {text: string, isCorrect?: boolean}[];
}

export interface MultipleChoiceQuestion extends BaseQuestion {
    type: "multiple_choice";
    options: {text: string, isCorrect?: boolean}[];
}

export interface BlankQuestion extends BaseQuestion {
    type: "blank";
    answer?: string;
}

export interface EssayQuestion extends BaseQuestion {
    type: "essay";
    answer?: string;
}

export type Question = JudgementQuestion | SingleChoiceQuestion | MultipleChoiceQuestion | BlankQuestion | EssayQuestion;