import assert from "node:assert/strict";
import { test } from "node:test";
import { getSiteAssistantReply } from "../app/lib/siteAssistant.ts";

const cases = [
  ["Как я могу забронировать тур?", "ru", "/tours", "Book this tour"],
  ["Хочу забронировать тур на Сон-Куль", "ru", "/tours", "подтвердит бронирование"],
  ["How can I book a tour to Song-Kul?", "en", "/tours", "Book this tour"],
  ["Where is the booking form?", "en", "/tours", "bottom of the tour page"],
  ["Можно оставить заявку на тур?", "ru", "/tours", "Send via WhatsApp"],
  ["Дают ли в аренду оборудование для кэмпинга?", "ru", "/rental#equipment", "палатки"],
  ["Можно ли арендовать палатку на Сон-Куль?", "ru", "/rental#equipment", "спальники"],
  ["Есть ли спальники?", "ru", "/rental#equipment", "наличие"],
  ["Do you rent camping equipment?", "en", "/rental#equipment", "sleeping bags"],
  ["Can I rent trekking poles?", "en", "/rental#rental-booking", "trekking poles"],
  ["How much is a tent?", "en", "/rental#equipment", "prices"],
  ["Какие машины есть?", "ru", "/cars", "Subaru Forester 2020"],
  ["Как забронировать машину?", "ru", "/rental#rental-booking", "Toyota 4Runner"],
  ["What cars do you have?", "en", "/cars", "Mercedes Sprinter"],
  ["Can I hire a Toyota for Issyk-Kul?", "en", "/rental", "confirm"],
  ["Есть ли микроавтобусы?", "ru", "/cars", "Hyundai Starex"],
  ["Что можно взять напрокат?", "ru", "/rental", "Car & Equipment"],
  ["Where can I leave a review?", "en", "/reviews", "moderation"],
  ["Где оставить отзыв?", "ru", "/reviews", "проверки"],
  ["Где посмотреть фотографии поездок?", "ru", "/gallery", "Our Gallery"],
  ["How do I contact you?", "en", "https://wa.me/996703367477", "+996"],
  ["Как связаться с менеджером?", "ru", "https://wa.me/996703367477", "+996"],
  ["Расскажи о команде", "ru", "/about", "About Us"],
  ["Какие у вас туры?", "ru", "/tours", "программу"],
  ["Which tours are on the site?", "en", "/tours", "itinerary"],
  ["Помощь по сайту", "ru", "/rental", "Reviews"],
  ["Site help", "en", "/about", "Our Gallery"],
  ["Сколько стоит тур?", "ru", "/tours", "итоговую стоимость"],
  ["What payment methods do you accept?", "en", "https://wa.me/996703367477", "payment terms"],
];

for (const [question, language, url, text] of cases) {
  test(question, () => {
    const reply = getSiteAssistantReply(question, language);
    assert.ok(reply, "should recognize a site question");
    assert.ok(reply.links.some((link) => link.url === url), `should link to ${url}`);
    assert.ok(reply.text.includes(text), `should mention ${text}`);
  });
}

for (const question of [
  "How long to Song-Kul from Bishkek?",
  "Как доехать до Иссык-Куля?",
  "What to see in Naryn region?",
  "Where can I go camping at Song-Kul?",
  "Как добраться до Кель-Суу на машине?",
  "What car is suitable for the road to Kel-Suu?",
  "Столица Кыргызстана",
  "Tell me about Altyn Arashan",
  "Что посмотреть за 5 дней?",
]) {
  test(`preserves destination questions: ${question}`, () => {
    assert.equal(getSiteAssistantReply(question, /[А-Яа-я]/.test(question) ? "ru" : "en"), undefined);
  });
}
