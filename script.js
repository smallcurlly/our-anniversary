// НАЛАШТУЙ ЦІ ДВА РЯДКИ ПІД ВАШУ ІСТОРІЮ:
const START_DATE = "2025-10-29T00:00:00"; // Формат: РРРР-ММ-ДДTГГ:ХХ:СС
const SECRET_PASSWORD = "мяу";      // Демонстраційний пароль, не справжній захист

// Лічильник часу разом
function updateTimer() {
  const start = new Date(START_DATE).getTime();
  const now = Date.now();
  let diff = Math.max(0, now - start);
  const days = Math.floor(diff / 86400000);
  diff %= 86400000;
  const hours = Math.floor(diff / 3600000);
  diff %= 3600000;
  const minutes = Math.floor(diff / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}
updateTimer();
setInterval(updateTimer, 1000);

// Тексти інтерактивних конвертів — перепиши їх своїми словами.
const letters = {
  miss: {
    title: "Коли ти сумуєш",
    text: "Привіт, моє соонечко.

Якщо ти відкрила цей лист, значить, зараз тобі сумно. І мені так хочеться бути поруч у цю хвилину. Сісти біля тебе, обійняти, нічого не питати, просто бути.

Знаєш, я часто ловлю себе на думці, що, коли ти засмучена, мені самій стає якось тихо всередині. Бо я так люблю твою чарівно милу посмішку. Але я також люблю тебе й у такі дні. Тобі не треба нічого з себе видавлювати, не треба казати, що все добре. Можна просто посумувати. Я нікуди не дінуся.
Тобі можна сумувати, можна плакати, можна нічого не пояснювати й не бути в нормі. Я все одно любитиму тебе однаково сильно. Сум не робить тебе менш коханою.  

Завжди помниии, що ти для мене надважлива. Навіть коли ми не разом, я про тебе думаю. Ти моя найгарніша, найтепліша, найрідніша. Мій маленький прекрасний кіііісік. Моя коханааааа, бачу в тобі стільки світла, що жоден поганий день не здатен його загасити, навіть якщо зараз тобі здається інакше.

Спробуй зараз зробити собі чогось гарячого,  те какао яке ти часто робила, і загорнись у щось м'яке. Я знаю, це все мелочі, але мені буде спокійніше, якщо ти трохи про себе подбаєш. (якщо я цього зробити не можу зараз)
Ти заслуговуєш на ніжність, особливо від самої себе.
І знай, десь у цьому світі є дівчина, яка думає про тебе просто зараз, дуже тебе любить і пишається тобою.

Усе мине, ось побачиш. А я завжди буду поруч, коли тобі це знадобиться.

Обіймаю тебе дуже міцно, цілуююю ніжноо ніжноо моя кохана."
  },
  sad: {
    title: "Коли тобі сумно",
    text: "Тобі не потрібно завжди бути сильною чи усміхатися. Я поруч і в хороші, і в складні дні. Ти важлива для мене саме така, як є. Давай пройдемо цей день разом. ♡"
  },
  anniversary: {
    title: "З нашою першою річницею",
    text: "Один рік наших спогадів — і стільки всього ще попереду. Дякую, що ти є в моєму житті. Я хочу й далі збирати з тобою маленькі моменти, з яких складається щастя. Люблю тебе. ♡"
  }
};

const letterPanel = document.getElementById("letterPanel");
document.querySelectorAll(".envelope").forEach(button => {
  button.addEventListener("click", () => {
    const letter = letters[button.dataset.letter];
    document.getElementById("letterTitle").textContent = letter.title;
    document.getElementById("letterText").textContent = letter.text;
    letterPanel.hidden = false;
    letterPanel.scrollIntoView({ behavior: "smooth", block: "center" });
  });
});
document.getElementById("closeLetter").addEventListener("click", () => {
  letterPanel.hidden = true;
});

// ДЕМОНСТРАЦІЙНИЙ пароль: його можна побачити у вихідному коді.
document.getElementById("secretForm").addEventListener("submit", event => {
  event.preventDefault();
  const entered = document.getElementById("secretPassword").value;
  const correct = entered === SECRET_PASSWORD;
  document.getElementById("secretLetter").hidden = !correct;
  document.getElementById("passwordError").hidden = correct;
  if (correct) {
    document.getElementById("secretLetter").scrollIntoView({ behavior: "smooth", block: "center" });
  }
});

// Перегляд фотографій у великому форматі
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");

document.querySelectorAll(".gallery .polaroid img, .hero-photo img").forEach(img => {
  img.tabIndex = 0;
  img.style.cursor = "zoom-in";
  const openPhoto = () => {
    if (!img.src || img.style.display === "none") return;
    lightboxImage.src = img.src;
    lightboxImage.alt = img.alt || "Фотографія зі спогадів";
    const caption = img.closest("figure")?.querySelector("figcaption")?.textContent
      || img.closest(".hero-photo")?.querySelector("span")?.textContent
      || img.alt;
    lightboxCaption.textContent = caption || "";
    lightbox.hidden = false;
    document.getElementById("closeLightbox").focus();
  };
  img.addEventListener("click", openPhoto);
  img.addEventListener("keydown", event => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openPhoto();
    }
  });
});
function closeLightbox() {
  lightbox.hidden = true;
  lightboxImage.src = "";
}
document.getElementById("closeLightbox").addEventListener("click", closeLightbox);
lightbox.addEventListener("click", event => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && !lightbox.hidden) closeLightbox();
});

// Музика починає грати лише після натискання користувача.
const music = document.getElementById("backgroundMusic");
const musicToggle = document.getElementById("musicToggle");
const musicLabel = document.getElementById("musicLabel");
musicToggle.addEventListener("click", async () => {
  if (music.paused) {
    try {
      await music.play();
      musicLabel.textContent = "Вимкнути музику";
    } catch {
      musicLabel.textContent = "Додай music/our-song.mp3";
      alert("Додай аудіофайл у папку music і назви його our-song.mp3.");
    }
  } else {
    music.pause();
    musicLabel.textContent = "Увімкнути музику";
  }
});
