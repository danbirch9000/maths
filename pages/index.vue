<template>
  <div class="container text-center">
    <div class="p-10">
      <div v-if="!finished"
           class="justify-center flex items-center gap-3"
      >
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
        <div v-if="!finished"
             class="justify-center flex items-center m-3 gap-2"
        >
          <span class="sum">{{ flatListOfQuestions[currentIndex].sum }}</span>
          <span><input v-model="flatListOfQuestions[currentIndex].userAnswer"
                       type="number"
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
          <button v-if="currentIndex === totalQuestions - 1"
                  @click.prevent="finish"
          >
            Finish
          </button>
        </div>
      </template>
    </div>

    <div class="numberSquare grid grid-cols-10">
      <template v-for="x in totalGrid">
        <span v-for="item in grid"
              class="dot"
              :class="`dot_${isOdd(x)}`"
        >&nbsp;</span>
      </template>
    </div>

    <div v-if="totalQuestions"
         class="m-5"
    >
      <div>Correct answers: {{ correctAnswers.length }}</div>
      <div>Wrong answers: {{ incorrectAnswers.length }}</div>
      <div>Total questions: {{ totalQuestions }}</div>
    </div>
    <button v-if="currentIndex > 0"
            @click.prevent="reset"
    >
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
      selectedTimesTables: buildSelectedTimesTables(),
      showAnswers: false,
      finished: false,
      allowPrev: false,
      currentIndex: 0,
      flatListOfQuestions: []
    };
  },
  computed: {
    grid(){
      const selected = this.selectedTimesTables.filter(item => item.value);
      const wrap = selected.length === 1 ? selected[0].timesTable : 10;
      return Array.from({ length: wrap }, (_, idx) => (idx + 1));
    },
    totalGrid(){
      const selected = this.selectedTimesTables.filter(item => item.value);
      const wrap = selected.length === 1 ? selected[0].timesTable : 10;
      return Array.from({ length: 100/wrap }, (_, idx) => (idx + 1));
    },
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
      this.currentIndex = 0;
      this.finished = false;
      this.selectedTimesTables = buildSelectedTimesTables();
    },
    isOdd(num){
      return num % 2 === 0 ? 'row_a' : 'row_b';
    },
    finish(){
      this.finished = true;
      this.goNext();
    }
  }
};
</script>
 <style lang="scss" scoped>
  input[type='text'] {
    @apply p-2 rounded border border-gray-300;
    font-size: 50px;
    width: 120px;
    color: #506266;
  }
  button {
    @apply bg-gray-400 p-2 rounded;
  }
  .sum {
    color: #506266;
    font-size: 50px;
  }
  .numberSquare {
    @apply m-auto;
    width: 350px;
    span.dot {
      @apply m-3 block rounded-full;
      width: 12px;
      height: 12px;
      &.dot_row_b {
        background-color: #506266;
      }
      &.dot_row_a {
        background-color: #BDE038;
      }
    }
  }
 </style>
