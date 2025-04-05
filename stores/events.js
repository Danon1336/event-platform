import { defineStore } from 'pinia';

export const useEventsStore = defineStore('events', {
  state: () => ({
    events: [
      {
        id: '1',
        title: 'Научная конференция 2025',
        description: 'Ежегодная конференция по новым технологиям.',
        location: 'Москва',
        date: '2025-04-15T10:00',
        format: 'offline',
        contact: 'info@conference.ru',
        organizer: 'ООО Наука',
        status: 'approved',
        lat: 55.751244,
        lng: 37.618423,
      },
      {
        id: '2',
        title: 'Онлайн-хакатон IT',
        description: 'Соревнование для разработчиков.',
        location: 'Санкт-Петербург',
        date: '2025-04-20T14:00',
        format: 'online',
        contact: 'hack@it.ru',
        organizer: 'IT Community',
        status: 'approved',
        lat: 59.9342802,
        lng: 30.3350986,
      },
    ],
  }),
  actions: {
    fetchEvents() {
      return this.events;
    },
  },
});