<template>
  <b-container class="list-box mt-5">
    <button
      v-b-modal.modal-prevent-closing
      type="button"
      class="btn main-button"
    >
      <b-icon class="icon" icon="plus-circle"></b-icon>
      {{ $t("addNewAlbumText") }}
    </button>
    <hr class="mt-4 mb-4" />
    <div class="list-navigation">
      <b-row>
        <b-col>
          <p class="inline-block me-3">{{ $t("sortingText") }}</p>
          <v-select
            class="custom-select"
            v-model="selected"
            :searchable="false"
            :options="options"
            label="text"
          ></v-select>
        </b-col>
        <b-col class="text-end">
          <button type="button" class="toggle-button" @click="toggleListView">
            <b-icon class="icon" icon="list"></b-icon>
          </button>
          <button type="button" class="toggle-button" @click="toggleGridView">
            <b-icon class="icon" icon="grid"></b-icon>
          </button>
        </b-col>
      </b-row>
    </div>

    <div class="grid-container album mt-3" :class="{ 'list-view': isListView }">
      <div class="row">
        <div
          class="col-6 col-md-6 col-lg-3 text-center"
          v-for="(album, index) in sortedAlbums"
          :key="index"
        >
          <div class="album__item">
            <b-row>
              <b-col
                ><p class="album__title">{{ album.name }}</p></b-col
              >
              <b-col class="text-end">
                <button
                  v-if="album.isFavourite"
                  @click="toggleFavourite(album.id)"
                  class="album-button"
                  type="button"
                >
                  <b-icon
                    class="icon icon__star icon__star--blue"
                    icon="star-fill"
                  ></b-icon>
                </button>
                <button
                  v-else
                  @click="toggleFavourite(album.id)"
                  class="album-button"
                  type="button"
                >
                  <b-icon class="icon icon__star" icon="star"></b-icon>
                </button>
                <button
                  @click="removeAlbum(album.id)"
                  class="album-button"
                  type="button"
                >
                  <b-icon class="icon icon__trash" icon="trash"></b-icon>
                </button>
              </b-col>
            </b-row>
          </div>
        </div>
      </div>
    </div>

    <b-modal
      centered
      id="modal-prevent-closing"
      ref="modal"
      :title="$t('addNewAlbumText')"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          :label="$t('name')"
          label-for="name-input"
          :invalid-feedback="$t('validationText')"
          :state="nameState"
        >
          <b-form-input
            class="mt-2"
            id="name-input"
            v-model="name"
            :state="nameState"
            required
          ></b-form-input>
        </b-form-group>
      </form>
      <template #modal-footer="{ ok }">
        <b-button
          class="btn me-auto modal-button"
          variant="primary"
          size="md"
          @click="ok()"
        >
          {{ $t("addAlbumText") }}
        </b-button>
      </template>
    </b-modal>
  </b-container>
</template>

<script>
export default {
  name: "MusicList",
  data() {
    return {
      name: "",
      nameState: null,
      selected: { value: "id", text: "id" },
      isListView: true,
      albums: [
        {
          id: 0,
          name: "Rock star",
          date: "2021-01-01",
          isFavourite: true,
        },
        {
          id: 1,
          name: "Playlist 2019",
          date: "2019-01-05",
          isFavourite: false,
        },
      ],
    };
  },
  mounted() {
    const storageAlbums = JSON.parse(localStorage.getItem("albums")) || [];
    if (storageAlbums.length > 0) {
      this.albums = storageAlbums;
    } else {
      localStorage.setItem("albums", JSON.stringify(this.albums));
    }

    const isListViewStorage = JSON.parse(localStorage.getItem("isListView"));
    if(isListViewStorage) {
      localStorage.setItem("isListView", true);
    } else {
      this.isListView = isListViewStorage;
    }
  },
  computed: {
    sortedAlbums() {
      if (!this.selected) return this.albums;
      const key = this.selected.value;
      return [...this.albums].sort((a, b) => {
        if (key === "name") {
          return a.name.localeCompare(b.name);
        } else if (key === "date") {
          return new Date(a.date) - new Date(b.date);
        } else {
          return a.id - b.id;
        }
      });
    },
    options() {
      return [
        { value: "id", text: this.$t("id") },
        { value: "name", text: this.$t("name") },
        { value: "date", text: this.$t("date") },
      ];
    },
  },
  methods: {
    toggleListView() {
      this.isListView = true;
      localStorage.setItem("isListView", true);
    },
    toggleGridView() {
      this.isListView = false;
      localStorage.setItem("isListView", false);
    },
    removeAlbum(id) {
      const albumIndex = this.albums.findIndex((album) => album.id === id);

      if (albumIndex !== -1) {
        this.albums.splice(albumIndex, 1);
        localStorage.setItem("albums", JSON.stringify(this.albums));
      }
    },
    toggleFavourite(id) {
      const album = this.albums.find((album) => album.id === id);
      if (album) {
        album.isFavourite = !album.isFavourite;
        localStorage.setItem("albums", JSON.stringify(this.albums));
      }
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.nameState = valid;
      return valid;
    },
    resetModal() {
      this.name = "";
      this.nameState = null;
    },
    handleOk(bvModalEvent) {
      bvModalEvent.preventDefault();
      this.handleSubmit();
    },
    handleSubmit() {
      if (!this.checkFormValidity()) {
        return;
      }
      this.albums.push({
        id: Math.floor(10000 + Math.random() * 90000),
        name: this.name,
        date: new Date().toISOString(),
        isFavourite: false,
      });
      this.name = "";

      // in real world scenario I would save the data to the database
      localStorage.setItem('albums', JSON.stringify(this.albums));

      this.$nextTick(() => {
        this.$bvModal.hide("modal-prevent-closing");
      });
    },
  },
};
</script>
