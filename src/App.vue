<template>
  <div id="app">
    <header class="mt-5">
      <b-container>
        <nav>
          <b-row>
            <b-col>
              <router-link to="/" exact
                ><img
                  class="logo img-fluid"
                  src="@/assets/logo.png"
                  alt="logo" /></router-link
            ></b-col>
            <b-col class="text-end d-none d-md-block">
              <button
                class="lang-button"
                @click="changeLocale('pl')"
                type="button"
              >
                <img
                  :class="[
                    locale === 'pl' ? 'active-lang img-fluid' : 'img-fluid',
                  ]"
                  src="@/assets/pl.png"
                  alt="flag"
                />
              </button>
              <button
                class="lang-button"
                @click="changeLocale('en')"
                type="button"
              >
                <img
                  :class="[
                    locale === 'en' ? 'active-lang img-fluid' : 'img-fluid',
                  ]"
                  src="@/assets/en.png"
                  alt="flag"
                />
              </button>
            </b-col>
          </b-row>
        </nav>
      </b-container>
    </header>
    <main>
      <router-view></router-view>
    </main>
    <footer>
      <b-container>
        <b-row>
          <b-col class="d-md-none ms-2">
            <button
              class="lang-button"
              @click="changeLocale('pl')"
              type="button"
            >
              <img
                :class="[
                  locale === 'pl' ? 'active-lang img-fluid' : 'img-fluid',
                ]"
                src="@/assets/pl.png"
                alt="flag"
              />
            </button>
            <button
              class="lang-button"
              @click="changeLocale('en')"
              type="button"
            >
              <img
                :class="[
                  locale === 'en' ? 'active-lang img-fluid' : 'img-fluid',
                ]"
                src="@/assets/en.png"
                alt="flag"
              />
            </button>
          </b-col>
        </b-row>
      </b-container>
    </footer>
  </div>
</template>

<script>
import i18n from "@/utilities/i18n";
export default {
  name: "App",
  data() {
    return {
      locale: "en",
    };
  },
  methods: {
    changeLocale(locale) {
      this.locale = locale;
      i18n.locale = locale;
      localStorage.setItem("locale", locale);
    },
  },
  mounted() {
    this.locale = localStorage.getItem("locale") || "en";
    i18n.locale = this.locale;
  },
};
</script>