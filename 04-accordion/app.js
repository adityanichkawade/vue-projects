const { createApp, ref } = Vue;

const questions = [
  {
    id: 1,
    title: "Do I have to allow the use of cookies?",
    info: "Unicorn vinyl poutine brooklyn, next level direct trade iceland. Shaman copper mug church-key coloring book, whatever poutine normcore fixie cred kickstarter post-ironic street art.",
  },
  {
    id: 2,
    title: "How do I change my My Page password?",
    info: "Coloring book forage photo booth gentrify lumbersexual. Migas chillwave poutine synth shoreditch, enamel pin thundercats fashion axe roof party polaroid chartreuse.",
  },
  {
    id: 3,
    title: "What is BankID?",
    info: "Enamel pin fam sustainable woke whatever venmo. Authentic asymmetrical put a bird on it, lumbersexual activated charcoal kinfolk banjo cred pickled sartorial.",
  },
  {
    id: 4,
    title: "Whose birth number can I use?",
    info: "Edison bulb direct trade gentrify beard lo-fi seitan sustainable roof party franzen occupy squid. Knausgaard cronut succulents, scenester readymade shabby chic lyft. Copper mug meh vegan gentrify.",
  },
  {
    id: 5,
    title: "When do I recieve a password ordered by letter?",
    info: "Locavore franzen fashion axe live-edge neutra irony synth af tilde shabby chic man braid chillwave waistcoat copper mug messenger bag. Banjo snackwave blog, microdosing thundercats migas vaporware viral lo-fi seitan ",
  },
];

const Question = {
  setup() {
    let showInfo = ref(false);
    return {
      showInfo,
    };
  },
  props: ["title", "info"],
  template: `
        <article className='question'>
        <header>
        <h4>{{title}}</h4>
        <button class='btn' @click="showInfo = !showInfo">
            <i class="fa" :class="[showInfo ? 'fa-minus-circle' : 'fa-plus-circle']"></i>
        </button>
        </header>
        <p v-if="showInfo">{{info}}</p>
        </article>
    `,
};

const App = {
  components: { Question },
  setup() {
    return {
      questions,
    };
  },
  template: `
        <main>
            <div className='container'>
            <h3>questions and answers about login</h3>
            <section class='info'>
                <question v-for="question in questions" :title="question.title" :info="question.info" :key="question.id">
                </question>
            </section>
            </div>
        </main>
    `,
};

createApp(App).mount("#app");
