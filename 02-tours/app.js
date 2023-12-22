const { createApp, ref, computed, onMounted } = Vue;

const url = "https://course-api.com/react-tours-project";

const Loading = {
  template: `
    <div className="loading">
      <h1>loading...</h1>
    </div>
    `,
};

const Tour = {
  props: ["id", "image", "info", "name", "price"],
  emits: ["removeTour"],
  setup() {
    const readMore = ref(false);
    return {
      readMore,
    };
  },
  template: `
    <article class="single-tour">
        <img :src="image" :alt="name" />
        <footer>
            <div class="tour-info">
                <h4>{{name}}</h4>
                <h4 class="tour-price">{{price}}</h4>
            </div>
            <p>
                {{readMore ? info : info.substring(0, 200)}}...
                <button @click="readMore = !readMore">
                    {{readMore ? 'show less' : '  read more'}}
                </button>
            </p>
            <button class="delete-btn" @click="$emit('removeTour', id)">
                not interested
            </button>
        </footer>
    </article>
  `,
};

const Tours = {
  props: ["tours", "removeTour"],
  template: `
    <section>
        <div class="title">
        <h2>our tours</h2>
            <div class="underline"></div>
        </div>
        <div class="tour">
            <tour v-for="tour in tours" :id="tour.id" :image="tour.image" :name="tour.name" :price="tour.price" :info="tour.info" :key="tour.id" @remove-tour="removeTour"></tour>
        </div>
    </section>
    `,
  components: {
    Tour,
  },
};

const App = {
  components: {
    Tours,
  },
  setup() {
    const loading = ref(false);
    const tours = ref([]);

    function removeTour(id) {
      tours.value = tours.value.filter((tour) => tour.id !== id);
    }

    async function fetchTours() {
      loading.value = true;
      try {
        const response = await fetch(url);
        const data = await response.json();
        tours.value = data;
        loading.value = false;
      } catch (error) {
        loading.value = false;
        console.log("Error", error);
      }
    }

    onMounted(() => {
      fetchTours();
    });

    return {
      loading,
      tours,
      removeTour,
    };
  },
  template: `
        <main>
            <template v-if="loading">
                <loading></loading>
            </template>
            <template v-if="tours.length === 0">
                <div class='title'>
                <h2>no tours left</h2>
                <button class='btn' @click="fetchTours">
                    refresh
                </button>
                </div>
            </template>
            <template v-else>
                <tours :tours="tours" :remove-tour="removeTour"></tours>
            </template>
        </main>
    `,
};

createApp(App).mount("#app");
