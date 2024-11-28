import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

const messages = {
    'en': {
      addNewAlbumText: 'Add new album',
      sortingText: 'Sort by',
      name: 'Name',
      date: 'Date',
      validationText: 'Name is required',
      addAlbumText: 'Add Album',
    },
    'pl': {
      addNewAlbumText: 'Dodaj nowy album',
      sortingText: 'Sortuj po',
      name: 'Nazwa',
      date: 'Data',
      validationText: 'Nazwa jest wymagana',
      addAlbumText: 'Dodaj Album',
    }
};

const i18n = new VueI18n({
    locale: 'en',
    fallbackLocale: 'pl',
    messages,
});

export default i18n;