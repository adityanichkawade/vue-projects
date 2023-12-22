const { ref, createApp, computed } = Vue;

const reviews = [
  {
    id: 1,
    name: "susan smith",
    job: "web developer",
    image:
      "https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883334/person-1_rfzshl.jpg",
    text: "I'm baby meggings twee health goth +1. Bicycle rights tumeric chartreuse before they sold out chambray pop-up. Shaman humblebrag pickled coloring book salvia hoodie, cold-pressed four dollar toast everyday carry",
  },
  {
    id: 2,
    name: "anna johnson",
    job: "web designer",
    image:
      "https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883409/person-2_np9x5l.jpg",
    text: "Helvetica artisan kinfolk thundercats lumbersexual blue bottle. Disrupt glossier gastropub deep v vice franzen hell of brooklyn twee enamel pin fashion axe.photo booth jean shorts artisan narwhal.",
  },
  {
    id: 3,
    name: "peter jones",
    job: "intern",
    image:
      "https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883417/person-3_ipa0mj.jpg",
    text: "Sriracha literally flexitarian irony, vape marfa unicorn. Glossier tattooed 8-bit, fixie waistcoat offal activated charcoal slow-carb marfa hell of pabst raclette post-ironic jianbing swag.",
  },
  {
    id: 4,
    name: "bill anderson",
    job: "the boss",
    image:
      "https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883423/person-4_t9nxjt.jpg",
    text: "Edison bulb put a bird on it humblebrag, marfa pok pok heirloom fashion axe cray stumptown venmo actually seitan. VHS farm-to-table schlitz, edison bulb pop-up 3 wolf moon tote bag street art shabby chic. ",
  },
];

function useSlide(totalSlides) {
  const currentSlide = ref(0);

  function checkNumber(number) {
    if (number > totalSlides - 1) {
      return 0;
    }

    if (number < 0) {
      return totalSlides - 1;
    }

    return number;
  }

  function nextSlide() {
    currentSlide.value = checkNumber(currentSlide.value + 1);
  }

  function prevSlide() {
    currentSlide.value = checkNumber(currentSlide.value - 1);
  }

  function randomSlide() {
    let randomNumber = Math.floor(Math.random() * totalSlides);
    if (randomNumber === currentSlide.value) {
      randomNumber = currentSlide.value + 1;
    }

    currentSlide.value = checkNumber(randomNumber);
  }

  return {
    nextSlide,
    prevSlide,
    randomSlide,
    currentSlide,
  };
}

const Review = {
  setup() {
    const { currentSlide, nextSlide, prevSlide, randomSlide } = useSlide(
      reviews.length
    );

    const { image, name, job, text } = reviews[currentSlide.value];

    return {
      image,
      name,
      job,
      text,
      currentSlide,
      nextSlide,
      prevSlide,
      randomSlide,
      reviews,
    };
  },
  template: `
    <article class='review'>
        <div class='img-container'>
            <img :src="image" :alt="name" class='person-img' />
            <span class='quote-icon'>
                <i class="fa fa-quote-right" aria-hidden="true"></i>
            </span>
        </div>
        <h4 class='author'>{{name}}</h4>
        <p class='job'>{{job}}</p>
        <p class='info'>{{text}}</p>
        <div class='button-container'>
            <button class='prev-btn' @click="prevSlide">
                <i class="fa fa-chevron-left" aria-hidden="true"></i>
            </button>
            <button class='next-btn' @click="nextSlide">
                <i class="fa fa-chevron-right" aria-hidden="true"></i>
            </button>
        </div>
        <button class='random-btn' @click="randomSlide">
            surprise me
        </button>
    </article>
  `,
};

const App = {
  components: {
    Review,
  },
  template: `
        <main>
            <section class='container'>
            <div class='title'>
                <h2>our reviews</h2>
                <div class='underline'></div>
            </div>
            <review></review>
            </section>
        </main>
    `,
};

createApp(App).mount("#app");
