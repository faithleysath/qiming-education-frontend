import { createApp } from 'vue'
import 'normalize.css'
import '@/style.css'
import 'katex/dist/katex.min.css'
import App from '@/App.vue'
import HomeView from '@/views/HomeView.vue'
import PracticeView from '@/views/PracticeView.vue'
import MarkdownDemoView from '@/views/MarkdownDemoView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faIdCard, faUser, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faIdCard, faUser, faArrowRightFromBracket)

const routes = [
    { path: '/', component: HomeView },
    { path: '/practice', component: PracticeView},
    { path: '/markdown-demo', component: MarkdownDemoView}
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

const pinia = createPinia()

createApp(App).component('font-awesome-icon', FontAwesomeIcon).use(router).use(pinia).mount('#app')
