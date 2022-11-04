<template>
  <div class="container text-center">
    <div class="p-10">
      <div class="justify-center flex items-center gap-3">
        <span v-for="item in selectedTimesTables">
          <input :id="item.name"
                 v-model="item.value"
                 type="checkbox"
                 :name="item.name"
          >
          <label :for="item.name">{{ item.name }}</label><br>
        </span>
      </div>

      <template v-if="totalQuestions">
        <div v-if="currentIndex < totalQuestions -1"
             class="justify-center flex items-center m-3 gap-2"
        >
          <span>{{ flatListOfQuestions[currentIndex].sum }}</span>
          <span><input v-model="flatListOfQuestions[currentIndex].userAnswer"
                       type="text"
          ></span>
        </div>
        <div class="flex justify-center gap-4">
          <button v-if="currentIndex > 0 && allowPrev"
                  @click.prevent="goPrev"
          >
            Prev
          </button>
          <button v-if="currentIndex < totalQuestions -1"
                  @click.prevent="goNext"
          >
            Next
          </button>
        </div>
      </template>
    </div>




    <div v-if="totalQuestions">
      Correct answers: {{ correctAnswers.length }}
      Wrong answers: {{ incorrectAnswers.length }}
      Total questions: {{ totalQuestions }}
    </div>
    <button @click.prevent="reset">
      Start Again!
    </button>
  </div>
</template>

<script>
import shuffle from "~/utils/shuffle";

const buildQuestions = (timetable, range) => {
  const randomisedRange = shuffle(range);
  const questions = randomisedRange.map((rand, index) => ({
    sum: `${timetable} x ${rand} = `,
    index,
    answer: rand * timetable,
    userAnswer: ''
  }));
  return {
    timesTable: timetable,
    questions: questions
  };
};

const buildSelectedTimesTables = () => {
  return Array.from({ length: 11 }, (_, idx) => ({
    name: `${idx + 2}x`,
    value: false,
    timesTable: idx + 2
  }));
};

export default {
  data(){
    return {
      range: Array.from({ length: 11 }, (_, idx) => (idx + 2)),
      grid: Array.from({ length: 7 }, (_, idx) => (idx + 1)),
      selectedTimesTables: buildSelectedTimesTables(),
      showAnswers: false,
      allowPrev: false,
      currentIndex: 0,
      flatListOfQuestions: []
    };
  },
  computed: {
    correctAnswers(){
      return this.flatListOfQuestions.filter((item, index) => item.answer === parseInt(item.userAnswer) && index < this.currentIndex);
    },
    incorrectAnswers(){
      return this.flatListOfQuestions.filter((item, index) => item.answer !== parseInt(item.userAnswer) && index < this.currentIndex);
    },
    totalQuestions(){
      return this.flatListOfQuestions.length;
    },
  },
  watch: {
    selectedTimesTables: {
      handler() {
        const selected = this.selectedTimesTables.filter(i => i.value);
        const selectedQu = selected.map((tt) => (
          buildQuestions(tt.timesTable, this.range)
        ));
        const qu = selectedQu.map(item => (item.questions)).flat(1);
        this.flatListOfQuestions = shuffle(qu);
      },
      deep: true
    },
  },
  methods: {
    goNext(){
      this.currentIndex += 1;
    },
    goPrev(){
      this.currentIndex -= 1;
    },
    reset(){
      //git remote add origin git@github.com:danbirch9000/maths.git

      //git remote set-url origin git@github.com:danbirch9000/maths.git
      this.currentIndex = 0;
      this.selectedTimesTables = buildSelectedTimesTables();
    }
  }
};
</script>
 <style lang="scss" scoped>
  input {
    @apply p-2 rounded border border-gray-300;
  }
  button {
    @apply bg-gray-400 p-2 rounded;
  }
 </style>
