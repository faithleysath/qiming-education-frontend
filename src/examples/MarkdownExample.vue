<template>
  <div class="markdown-example">
    <h1>VueMarkdown Component Examples</h1>
    
    <!-- Basic usage with source prop -->
    <div class="example-section">
      <h2>Basic Usage</h2>
      <VueMarkdown :source="basicExample" />
    </div>
    
    <!-- Table of Contents example -->
    <div class="example-section">
      <h2>Table of Contents Example</h2>
      <div id="my-toc"></div>
      <VueMarkdown 
        :source="tocExample" 
        :toc="true" 
        tocId="my-toc"
        tocClass="custom-toc"
        :tocFirstLevel="1"
        :tocLastLevel="3"
        tocAnchorLinkSymbol="¶"
      />
    </div>
    
    <!-- Math expressions with KaTeX -->
    <div class="example-section">
      <h2>Mathematical Expressions (KaTeX)</h2>
      <VueMarkdown :source="mathExample" />
    </div>
    
    <!-- Task Lists -->
    <div class="example-section">
      <h2>Task Lists</h2>
      <VueMarkdown :source="taskListExample" />
    </div>
    
    <!-- Advanced formatting -->
    <div class="example-section">
      <h2>Advanced Formatting</h2>
      <VueMarkdown :source="advancedExample" />
    </div>
    
    <!-- Using slot instead of source prop -->
    <div class="example-section">
      <h2>Using Slot Content</h2>
      <VueMarkdown :show="false">
        <template #markdown="{ render }">
          <div v-html="render(slotExample)"></div>
        </template>
      </VueMarkdown>
    </div>
    
    <!-- Code Highlighting Example -->
    <div class="example-section">
      <h2>Code Highlighting Example</h2>
      <VueMarkdown :source="codeExample" />
    </div>
    
    <!-- Table Example with Default Styling -->
    <div class="example-section">
      <h2>Table Example with Default Styling</h2>
      <VueMarkdown :source="tableExample" />
    </div>
    
    <!-- Custom configuration -->
    <div class="example-section">
      <h2>Custom Configuration</h2>
      <VueMarkdown 
        :source="customConfigExample"
        :html="false"
        :breaks="false"
        :linkify="false"
        :emoji="false"
        tableClass="custom-table"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import VueMarkdown from '../components/VueMarkdown.vue'

export default defineComponent({
  name: 'MarkdownExample',
  components: {
    VueMarkdown
  },
  setup() {
    const basicExample = ref(`
# Heading 1
## Heading 2
### Heading 3

This is a paragraph with **bold text**, *italic text*, and ~~strikethrough~~.

[Link to Vue.js](https://vuejs.org)

> This is a blockquote

\`\`\`javascript
// Code block with syntax highlighting
function hello() {
  console.log('Hello, world!');
  const a = 1145143
}
\`\`\`

Inline code: \`const x = 5;\`

![Alt text for an image](https://vuejs.org/images/logo.png)

| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Row 1    | Data     | Data     |
| Row 2    | Data     | Data     |

Horizontal rule:

---
`);

    const tocExample = ref(`
# Document Title

## Introduction
This is the introduction section.

## Chapter 1
This is chapter 1 content.

### Section 1.1
This is section 1.1 content.

### Section 1.2
This is section 1.2 content.

## Chapter 2
This is chapter 2 content.

### Section 2.1
This is section 2.1 content.

#### Subsection 2.1.1
This is subsection 2.1.1 content.

## Conclusion
This is the conclusion section.
`);

    const mathExample = ref(`
## Inline Math

Einstein's famous equation: $E = mc^2$

## Block Math

The quadratic formula:

$$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$

## Matrix

$$
\\begin{pmatrix}
a & b \\\\
c & d
\\end{pmatrix}
$$

## Integral

$$\\int_{a}^{b} f(x) \\, dx$$

## Sum

$$\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}$$
`);

    const taskListExample = ref(`
## Project Tasks

- [x] Create project structure
- [x] Install dependencies
- [ ] Implement core features
  - [x] Feature A
  - [ ] Feature B
  - [ ] Feature C
- [ ] Write documentation
- [ ] Deploy to production
`);

    const advancedExample = ref(`
## Emoji Support
:smile: :heart: :thumbsup: :cake: :rocket:

## Subscript and Superscript
H~2~O is water and 2^10^ is 1024.

## Footnotes
Here is a footnote reference[^1] and another[^longnote].

[^1]: Here is the footnote.
[^longnote]: Here's a longer footnote with multiple paragraphs.

    Subsequent paragraphs are indented to show that they belong to the previous footnote.

## Definition Lists
Term 1
: Definition 1

Term 2
: Definition 2a
: Definition 2b

## Abbreviations
*[HTML]: Hyper Text Markup Language
*[W3C]: World Wide Web Consortium

The HTML specification is maintained by the W3C.

## Inserted Text
++Inserted text++

## Marked/Highlighted Text
==Highlighted text==
`);

    const customConfigExample = ref(`
# Custom Configuration Example

<div>This HTML will not be rendered when html=false</div>

This line break
will not create a new paragraph when breaks=false.

www.example.com will not be automatically linked when linkify=false.

:smile: emoji will not be converted when emoji=false.

| Table | Example |
|-------|---------|
| Data  | Data    |
`);

    const slotExample = ref(`# Markdown in Slot
This content is provided via slot instead of the source prop.

- Advantage 1: Direct access to the markdown content
- Advantage 2: Can be dynamically updated
- Advantage 3: Works with Vue's reactivity system
`);

    const codeExample = ref(`
## JavaScript Example

\`\`\`javascript
// This is a JavaScript code block
function calculateFactorial(n) {
  if (n === 0 || n === 1) {
    return 1;
  }
  return n * calculateFactorial(n - 1);
}

// Calculate factorial of 5
const result = calculateFactorial(5);
console.log(\`Factorial of 5 is \${result}\`);
\`\`\`

## Python Example

\`\`\`python
# This is a Python code block
def calculate_factorial(n):
    if n == 0 or n == 1:
        return 1
    return n * calculate_factorial(n - 1)

# Calculate factorial of 5
result = calculate_factorial(5)
print(f"Factorial of 5 is {result}")
\`\`\`

## HTML Example

\`\`\`html
<!-- This is an HTML code block -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Sample Page</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      color: #1a73e8;
    }
  </style>
</head>
<body>
  <h1>Hello World</h1>
  <button onclick="alert('Hello!')">Click Me</button>
</body>
</html>
\`\`\`

## CSS Example

\`\`\`css
/* This is a CSS code block */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
}

.button {
  background-color: #1a73e8;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}
\`\`\`
`);

    const tableExample = ref(`
## Table with Default Styling

| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Row 1, Cell 1 | Row 1, Cell 2 | Row 1, Cell 3 |
| Row 2, Cell 1 | Row 2, Cell 2 | Row 2, Cell 3 |
| Row 3, Cell 1 | Row 3, Cell 2 | Row 3, Cell 3 |

## Another Table Example

| Feature | Description | Status |
|---------|-------------|--------|
| Markdown Support | Basic markdown syntax | ✅ |
| Table Styling | Custom table styling with blue theme | ✅ |
| Math Expressions | KaTeX integration | ✅ |
| Emoji Support | Convert emoji shortcodes | ✅ |
| Task Lists | Checkbox lists | ✅ |
`);

    return {
      basicExample,
      tocExample,
      mathExample,
      taskListExample,
      advancedExample,
      customConfigExample,
      tableExample,
      slotExample,
      codeExample
    }
  }
})
</script>

<style scoped>
.markdown-example {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.example-section {
  margin-bottom: 40px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

:deep(.custom-toc) {
  background-color: #f5f5f5;
  padding: 15px;
  border-radius: 4px;
  margin-bottom: 20px;
}

:deep(.custom-table) {
  width: 100%;
  border-collapse: collapse;
  border: 2px solid #42b883;
}

:deep(.custom-table th),
:deep(.custom-table td) {
  border: 1px solid #42b883;
  padding: 8px;
}
</style>
