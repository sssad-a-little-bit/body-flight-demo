/** Confirm these demo contact details with the owner before public launch.
 * All contact links, labels and the map search derive from this one source. */
export const studio = {
  name: 'Body Flight',
  city: 'Павлодар',
  phone: '+7 778 993-87-66',
  address: 'ул. Розы Люксембург, 111, офис 105',
};

export const directions = [
  {
    id: 'aerial', number: '01', name: 'Воздушная гимнастика', messageName: 'воздушной гимнастике',
    label: 'Сила и ощущение полёта',
    description: 'Учитесь управлять телом в воздухе: соединять движения, держать баланс и развивать силу. О снарядах и формате первого занятия расскажет студия.',
  },
  {
    id: 'pole', number: '02', name: 'Pole dance', messageName: 'pole dance',
    label: 'Движение с характером',
    description: 'Сочетание танца и силовых элементов на пилоне. Развивайте координацию и находите свой способ двигаться.',
  },
  {
    id: 'stretching', number: '03', name: 'Стретчинг', messageName: 'стретчингу',
    label: 'Больше свободы в теле',
    description: 'Работа над гибкостью и подвижностью через упражнения на растяжку. Узнайте у студии, как проходит занятие для новичка.',
  },
] as const;

export type DirectionId = (typeof directions)[number]['id'];

export function whatsappLink(directionId: DirectionId, preferredTime = ''): string {
  const direction = directions.find((item) => item.id === directionId);
  if (!direction) throw new Error('Unknown direction');
  const time = preferredTime.trim();
  const message = `Здравствуйте! Хочу узнать про пробное занятие по ${direction.messageName}. Подскажите стоимость и ближайшее время для новичка.${time ? ` Удобный день или время: ${time}.` : ''}`;
  return `https://wa.me/${studio.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
}

export function routeLink(): string {
  return `https://2gis.kz/pavlodar/search/${encodeURIComponent(`${studio.city}, ${studio.address}`)}`;
}

export function phoneLink(): string {
  return `tel:+${studio.phone.replace(/\D/g, '')}`;
}
