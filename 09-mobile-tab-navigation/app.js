const { createApp, ref } = Vue;

const data = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1053&q=80",
    alt: "home",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
    alt: "work",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1266&q=80",
    alt: "blog",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80",
    alt: "about",
  },
];

const tabData = [
  {
    id: 1,
    iconCls: "fa-home",
    title: "Home",
  },
  {
    id: 2,
    iconCls: "fa-box",
    title: "Work",
  },
  {
    id: 3,
    iconCls: "fa-book-open",
    title: "Blog",
  },
  {
    id: 4,
    iconCls: "fa-users",
    title: "About",
  },
];

const PhoneContent = {
  props: ["items", "activeId"],
  template: `
        <img v-for="item in items" :key="item.id" :src="item.src" :alt="item.alt" class="content" :class="{ show: activeId === item.id }">    
    `,
};

const PhoneTabs = {
  props: ["items", "activeId"],
  emits: ["tabClick"],
  template: `
  <nav>
    <ul>
      <li v-for="item in items" :key="item.id" @click="$emit('tabClick', item.id)" :class="{ active: item.id === activeId }">
        <i class="fas" :class="item.iconCls"></i>
        <p>{{ item.title }}</p>
      </li>
    </ul>
  </nav>
  `,
};

const Phone = {
  setup() {
    const contentItems = ref(data);
    const tabItems = ref(tabData);
    const activeId = ref(1);

    const onTabClick = (tabId) => {
      activeId.value = tabId;
    };

    return {
      contentItems,
      tabItems,
      activeId,
      onTabClick,
    };
  },
  components: {
    PhoneContent,
    PhoneTabs,
  },
  template: `
        <div class="phone">
          <phone-content :active-id="activeId" :items="contentItems"></phone-content>
          <phone-tabs @tab-click="onTabClick" :active-id="activeId" :items="tabItems"></phone-tabs>
        </div>
    `,
};

const App = {
  components: {
    Phone,
  },
  template: `
        <phone></phone>
    `,
};

const app = createApp(App);
app.mount("#app");
