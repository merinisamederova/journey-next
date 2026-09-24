"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import {
  Bot,
  CalendarDays,
  ExternalLink,
  MapPin,
  MessageCircle,
  Send,
  Sparkles,
  X,
} from "lucide-react";

type ChatMessage = {
  id: number;
  role: "assistant" | "user";
  text: string;
  links?: PlaceLink[];
};

type PlaceLink = {
  label: string;
  url: string;
};

type Place = {
  name: string;
  location: string;
  travelFromBishkek: {
    total: string;
    route: string;
    notes: string;
  };
  summary: string;
  bestFor: string;
  links: PlaceLink[];
  aliases: string[];
  topics: string[];
};

type ReplyLanguage = "en" | "ru";

const places: Place[] = [
  {
    name: "Issyk-Kul Lake",
    location: "Issyk-Kul is in eastern Kyrgyzstan, about 4-5 hours by road from Bishkek depending on the shore and stops.",
    travelFromBishkek: {
      total: "about 3.5-6 hours",
      route:
        "Bishkek -> Boom Gorge -> Balykchy, then continue along the north or south shore depending on the town or hotel.",
      notes:
        "Balykchy is the nearest lake gateway, while Cholpon-Ata, Karakol and south-shore stops take longer. In summer, traffic and photo stops can add time.",
    },
    summary:
      "A vast alpine lake ringed by the Tian Shan mountains. It is the classic choice for lake views, beach time, canyons, hot springs and easy cultural stops.",
    bestFor: "First-time visitors, families, summer trips, scenic road journeys.",
    links: [
      { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Issyk-Kul" },
      { label: "Visit Kyrgyzstan", url: "https://visitkyrgyzstan.org/destinations/issyk-kul/" },
    ],
    aliases: ["issyk kul", "issyk-kul", "issyk kol", "issykkul", "иссык куль", "иссык-куль"],
    topics: ["beach", "shore", "lake vacation", "summer lake", "пляж", "озеро"],
  },
  {
    name: "Song-Kul Lake",
    location: "Song-Kul is a high mountain lake in Naryn Region, central Kyrgyzstan, reached by mountain passes and usually visited with a driver or guided tour.",
    travelFromBishkek: {
      total: "about 6-8 hours in good season",
      route:
        "Bishkek -> Kochkor -> mountain pass -> Song-Kul yurt camps.",
      notes:
        "The last part is on mountain roads, so timing depends on weather, pass conditions and the exact yurt camp. It is usually better as an overnight trip, not a fast day trip.",
    },
    summary:
      "A high mountain lake surrounded by summer pastures and yurt camps. It is one of the best places to experience nomadic life and open alpine landscapes.",
    bestFor: "Yurts, horse riding, nomadic culture, slow nature trips.",
    links: [
      { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Song-K%C3%B6l" },
      { label: "CBT Kyrgyzstan", url: "https://cbtkyrgyzstan.kg/destinations/" },
    ],
    aliases: [
      "song kul",
      "song-kul",
      "song kol",
      "song-kol",
      "song kol lake",
      "son kul",
      "son-kul",
      "son kol",
      "son-kol",
      "son kul lake",
      "сон куль",
      "сон-куль",
      "сон кул",
      "сон-кул",
      "соң көл",
      "соң-көл",
    ],
    topics: ["yurt", "yurts", "horse", "horseback", "nomad", "nomadic", "юрта", "юрты", "лошад", "кочев"],
  },
  {
    name: "Kel-Suu Lake",
    location: "Kel-Suu is in the remote Kok-Kiya valley of Naryn Region, close to the Chinese border, so trips normally need 4x4 transport and border-zone planning.",
    travelFromBishkek: {
      total: "usually 10-12+ hours of driving, often split over 2 days",
      route:
        "Bishkek -> Naryn -> At-Bashy area -> Kok-Kiya valley, then local access toward Kel-Suu.",
      notes:
        "This is a remote border-zone route. A 4x4, permits/logistics and an overnight plan are strongly recommended.",
    },
    summary:
      "A remote turquoise lake near the Chinese border, hidden between dramatic cliffs. It feels wild and adventurous, but requires more planning and border-zone logistics.",
    bestFor: "Adventure travelers, remote landscapes, photography, 4x4 routes.",
    links: [
      { label: "Visit Kyrgyzstan destinations", url: "https://visitkyrgyzstan.org/destinations/" },
      { label: "CBT Kyrgyzstan", url: "https://cbtkyrgyzstan.kg/destinations/" },
    ],
    aliases: ["kel suu", "kel-suu", "kel su", "kel-su", "kelsuu", "кель суу", "кель-суу", "кел суу", "кел-суу"],
    topics: ["remote", "adventure", "border", "4x4", "cliffs", "turquoise", "погранич", "джип"],
  },
  {
    name: "Altyn-Arashan",
    location:
      "Altyn-Arashan is an alpine valley and hot-spring area near Karakol in the Issyk-Kul Region, usually reached by a rough 4x4 road or a trek from Ak-Suu.",
    travelFromBishkek: {
      total: "about 8-10 hours total if done in one long travel day",
      route:
        "Bishkek -> Karakol by road, then Karakol/Ak-Suu -> Altyn-Arashan by rough 4x4 or on foot.",
      notes:
        "Plan roughly 6-7 hours to Karakol, then around 1-2 hours by prepared 4x4 or about 3-4 hours trekking/horseback from the Karakol/Ak-Suu side. A normal sedan should not be used for the upper road.",
    },
    summary:
      "A mountain valley famous for hot springs, pine forests and views toward the Terskey Ala-Too range. It is a strong choice for travelers who want nature without going too far from Karakol.",
    bestFor: "Hot springs, day hikes from Karakol, 4x4 trips, Ala-Kul trekking routes.",
    links: [
      { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Altyn_Arashan" },
      { label: "Visit Kyrgyzstan hot springs", url: "https://www.visitkyrgyzstan.org/hot-springs/" },
    ],
    aliases: [
      "altyn arashan",
      "altyn-arashan",
      "altin arashan",
      "altin-arashan",
      "алтын арашан",
      "алтын-арашан",
      "алтин арашан",
      "алтин-арашан",
    ],
    topics: ["hot spring", "hot springs", "karakol", "ак суу", "ак-суу", "горячие источники", "источник"],
  },
  {
    name: "Ala-Kul Lake",
    location:
      "Ala-Kul is a high alpine lake above Karakol in the Terskey Ala-Too mountains, usually visited as a serious trekking route linked with Altyn-Arashan.",
    travelFromBishkek: {
      total: "not practical as a same-day drive; plan 3-4 days",
      route:
        "Bishkek -> Karakol, then a multi-day trek via Karakol valley, Ala-Kul pass and often Altyn-Arashan.",
      notes:
        "Drive time to Karakol is usually a full travel day. The lake itself requires trekking at altitude, so it is best treated as a proper mountain itinerary.",
    },
    summary:
      "A bright alpine lake on one of Kyrgyzstan's most famous trekking routes. It is beautiful, but more demanding than an ordinary sightseeing stop.",
    bestFor: "Trekking, alpine scenery, experienced hikers, multi-day mountain routes.",
    links: [
      { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Ala-Kul" },
      { label: "Visit Kyrgyzstan Karakol", url: "https://www.visitkyrgyzstan.org/destinations/karakol/" },
    ],
    aliases: ["ala kul", "ala-kul", "ala kol", "ala-kol", "алакуль", "ала куль", "ала-куль", "ала кул", "ала-кул"],
    topics: ["trek", "trekking", "alpine lake", "pass", "перевал", "треккинг"],
  },
  {
    name: "Karakol",
    location:
      "Karakol is in eastern Kyrgyzstan near the eastern end of Issyk-Kul, and is the main base for many mountain trips in the region.",
    travelFromBishkek: {
      total: "about 6-7 hours by private car",
      route:
        "Bishkek -> Boom Gorge -> Balykchy -> Issyk-Kul shore road -> Karakol.",
      notes:
        "The north shore is common and direct; the south shore is scenic but may take longer with stops like Skazka, Barskoon or Jeti-Oguz.",
    },
    summary:
      "A relaxed mountain city used as a base for Ala-Kul, Altyn-Arashan, Jeti-Oguz and Issyk-Kul south-shore trips. It also has markets, food stops and cultural sights.",
    bestFor: "Trekking bases, food and culture, day trips, Issyk-Kul east-shore routes.",
    links: [
      { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Karakol" },
      { label: "Visit Kyrgyzstan Karakol", url: "https://www.visitkyrgyzstan.org/destinations/karakol/" },
    ],
    aliases: ["karakol", "каракол"],
    topics: ["base city", "east issyk kul", "dungan mosque", "przhevalsky", "дунган", "пржеваль"],
  },
  {
    name: "Jeti-Oguz",
    location:
      "Jeti-Oguz is east of Karakol on the southern side of Issyk-Kul, known for red sandstone cliffs and green valleys.",
    travelFromBishkek: {
      total: "about 7-8 hours by road",
      route:
        "Bishkek -> Issyk-Kul -> Karakol area -> Jeti-Oguz valley.",
      notes:
        "It is often better to sleep in Karakol or on the south shore and visit Jeti-Oguz as part of an Issyk-Kul route instead of rushing there and back.",
    },
    summary:
      "A scenic area with the Seven Bulls rocks, Broken Heart rock and mountain valleys. It works well as a day trip from Karakol or as part of a south-shore Issyk-Kul route.",
    bestFor: "Red rocks, easy viewpoints, day trips from Karakol, light walks.",
    links: [
      { label: "Visit Kyrgyzstan", url: "https://www.visitkyrgyzstan.org/jeti-oguz/" },
      { label: "Destination Jeti Oguz", url: "https://jetioguz.travel/destinations/nature-sites/" },
    ],
    aliases: [
      "jeti oguz",
      "jeti-oguz",
      "jety oguz",
      "jety-oguz",
      "djeti oguz",
      "jethi oguz",
      "джети огуз",
      "джети-огуз",
      "жети огуз",
      "жети-огуз",
    ],
    topics: ["seven bulls", "broken heart", "red rocks", "красные скалы", "семь быков"],
  },
  {
    name: "Skazka Canyon",
    location:
      "Skazka Canyon, also called Fairytale Canyon, is on the south shore of Issyk-Kul near Tosor.",
    travelFromBishkek: {
      total: "about 5-6 hours by road",
      route:
        "Bishkek -> Boom Gorge -> Balykchy -> Issyk-Kul south shore -> Tosor/Skazka Canyon.",
      notes:
        "It works well as a stop on the way to Karakol or a south-shore overnight route. The canyon visit itself can be short, but the drive is long.",
    },
    summary:
      "A compact canyon of colorful sandstone formations that is easy to add to an Issyk-Kul south-shore route. It is especially photogenic in soft morning or evening light.",
    bestFor: "Photos, short walks, south-shore Issyk-Kul routes, families.",
    links: [
      { label: "Visit Kyrgyzstan destinations", url: "https://www.visitkyrgyzstan.org/destinations/" },
      { label: "This is Kyrgyzstan guide", url: "https://www.thisis-kyrgyzstan.com/guides/skazka-canyon-guide" },
    ],
    aliases: [
      "skazka",
      "skazka canyon",
      "fairytale canyon",
      "fairy tale canyon",
      "сказка",
      "каньон сказка",
      "каньон-сказка",
    ],
    topics: ["canyon", "red canyon", "tosor", "sandstone", "каньон"],
  },
  {
    name: "Cholpon-Ata",
    location:
      "Cholpon-Ata is on the north shore of Issyk-Kul Lake and is one of the main resort towns between Balykchy and Karakol.",
    travelFromBishkek: {
      total: "about 4-5 hours by road",
      route:
        "Bishkek -> Boom Gorge -> Balykchy -> Issyk-Kul north shore -> Cholpon-Ata.",
      notes:
        "It is an easy first overnight stop on an Issyk-Kul route. Summer traffic, lake stops and museum or petroglyph visits can add time.",
    },
    summary:
      "A popular lakeside town with beaches, resorts, petroglyphs, boat rides and cultural stops. It works well for travelers who want a comfortable Issyk-Kul base.",
    bestFor: "Lake resorts, beaches, petroglyphs, family-friendly Issyk-Kul stops.",
    links: [
      { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Cholpon-Ata" },
      { label: "Visit Kyrgyzstan destinations", url: "https://www.visitkyrgyzstan.org/destinations/" },
    ],
    aliases: ["cholpon ata", "cholpon-ata", "чолпон ата", "чолпон-ата"],
    topics: ["petroglyph", "boat", "resort", "north shore", "петроглиф", "курорт"],
  },
  {
    name: "Barskoon Valley",
    location:
      "Barskoon Valley is on the south shore of Issyk-Kul, known for waterfalls and mountain scenery on the road inland from the lake.",
    travelFromBishkek: {
      total: "about 5.5-7 hours by road",
      route:
        "Bishkek -> Balykchy -> Issyk-Kul south shore -> Barskoon village and valley.",
      notes:
        "It is usually visited as part of a south-shore route with Skazka Canyon, Jeti-Oguz or Karakol rather than as a stand-alone day trip from Bishkek.",
    },
    summary:
      "A green mountain valley with waterfalls and views above the Issyk-Kul south shore. It is a scenic stop on longer Issyk-Kul tours.",
    bestFor: "Waterfalls, south-shore drives, mountain scenery, photo stops.",
    links: [
      { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Barskoon" },
      { label: "Visit Kyrgyzstan destinations", url: "https://www.visitkyrgyzstan.org/destinations/" },
    ],
    aliases: ["barskoon", "barskoon valley", "barskoon waterfalls", "барскоон", "барскоон водопад"],
    topics: ["waterfall", "waterfalls", "south shore", "водопад"],
  },
  {
    name: "Bokonbaevo",
    location:
      "Bokonbaevo is on the south shore of Issyk-Kul and is often used for eagle hunting shows, yurt stays and local culture.",
    travelFromBishkek: {
      total: "about 4.5-6 hours by road",
      route:
        "Bishkek -> Balykchy -> Issyk-Kul south shore -> Bokonbaevo.",
      notes:
        "It combines well with Skazka Canyon, Barskoon or a south-shore overnight. Exact timing depends on stops along the lake.",
    },
    summary:
      "A south-shore village area known for eagle hunting demonstrations, local hospitality and access to quieter parts of Issyk-Kul.",
    bestFor: "Eagle hunting shows, local culture, south-shore Issyk-Kul routes.",
    links: [
      { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Bokonbayevo" },
      { label: "Visit Kyrgyzstan destinations", url: "https://www.visitkyrgyzstan.org/destinations/" },
    ],
    aliases: ["bokonbaevo", "bokonbayevo", "боконбаево", "боконбаев"],
    topics: ["eagle show", "eagle hunting", "south shore", "berkut", "беркут", "охота"],
  },
  {
    name: "Orto-Tokoy Reservoir",
    location:
      "Orto-Tokoy Reservoir is near the road between Kochkor and the Issyk-Kul/Naryn routes, often used as a scenic photo stop.",
    travelFromBishkek: {
      total: "about 3-4 hours by road",
      route:
        "Bishkek -> Boom Gorge -> Balykchy area -> Orto-Tokoy Reservoir.",
      notes:
        "Most travelers visit it as a short stop on the way to Song-Kul, Kochkor, Naryn or the Issyk-Kul south shore.",
    },
    summary:
      "A reservoir with open mountain views, useful as a scenic stop rather than a full destination.",
    bestFor: "Photo stops, road-trip scenery, routes toward Song-Kul or Issyk-Kul.",
    links: [
      { label: "Visit Kyrgyzstan destinations", url: "https://www.visitkyrgyzstan.org/destinations/" },
      { label: "About Kyrgyzstan", url: "https://tourism.gov.kg/about-kyrgyzstan/" },
    ],
    aliases: ["orto tokoy", "orto-tokoy", "orto tokoi", "orto-tokoi", "орто токои", "орто-токой", "орто токой"],
    topics: ["reservoir", "water reservoir", "водохранилище"],
  },
  {
    name: "Boom Gorge",
    location:
      "Boom Gorge is the main scenic road corridor between Bishkek and Issyk-Kul, used on many routes toward the lake, Kochkor and Naryn.",
    travelFromBishkek: {
      total: "about 1.5-2 hours to reach the gorge area",
      route:
        "Bishkek -> eastern road out of the Chuy Valley -> Boom Gorge.",
      notes:
        "Most tours pass through Boom Gorge rather than staying there. It is useful for photo stops on the way to Issyk-Kul, Song-Kul, Kochkor or Naryn.",
    },
    summary:
      "A dramatic road gorge and common scenic transfer section between Bishkek and the eastern/central routes.",
    bestFor: "Road scenery, photo stops, transfers toward Issyk-Kul or Kochkor.",
    links: [
      { label: "Visit Kyrgyzstan destinations", url: "https://www.visitkyrgyzstan.org/destinations/" },
      { label: "About Kyrgyzstan", url: "https://tourism.gov.kg/about-kyrgyzstan/" },
    ],
    aliases: ["boom gorge", "boom canyon", "боом", "боомское ущелье", "ущелье боом"],
    topics: ["gorge road", "transfer", "ущелье"],
  },
  {
    name: "Grigorievka Gorge",
    location:
      "Grigorievka Gorge is on the north side of Issyk-Kul, inland from the lake between Cholpon-Ata and the eastern shore routes.",
    travelFromBishkek: {
      total: "about 5-6 hours by road",
      route:
        "Bishkek -> Balykchy -> Issyk-Kul north shore -> Grigorievka Gorge.",
      notes:
        "It is usually paired with Semenovka Gorge, Cholpon-Ata or a north-shore Issyk-Kul overnight.",
    },
    summary:
      "A green mountain gorge with pastures, rivers and forested scenery, often included near the end of longer Issyk-Kul tours.",
    bestFor: "Gorge scenery, north-shore Issyk-Kul routes, light nature stops.",
    links: [
      { label: "Visit Kyrgyzstan destinations", url: "https://www.visitkyrgyzstan.org/destinations/" },
      { label: "CBT Kyrgyzstan", url: "https://cbtkyrgyzstan.kg/destinations/" },
    ],
    aliases: ["grigorievka", "grigorievka gorge", "grigorevka", "григорьевка", "ущелье григорьевка"],
    topics: ["gorge", "north shore", "ущелье"],
  },
  {
    name: "Semenovka Gorge",
    location:
      "Semenovka Gorge is another north-shore Issyk-Kul mountain gorge, close enough to combine with Grigorievka Gorge.",
    travelFromBishkek: {
      total: "about 5-6 hours by road",
      route:
        "Bishkek -> Balykchy -> Issyk-Kul north shore -> Semenovka Gorge.",
      notes:
        "It works best as a scenic detour on a north-shore Issyk-Kul route rather than a separate trip from Bishkek.",
    },
    summary:
      "A mountain gorge with river scenery, forest, pasture views and picnic-style stops near Issyk-Kul.",
    bestFor: "Nature stops, north-shore routes, relaxed mountain scenery.",
    links: [
      { label: "Visit Kyrgyzstan destinations", url: "https://www.visitkyrgyzstan.org/destinations/" },
      { label: "CBT Kyrgyzstan", url: "https://cbtkyrgyzstan.kg/destinations/" },
    ],
    aliases: ["semenovka", "semenovka gorge", "семеновка", "ущелье семеновка"],
    topics: ["gorge", "north shore", "ущелье"],
  },
  {
    name: "Chon-Kemin Valley",
    location:
      "Chon-Kemin is a green valley between Bishkek and Issyk-Kul, often used as a calm nature stop on multi-day routes.",
    travelFromBishkek: {
      total: "about 2-3 hours",
      route:
        "Bishkek -> Tokmok/Burana area -> Chon-Kemin valley.",
      notes:
        "This is one of the easier nature escapes from Bishkek and combines well with Burana Tower or the road to Issyk-Kul.",
    },
    summary:
      "A peaceful valley with guesthouses, horse riding and mountain views. It is easier to reach than remote high lakes and pairs well with Burana Tower.",
    bestFor: "Horse riding, guesthouses, easy nature, family-friendly routes.",
    links: [
      { label: "Visit Kyrgyzstan destinations", url: "https://www.visitkyrgyzstan.org/destinations/" },
      { label: "CBT Kyrgyzstan", url: "https://cbtkyrgyzstan.kg/destinations/" },
    ],
    aliases: ["chon kemin", "chon-kemin", "chong kemin", "чон кемин", "чон-кемин", "чоң кемин", "чоң-кемин"],
    topics: ["guesthouse", "valley", "easy nature", "family route", "долина"],
  },
  {
    name: "Kyzart Village",
    location:
      "Kyzart is a village in the Jumgal/Kochkor side of central Kyrgyzstan and is a common starting point for horseback routes to Song-Kul.",
    travelFromBishkek: {
      total: "about 5 hours by road",
      route:
        "Bishkek -> Kochkor area -> Kyzart village.",
      notes:
        "On the site's Song-Kul horseback tour, Kyzart is the road-transfer point before riding toward Kilemche and Song-Kul.",
    },
    summary:
      "A practical village base for Song-Kul horseback adventures, local lunches and meeting horse guides.",
    bestFor: "Horseback routes, Song-Kul approaches, local family lunches.",
    links: [
      { label: "CBT Kyrgyzstan", url: "https://cbtkyrgyzstan.kg/destinations/" },
      { label: "Visit Kyrgyzstan destinations", url: "https://www.visitkyrgyzstan.org/destinations/" },
    ],
    aliases: ["kyzart", "kyzart village", "кызарт", "кызарт айыл"],
    topics: ["horseback", "kilemche", "song kul approach", "верховая езда"],
  },
  {
    name: "Kilemche Valley",
    location:
      "Kilemche Valley is on the horseback route from Kyzart toward Song-Kul, used for yurt camps and pasture scenery.",
    travelFromBishkek: {
      total: "about 5 hours by car to Kyzart, then several hours by horse or trekking",
      route:
        "Bishkek -> Kyzart village by road, then Kyzart -> Kilemche Valley by horse or on foot.",
      notes:
        "This is not a normal car-only destination. It is part of the Song-Kul horseback route and depends on guide, horse and camp arrangements.",
    },
    summary:
      "A pasture valley used as an overnight point on horseback routes toward Song-Kul Lake.",
    bestFor: "Yurt camps, horseback travel, slow nomadic routes to Song-Kul.",
    links: [
      { label: "CBT Kyrgyzstan", url: "https://cbtkyrgyzstan.kg/destinations/" },
      { label: "Visit Kyrgyzstan destinations", url: "https://www.visitkyrgyzstan.org/destinations/" },
    ],
    aliases: ["kilemche", "kilemche valley", "килемче", "долина килемче"],
    topics: ["yurt", "horseback", "pasture", "юрта", "жайлоо"],
  },
  {
    name: "Tuz-Ashuu Pass",
    location:
      "Tuz-Ashuu Pass is on horseback and mountain routes between Kilemche/Kyzart and Song-Kul Lake.",
    travelFromBishkek: {
      total: "usually part of a 2-4 day Song-Kul horse route",
      route:
        "Bishkek -> Kyzart by road, then Kyzart/Kilemche -> Tuz-Ashuu Pass -> Song-Kul by horse or trekking.",
      notes:
        "This is a mountain-pass section, not a simple roadside attraction. Timing depends on horses, weather, camp location and guide plan.",
    },
    summary:
      "A mountain pass used on scenic horseback routes toward Song-Kul, with wide views before descending toward the lake.",
    bestFor: "Horseback routes, mountain-pass views, Song-Kul approaches.",
    links: [
      { label: "CBT Kyrgyzstan", url: "https://cbtkyrgyzstan.kg/destinations/" },
      { label: "Visit Kyrgyzstan destinations", url: "https://www.visitkyrgyzstan.org/destinations/" },
    ],
    aliases: ["tuz ashuu", "tuz-ashuu", "tuz ashuu pass", "туз ашуу", "туз-ашуу", "перевал туз ашуу"],
    topics: ["pass", "horseback", "song kul route", "перевал"],
  },
  {
    name: "Kyrjol Camp",
    location:
      "Kyrjol is a yurt-camp area used on Song-Kul horseback routes around the lake.",
    travelFromBishkek: {
      total: "usually part of a 3-4 day Song-Kul horseback itinerary",
      route:
        "Bishkek -> Kyzart by road, then horseback route via Kilemche/Song-Kul toward Kyrjol camp.",
      notes:
        "It is not usually booked as a simple point-to-point car transfer. The timing depends on the riding route and yurt camp location.",
    },
    summary:
      "A quiet yurt-camp stop on the Song-Kul lakeside riding route, used for overnight stays and open steppe views.",
    bestFor: "Horseback tours, Song-Kul yurt stays, slow lakeside travel.",
    links: [
      { label: "CBT Kyrgyzstan", url: "https://cbtkyrgyzstan.kg/destinations/" },
      { label: "Visit Kyrgyzstan destinations", url: "https://www.visitkyrgyzstan.org/destinations/" },
    ],
    aliases: ["kyrjol", "kyr jol", "kyrjol camp", "kyr jol camp", "кыржол", "кыр жол"],
    topics: ["yurt camp", "song kul camp", "horseback", "юрточный лагерь"],
  },
  {
    name: "Tash-Rabat",
    location:
      "Tash-Rabat is in Naryn Region on the historic Silk Road route toward the Torugart area.",
    travelFromBishkek: {
      total: "about 8-10 hours, often split with a Naryn stop",
      route:
        "Bishkek -> Kochkor -> Naryn -> At-Bashy area -> Tash-Rabat valley.",
      notes:
        "It is a long mountain route. Many trips overnight in Naryn or near Tash-Rabat, especially when combining it with Kel-Suu.",
    },
    summary:
      "A stone caravanserai in a remote mountain valley. It is one of the most atmospheric historical places in Kyrgyzstan and is often combined with Naryn or Kel-Suu.",
    bestFor: "Silk Road history, remote valleys, photography, cultural routes.",
    links: [
      { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Tash_Rabat" },
      { label: "Visit Kyrgyzstan destinations", url: "https://www.visitkyrgyzstan.org/destinations/" },
    ],
    aliases: ["tash rabat", "tash-rabat", "таш рабат", "таш-рабат"],
    topics: ["caravanserai", "silk road", "naryn", "караван сарай", "караван-сарай"],
  },
  {
    name: "Naryn",
    location:
      "Naryn is Kyrgyzstan's high regional capital and a common base for routes to Song-Kul, Tash-Rabat and Kel-Suu.",
    travelFromBishkek: {
      total: "about 5-6 hours by road",
      route:
        "Bishkek -> Kochkor -> Dolon Pass area -> Naryn.",
      notes:
        "Naryn is often used as a comfortable overnight stop before or after remote routes like Kel-Suu and Tash-Rabat.",
    },
    summary:
      "A practical mountain city and route hub for central and southern Naryn Region adventures.",
    bestFor: "Route base, overnight stop, Kel-Suu and Tash-Rabat logistics.",
    links: [
      { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Naryn" },
      { label: "Visit Kyrgyzstan destinations", url: "https://www.visitkyrgyzstan.org/destinations/" },
    ],
    aliases: ["naryn", "нарын"],
    topics: ["base", "route hub", "central kyrgyzstan", "область"],
  },
  {
    name: "Kok-Kiya Valley",
    location:
      "Kok-Kiya Valley is the remote valley used for access to Kel-Suu Lake in Naryn Region, near the Chinese border zone.",
    travelFromBishkek: {
      total: "usually 10-12+ hours by road, often split over 2 days",
      route:
        "Bishkek -> Naryn -> At-Bashy area -> Kok-Kiya Valley -> Kel-Suu access area.",
      notes:
        "This is remote and normally needs 4x4 transport, yurt-camp arrangements and border-zone planning.",
    },
    summary:
      "A wild high valley with yurt camps, open landscapes and access toward Kel-Suu Lake.",
    bestFor: "Kel-Suu access, remote yurt camps, 4x4 adventure routes.",
    links: [
      { label: "Visit Kyrgyzstan destinations", url: "https://www.visitkyrgyzstan.org/destinations/" },
      { label: "CBT Kyrgyzstan", url: "https://cbtkyrgyzstan.kg/destinations/" },
    ],
    aliases: ["kok kiya", "kok-kiya", "kok kiya valley", "кок кыя", "кок-кыя", "кок кия", "кок-кия"],
    topics: ["kel suu access", "border zone", "remote valley", "пограничная зона"],
  },
  {
    name: "Ak-Sai Valley",
    location:
      "Ak-Sai Valley/River is part of the remote Naryn-region landscapes on the way between Tash-Rabat, Kok-Kiya and Kel-Suu routes.",
    travelFromBishkek: {
      total: "usually a long remote-route day, often planned inside a 3+ day itinerary",
      route:
        "Bishkek -> Naryn/At-Bashy direction -> Ak-Sai area -> Kok-Kiya/Kel-Suu or Tash-Rabat route.",
      notes:
        "It is best treated as part of an organized 4x4 itinerary, not as an independent public-transport stop.",
    },
    summary:
      "A remote highland area used in Kel-Suu and Tash-Rabat adventure routes, with open mountain landscapes and sparse services.",
    bestFor: "Remote 4x4 routes, Kel-Suu approaches, highland scenery.",
    links: [
      { label: "Visit Kyrgyzstan destinations", url: "https://www.visitkyrgyzstan.org/destinations/" },
      { label: "CBT Kyrgyzstan", url: "https://cbtkyrgyzstan.kg/destinations/" },
    ],
    aliases: ["ak sai", "ak-sai", "ak sai valley", "ak-sai valley", "ak sai river", "ак сай", "ак-сай"],
    topics: ["remote route", "highland", "kel suu route", "высокогорье"],
  },
  {
    name: "Sary-Chelek",
    location:
      "Sary-Chelek is in western Kyrgyzstan, in Jalal-Abad Region, and is best planned as a separate nature-focused route.",
    travelFromBishkek: {
      total: "about 9-11+ hours by road, usually better over 2 days",
      route:
        "Bishkek -> Toktogul direction -> Jalal-Abad side -> Sary-Chelek area.",
      notes:
        "This is far from the classic Issyk-Kul loop, so it works best in a western or southern Kyrgyzstan itinerary.",
    },
    summary:
      "A lake and biosphere reserve known for forested mountains, quieter scenery and rich nature. It is less convenient than Issyk-Kul, but feels more secluded.",
    bestFor: "Forests, quiet nature, lake scenery, longer regional trips.",
    links: [
      { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Sary-Chelek_Nature_Reserve" },
      { label: "Visit Kyrgyzstan destinations", url: "https://www.visitkyrgyzstan.org/destinations/" },
    ],
    aliases: ["sary chelek", "sary-chelek", "sary chelak", "сары челек", "сары-челек"],
    topics: ["biosphere", "reserve", "forest", "western kyrgyzstan", "заповедник", "лес"],
  },
  {
    name: "Arslanbob",
    location:
      "Arslanbob is in Jalal-Abad Region in southern Kyrgyzstan, famous for walnut forests and mountain village scenery.",
    travelFromBishkek: {
      total: "about 10-12+ hours by road, usually split over 2 days",
      route:
        "Bishkek -> Toktogul/Jalal-Abad direction -> Arslanbob.",
      notes:
        "It is a long transfer from Bishkek. It makes more sense as part of a southern Kyrgyzstan route rather than a quick side trip.",
    },
    summary:
      "A large walnut-forest area with waterfalls, village stays and a warmer southern feel. It is a good fit for travelers who want culture and nature away from the classic Issyk-Kul loop.",
    bestFor: "Walnut forests, waterfalls, village life, southern Kyrgyzstan.",
    links: [
      { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Arslanbob" },
      { label: "Visit Kyrgyzstan destinations", url: "https://www.visitkyrgyzstan.org/destinations/" },
    ],
    aliases: ["arslanbob", "arslan bob", "арсланбоб", "арслан боб"],
    topics: ["walnut", "waterfall", "southern kyrgyzstan", "орех", "водопад"],
  },
  {
    name: "Summits of Kyrgyzstan",
    location:
      "Summits of Kyrgyzstan is a custom mountain program, so the exact region depends on the chosen summit, season, weather and group level.",
    travelFromBishkek: {
      total: "depends on the selected mountain route",
      route:
        "Bishkek -> chosen mountain region with guide team -> acclimatization or approach camp -> summit or trekking objective.",
      notes:
        "This is not a single fixed destination. The route, transport, equipment and timing should be planned with guides after choosing the difficulty level and season.",
    },
    summary:
      "A flexible hiking, trekking and alpinism program with professional guides, route planning and equipment support.",
    bestFor: "Custom hiking, trekking, alpine objectives, experienced mountain travelers.",
    links: [
      { label: "Summits tour", url: "/tours/summits-of-kyrgyzstan" },
      { label: "Official tourism overview", url: "https://tourism.gov.kg/about-kyrgyzstan/" },
    ],
    aliases: [
      "summits of kyrgyzstan",
      "summits",
      "summit tour",
      "mountain program",
      "peak tour",
      "горные туры",
      "восхождение",
      "вершины кыргызстана",
    ],
    topics: ["alpinism", "mountaineering", "hiking", "trekking", "peak", "summit", "альпинизм", "вершина"],
  },
  {
    name: "Ala-Archa National Park",
    location: "Ala-Archa National Park is just south of Bishkek, usually around 40-60 minutes by road from the city.",
    travelFromBishkek: {
      total: "about 40-60 minutes",
      route:
        "Bishkek -> Kashka-Suu direction -> Ala-Archa National Park gate and valley.",
      notes:
        "This is the easiest mountain day trip from Bishkek. Time can vary by pickup location and weekend traffic.",
    },
    summary:
      "A mountain national park close to Bishkek with accessible hiking trails, glacier views and sharp alpine peaks. Great when you have limited time.",
    bestFor: "Short hikes, acclimatization, day trips from Bishkek.",
    links: [
      { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Ala_Archa_National_Park" },
      { label: "Visit Kyrgyzstan destinations", url: "https://visitkyrgyzstan.org/destinations/" },
    ],
    aliases: ["ala archa", "ala-archa", "ala arca", "ала арча", "ала-арча"],
    topics: ["bishkek", "hike", "hiking", "glacier", "national park", "trail", "бишкек", "поход", "парк"],
  },
  {
    name: "Burana Tower",
    location: "Burana Tower is near Tokmok in Chuy Region, east of Bishkek, and is easy to include on the way to Issyk-Kul or Chon-Kemin.",
    travelFromBishkek: {
      total: "about 1.5-2 hours",
      route:
        "Bishkek -> Tokmok area -> Burana Tower.",
      notes:
        "It is an easy half-day cultural stop and pairs naturally with Chon-Kemin or the road toward Issyk-Kul.",
    },
    summary:
      "A Silk Road minaret near Tokmok and one of the most important historical stops close to Bishkek. It pairs well with Chon-Kemin or Issyk-Kul routes.",
    bestFor: "History, Silk Road heritage, easy cultural stops.",
    links: [
      { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Burana_Tower" },
      { label: "Tourism Department", url: "https://tourism.gov.kg/about-kyrgyzstan/" },
    ],
    aliases: ["burana", "burana tower", "бурана", "башня бурана"],
    topics: ["tower", "silk", "history", "tokmok", "minaret", "история", "токмок"],
  },
  {
    name: "Balasagyn Ancient City",
    location:
      "Balasagyn is the historic Silk Road city area associated with Burana Tower near Tokmok, east of Bishkek.",
    travelFromBishkek: {
      total: "about 1.5-2 hours",
      route:
        "Bishkek -> Tokmok area -> Burana Tower and Balasagyn historical site.",
      notes:
        "It is normally visited together with Burana Tower rather than as a separate standalone stop.",
    },
    summary:
      "A historic Silk Road site connected with Burana Tower and the ancient city remains near Tokmok.",
    bestFor: "Silk Road history, cultural stops, routes toward Chon-Kemin or Issyk-Kul.",
    links: [
      { label: "Burana Tower Wikipedia", url: "https://en.wikipedia.org/wiki/Burana_Tower" },
      { label: "Tourism Department", url: "https://tourism.gov.kg/about-kyrgyzstan/" },
    ],
    aliases: ["balasagyn", "balasagun", "баласагын", "баласагун", "ancient city balasagyn"],
    topics: ["ancient city", "silk road", "history", "древний город"],
  },
];

const popularPlaces = places.slice(0, 10);

const journeyLinksByPlace: Record<string, PlaceLink[]> = {
  "Issyk-Kul Lake": [
    { label: "Journey Issyk-Kul tour", url: "/tours/issyk-kul-3-days" },
    { label: "14-day Journey route", url: "/tours/14-days-kyrgyzstan" },
  ],
  "Song-Kul Lake": [
    { label: "Song-Kul horseback tour", url: "/tours/song-kul" },
    { label: "Song-Kul + Chon-Kemin", url: "/tours/song-kul-chon-kemin" },
  ],
  "Kel-Suu Lake": [{ label: "Kel-Suu expedition", url: "/tours/kel-suu" }],
  "Altyn-Arashan": [{ label: "14-day Journey route", url: "/tours/14-days-kyrgyzstan" }],
  "Ala-Kul Lake": [{ label: "14-day Journey route", url: "/tours/14-days-kyrgyzstan" }],
  Karakol: [
    { label: "Journey Issyk-Kul tour", url: "/tours/issyk-kul-3-days" },
    { label: "14-day Journey route", url: "/tours/14-days-kyrgyzstan" },
  ],
  "Jeti-Oguz": [
    { label: "Journey Issyk-Kul tour", url: "/tours/issyk-kul-3-days" },
    { label: "14-day Journey route", url: "/tours/14-days-kyrgyzstan" },
  ],
  "Skazka Canyon": [
    { label: "Journey Issyk-Kul tour", url: "/tours/issyk-kul-3-days" },
    { label: "14-day Journey route", url: "/tours/14-days-kyrgyzstan" },
  ],
  "Cholpon-Ata": [
    { label: "Journey Issyk-Kul tour", url: "/tours/issyk-kul-3-days" },
    { label: "14-day Journey route", url: "/tours/14-days-kyrgyzstan" },
  ],
  "Barskoon Valley": [
    { label: "Journey Issyk-Kul tour", url: "/tours/issyk-kul-3-days" },
    { label: "14-day Journey route", url: "/tours/14-days-kyrgyzstan" },
  ],
  Bokonbaevo: [{ label: "14-day Journey route", url: "/tours/14-days-kyrgyzstan" }],
  "Orto-Tokoy Reservoir": [
    { label: "Kel-Suu expedition", url: "/tours/kel-suu" },
    { label: "14-day Journey route", url: "/tours/14-days-kyrgyzstan" },
  ],
  "Boom Gorge": [{ label: "14-day Journey route", url: "/tours/14-days-kyrgyzstan" }],
  "Grigorievka Gorge": [{ label: "14-day Journey route", url: "/tours/14-days-kyrgyzstan" }],
  "Semenovka Gorge": [{ label: "14-day Journey route", url: "/tours/14-days-kyrgyzstan" }],
  "Chon-Kemin Valley": [{ label: "Song-Kul + Chon-Kemin", url: "/tours/song-kul-chon-kemin" }],
  "Kyzart Village": [{ label: "Song-Kul horseback tour", url: "/tours/song-kul" }],
  "Kilemche Valley": [{ label: "Song-Kul horseback tour", url: "/tours/song-kul" }],
  "Tuz-Ashuu Pass": [{ label: "Song-Kul horseback tour", url: "/tours/song-kul" }],
  "Kyrjol Camp": [{ label: "Song-Kul horseback tour", url: "/tours/song-kul" }],
  "Tash-Rabat": [{ label: "14-day Journey route", url: "/tours/14-days-kyrgyzstan" }],
  Naryn: [
    { label: "Kel-Suu expedition", url: "/tours/kel-suu" },
    { label: "14-day Journey route", url: "/tours/14-days-kyrgyzstan" },
  ],
  "Kok-Kiya Valley": [{ label: "Kel-Suu expedition", url: "/tours/kel-suu" }],
  "Ak-Sai Valley": [{ label: "Kel-Suu expedition", url: "/tours/kel-suu" }],
  "Summits of Kyrgyzstan": [{ label: "Summits tour", url: "/tours/summits-of-kyrgyzstan" }],
  "Ala-Archa National Park": [{ label: "Summits tour", url: "/tours/summits-of-kyrgyzstan" }],
  "Burana Tower": [{ label: "Song-Kul + Chon-Kemin", url: "/tours/song-kul-chon-kemin" }],
  "Balasagyn Ancient City": [{ label: "Song-Kul + Chon-Kemin", url: "/tours/song-kul-chon-kemin" }],
};

const transportAdviceByPlace: Record<string, string> = {
  "Issyk-Kul Lake":
    "The easiest way is a private car or guided tour from Bishkek. Public transport can get you to Balykchy, Cholpon-Ata or Karakol, but then you may need local taxis depending on the exact shore, hotel or stop.",
  "Song-Kul Lake":
    "The most comfortable way is a private driver or tour with a vehicle that can handle mountain roads. Public transport can take you toward Kochkor, but from there you normally need a local driver, arranged transfer or horseback/trekking logistics.",
  "Kel-Suu Lake":
    "Go with a 4x4 driver or organized tour. Public transport is not enough for the final remote section, and border-zone logistics should be checked before the trip.",
  "Altyn-Arashan":
    "Go from Bishkek to Karakol first. From Karakol or Ak-Suu, continue by prepared 4x4/UAZ, horse, or on foot. A regular passenger car is not suitable for the upper road.",
  "Ala-Kul Lake":
    "Travel from Bishkek to Karakol first, then start a guided or self-guided trek from the Karakol valley side. This is not a simple car destination; you need hiking gear, weather planning and enough time.",
  Karakol:
    "A private car is the smoothest option. Public options usually go from Bishkek toward Karakol by shared taxi, bus or marshrutka, then you use local taxis or transfers for nearby valleys.",
  "Jeti-Oguz":
    "Travel to Karakol or the south shore of Issyk-Kul, then continue by local taxi or private driver to the red rocks and valley. It is best as part of an Issyk-Kul route.",
  "Skazka Canyon":
    "Take the Issyk-Kul south-shore road toward Tosor. A private car is easiest because the canyon is a stop along the road, not a major transport hub.",
  "Cholpon-Ata":
    "Go by private car, shared taxi or bus/marshrutka toward the Issyk-Kul north shore. A private car is more flexible if you want petroglyphs, museum stops or a hotel drop-off.",
  "Barskoon Valley":
    "Use a private car or tour along the Issyk-Kul south shore. Public transport can get you near the village, but waterfalls and valley stops are much easier with a driver.",
  Bokonbaevo:
    "Travel by private car or south-shore transfer. Public transport can reach the village area, but eagle shows and cultural stops are normally easier when arranged in advance.",
  "Orto-Tokoy Reservoir":
    "Visit it as a road stop with a private driver on the way to Song-Kul, Kochkor, Naryn or the Issyk-Kul south shore.",
  "Boom Gorge":
    "You reach it naturally by private car, tour vehicle or public road transport heading from Bishkek toward Issyk-Kul, Kochkor or Naryn.",
  "Grigorievka Gorge":
    "Go by private car or tour from the Issyk-Kul north shore. It is easiest to combine with Semenovka Gorge and Cholpon-Ata.",
  "Semenovka Gorge":
    "Go by private car or tour from the Issyk-Kul north shore. It pairs naturally with Grigorievka Gorge on the same scenic detour.",
  "Chon-Kemin Valley":
    "A private car or tour is easiest. It can also be combined with Burana Tower on the way from Bishkek toward Issyk-Kul.",
  "Kyzart Village":
    "Go by private car or arranged transfer from Bishkek via Kochkor. For horseback tours, transport and horse guides are usually arranged together.",
  "Kilemche Valley":
    "First drive to Kyzart, then continue by horse or trekking with local guides. It is not a normal public-transport destination.",
  "Tuz-Ashuu Pass":
    "Reach it as part of a guided horse or trekking route from Kyzart/Kilemche toward Song-Kul. It is not a normal car-transfer destination.",
  "Kyrjol Camp":
    "Reach it as part of a Song-Kul horseback/yurt route. Transport normally goes to Kyzart first, then the route continues by horse around the lake.",
  "Tash-Rabat":
    "Use a private driver or tour via Naryn and At-Bashy. Public transport may get you to Naryn, but the final valley section normally needs arranged transport.",
  Naryn:
    "A private car is fastest and most flexible. Shared taxis and buses can also run toward Naryn, but remote onward routes still need arranged transport.",
  "Kok-Kiya Valley":
    "Use an organized 4x4 transfer or tour via Naryn and At-Bashy. This is remote border-zone travel, so do not rely on simple public transport for the final section.",
  "Ak-Sai Valley":
    "Use a 4x4 tour or arranged driver as part of a Kel-Suu/Tash-Rabat route. Public transport is not practical for the final remote sections.",
  "Sary-Chelek":
    "Plan it as a separate western Kyrgyzstan route with a private driver or carefully arranged transfers. It is too far for a casual day trip from Bishkek.",
  Arslanbob:
    "Plan it as part of a southern Kyrgyzstan route. A private driver is easiest; public transport may require several connections through Jalal-Abad or nearby towns.",
  "Summits of Kyrgyzstan":
    "Start with a custom plan from Bishkek. The team should choose the region, vehicle, guide, equipment and acclimatization schedule based on the selected summit and season.",
  "Ala-Archa National Park":
    "The easiest way is a private car, taxi or day tour from Bishkek. It is close to the city, so it works well as a half-day or full-day mountain trip.",
  "Burana Tower":
    "Go by private car, taxi or tour from Bishkek toward Tokmok. It is easy to combine with Chon-Kemin or the start of an Issyk-Kul trip.",
  "Balasagyn Ancient City":
    "Go the same way as Burana Tower: by private car, taxi or tour from Bishkek toward Tokmok, usually as one cultural stop.",
};

const initialMessages: ChatMessage[] = [
  {
    id: 1,
    role: "assistant",
    text:
      "Hi! I can help you choose places in Kyrgyzstan, estimate travel time from Bishkek, explain how to get there, and prepare a WhatsApp request for the Journey Kyrgyzstan team.\n\nTry: “how long to Son-Kul?”, “where is Altyn Arashan?”, or “как доехать до Чолпон-Аты?”",
  },
];

const russianPlaceCopy: Record<string, { summary: string; bestFor: string }> = {
  "Issyk-Kul Lake": {
    summary:
      "Большое горное озеро в окружении Тянь-Шаня. Хороший выбор для пляжного отдыха, красивой дороги, каньонов, горячих источников и спокойного знакомства с Кыргызстаном.",
    bestFor: "первое путешествие, семьи, летний отдых, озеро и красивые остановки по пути",
  },
  "Song-Kul Lake": {
    summary:
      "Высокогорное озеро с юртами, пастбищами и очень открытыми пейзажами. Одно из лучших мест для знакомства с кочевой культурой.",
    bestFor: "юрты, лошади, кочевая культура, ночевка на природе",
  },
  "Kel-Suu Lake": {
    summary:
      "Удаленное бирюзовое озеро среди скал недалеко от китайской границы. Очень красивое, но требует 4x4, времени и хорошей логистики.",
    bestFor: "приключения, фото, удаленные маршруты, 4x4",
  },
  "Altyn-Arashan": {
    summary:
      "Горная долина рядом с Караколом, известная горячими источниками, хвойным лесом и видами на Терскей Ала-Тоо.",
    bestFor: "горячие источники, 4x4, легкие походы, маршруты рядом с Караколом",
  },
  "Ala-Kul Lake": {
    summary:
      "Яркое альпийское озеро на одном из самых известных треккинговых маршрутов Кыргызстана. Красиво, но физически заметно сложнее обычной экскурсии.",
    bestFor: "треккинг, горные виды, опытные путешественники, многодневный маршрут",
  },
  Karakol: {
    summary:
      "Горный город на востоке Иссык-Куля, удобная база для поездок в Алтын-Арашан, Ала-Куль, Джети-Огуз и по южному берегу озера.",
    bestFor: "база для треккинга, еда, культура, маршруты вокруг Иссык-Куля",
  },
  "Jeti-Oguz": {
    summary:
      "Живописная долина с красными скалами, Семью Быками и Сломанным Сердцем. Хорошо подходит как остановка из Каракола.",
    bestFor: "красные скалы, короткие прогулки, фото, поездка из Каракола",
  },
  "Skazka Canyon": {
    summary:
      "Компактный каньон на южном берегу Иссык-Куля с цветными песчаными формами. Красиво смотрится утром и ближе к закату.",
    bestFor: "фото, короткая прогулка, семейная остановка, южный берег Иссык-Куля",
  },
  "Cholpon-Ata": {
    summary:
      "Популярный курортный город на северном берегу Иссык-Куля с пляжами, отелями, петроглифами и прогулками у воды.",
    bestFor: "озеро, пляжи, отели, семейный отдых",
  },
  "Barskoon Valley": {
    summary:
      "Зеленая горная долина на южном берегу Иссык-Куля с водопадами и красивыми видами выше дороги.",
    bestFor: "водопады, южный берег, фото, горная природа",
  },
  Bokonbaevo: {
    summary:
      "Село на южном берегу Иссык-Куля, известное культурными остановками, ремеслами и традициями охоты с беркутом.",
    bestFor: "культура, беркут-шоу, южный берег, локальный опыт",
  },
  "Orto-Tokoy Reservoir": {
    summary:
      "Водохранилище по дороге между Бишкеком, Кочкором и Иссык-Кулем. Часто подходит для короткой фотоостановки.",
    bestFor: "дорога, виды, короткая остановка",
  },
  "Boom Gorge": {
    summary:
      "Главное ущелье на дороге из Бишкека к Иссык-Кулю. Через него проходит почти каждый маршрут к озеру.",
    bestFor: "переезд к Иссык-Кулю, виды из окна, фотоостановки",
  },
  "Grigorievka Gorge": {
    summary:
      "Зеленое ущелье на северном берегу Иссык-Куля с горными видами, рекой и пастбищами.",
    bestFor: "природа, легкая поездка от озера, пикник, фото",
  },
  "Semenovka Gorge": {
    summary:
      "Соседнее ущелье рядом с Григорьевкой, удобное для красивой природной остановки на северном берегу Иссык-Куля.",
    bestFor: "короткая поездка, горные виды, северный берег",
  },
  "Chon-Kemin Valley": {
    summary:
      "Зеленая долина между Бишкеком и Иссык-Кулем, удобная для прогулок, лошадей и спокойной ночевки в гостевом доме.",
    bestFor: "лошади, семейный отдых, природа, остановка между Бишкеком и озером",
  },
  "Kyzart Village": {
    summary:
      "Стартовая точка для маршрутов к Сон-Кулю, особенно для конных и юрточных программ.",
    bestFor: "старт к Сон-Кулю, лошади, сельская атмосфера",
  },
  "Kilemche Valley": {
    summary:
      "Долина на конных и пеших маршрутах к Сон-Кулю. Обычно посещается как часть организованного маршрута.",
    bestFor: "конный маршрут, треккинг, путь к Сон-Кулю",
  },
  "Tuz-Ashuu Pass": {
    summary:
      "Горный перевал на маршрутах к Сон-Кулю, который дает красивые виды и ощущение настоящей высокогорной дороги.",
    bestFor: "виды, конный маршрут, путь к Сон-Кулю",
  },
  "Kyrjol Camp": {
    summary:
      "Юрточный лагерь в районе Сон-Куля, подходящий для ночевки и знакомства с жизнью на жайлоо.",
    bestFor: "юрты, Сон-Куль, спокойная ночевка, кочевая культура",
  },
  "Tash-Rabat": {
    summary:
      "Каменный караван-сарай в Нарынской области, важная историческая остановка на удаленном маршруте.",
    bestFor: "история, Шелковый путь, Нарын, удаленные маршруты",
  },
  Naryn: {
    summary:
      "Город в центральном Кыргызстане, удобная база для поездок к Кель-Суу, Таш-Рабату и другим удаленным маршрутам.",
    bestFor: "логистическая база, Нарынская область, дальние поездки",
  },
  "Kok-Kiya Valley": {
    summary:
      "Удаленная долина по пути к Кель-Суу. Обычно требует 4x4, планирования ночевки и хорошей погоды.",
    bestFor: "4x4, Кель-Суу, дикая природа, удаленные виды",
  },
  "Ak-Sai Valley": {
    summary:
      "Высокогорная долина на юге Нарынской области, часто включается в дальние 4x4 маршруты.",
    bestFor: "удаленные пейзажи, 4x4, приключения",
  },
  "Sary-Chelek": {
    summary:
      "Красивое озеро и биосферный заповедник на западе Кыргызстана. Это отдельный большой маршрут, а не быстрая поездка из Бишкека.",
    bestFor: "озеро, заповедник, запад Кыргызстана, природа",
  },
  Arslanbob: {
    summary:
      "Большой ореховый лес и горное село на юге Кыргызстана. Хорошее направление для южного маршрута.",
    bestFor: "ореховый лес, юг Кыргызстана, природа и культура",
  },
  "Summits of Kyrgyzstan": {
    summary:
      "Горные восхождения и треккинговые маршруты, которые нужно планировать индивидуально по сезону, уровню группы и выбранной вершине.",
    bestFor: "горы, восхождения, треккинг, индивидуальный маршрут",
  },
  "Ala-Archa National Park": {
    summary:
      "Национальный парк рядом с Бишкеком. Самый простой вариант быстро увидеть горы, ущелье и альпийские виды.",
    bestFor: "полдня или день из Бишкека, горы, прогулки, фото",
  },
  "Burana Tower": {
    summary:
      "Историческая башня рядом с Токмоком. Часто ее совмещают с Чон-Кемином или началом маршрута к Иссык-Кулю.",
    bestFor: "история, короткая поездка из Бишкека, культурная остановка",
  },
  "Balasagyn Ancient City": {
    summary:
      "Историческая зона рядом с Бураной, связанная с древним городом Баласагын и культурой Шелкового пути.",
    bestFor: "история, Бурана, культурная остановка",
  },
};

function buildPlaceReply(
  place: Place,
  options?: { includeLocation?: boolean; language?: ReplyLanguage },
): ChatMessage {
  const russianCopy = russianPlaceCopy[place.name];

  if (options?.language === "ru") {
    return {
      id: Date.now(),
      role: "assistant",
      text: `${place.name}: ${options.includeLocation ? `${localizeRouteText(place.location)}\n\n` : ""}${russianCopy?.summary ?? place.summary}\n\nКому подойдет: ${russianCopy?.bestFor ?? place.bestFor}\n\nМогу также подсказать, сколько ехать из Бишкека и как лучше построить маршрут.`,
      links: [...(journeyLinksByPlace[place.name] ?? []), ...place.links],
    };
  }

  return {
    id: Date.now(),
    role: "assistant",
    text: `${place.name}: ${options?.includeLocation ? `${place.location}\n\n` : ""}${place.summary}\n\nBest for: ${place.bestFor}`,
    links: [...(journeyLinksByPlace[place.name] ?? []), ...place.links],
  };
}

function localizeRouteText(text: string) {
  return text
    .replaceAll("Bishkek", "Бишкек")
    .replaceAll("Boom Gorge", "Боомское ущелье")
    .replaceAll("Balykchy", "Балыкчы")
    .replaceAll("Kochkor", "Кочкор")
    .replaceAll("Karakol", "Каракол")
    .replaceAll("Naryn", "Нарын")
    .replaceAll("Tokmok", "Токмок")
    .replaceAll("Kyzart", "Кызарт")
    .replaceAll("Song-Kul", "Сон-Куль")
    .replaceAll("Issyk-Kul", "Иссык-Куль")
    .replaceAll("Kel-Suu", "Кель-Суу")
    .replaceAll("Cholpon-Ata", "Чолпон-Ата")
    .replaceAll("Altyn-Arashan", "Алтын-Арашан")
    .replaceAll("Ala-Kul", "Ала-Куль")
    .replaceAll("Tash-Rabat", "Таш-Рабат")
    .replaceAll("Kok-Kiya", "Кок-Кыя")
    .replaceAll("Ak-Suu", "Ак-Суу")
    .replaceAll("south shore", "южный берег")
    .replaceAll("north shore", "северный берег")
    .replaceAll("chosen mountain region", "выбранный горный район")
    .replaceAll("guide team", "команда гидов")
    .replaceAll("acclimatization or approach camp", "акклиматизация или подход к лагерю")
    .replaceAll("summit or trekking objective", "вершина или треккинговая цель")
    .replaceAll("by road", "по дороге")
    .replaceAll("on foot", "пешком")
    .replaceAll("by rough 4x4", "на подготовленном 4x4")
    .replaceAll("mountain pass", "горный перевал")
    .replaceAll("yurt camps", "юрточные лагеря")
    .replaceAll("area", "район")
    .replaceAll("valley", "долина")
    .replaceAll("village", "село")
    .replaceAll("then", "затем")
    .replaceAll("and", "и")
    .replaceAll("or", "или");
}

function localizeDurationText(text: string) {
  return text
    .replaceAll("about", "примерно")
    .replaceAll("usually", "обычно")
    .replaceAll("depends on the selected mountain route", "зависит от выбранного горного маршрута")
    .replaceAll("not practical as a same-day drive; plan", "не подходит для поездки туда-обратно за день; планируйте")
    .replaceAll("often split over", "часто лучше разделить на")
    .replaceAll("often planned inside a", "обычно планируется внутри")
    .replaceAll("itinerary", "маршрута")
    .replaceAll("of driving", "в пути")
    .replaceAll("by private car", "на частной машине")
    .replaceAll("by road", "по дороге")
    .replaceAll("to reach the gorge area", "до района ущелья")
    .replaceAll("in good season", "в хороший сезон")
    .replaceAll("total if done in one long travel day", "общего пути, если ехать одним длинным днем")
    .replaceAll("same-day drive", "поездки одним днем")
    .replaceAll("days", "дня")
    .replaceAll("day", "день")
    .replaceAll("hours", "часов")
    .replaceAll("hour", "час");
}

function buildRussianRoadNotes(place: Place) {
  if (
    place.name.includes("Kel-Suu") ||
    place.name.includes("Kok-Kiya") ||
    place.name.includes("Ak-Sai") ||
    place.name.includes("Tash-Rabat")
  ) {
    return "Это удаленное направление: лучше ехать с водителем на 4x4, заранее проверить сезон, проживание и возможные пограничные/логистические нюансы.";
  }

  if (
    place.name.includes("Ala-Kul") ||
    place.name.includes("Kilemche") ||
    place.name.includes("Kyrjol") ||
    place.name.includes("Tuz-Ashuu")
  ) {
    return "Это не обычная точка для машины: маршрут обычно включает треккинг или лошадей, поэтому нужны гид, правильное снаряжение и запас по времени.";
  }

  if (place.name.includes("Altyn-Arashan")) {
    return "После Каракола дорога становится сложной: нужен подготовленный 4x4/UAZ, лошадь или пеший маршрут. На обычной легковой машине лучше не ехать.";
  }

  if (place.name.includes("Summits")) {
    return "Точного одного маршрута нет: район, транспорт, гиды, снаряжение и график зависят от выбранной вершины, сезона и уровня группы.";
  }

  return "Точное время зависит от сезона, дорожных условий, остановок по пути и конкретной точки высадки. Частная машина или тур удобнее, если нужно заехать к каньонам, ущельям, водопадам или прямо к отелю.";
}

function buildTravelTimeReply(place: Place, language: ReplyLanguage): ChatMessage {
  const transportAdvice =
    transportAdviceByPlace[place.name] ??
    "A private driver or guided tour is usually the easiest option from Bishkek, especially outside the main city-to-city roads.";

  if (language === "ru") {
    return {
      id: Date.now(),
      role: "assistant",
      text: `Из Бишкека до ${place.name}: ${localizeDurationText(place.travelFromBishkek.total)}.\n\nМаршрут: ${localizeRouteText(place.travelFromBishkek.route)}\n\nКак доехать: ${buildRussianRoadNotes(place)}\n\nСовет: не ориентируйтесь только на расстояние по карте. В Кыргызстане горные дороги, погода, остановки и тип машины сильно влияют на реальное время в пути. Для этого направления Journey Kyrgyzstan может подобрать подходящую машину и понять, нужен ли однодневный выезд, ночевка или часть большого маршрута.`,
      links: [...(journeyLinksByPlace[place.name] ?? []), ...place.links],
    };
  }

  return {
    id: Date.now(),
    role: "assistant",
    text: `From Bishkek to ${place.name}: ${place.travelFromBishkek.total}.\n\nRoute: ${place.travelFromBishkek.route}\n\nHow to get there: ${transportAdvice}\n\nWhat to expect: ${place.travelFromBishkek.notes}\n\nShort advice: do not plan this only by map distance. In Kyrgyzstan, mountain roads, weather, stops and the type of car can change the real travel time a lot. For this place, Journey Kyrgyzstan can choose the right vehicle and decide whether it should be a day trip, overnight stop or part of a longer route.`,
    links: [...(journeyLinksByPlace[place.name] ?? []), ...place.links],
  };
}

function buildDirectionsReply(place: Place, language: ReplyLanguage): ChatMessage {
  const transportAdvice =
    transportAdviceByPlace[place.name] ??
    "A private driver or guided tour is usually the easiest option from Bishkek, especially outside the main city-to-city roads.";

  if (language === "ru") {
    return {
      id: Date.now(),
      role: "assistant",
      text: `Как доехать из Бишкека до ${place.name}:\n\n1. Основной маршрут: ${localizeRouteText(place.travelFromBishkek.route)}\n\n2. Транспорт: ${buildRussianRoadNotes(place)}\n\n3. Примерное время: ${localizeDurationText(place.travelFromBishkek.total)}.\n\nСамый простой вариант — попросить Journey Kyrgyzstan организовать транспорт, потому что для горных маршрутов часто важны правильная машина, знание дороги местным водителем и гибкое время.`,
      links: [...(journeyLinksByPlace[place.name] ?? []), ...place.links],
    };
  }

  return {
    id: Date.now(),
    role: "assistant",
    text: `How to get from Bishkek to ${place.name}:\n\n1. Main route: ${place.travelFromBishkek.route}\n\n2. Transport: ${transportAdvice}\n\n3. Approximate time: ${place.travelFromBishkek.total}.\n\n4. Important details: ${place.travelFromBishkek.notes}\n\nIf you want the easiest version, I would ask Journey Kyrgyzstan to arrange the transport, because mountain routes often need the right vehicle, local driver knowledge and flexible timing.`,
    links: [...(journeyLinksByPlace[place.name] ?? []), ...place.links],
  };
}

function buildSitePlacesReply(language: ReplyLanguage = "en"): ChatMessage {
  const placeNames = places.map((place) => place.name).join(", ");

  if (language === "ru") {
    return {
      id: Date.now(),
      role: "assistant",
      text: `Я могу отвечать по местам и точкам маршрутов, которые показаны на сайте:\n\n${placeNames}.\n\nМожно спросить: “как доехать до Barskoon”, “сколько ехать до Cholpon-Ata из Бишкека”, или “расскажи про Kel-Suu”.`,
      links: [
        { label: "All tours", url: "/tours" },
        { label: "14-day Journey route", url: "/tours/14-days-kyrgyzstan" },
      ],
    };
  }

  return {
    id: Date.now(),
    role: "assistant",
    text: `I can answer about the places and route points shown on this website:\n\n${placeNames}.\n\nYou can ask things like “how to get to Barskoon”, “how long to Cholpon-Ata from Bishkek”, or “tell me about Kel-Suu”.`,
    links: [
      { label: "All tours", url: "/tours" },
      { label: "14-day Journey route", url: "/tours/14-days-kyrgyzstan" },
    ],
  };
}

function buildWhatsAppUrl(summary: string) {
  const text = encodeURIComponent(
    `Hello Journey Kyrgyzstan! I used the website assistant and would like help planning a trip.\n\n${summary}`,
  );

  return `https://wa.me/996703367477?text=${text}`;
}

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function detectLanguage(value: string): ReplyLanguage {
  return /[А-Яа-яЁё]/.test(value) ? "ru" : "en";
}

function includesPhrase(normalizedInput: string, phrase: string) {
  return ` ${normalizedInput} `.includes(` ${normalizeText(phrase)} `);
}

function levenshteinDistance(a: string, b: string) {
  const previous = Array.from({ length: b.length + 1 }, (_, index) => index);
  const current = Array.from({ length: b.length + 1 }, () => 0);

  for (let i = 1; i <= a.length; i += 1) {
    current[0] = i;

    for (let j = 1; j <= b.length; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      current[j] = Math.min(
        current[j - 1] + 1,
        previous[j] + 1,
        previous[j - 1] + cost,
      );
    }

    for (let j = 0; j <= b.length; j += 1) {
      previous[j] = current[j];
    }
  }

  return previous[b.length];
}

function getFuzzyAliasScore(normalizedInput: string, normalizedAlias: string) {
  if (!normalizedInput || !normalizedAlias) {
    return 0;
  }

  if (includesPhrase(normalizedInput, normalizedAlias)) {
    return 1;
  }

  const inputWords = normalizedInput.split(" ");
  const aliasWords = normalizedAlias.split(" ");
  const windowSizes = Array.from(
    new Set([aliasWords.length - 1, aliasWords.length, aliasWords.length + 1]),
  ).filter((size) => size > 0 && size <= inputWords.length);

  let bestScore = 0;

  for (const size of windowSizes) {
    for (let start = 0; start <= inputWords.length - size; start += 1) {
      const phrase = inputWords.slice(start, start + size).join(" ");
      const distance = levenshteinDistance(phrase, normalizedAlias);
      const maxLength = Math.max(phrase.length, normalizedAlias.length);
      const score = maxLength === 0 ? 0 : 1 - distance / maxLength;

      if (score > bestScore) {
        bestScore = score;
      }
    }
  }

  return bestScore;
}

function findFuzzyPlace(normalizedInput: string) {
  const bestMatch = places
    .flatMap((place) =>
      [place.name, ...place.aliases].map((alias) => ({
        place,
        score: getFuzzyAliasScore(normalizedInput, normalizeText(alias)),
      })),
    )
    .sort((left, right) => right.score - left.score)[0];

  return bestMatch && bestMatch.score >= 0.74 ? bestMatch.place : undefined;
}

function findPlace(input: string) {
  const normalized = normalizeText(input);

  const aliasMatch = places.find((place) =>
    place.aliases.some((alias) => includesPhrase(normalized, alias)),
  );

  if (aliasMatch) {
    return aliasMatch;
  }

  const fuzzyMatch = findFuzzyPlace(normalized);

  if (fuzzyMatch) {
    return fuzzyMatch;
  }

  const topicMatches = places
    .map((place) => ({
      place,
      score: place.topics.filter((topic) => includesPhrase(normalized, topic)).length,
    }))
    .filter((match) => match.score > 0)
    .sort((left, right) => right.score - left.score);

  if (topicMatches.length === 1 || topicMatches[0]?.score > topicMatches[1]?.score) {
    return topicMatches[0].place;
  }

  return undefined;
}

function asksTravelTime(normalized: string) {
  return (
    includesPhrase(normalized, "how long") ||
    includesPhrase(normalized, "how much time") ||
    includesPhrase(normalized, "travel time") ||
    includesPhrase(normalized, "drive time") ||
    includesPhrase(normalized, "takes to go") ||
    includesPhrase(normalized, "take to go") ||
    includesPhrase(normalized, "to get to") ||
    includesPhrase(normalized, "from bishkek") ||
    includesPhrase(normalized, "из бишкека") ||
    includesPhrase(normalized, "с бишкека") ||
    includesPhrase(normalized, "сколько ехать") ||
    includesPhrase(normalized, "сколько добираться") ||
    includesPhrase(normalized, "как долго") ||
    includesPhrase(normalized, "время в пути") ||
    includesPhrase(normalized, "дорога")
  );
}

function asksDirections(normalized: string) {
  return (
    includesPhrase(normalized, "how to get") ||
    includesPhrase(normalized, "how do i get") ||
    includesPhrase(normalized, "how can i get") ||
    includesPhrase(normalized, "how to go") ||
    includesPhrase(normalized, "how do i go") ||
    includesPhrase(normalized, "get there") ||
    includesPhrase(normalized, "go there") ||
    includesPhrase(normalized, "route to") ||
    includesPhrase(normalized, "way to") ||
    includesPhrase(normalized, "как доехать") ||
    includesPhrase(normalized, "как добраться") ||
    includesPhrase(normalized, "как попасть") ||
    includesPhrase(normalized, "на чем доехать") ||
    includesPhrase(normalized, "маршрут до")
  );
}

function getAssistantReply(input: string): ChatMessage {
  const normalized = normalizeText(input);
  const language = detectLanguage(input);
  const matchedPlace = findPlace(input);

  if (matchedPlace) {
    if (asksDirections(normalized)) {
      return buildDirectionsReply(matchedPlace, language);
    }

    if (asksTravelTime(normalized)) {
      return buildTravelTimeReply(matchedPlace, language);
    }

    const asksLocation =
      includesPhrase(normalized, "where") ||
      includesPhrase(normalized, "location") ||
      includesPhrase(normalized, "где") ||
      includesPhrase(normalized, "где находится");

    return buildPlaceReply(matchedPlace, { includeLocation: asksLocation, language });
  }

  if (
    normalized.includes("popular") ||
    normalized.includes("place") ||
    normalized.includes("мест") ||
    normalized.includes("куда")
  ) {
    return {
      id: Date.now(),
      role: "assistant",
      text:
        language === "ru"
          ? `Популярные места, которые стоит рассмотреть:\n\n${popularPlaces
              .map((place) => `${place.name}: ${place.bestFor}`)
              .join("\n")}`
          : `Popular places to consider:\n\n${popularPlaces
              .map((place) => `${place.name}: ${place.bestFor}`)
              .join("\n")}`,
      links: [
        { label: "All destinations", url: "https://visitkyrgyzstan.org/destinations/" },
        { label: "About Kyrgyzstan", url: "https://tourism.gov.kg/about-kyrgyzstan/" },
      ],
    };
  }

  if (
    normalized.includes("day") ||
    normalized.includes("days") ||
    normalized.includes("день") ||
    normalized.includes("дней") ||
    normalized.includes("route") ||
    normalized.includes("tour")
  ) {
    return {
      id: Date.now(),
      role: "assistant",
      text:
        language === "ru"
          ? "На 3-4 дня я бы предложил Issyk-Kul, Karakol с Jeti-Oguz и Skazka Canyon, или Song-Kul. На 5-7 дней можно объединить Burana Tower, Chon-Kemin, Issyk-Kul, Karakol и Song-Kul. На 8+ дней добавить Kel-Suu, Tash-Rabat, Altyn-Arashan, Ala-Kul или южные направления вроде Arslanbob."
          : "For 3-4 days I would suggest Issyk-Kul, Karakol with Jeti-Oguz and Skazka Canyon, or Song-Kul. For 5-7 days, combine Burana Tower, Chon-Kemin, Issyk-Kul, Karakol and Song-Kul. For 8+ days, add Kel-Suu, Tash-Rabat, Altyn-Arashan, Ala-Kul or southern places like Arslanbob.",
    };
  }

  if (
    normalized.includes("season") ||
    normalized.includes("weather") ||
    normalized.includes("сезон") ||
    normalized.includes("погода")
  ) {
    return {
      id: Date.now(),
      role: "assistant",
      text:
        language === "ru"
          ? "Июнь-сентябрь обычно лучше всего подходят для высокогорных маршрутов и юрточных лагерей. Весна и осень хороши для нижних маршрутов, каньонов и культурных поездок. Зимой лучше выбирать снежные виды и короткие маршруты рядом с Бишкеком или Иссык-Кулем."
          : "June to September is usually best for high mountain routes and yurt camps. Spring and autumn are good for lower routes, canyons and cultural trips. Winter works best for snowy scenery and shorter routes near Bishkek or Issyk-Kul.",
      links: [{ label: "Official tourism overview", url: "https://tourism.gov.kg/about-kyrgyzstan/" }],
    };
  }

  return {
    id: Date.now(),
    role: "assistant",
    text:
      language === "ru"
        ? "Я могу помочь с маршрутами, сезонами, временем в пути и популярными местами. Попробуйте спросить: “как доехать до Altyn Arashan?”, “расскажи про Song-Kul”, “что посмотреть за 5 дней?” или “какие места есть на сайте?”."
        : "I can help with routes, seasons, budgets, and popular places. Try asking: “Where is Altyn Arashan?”, “Tell me about Song-Kul”, “What can I see in 5 days?”, or “Which places are on this site?”.",
  };
}

export default function AIAssistantDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [tripNotes, setTripNotes] = useState("Interested in Kyrgyzstan private tours.");
  const messageId = useRef(10);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const whatsappUrl = useMemo(() => buildWhatsAppUrl(tripNotes), [tripNotes]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [isOpen, messages]);

  const addUserMessage = (text: string) => {
    const trimmed = text.trim();

    if (!trimmed) {
      return;
    }

    const userMessage: ChatMessage = {
      id: messageId.current++,
      role: "user",
      text: trimmed,
    };
    const assistantReply = getAssistantReply(trimmed);

    setMessages((current) => [
      ...current,
      userMessage,
      { ...assistantReply, id: messageId.current++ },
    ]);
    setTripNotes((current) => `${current}\nQuestion: ${trimmed}`);
    setInput("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addUserMessage(input);
  };

  const showPopularPlaces = () => {
    setMessages((current) => [
      ...current,
      {
        id: messageId.current++,
        role: "assistant",
        text: "Here are short notes about popular places in Kyrgyzstan:",
      },
      ...popularPlaces.map((place) => ({ ...buildPlaceReply(place), id: messageId.current++ })),
    ]);
    setTripNotes((current) => `${current}\nInterest: popular places in Kyrgyzstan.`);
  };

  const showSitePlaces = () => {
    setMessages((current) => [
      ...current,
      { ...buildSitePlacesReply(), id: messageId.current++ },
    ]);
    setTripNotes((current) => `${current}\nInterest: places shown on the website.`);
  };

  return (
      <div className="fixed inset-x-4 bottom-4 z-50 flex justify-end sm:inset-x-auto sm:bottom-5 sm:right-5">
      {isOpen ? (
        <div className="w-full max-w-[390px] overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-2xl">
          <div className="flex items-center justify-between bg-emerald-700 px-4 py-3 text-white">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
                <Bot size={20} />
              </span>
              <div>
                <p className="text-sm font-semibold">Journey AI Assistant</p>
                <p className="text-xs text-emerald-50">Travel planner</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-full p-2 text-white/90 transition hover:bg-white/10 hover:text-white"
              aria-label="Close assistant"
            >
              <X size={18} />
            </button>
          </div>

          <div className="max-h-[58vh] space-y-3 overflow-y-auto bg-slate-50 px-4 py-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  message.role === "user"
                    ? "ml-10 bg-emerald-600 text-white"
                    : "mr-6 border border-slate-200 bg-white text-slate-800"
                }`}
              >
                <p className="whitespace-pre-line">{message.text}</p>
                {message.links ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {message.links.map((link) => (
                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-full border border-emerald-200 px-2.5 py-1 text-xs font-medium text-emerald-700 transition hover:bg-emerald-50"
                      >
                        {link.label}
                        <ExternalLink size={12} />
                      </a>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-slate-200 bg-white p-3">
            <div className="mb-3 grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => addUserMessage("How long to Song-Kul from Bishkek?")}
                className="inline-flex items-center justify-center gap-1 rounded-lg border border-slate-200 px-2 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                <CalendarDays size={14} />
                Time
              </button>
              <button
                type="button"
                onClick={showPopularPlaces}
                className="inline-flex items-center justify-center gap-1 rounded-lg border border-slate-200 px-2 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                <MapPin size={14} />
                Popular
              </button>
              <button
                type="button"
                onClick={showSitePlaces}
                className="inline-flex items-center justify-center gap-1 rounded-lg border border-slate-200 px-2 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                <MapPin size={14} />
                Site places
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask a place, route or travel time..."
                className="min-w-0 flex-1 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />
              <button
                type="submit"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white transition hover:bg-emerald-700"
                aria-label="Send message"
              >
                <Send size={17} />
              </button>
            </form>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Send request to WhatsApp
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-3 rounded-full bg-emerald-600 px-4 py-3 text-white shadow-xl transition hover:bg-emerald-700"
          aria-label="Open AI travel assistant"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
            <MessageCircle size={20} />
          </span>
          <span className="hidden text-sm font-semibold sm:inline">Ask trip help</span>
          <Sparkles size={16} className="hidden text-emerald-100 sm:block" />
        </button>
      )}
    </div>
  );
}
