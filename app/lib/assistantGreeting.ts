// Match complete greetings only, so "history" and "приветствие" remain questions.
const greetingPattern = /^(?:good\s+(?:morning|afternoon|evening)|hello|hiya|hey|hi|здравствуйте|здравствуй|здрасте|приветствую|привет|доброго\s+(?:дня|утра|вечера)|добрый\s+(?:день|вечер)|доброе\s+утро|салам|салем|саламатсызбы)(?=$|[\s\p{P}\p{S}])/iu;
const separators = /^[\s\p{P}\p{S}]+/u;

export function parseLeadingGreeting(input: string): { question: string } | null {
  let question = input.trim().replace(separators, "");
  let greeted = false;
  let match: RegExpMatchArray | null;

  while ((match = question.match(greetingPattern))) {
    greeted = true;
    question = question.slice(match[0].length).replace(separators, "");
  }

  if (!greeted && /^\s*👋[\s\p{P}\p{S}]*$/u.test(input)) {
    return { question: "" };
  }

  return greeted ? { question } : null;
}
