const { createApp, ref, onMounted, computed } = Vue;

const url = "https://course-api.com/react-tabs-project";

const App = {
  setup() {
    const loading = ref(true);
    const jobs = ref([]);
    const value = ref(0);

    const fetchJobs = async () => {
      const response = await fetch(url);
      const newJobs = await response.json();
      jobs.value = newJobs;
      loading.value = false;
    };

    const current = computed(() => jobs.value[value.value]);

    onMounted(() => {
      fetchJobs();
    });

    return {
      loading,
      jobs,
      value,
      current,
    };
  },
  template: `
    <template v-if="loading">
        <section class="section loading">
            <h1>Loading...</h1>
        </section>
    </template>
    <template v-else>
    <section class="section">
        <div class="title">
            <h2>experience</h2>
            <div class="underline"></div> 
        </div>
       <div class="jobs-center">
        <div class="btn-container">
            <button v-for="(job, index) in jobs" :key="index" class="job-btn" :class="{'active-btn': index === value}" @click="value = index">{{job.company}}</button>
        </div>
        <article class="job-info">
            <h3>{{current.title}}</h3>
            <h4>{{current.company}}</h4>
            <p class="job-date">{{current.dates}}</p>
            <div v-for="(duty, index) in current.duties" :key="index" class="job-desc">
                <i class="fa fa-angle-double-right job-icon"></i>
                <p>{{duty}}</p>
            </div> 
        </article>
       </div> 
       <button type="button" class="btn">
        more info
      </button>
    </section>
    </template>
  `,
};

createApp(App).mount("#app");
