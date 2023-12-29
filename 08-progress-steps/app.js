const { createApp, computed, ref } = Vue;

const data = [
  {
    id: "1",
    text: "1",
  },
  {
    id: "2",
    text: "2",
  },
  {
    id: "3",
    text: "3",
  },
  {
    id: "4",
    text: "4",
  },
];

const ProgressButton = {
  template: `
    <button class="btn" type="button">
        <slot></slot>
    </button>
    `,
};

const Steps = {
  setup(props) {
    const progressWidth = computed(
      () => (props.current / (props.steps.length - 1)) * 100 + "%"
    );

    return {
      progressWidth,
    };
  },
  props: ["steps", "current"],
  template: `
    <div class="progress-container">
        <div class="progress" id="progress" :style="{ width: progressWidth }"></div>
        <div v-for="(step, index) in steps" :key="step.id" class="circle" :class="{ active: index <= current }">{{ step.text }}</div>
    </div>
    `,
};

const App = {
  setup() {
    const current = ref(0);

    const onStepClick = (step) => {
      let currentStep = current.value;
      currentStep += step;

      if (currentStep < 0) {
        currentStep = 0;
      } else if (currentStep > data.length - 1) {
        currentStep = data.length - 1;
      }

      current.value = currentStep;
    };

    return {
      current,
      steps: data,
      onStepClick,
    };
  },
  components: {
    Steps,
    ProgressButton,
  },
  template: `
    <div class="container">
        <steps :steps="steps" :current="current"></steps>
        <progress-button @click="onStepClick(-1)" id="prev">Previous</progress-button>
        <progress-button @click="onStepClick(1)" id="next">Next</progress-button>
    </div>
  `,
};

createApp(App).mount("#app");
