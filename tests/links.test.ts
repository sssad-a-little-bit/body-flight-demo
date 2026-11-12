import { test } from 'node:test';
import assert from 'node:assert/strict';
import { directions, phoneLink, routeLink, studio, whatsappLink } from '../src/lib/studio.ts';

for (const direction of directions) {
  test(`${direction.name}: correct number, message and optional time`, () => {
    const expected = `Здравствуйте! Хочу узнать про пробное занятие по ${direction.messageName}. Подскажите стоимость и ближайшее время для новичка.`;
    const link = new URL(whatsappLink(direction.id));
    assert.equal(link.origin + link.pathname, 'https://wa.me/77789938766');
    assert.equal(link.searchParams.get('text'), expected);
    assert.equal(link.searchParams.size, 1);
    const time = 'среда & пятница, 18:00 + 19:00 / #1?';
    const timed = new URL(whatsappLink(direction.id, `  ${time}  `));
    assert.equal(timed.searchParams.get('text'), `${expected} Удобный день или время: ${time}.`);
    assert.equal(timed.searchParams.size, 1);
    assert.equal(timed.hash, '');
    assert.ok(timed.href.includes('%D0'));
    assert.ok(timed.href.includes('%26'));
    assert.equal(whatsappLink(direction.id, '   '), link.href);
  });
}

test('2GIS search includes city, full street address and office, encoded exactly once', () => {
  const link = new URL(routeLink());
  assert.equal(link.origin, 'https://2gis.kz');
  assert.equal(decodeURIComponent(link.pathname), `/pavlodar/search/${studio.city}, ${studio.address}`);
  assert.equal(link.search, '');
});

test('telephone link derives from the public number', () => {
  assert.equal(phoneLink(), 'tel:+77789938766');
});
