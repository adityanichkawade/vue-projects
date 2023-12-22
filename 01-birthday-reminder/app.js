const { createApp, ref } = Vue;

const data = [
  {
    id: 1,
    name: "Bertie Yates",
    age: 29,
    image:
      "https://res.cloudinary.com/diqqf3eq2/image/upload/v1595959131/person-2_ipcjws.jpg",
  },
  {
    id: 2,
    name: "Hester Hogan",
    age: 32,
    image:
      "https://res.cloudinary.com/diqqf3eq2/image/upload/v1595959131/person-3_rxtqvi.jpg",
  },
  {
    id: 3,
    name: "Larry Little",
    age: 36,
    image:
      "https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883423/person-4_t9nxjt.jpg",
  },
  {
    id: 4,
    name: "Sean Walsh",
    age: 34,
    image:
      "https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883417/person-3_ipa0mj.jpg",
  },
  {
    id: 5,
    name: "Lola Gardner",
    age: 29,
    image:
      "https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883334/person-1_rfzshl.jpg",
  },
];

const BirthdayList = {
  props: ["people"],
  template: `
    <article class="person" v-for="person in people" :key="person.id">
      <img :src="person.image" :alt="person.image"/>
        <div>
          <h4>{{person.name}}</h4>
          <p>{{person.age}} years</p>
        </div>
    </article>
  `,
};

const App = {
  setup() {
    const people = ref(data);

    function clear() {
      people.value = [];
    }

    return {
      people,
      clear,
    };
  },
  components: {
    BirthdayList,
  },
  template: `
    <main>
      <section class="container">
        <h3>{{people.length}} birthdays today</h3>
        <birthday-list :people="people"></birthday-list>
        <button @click="clear">Clear All</button>
      </section>
    </main>
  `,
};

createApp(App).mount("#app");
