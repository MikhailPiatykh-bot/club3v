import Link from "next/link";
import { HomeFaq, HomeMap, HomeSchedule, HomeVideos } from "@/components/home-islands";
import { CamIcon, ImgIcon, TgIcon, WaIcon } from "@/components/mock-icons";
import { Quiz } from "@/components/quiz";
import { SignupButton } from "@/components/signup-button";
import { TrackLink } from "@/components/track-link";
import { coaches, prices, site, videos } from "@/lib/content";
import { formatRub } from "@/lib/money";

const steps = [
  { age: "3–4", unit: "года", text: "Самые младшие. Первое знакомство с тренировками." },
  { age: "5–6", unit: "лет", text: "Дошкольники. Основы техники направления." },
  { age: "7–10", unit: "лет", text: "Младшие школьники. Регулярные тренировки и старты." },
  { age: "11+", unit: "лет", text: "Старшая группа. Соревнования, лагерь, сборы в Китае." },
];

const path = [
  { n: "1", title: "Соревнования", text: "Участие в стартах.", todo: "Уровни — от клуба" },
  { n: "2", title: "Пояса", text: "Аттестации.", todo: "Система поясов — от клуба" },
  { n: "3", title: "Лагерь", text: "Лагерь клуба.", todo: "Даты, место — от клуба" },
  { n: "4", title: "Сборы в Китае", text: "Тренировочные сборы в Китае.", todo: "Детали — от клуба" },
];

const coachCards = [
  { title: "Имя тренера", line: "Направление: ушу", coach: coaches[0] },
  { title: "Имя тренера", line: "Направление: акробатика", coach: coaches[1] },
  { title: "Имя тренера", line: "Направление: —", coach: undefined },
];

export function HomeView() {
  return (
    <div className="home">
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-text">
            <div className="draft">Макет · черновик</div>
            <div className="kicker">Детский спортивный клуб · Москва, СЗАО</div>
            <h1>
              Ушу и&nbsp;акробатика для детей <em>с&nbsp;3&nbsp;лет</em> в&nbsp;СЗАО
            </h1>
            <ul className="bul">
              <li>
                <i>✓</i>Группы по возрасту — для детей с 3 лет
              </li>
              <li>
                <i>✓</i>Соревнования, лагерь и сборы в Китае
              </li>
              <li>
                <i>✓</i>Один адрес: пр-т Маршала Жукова, 51
              </li>
            </ul>
            <div className="cta-row">
              <a className="btn btn-red" href="#quiz">
                Записаться на пробное
              </a>
              <TrackLink href={site.whatsapp} goal="whatsapp_click" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                <span style={{ color: "#25D366", display: "inline-flex" }}>
                  <WaIcon />
                </span>
                Написать в WhatsApp
              </TrackLink>
            </div>
            <div className="chips">
              <span className="lbl">Группы:</span>
              <span className="chip">3–4 года</span>
              <span className="chip">5–6 лет</span>
              <span className="chip">7–10 лет</span>
              <span className="chip">11+ лет</span>
            </div>
          </div>
          <div className="hero-photo">
            <div className="ph">
              <CamIcon />
              Фото: дети на тренировке
              <small>главное фото клуба, горизонтальное / вертикальное</small>
            </div>
            <div className="float f1">
              <div className="ya">Я</div>
              <div>
                <b>~70 отзывов</b>
                <span>на Яндекс Картах</span>
              </div>
            </div>
            <div className="float f2">
              <div>
                <b>9 000 ₽/мес</b>
                <span>абонемент</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="dir">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <div className="kicker">Направления</div>
              <h2>
                Два направления —<br className="dbr" /> один клуб
              </h2>
            </div>
            <p>Оба направления — для детей с 3 лет, группы формируются по возрасту.</p>
          </div>
          <div className="dir-grid">
            <div className="dir wushu">
              <div className="num">01</div>
              <h3>
                Детское ушу
                <small>традиционное и оздоровительное</small>
              </h3>
              <div className="ph">
                <CamIcon />
                Фото: занятие по ушу
              </div>
              <p>
                <span className="todo">Описание направления — текст от клуба</span>
              </p>
              <div className="row">
                <div className="tags">
                  <span>С 3 лет</span>
                  <span>Группы по возрасту</span>
                  <span>Соревнования</span>
                </div>
                <Link className="btn btn-white" href="/wushu">
                  Подробнее
                </Link>
              </div>
            </div>
            <div className="dir acro">
              <div className="num">02</div>
              <h3>
                Спортивная акробатика
                <small>для детей с 3 лет</small>
              </h3>
              <div className="ph">
                <CamIcon />
                Фото: занятие по акробатике
              </div>
              <p>
                <span className="todo">Описание направления — текст от клуба</span>
              </p>
              <div className="row">
                <div className="tags">
                  <span>С 3 лет</span>
                  <span>Группы по возрасту</span>
                  <span>Соревнования</span>
                </div>
                <Link className="btn btn-dark" href="/acrobatics">
                  Подробнее
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="ages">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <div className="kicker">Возрастные группы</div>
              <h2>Растём шаг за шагом</h2>
            </div>
            <p>Ребёнок занимается со сверстниками и переходит в следующую группу по мере взросления.</p>
          </div>
          <div className="ladder">
            {steps.map((step) => (
              <div key={step.age} className="step">
                <div className="age">
                  {step.age}
                  <small>{step.unit}</small>
                </div>
                <p>{step.text}</p>
                <div className="meta">
                  <span>Ушу</span>
                  <span>Акробатика</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="sec-head">
            <div>
              <div className="kicker">Клуб в цифрах</div>
              <h2>CLUB3V в цифрах</h2>
            </div>
          </div>
          <div className="figs">
            <div className="fig">
              <b>X</b>
              <span>лет работы клуба</span>
            </div>
            <div className="fig">
              <b>X</b>
              <span>учеников занимается</span>
            </div>
            <div className="fig">
              <b>X</b>
              <span>наград на соревнованиях</span>
            </div>
            <div className="fig real">
              <b>~70</b>
              <span>отзывов на Яндекс Картах</span>
            </div>
          </div>
        </div>
      </section>

      <section id="coach">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <div className="kicker">Тренеры</div>
              <h2>Тренерский состав</h2>
            </div>
            <p>
              <span className="todo">Короткий текст о тренерах — от клуба</span>
            </p>
          </div>
          <div className="coaches">
            {coachCards.map((card) => (
              <div key={card.line} className="coach">
                <div className="ph">
                  <CamIcon />
                  Фото тренера
                </div>
                <div>
                  <h3>{card.coach?.placeholder === false ? card.coach.name : card.title}</h3>
                  <p>{card.line}</p>
                  <div className="tags">
                    <span>Стаж: X лет</span>
                    <span>Регалии: —</span>
                  </div>
                  <SignupButton placement="coach" coachId={card.coach?.id} coachName={card.coach?.name} className="btn btn-dark coach-signup">
                    Записаться к тренеру
                  </SignupButton>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="price">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <div className="kicker">Стоимость</div>
              <h2>Цены на занятия</h2>
            </div>
            <p>Начните с пробного занятия, затем выберите удобный формат.</p>
          </div>
          <div className="prices">
            <div className="price">
              <div className="t">{prices.trial.title}</div>
              <div className="v">— ₽</div>
              <ul>
                <li>Знакомство с тренером и группой</li>
                <li>Длительность: X мин</li>
              </ul>
              <a className="btn btn-ghost" href="#quiz">
                Записаться
              </a>
            </div>
            <div className="price">
              <div className="t">{prices.dropIn.title}</div>
              <div className="v">— ₽</div>
              <ul>
                <li>Одно занятие в группе</li>
                <li>Длительность: X мин</li>
              </ul>
              <a className="btn btn-ghost" href="#quiz">
                Записаться
              </a>
            </div>
            <div className="price hl">
              <span className="badge">Выгодно</span>
              <div className="t">{prices.subscriptionCard.title}</div>
              <div className="v">
                {formatRub(prices.subscription).replace("\u00a0₽", "")} ₽<small> / мес</small>
              </div>
              <ul>
                <li>Занятий в месяц: X</li>
                <li>Длительность: X мин</li>
              </ul>
              <div className="disc">
                <b>−{prices.largeFamilyDiscountPercent}%</b>
                Многодетным — скидка {prices.largeFamilyDiscountPercent}%
              </div>
              <a className="btn btn-red" href="#quiz">
                Оформить абонемент
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="sched">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <div className="kicker">Расписание</div>
              <h2>Расписание групп</h2>
            </div>
            <p>пр-т Маршала Жукова, 51</p>
          </div>
          <HomeSchedule />
          <div className="sched-note">
            <span>
              Расписание уточняйте у администратора.{" "}
              <Link href="/schedule" className="ul">
                Сетка на неделю
              </Link>
            </span>
            <TrackLink href={`tel:${site.phoneTel}`} goal="phone_click" className="btn btn-dark">
              Уточнить по телефону
            </TrackLink>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="path">
            <div className="kicker">Путь спортсмена</div>
            <h2>Путь ребёнка в клубе</h2>
            <div className="steps">
              {path.map((item) => (
                <div key={item.n} className="ps">
                  <div className="n">{item.n}</div>
                  <div>
                    <h3>{item.title}</h3>
                    <p>
                      {item.text} <span className="todo">{item.todo}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="sec-head">
            <div>
              <div className="kicker">Видео</div>
              <h2>Как проходят тренировки</h2>
            </div>
            <p>Короткие вертикальные видео из зала и с соревнований.</p>
          </div>
          <HomeVideos items={videos.map((item) => ({ id: item.id, title: item.title, src: item.src }))} />
        </div>
      </section>

      <section id="rev">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <div className="kicker">Отзывы</div>
              <h2>Что говорят родители</h2>
            </div>
          </div>
          <div className="rev-grid">
            <div className="rev-side">
              <b>~70</b>
              <p>отзывов о клубе на Яндекс Картах</p>
              <a className="btn btn-white" href={site.mapsUrl} target="_blank" rel="noopener noreferrer">
                Читать на Яндекс Картах
              </a>
              <a className="btn btn-ghost" style={{ color: "#fff", borderColor: "rgba(255,255,255,.6)", marginTop: -6 }} href={site.mapsUrl} target="_blank" rel="noopener noreferrer">
                Оставить отзыв
              </a>
            </div>
            <div className="widget">
              <div className="top">
                <div className="ya">Я</div>
                <div>
                  <b>Виджет отзывов Яндекс Карт • ~70 отзывов</b>
                  <span>Встраивается кодом с Яндекс Карт, данные подтягиваются автоматически</span>
                </div>
              </div>
              <div className="wl">
                <div>Место для отзыва из Яндекс Карт</div>
                <div>Место для отзыва из Яндекс Карт</div>
                <div>Место для отзыва из Яндекс Карт</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="sec-head">
            <div>
              <div className="kicker">Доверие</div>
              <h2>Федерации и награды</h2>
            </div>
            <p>
              <span className="todo">Список федераций и наград — от клуба</span>
            </p>
          </div>
          <div className="logos">
            <div className="ph">
              <ImgIcon />
              Логотип федерации
            </div>
            <div className="ph">
              <ImgIcon />
              Логотип федерации
            </div>
            <div className="ph">
              <ImgIcon />
              Награда / диплом
            </div>
            <div className="ph">
              <ImgIcon />
              Награда / диплом
            </div>
            <div className="ph">
              <ImgIcon />
              Логотип партнёра
            </div>
          </div>
        </div>
      </section>

      <section id="quiz">
        <div className="wrap">
          <div className="quiz">
            <div>
              <div className="kicker">Запись</div>
              <h2>Подберём группу</h2>
              <p className="lead">Ответьте на 4 коротких вопроса — администратор подберёт группу и время пробного занятия.</p>
              <div className="chips">
                <span className="chip">Возраст</span>
                <span className="chip">Направление</span>
                <span className="chip">Время</span>
                <span className="chip">Контакты</span>
              </div>
            </div>
            <Quiz contacts={{ phoneDisplay: site.phoneDisplay, phoneTel: site.phoneTel, whatsapp: site.whatsapp, telegram: site.telegram }} thankYou={site.thankYou} />
          </div>
        </div>
      </section>

      <section>
        <div className="wrap faq-grid">
          <div>
            <div className="kicker">Вопросы</div>
            <h2>Частые вопросы</h2>
          </div>
          <HomeFaq />
        </div>
      </section>

      <section id="cont">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <div className="kicker">Контакты</div>
              <h2>Ждём на тренировке</h2>
            </div>
          </div>
          <div className="contacts">
            <HomeMap widgetUrl={site.mapWidgetUrl} />
            <div className="ccard">
              <div>
                <div className="lbl">Адрес</div>
                <div className="val">
                  Москва, СЗАО,
                  <br />
                  пр-т Маршала Жукова, 51
                </div>
              </div>
              <div>
                <div className="lbl">Телефон</div>
                <TrackLink href={`tel:${site.phoneTel}`} goal="phone_click" className="val big">
                  {site.phoneDisplay}
                </TrackLink>
              </div>
              <div>
                <div className="lbl">Мессенджеры</div>
                <div className="msg">
                  <TrackLink href={site.whatsapp} goal="whatsapp_click" target="_blank" rel="noopener noreferrer">
                    <span className="ico ico-wa">
                      <WaIcon />
                    </span>
                    WhatsApp
                  </TrackLink>
                  <TrackLink href={site.telegram} goal="telegram_click" target="_blank" rel="noopener noreferrer">
                    <span className="ico ico-tg">
                      <TgIcon />
                    </span>
                    Telegram
                  </TrackLink>
                </div>
              </div>
              <a className="btn btn-red" href="#quiz">
                Записаться на пробное
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
