<template>
  <div class="MarkdownBlock" v-show="show" v-html="renderedContent"></div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onUpdated, onMounted } from 'vue'
import MarkdownIt from 'markdown-it'
import {full as emoji} from 'markdown-it-emoji'
import subscript from 'markdown-it-sub'
import superscript from 'markdown-it-sup'
import footnote from 'markdown-it-footnote'
import deflist from 'markdown-it-deflist'
import abbreviation from 'markdown-it-abbr'
import insert from 'markdown-it-ins'
import mark from 'markdown-it-mark'
import toc from 'markdown-it-toc-and-anchor'
import { katex } from "@mdit/plugin-katex"
import tasklists from 'markdown-it-task-lists'
import Prism from "prismjs";

// 定义 props
const props = defineProps({
  watches: {
    type: Array as () => string[],
    default: () => ['source', 'show', 'toc']
  },
  source: {
    type: String,
    default: ''
  },
  show: {
    type: Boolean,
    default: true
  },
  highlight: {
    type: Boolean,
    default: true
  },
  html: {
    type: Boolean,
    default: true
  },
  xhtmlOut: {
    type: Boolean,
    default: true
  },
  breaks: {
    type: Boolean,
    default: true
  },
  linkify: {
    type: Boolean,
    default: true
  },
  emoji: {
    type: Boolean,
    default: true
  },
  typographer: {
    type: Boolean,
    default: true
  },
  langPrefix: {
    type: String,
    default: 'language-'
  },
  quotes: {
    type: String,
    default: '“”‘’',
  },
  tableClass: {
    type: String,
    default: 'table'
  },
  taskLists: {
    type: Boolean,
    default: true
  },
  toc: {
    type: Boolean,
    default: false
  },
  tocId: {
    type: String,
    default: undefined
  },
  tocClass: {
    type: String,
    default: 'table-of-contents'
  },
  tocFirstLevel: {
    type: Number,
    default: 2
  },
  tocLastLevel: {
    type: Number,
    default: undefined
  },
  tocAnchorLink: {
    type: Boolean,
    default: true
  },
  tocAnchorClass: {
    type: String,
    default: 'toc-anchor'
  },
  tocAnchorLinkSymbol: {
    type: String,
    default: '#'
  },
  tocAnchorLinkSpace: {
    type: Boolean,
    default: true
  },
  tocAnchorLinkClass: {
    type: String,
    default: 'toc-anchor-link'
  },
  anchorAttributes: {
    type: Object,
    default: () => ({})
  }
})

const sourceData = ref(props.source)

// 计算有效的 tocLastLevel
const tocLastLevelComputed = computed(() => {
  return props.tocLastLevel && props.tocLastLevel > props.tocFirstLevel 
    ? props.tocLastLevel 
    : props.tocFirstLevel + 1
})

// 创建 markdown-it 实例并配置所有插件
const createMarkdownIt = () => {
  const md = new MarkdownIt()
    .use(subscript)
    .use(superscript)
    .use(footnote)
    .use(deflist)
    .use(abbreviation)
    .use(insert)
    .use(mark)
    .use(katex)
    .use(tasklists, { enabled: props.taskLists })

  if (props.emoji) {
    md.use(emoji)
  }

  md.set({
    html: props.html,
    xhtmlOut: props.xhtmlOut,
    breaks: props.breaks,
    linkify: props.linkify,
    typographer: props.typographer,
    langPrefix: props.langPrefix,
    quotes: props.quotes,
  })

  md.renderer.rules.table_open = () => `<table class="${props.tableClass}">\n`
  
  let defaultLinkRenderer = md.renderer.rules.link_open ||
    function (tokens, idx, options, _env, self) {
      return self.renderToken(tokens, idx, options)
    }
  
  md.renderer.rules.link_open = (tokens, idx, options, _env, self) => {
    Object.keys(props.anchorAttributes).forEach((attribute) => {
      let aIndex = tokens[idx].attrIndex(attribute)
      let value = props.anchorAttributes[attribute]
      if (aIndex < 0) {
        tokens[idx].attrPush([attribute, value]) // add new attribute
      } else {
        // Ensure attrs exists before accessing it
        if (tokens[idx].attrs) {
          tokens[idx].attrs[aIndex][1] = value
        }
      }
    })
    return defaultLinkRenderer(tokens, idx, options, _env, self)
  }

  if (props.toc) {
    md.use(toc, {
      tocClassName: props.tocClass,
      tocFirstLevel: props.tocFirstLevel,
      tocLastLevel: tocLastLevelComputed.value,
      anchorLink: props.tocAnchorLink,
      anchorLinkSymbol: props.tocAnchorLinkSymbol,
      anchorLinkSpace: props.tocAnchorLinkSpace,
      anchorClassName: props.tocAnchorClass,
      anchorLinkSymbolClassName: props.tocAnchorLinkClass,
      tocCallback: (_tocMarkdown: string, _tocArray: any[], tocHtml: string) => {
        if (tocHtml && props.tocId) {
          const tocElement = document.getElementById(props.tocId)
          if (tocElement) {
            tocElement.innerHTML = tocHtml
          }
        }
      },
    })
  }

  return md
}

// 渲染 markdown 内容
const renderedContent = computed(() => {
  if (!props.show) return ''
  
  const md = createMarkdownIt()
  return md.render(sourceData.value)
})

// 监听 source 属性变化
watch(() => props.source, (newVal) => {
  sourceData.value = newVal
})

// 更新后重新渲染代码高亮
onUpdated(() => {
  setTimeout(() => {
    Prism.highlightAll(); // 修改内容后重新渲染
  }, 100)
})

// 挂载后渲染代码高亮
onMounted(() => {
  setTimeout(() => {
    Prism.highlightAll(); // 修改内容后重新渲染
  }, 100)
})
</script>

<style>
/* Default table styling with the site's blue theme - more minimal */
.table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
}

.table th {
  color: #1a73e8;
  font-weight: bold;
  text-align: left;
  padding: 10px;
  border-bottom: 2px solid #1a73e8;
}

.table td {
  padding: 8px 10px;
  border-bottom: 1px solid #e1e4e8;
}

.table tr:hover {
  background-color: #f6f8fa;
}

pre {
  border-radius: 6px;
  padding: 16px;
  overflow: auto;
  margin: 16px 0;
  border: 1px solid #3e4451;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

::-webkit-scrollbar {
  display: none;
}

:not(pre) > code {
  background-color: rgba(27, 31, 35, 0.1);
  border-radius: 3px;
  padding: 0.2em 0.4em;
  margin: 0;
  font-size: 85%;
}

img {
  display: block;
  margin: 0 auto;
}

p {
  line-height: 1.5rem;
}
</style>
