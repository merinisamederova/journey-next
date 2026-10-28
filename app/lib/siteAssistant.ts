type Language = "en" | "ru";
type SiteReply = {
  text: string;
  links: { label: string; url: string }[];
};

// Use the site's published services; date-specific availability is confirmed by the team.
export function getSiteAssistantReply(input: string, language: Language): SiteReply | undefined {
  const words: string[] = input.toLowerCase().replace(/ё/g, "е").match(/[\p{L}\p{N}]+/gu) ?? [];
  const normalized = words.join(" ");
  const has = (...stems: string[]) => words.some((word) => stems.some((stem) => word.startsWith(stem)));
  const phrase = (...phrases: string[]) => phrases.some((value) => ` ${normalized} `.includes(` ${value} `));
  const ru = language === "ru";
  const link = (url: string, en: string, russian: string) => ({ url, label: ru ? russian : en });
  const contact = link("https://wa.me/996703367477", "Contact the team on WhatsApp", "Написать команде в WhatsApp");
  const booking = has("book", "reserv", "заброни", "брони", "бронь", "записаться", "заказать", "заявк");
  const rental = has("rent", "hire", "аренд", "прокат", "напрокат");
  const serviceQuestion = booking || rental || has("есть", "даете", "дают", "предостав", "сдаете", "сдают", "нужн", "хочу", "цен", "стоим") ||
    phrase("do you", "can i", "can we", "i need", "i want", "how much", "where can i find", "where do i find", "on the site", "on your site", "на сайте");
  const equipment = has("equipment", "gear", "tent", "sleeping", "chair", "pillow", "снаряж", "оборудован", "палат", "спальн", "спальник", "коврик", "стуль", "треккингов") || words.includes("стол") || words.includes("столы") || phrase("trekking poles", "camping table") ||
    (has("camping", "кэмпинг", "кемпинг") && (rental || booking || has("есть", "даете", "дают", "предостав") || phrase("do you")));
  const cars = has("car", "vehicle", "suv", "van", "4x4", "машин", "автомоб", "транспорт", "микроавтобус", "внедорож", "минивэн", "subaru", "toyota", "nissan", "hyundai", "mercedes", "lexus");

  if (!booking && !rental && !phrase("on the site", "on your site", "на сайте") &&
    (phrase("how to get", "how do i get", "how long", "как добраться", "как доехать", "сколько ехать", "where can i go camping") ||
      (cars && has("road", "дорог", "suitable", "подойдет")))) {
    return undefined;
  }

  // Service questions take priority over destination/topic matching (e.g. booking Song-Kul).
  if (equipment && (serviceQuestion || words.length <= 3)) {
    return {
      text: ru
        ? "Да, у нас есть аренда снаряжения для кэмпинга: палатки, спальники, коврики, надувные подушки, стулья и треккинговые палки. Можно выбрать отдельные вещи или комплект на двоих.\n\nОткройте раздел Car & Equipment — там есть состав комплектов и цены. В форме Book car or equipment укажите даты, нужные вещи и количество, затем нажмите Send via WhatsApp и отправьте сообщение. Команда подтвердит наличие и условия аренды."
        : "Yes, we offer camping equipment rental: tents, sleeping bags, sleeping mats, inflatable pillows, chairs and trekking poles. Choose individual items or a full 2-person set.\n\nOpen Car & Equipment for items and prices. In Book car or equipment, enter your dates, equipment and quantities, then choose Send via WhatsApp and send the message. The team will confirm availability and rental details.",
      links: [link("/rental#equipment", "View camping equipment", "Посмотреть снаряжение"), link("/rental#rental-booking", "Request equipment rental", "Оставить заявку на аренду"), contact],
    };
  }

  if (cars && (serviceQuestion || has("which", "what", "какие", "какой", "автопарк") || words.length <= 3)) {
    return {
      text: ru
        ? "В разделе Our Cars представлены Subaru Forester 2020, Toyota RAV4 2019, Nissan Rogue 2017, Toyota Highlander, Hyundai Starex Luxury limo, Toyota Sequoia, Mercedes Sprinter и Lexus LX 470. Там можно посмотреть фотографии и информацию о поездках с водителем.\n\nВ разделе Car & Equipment для аренды представлены Toyota 4Runner 4x4 и Toyota Sequoia V8 4x4. Укажите даты, маршрут и число пассажиров в форме аренды или напишите в WhatsApp — команда подтвердит подходящую машину, наличие и стоимость."
        : "Our Cars features the Subaru Forester 2020, Toyota RAV4 2019, Nissan Rogue 2017, Toyota Highlander, Hyundai Starex Luxury limo, Toyota Sequoia, Mercedes Sprinter and Lexus LX 470, with photos and information about trips with a driver.\n\nCar & Equipment lists the Toyota 4Runner 4x4 and Toyota Sequoia V8 4x4 for rental. Share your dates, route and passenger count through the rental form or WhatsApp. The team will confirm a suitable vehicle, availability and price.",
      links: [link("/cars", "Our Cars", "Наши машины"), link("/rental", "Car & Equipment", "Аренда машин и снаряжения"), link("/rental#rental-booking", "Request a rental", "Заявка на аренду"), contact],
    };
  }

  if (rental) {
    return {
      text: ru
        ? "Машины и снаряжение для кэмпинга находятся в разделе Car & Equipment. Посмотрите варианты и заполните форму Book car or equipment: даты, маршрут, число человек и что хотите арендовать. Нажмите Send via WhatsApp и отправьте сообщение — команда подтвердит наличие и условия."
        : "Find vehicles and camping equipment in Car & Equipment. Browse the options and fill in Book car or equipment with your dates, route, group size and rental needs. Choose Send via WhatsApp and send the message; the team will confirm availability and terms.",
      links: [link("/rental", "Browse rentals", "Посмотреть аренду"), link("/rental#rental-booking", "Open rental form", "Открыть форму аренды"), contact],
    };
  }

  if (booking) {
    return {
      text: ru
        ? "Чтобы забронировать тур:\n1. Откройте Tours и выберите поездку.\n2. На странице тура найдите форму Book this tour внизу страницы.\n3. Укажите имя, WhatsApp или email, желаемую дату, число человек и пожелания.\n4. Нажмите Send via WhatsApp и отправьте подготовленное сообщение.\n\nКоманда уточнит наличие, стоимость и подтвердит бронирование. Если нужен индивидуальный маршрут, можно сразу написать в WhatsApp. Сообщение в этом чате само по себе тур не бронирует."
        : "To book a tour:\n1. Open Tours and choose a trip.\n2. Find Book this tour at the bottom of the tour page.\n3. Enter your name, WhatsApp or email, preferred date, group size and requests.\n4. Choose Send via WhatsApp and send the prepared message.\n\nThe team will check availability, discuss the price and confirm your booking. For a custom route, contact the team directly on WhatsApp. A message in this chat does not book a tour by itself.",
      links: [link("/tours", "Choose a tour", "Выбрать тур"), contact],
    };
  }

  if (has("price", "cost", "цен", "стоим", "оплат", "pay", "availab", "налич", "свободн") || phrase("how much", "сколько стоит", "доступные даты")) {
    return {
      text: ru
        ? "Программы и информацию о турах смотрите в Tours, стоимость поездок с водителем — в Our Cars, а цены на снаряжение — в Car & Equipment. Для расчета вашей поездки и проверки свободных дат напишите команде в WhatsApp: укажите маршрут, даты и число человек. Команда уточнит итоговую стоимость, условия оплаты и подтвердит наличие."
        : "See Tours for itineraries and trip details, Our Cars for driver service rates, and Car & Equipment for equipment rental prices. For a quote and available dates, contact the team on WhatsApp with your route, dates and group size. The team will confirm the final price, payment terms and availability.",
      links: [link("/tours", "Tours", "Туры"), link("/cars", "Driver service rates", "Поездки с водителем"), link("/rental#equipment", "Equipment prices", "Цены на снаряжение"), contact],
    };
  }

  if (has("review", "отзыв")) {
    return {
      text: ru
        ? "Отзывы путешественников находятся в разделе Reviews. Там же внизу есть форма Write a review: укажите имя, оценку и впечатления о поездке. Отзыв появится на сайте после проверки командой."
        : "Read traveler feedback in Reviews. To share your experience, use Write a review at the bottom of that page and enter your name, rating and review. Reviews appear after moderation by the team.",
      links: [link("/reviews", "Read or write a review", "Прочитать или оставить отзыв")],
    };
  }
  if (has("gallery", "photo", "галере", "фото")) {
    return {
      text: ru ? "Фотографии поездок можно посмотреть в разделе Our Gallery. Фотографии машин находятся в Our Cars, а описание и фотографии конкретного тура — на его странице в Tours." : "See trip photos in Our Gallery, vehicle photos in Our Cars, and photos and details for each tour on its page in Tours.",
      links: [link("/gallery", "Our Gallery", "Галерея поездок"), link("/cars", "Our Cars", "Фотографии машин"), link("/tours", "Tours", "Туры")],
    };
  }
  if (has("contact", "whatsapp", "контакт", "связаться", "связь", "менеджер", "телефон", "ватсап", "ватсапп")) {
    return {
      text: ru ? "Связаться с Journey Kyrgyzstan можно в WhatsApp: +996 703 367 477. Напишите желаемые даты, число человек и что вас интересует — тур, машина или снаряжение. Информация о команде есть в About Us." : "Contact Journey Kyrgyzstan on WhatsApp: +996 703 367 477. Share your preferred dates, group size and whether you need a tour, vehicle or equipment. Learn about the team in About Us.",
      links: [contact, link("/about", "About Us", "О команде")],
    };
  }
  if (phrase("about us", "о вас", "о компании", "о команде", "кто вы")) {
    return { text: ru ? "Познакомиться с командой Journey Kyrgyzstan можно в разделе About Us. Для вопросов о поездках напишите нам в WhatsApp." : "Meet the Journey Kyrgyzstan team in About Us. For trip enquiries, contact us on WhatsApp.", links: [link("/about", "About Us", "О нас"), contact] };
  }
  if (phrase("what tours", "which tours", "browse tours", "all tours", "какие туры", "какие у вас туры", "все туры", "список туров", "выбрать тур") || normalized === "tours" || normalized === "туры") {
    return { text: ru ? "Все опубликованные туры находятся в разделе Tours. Откройте понравившийся тур, чтобы посмотреть программу и оставить заявку через форму Book this tour. Индивидуальный маршрут можно обсудить в WhatsApp." : "Find all published trips in Tours. Open a tour to read its itinerary and request a booking with Book this tour. For a custom itinerary, contact the team on WhatsApp.", links: [link("/tours", "Browse tours", "Посмотреть туры"), contact] };
  }
  if (has("навигац") || phrase("site help", "website help", "help with the site", "what is on the site", "разделы сайта", "что есть на сайте", "помощь по сайту", "как пользоваться сайтом")) {
    return {
      text: ru ? "Помогу найти нужный раздел:\n• Tours — программы туров и формы заявки.\n• Our Cars — машины и поездки с водителем.\n• Car & Equipment — аренда машин и снаряжения.\n• Reviews — прочитать или оставить отзыв.\n• Our Gallery — фотографии поездок.\n• About Us — информация о команде.\n\nСпросите, например: «Как забронировать тур?» или «Есть ли палатки в аренду?»." : "Find your way around the site:\n• Tours — itineraries and booking request forms.\n• Our Cars — vehicles and trips with a driver.\n• Car & Equipment — vehicle and equipment rental.\n• Reviews — read or write a review.\n• Our Gallery — trip photos.\n• About Us — meet the team.\n\nTry: “How can I book a tour?” or “Do you rent camping equipment?”.",
      links: [link("/tours", "Tours", "Туры"), link("/cars", "Our Cars", "Машины"), link("/rental", "Car & Equipment", "Аренда"), link("/reviews", "Reviews", "Отзывы"), link("/gallery", "Our Gallery", "Галерея"), link("/about", "About Us", "О нас")],
    };
  }
}
