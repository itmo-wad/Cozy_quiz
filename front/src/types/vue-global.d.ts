import Vue from "vue";
import QuizClient from "@/QuizClient";

declare module "vue/types/vue" {
  interface Vue {
    $quizClient: QuizClient;
  }
}
