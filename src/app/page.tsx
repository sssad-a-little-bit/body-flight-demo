'use client';

import { useRef, useState, type MouseEvent } from 'react';
import { directions, phoneLink, routeLink, studio, whatsappLink, type DirectionId } from '@/lib/studio';

function Arrow({ diagonal = false, className = '' }: { diagonal?: boolean; className?: string }) {
  return <svg className={`arrow ${className}`} width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={diagonal ? 'M5 19 19 5M5 5h14v14' : 'M4 12h15m-6-6 6 6-6 6'} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function FlightMark({ className = '' }: { className?: string }) {
  return <svg className={className} width="39" height="45" viewBox="0 0 40 48" fill="none" aria-hidden="true"><ellipse cx="20" cy="24" rx="10" ry="21" transform="rotate(32 20 24)" stroke="currentColor" strokeWidth="1.4" /><ellipse cx="20" cy="24" rx="10" ry="21" transform="rotate(-32 20 24)" stroke="currentColor" strokeWidth="1.4" /></svg>;
}

function Ribbon() {
  return <svg className="ribbon" viewBox="0 0 600 690" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id="ribbon-color" x1="100" y1="110" x2="530" y2="550" gradientUnits="userSpaceOnUse"><stop stopColor="#7b5d82" /><stop offset=".24" stopColor="#d3bada" /><stop offset=".48" stopColor="#99819f" /><stop offset=".72" stopColor="#e2cde3" /><stop offset="1" stopColor="#725578" /></linearGradient>
      <linearGradient id="ribbon-highlight" x1="0" x2="600" gradientUnits="userSpaceOnUse"><stop stopColor="#eadbec" stopOpacity=".12" /><stop offset=".5" stopColor="#eadbec" stopOpacity=".9" /><stop offset="1" stopColor="#eadbec" stopOpacity=".15" /></linearGradient>
    </defs>
    <g transform="rotate(14 300 345)">
      <ellipse cx="300" cy="345" rx="218" ry="275" stroke="#aa8caf" strokeOpacity=".12" strokeWidth="1" />
      <path d="M367 14C427 119 181 179 137 295C90 418 285 429 386 349C518 245 534 115 455 128C350 145 178 532 223 617C271 710 485 547 504 417C528 246 281 262 195 372C112 480 161 611 145 684" stroke="#120e14" strokeWidth="37" />
      <path d="M367 14C427 119 181 179 137 295C90 418 285 429 386 349C518 245 534 115 455 128C350 145 178 532 223 617C271 710 485 547 504 417C528 246 281 262 195 372C112 480 161 611 145 684" stroke="url(#ribbon-color)" strokeWidth="29" />
      <path d="M361 15C421 120 175 180 131 296C84 419 279 430 380 350C512 246 528 116 449 129C344 146 172 533 217 618C265 711 479 548 498 418C522 247 275 263 189 373C106 481 155 612 139 685" stroke="url(#ribbon-highlight)" strokeWidth="1.3" />
    </g>
    <path d="m494 105 3-10 3 10 10 3-10 3-3 10-3-10-10-3Z" fill="#d6c1d9" />
    <circle cx="91" cy="475" r="3" fill="#c6a9cd" />
  </svg>;
}

function DirectionArt({ type }: { type: DirectionId }) {
  return <svg className={`direction-art art-${type}`} viewBox="0 0 240 220" fill="none" aria-hidden="true">
    {type === 'aerial' ? <g stroke="currentColor" strokeWidth="1"><ellipse cx="120" cy="110" rx="50" ry="98" transform="rotate(34 120 110)" /><ellipse cx="120" cy="110" rx="50" ry="98" transform="rotate(-34 120 110)" /><ellipse cx="120" cy="110" rx="50" ry="98" transform="rotate(90 120 110)" /><circle cx="120" cy="110" r="6" fill="currentColor" /></g> : type === 'pole' ? <g stroke="currentColor" strokeWidth="1.2"><path d="M120 13v193M51 157c97 65 160-77 94-93-57-14-108 98-44 111 54 12 110-65 92-91" /><circle cx="120" cy="97" r="5" fill="currentColor" /></g> : <g stroke="currentColor" strokeWidth="1.2"><path d="M29 166C50 91 94 43 130 53c43 12 19 97-19 105-45 9-56-68-13-86 41-18 94 34 113 97M40 181h160" /><circle cx="130" cy="53" r="5" fill="currentColor" /></g>}
  </svg>;
}

const questions = [
  { question: 'Можно ли прийти без опыта?', answer: 'Расскажите студии, что вы начинаете с нуля. В переписке вам подскажут подходящее направление, формат и возрастные условия первого занятия. Возможность участия без подготовки уточните до записи.' },
  { question: 'Что взять с собой?', answer: 'Одежда и необходимые вещи могут зависеть от направления. До занятия попросите студию прислать список: что надеть и что взять с собой. Так вы будете опираться на рекомендации вашего тренера.' },
  { question: 'Сколько стоит пробное?', answer: 'Уточнить в WhatsApp. Студия расскажет актуальную стоимость, условия пробного занятия и доступное время. Запись будет подтверждена в переписке.' },
];

export default function Home() {
  const [direction, setDirection] = useState<DirectionId>('aerial');
  const [preferredTime, setPreferredTime] = useState('');
  const dialog = useRef<HTMLDialogElement>(null);
  const directionSelect = useRef<HTMLSelectElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const previousOverflow = useRef('');

  function openTrial(event: MouseEvent<HTMLButtonElement>, selected: DirectionId = direction) {
    opener.current = event.currentTarget;
    setDirection(selected);
    previousOverflow.current = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.current?.showModal();
    directionSelect.current?.focus();
  }

  function onDialogClose() {
    document.body.style.overflow = previousOverflow.current;
    opener.current?.focus({ preventScroll: true });
  }

  return <>
    <a className="skip-link" href="#main">Перейти к содержанию</a>
    <header className="header wrap">
      <a className="brand" href="#" aria-label="Body Flight — на главную"><FlightMark /><span>BODY FLIGHT<small>студия движения</small></span></a>
      <nav className="desktop-nav" aria-label="Главная навигация"><a href="#directions">Направления</a><a href="#first-time">Для новичков</a><a href="#contacts">Контакты</a></nav>
      <a className="header-contact" href={phoneLink()}><span>{studio.phone}</span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m7 3 3 5-2 2c1.5 3 3 4.5 6 6l2-2 5 3c0 3-2 4-4 4C10 20 4 14 3 7c0-2 1-4 4-4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg><span className="sr-only">Позвонить в студию</span></a>
    </header>

    <main id="main">
      <section className="hero wrap" aria-labelledby="hero-title">
        <div className="hero-content">
          <p className="eyebrow"><span className="small-dot" /> Павлодар · студия движения</p>
          <h1 id="hero-title">Первое занятие<br />в <em>Body Flight</em></h1>
          <p className="hero-subtitle">Воздушная гимнастика.<br />Pole dance. Стретчинг.</p>
          <a className="button button-primary hero-button" href="#directions">Выбрать направление<Arrow diagonal /></a>
          <p className="hero-note">Начните с любопытства.<br />Остальное обсудим со студией.</p>
        </div>
        <div className="hero-art"><Ribbon /><div className="art-caption"><span className="caption-line" /><span>Больше свободы.<br />В каждом движении.</span></div><span className="art-index">BF — 01 / MOVEMENT</span></div>
        <a href="#directions" className="scroll-hint"><span>Найдите своё движение</span><span aria-hidden="true">↓</span></a>
      </section>

      <div className="manifesto" aria-hidden="true"><div className="wrap"><span>Сила</span><span className="asterisk">✳</span><span>Гибкость</span><span className="asterisk">✳</span><span>Свобода быть собой</span></div></div>

      <section className="directions-section wrap section-space" id="directions" aria-labelledby="directions-title">
        <div className="section-heading"><div><p className="eyebrow section-number">01 / Найти своё</p><h2 id="directions-title">К чему вас <em>тянет?</em></h2></div><p className="section-intro">Три направления. Разные ощущения.<br />Выберите то, что хочется попробовать.</p></div>
        <div className="direction-grid">
          {directions.map((item) => <article key={item.id} className={`direction-card direction-${item.id}`}>
            <div className="card-top"><span className="card-number">{item.number}</span><span>{item.label}</span><Arrow diagonal /></div>
            <DirectionArt type={item.id} />
            <div className="card-copy"><h3>{item.name}</h3><p>{item.description}</p><button type="button" className="try-button" onClick={(event) => openTrial(event, item.id)}>Хочу попробовать<Arrow /></button></div>
          </article>)}
        </div>
        <p className="directions-note"><span aria-hidden="true">↗</span> Стоимость, расписание и условия первого занятия — <button className="text-button" type="button" onClick={(event) => openTrial(event)}>Уточнить в WhatsApp</button></p>
      </section>

      <section className="faq-section" id="first-time" aria-labelledby="faq-title"><div className="faq-layout wrap section-space">
        <div className="faq-heading"><p className="eyebrow section-number">02 / Первый шаг</p><h2 id="faq-title">Если вы<br /><em>впервые</em></h2><p>Не обязательно знать всё заранее.<br />Начните с простых вопросов.</p><FlightMark className="faq-mark" /></div>
        <div className="questions">{questions.map((item, index) => <details key={item.question}><summary><span className="question-number">0{index + 1}</span><span>{item.question}</span><span className="plus" aria-hidden="true" /></summary><div className="answer"><p>{item.answer}</p><button className="text-button" type="button" onClick={(event) => openTrial(event)}>Уточнить в WhatsApp <Arrow diagonal /></button></div></details>)}</div>
      </div></section>

      <section className="trial-section wrap section-space" id="trial" aria-labelledby="trial-title">
        <div className="trial-heading"><p className="eyebrow section-number">03 / От интереса к движению</p><h2 id="trial-title">Первый шаг —<br /><em>просто написать.</em></h2></div>
        <div className="trial-copy"><p>Выберите направление и спросите о пробном. Студия подскажет стоимость и время для новичка.</p><button type="button" className="button button-primary" onClick={(event) => openTrial(event)}>Узнать о пробном<Arrow diagonal /></button><p className="fine-print">Вы сами отправляете сообщение в WhatsApp.<br />Студия подтверждает запись в переписке.</p></div>
      </section>

      <section className="contacts-section" id="contacts" aria-labelledby="contacts-title"><div className="wrap contact-layout">
        <div className="contact-place"><p className="eyebrow section-number">04 / Увидимся в студии</p><h2 id="contacts-title">Body Flight<em>{studio.city}</em></h2><div className="location-seal" aria-hidden="true"><svg width="34" height="34" viewBox="0 0 32 32" fill="none"><path d="M16 28s10-9 10-16a10 10 0 1 0-20 0c0 7 10 16 10 16Z" stroke="currentColor" strokeWidth="1.3"/><circle cx="16" cy="12" r="3" stroke="currentColor" strokeWidth="1.3"/></svg></div></div>
        <div className="contact-details"><div><p className="contact-label">Наш адрес</p><p className="address">{studio.address}</p><a className="route-link" href={routeLink()} target="_blank" rel="noopener noreferrer">Построить маршрут <span className="map-provider">2ГИС</span><Arrow diagonal /></a></div><div className="phone-block"><p className="contact-label">На связи</p><a className="contact-phone" href={phoneLink()}>{studio.phone}</a><button className="text-button" type="button" onClick={(event) => openTrial(event)}>Уточнить в WhatsApp<Arrow diagonal /></button></div></div>
      </div></section>
    </main>

    <footer className="footer wrap"><a href="#" className="footer-brand">BODY FLIGHT</a><p>Демонстрационная версия</p><p className="flare-credit">Концепция сайта от <span>Flare Studio <span aria-hidden="true">✳</span></span></p></footer>

    <dialog ref={dialog} className="trial-dialog" aria-labelledby="dialog-title" aria-describedby="dialog-description" onClose={onDialogClose} onClick={(event) => { if (event.target === event.currentTarget) { const rect = event.currentTarget.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.current?.close(); } }}>
      <button type="button" className="dialog-close" aria-label="Закрыть форму" onClick={() => dialog.current?.close()}><span aria-hidden="true">×</span></button>
      <p className="eyebrow">Ваш первый шаг</p><h2 id="dialog-title">Давайте <em>попробуем</em></h2><p id="dialog-description">Подготовим сообщение для студии.<br />Отправить его в WhatsApp сможете вы сами.</p>
      <form action={whatsappLink(direction, preferredTime)} method="get" onSubmit={(event) => event.preventDefault()}>
        <label htmlFor="direction">Направление</label><div className="select-wrap"><select ref={directionSelect} id="direction" value={direction} onChange={(event) => setDirection(event.target.value as DirectionId)}>{directions.map((item) => <option value={item.id} key={item.id}>{item.name}</option>)}</select></div>
        <label htmlFor="preferred-time">Удобный день или время <span>необязательно</span></label><input id="preferred-time" type="text" maxLength={160} placeholder="Например, в будни после 18:00" value={preferredTime} onChange={(event) => setPreferredTime(event.target.value)} autoComplete="off" />
        <a className="button button-primary whatsapp-button" href={whatsappLink(direction, preferredTime)} target="_blank" rel="noopener noreferrer">Открыть WhatsApp<Arrow diagonal /></a>
        <p className="fine-print">Стоимость и условия — уточнить в WhatsApp.<br />Это запрос, а не подтверждённая запись. Студия подтвердит занятие в переписке.</p>
      </form>
    </dialog>
  </>;
}
