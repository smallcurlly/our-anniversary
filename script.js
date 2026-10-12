// НАЛАШТУЙ ЦІ ДВА РЯДКИ ПІД ВАШУ ІСТОРІЮ:
const START_DATE = "2025-10-29T21:17:12"; // Формат: РРРР-ММ-ДДTГГ:ХХ:СС
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
    title: "Коли потрібна підтримка",
    text: "Якби я міг зараз бути поруч, я б міцно тебе обійняв. Навіть коли ми не поруч, ти все одно в моїх думках. Уяви, що це обійми, які можна відкрити в будь-який момент. ♡"
  },
  sad: {
    title: "Мяуууу",
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
    } catch 
      
  } else {
    music.pause();
    musicLabel.textContent = "Увімкнути музику";
  }
});
