const { createApp, ref } = Vue;

const data = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1558979158-65a1eaa08691?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
    title: "Explore The World",
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1572276596237-5db2c3e16c5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
    title: "Wild Forest",
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1353&q=80",
    title: "Sunny Beach",
  },
  {
    id: 4,
    img: "https://images.unsplash.com/photo-1551009175-8a68da93d5f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80",
    title: "City on Winter",
  },
  {
    id: 5,
    img: "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
    title: "Mountains - Clouds",
  },
];

const ImagePanel = {
  props: ["isActive", "img", "title"],
  emits: ["panelClick"],
  template: `
        <div class="panel" @click="$emit('panelClick')" :class="{ 'active': isActive }" :style="{ 'background-image': 'url(' + img + ')' }">
            <h3>{{title}}</h3>
        </div>
    `,
};

const App = {
  setup() {
    const items = ref(data);
    const activeTab = ref(1);

    const onPanelClick = (id) => {
      activeTab.value = id;
    };

    return {
      items,
      activeTab,
      onPanelClick,
    };
  },
  components: {
    ImagePanel,
  },
  template: `
    <div class="container">
        <image-panel v-for="item in items" @panel-click="onPanelClick(item.id)"  :isActive="item.id === activeTab" :img="item.img" :title="item.title"></image-panel>
    </div>
  `,
};

createApp(App).mount("#app");
