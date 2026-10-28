import assert from "node:assert/strict";
import { test } from "node:test";
import { parseLeadingGreeting } from "../app/lib/assistantGreeting.ts";

for (const [input, question] of [
  ["Привет!", ""],
  ["Здравствуйте", ""],
  ["Добрый день!", ""],
  ["Доброе утро! Какие машины есть?", "Какие машины есть?"],
  ["Привет, как забронировать тур?", "как забронировать тур?"],
  ["Здравствуйте! Есть ли палатки?", "Есть ли палатки?"],
  ["Привет как добраться до Сон-Куля?", "как добраться до Сон-Куля?"],
  ["ПРИВЕТ!!! Где оставить отзыв?", "Где оставить отзыв?"],
  ["👋 Привет! Сколько ехать до Иссык-Куля?", "Сколько ехать до Иссык-Куля?"],
  ["Hello!", ""],
  ["Hi, how can I book a tour?", "how can I book a tour?"],
  ["Hey! What cars do you have?", "What cars do you have?"],
  ["Good morning, do you rent camping equipment?", "do you rent camping equipment?"],
  ["Good afternoon! How long to Song-Kul?", "How long to Song-Kul?"],
  ["Good evening!", ""],
  ["Hi! Hello! Can I rent a tent?", "Can I rent a tent?"],
  ["Салам!", ""],
  ["Саламатсызбы!", ""],
  ["👋", ""],
]) {
  test(`recognizes greeting: ${input}`, () => {
    assert.deepEqual(parseLeadingGreeting(input), { question });
  });
}

for (const input of ["How can I book a tour?", "History of Kyrgyzstan", "Hiking in Naryn", "Приветствие на кыргызском", "Расскажи про Сон-Куль", "Где купить книгу Hello?", ""]) {
  test(`does not invent a greeting: ${input}`, () => {
    assert.equal(parseLeadingGreeting(input), null);
  });
}
