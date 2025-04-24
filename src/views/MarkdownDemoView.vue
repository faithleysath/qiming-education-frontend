<template>
  <div class="PageContent">
    <main>
      <HeaderBar :logo="'/logo.png'" :title="'启明教育平台'" :student-number="'202283250010'" :student-name="'李大师'"></HeaderBar>
      <div class="markdown-demo">
        <h1>Markdown 组件演示</h1>
        <p>本页面展示了 VueMarkdown 组件的各种用法和功能</p>
        
        <MarkdownExample />
      </div>
    </main>
    <FooterBar></FooterBar>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HeaderBar from '@/components/HeaderBar.vue'
import FooterBar from '@/components/FooterBar.vue'
import MarkdownExample from '../examples/MarkdownExample.vue'

export default defineComponent({
  name: 'MarkdownDemoView',
  components: {
    HeaderBar,
    FooterBar,
    MarkdownExample
  }
})
</script>

<style scoped>
.PageContent {
  min-height: 100vh;
  position: relative;
}

main {
  padding-bottom: 6.6rem;
}

.markdown-demo {
  max-width: 1000px;
  margin: 20px auto;
  padding: 20px;
}

@media (max-width: 1080px) {
  .markdown-demo {
    margin: 20px 40px;
  }
}
</style>
