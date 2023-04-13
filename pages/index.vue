<template>
  <div class="container">
    <div class="card">
      <div class="card__name">
        Звонок через SIP
        <div class="sip">
          <input type="checkbox" name="sip" id="sip" />
          <div class="custom-checkbox">
            <div class="circle" />
          </div>
        </div>
      </div>
      <div class="card__content">
        Включите эту функцию чтобы Авито и другие площадки не блокировали ваш
        аккаунт. Будет выглядеть так, будто звонки совершаются с разных номеров.
      </div>
    </div>
    <div class="card">
      <div class="card__name">Учётная запись</div>
      <div class="card__content">
        <div class="input-container">
          <label for="company">Компания</label>
          <input
            class="input_field"
            v-model="form.companyname"
            name="company"
            id="company"
            type="text"
          />
        </div>
        <div class="input-container">
          <label for="login">Логин</label>
          <input
            class="input_field"
            v-model="form.login"
            name="login"
            id="login"
            type="text"
          />
        </div>
        <div class="input-container">
          <label for="phone">Номер телефона</label>
          <input
            class="input_field"
            v-model="form.phone"
            name="phone"
            id="phone"
            type="tel"
          />
        </div>
        <div class="input-container">
          <label for="name">Имя</label>
          <input
            class="input_field"
            v-model="form.fname"
            name="name"
            id="name"
            type="text"
          />
        </div>
        <div class="input-container">
          <label for="second-name">Фамилия</label>
          <div>
            <input
              class="input_field w-100"
              v-model="form.lname"
              name="second-name"
              id="second-name"
              type="text"
            />
            <p class="extra-field">* Не обязательно</p>
          </div>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card__name">Оповещения о новых подборках</div>
      <div class="card__content">
        Выберите, куда будут приходить уведомления при появлении автомобилей,
        которые подходят под критерии вашей подборки.
        <div>
          <p class="card__content-header">Уведомления</p>
          <div class="input-group">
            <input
              v-model="form.notifytypestring"
              value="off"
              type="radio"
              name="notifications"
              id="disable-notifications"
            />
            <label for="disable-notifications">Выкл</label>
          </div>
          <div class="input-group">
            <input
              v-model="form.notifytypestring"
              value="Push"
              disabled
              type="radio"
              name="notifications"
              id="push"
            />
            <label for="push">Push</label>
          </div>
          <div class="input-group">
            <input
              v-model="form.notifytypestring"
              value="Email"
              type="radio"
              name="notifications"
              id="email"
            />
            <label for="email">Email</label>
            <div class="edit-container">
              <p v-if="!isEditing.email && this.email">{{ this.email }}</p>
              <img v-if="!isEditing.email" @click="editEmail" src="@/assets/img/edit.svg" alt="edit">
              <input
                v-model="email"
                v-else
                class="input_field email_field"
                type="text"
              />
            </div>
          </div>
          <div class="input-group">
            <input
              v-model="form.notifytypestring"
              value="Telegram"
              type="radio"
              name="notifications"
              id="telegram"
            />
            <label for="telegram">Telegram ID</label>
            <img v-if="!isEditing.telegram" @click="editTelegram" src="@/assets/img/edit.svg" alt="edit">
            <input
              v-model="telegram"
              v-else
              class="input_field email_field"
              type="text"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card__name">Переход в карточку</div>
      <div class="card__content">
        Выберите, каким образом будет открываться детальное представление
        выбранного вами транспорта.
        <div class="input-group">
          <input
            v-model="form.redirecttarget"
            value="0"
            type="radio"
            name="redirect"
            id="current"
          />
          <label for="current">В карточку в текущем окне</label>
        </div>
        <div class="input-group">
          <input
            v-model="form.redirecttarget"
            value="1"
            type="radio"
            name="redirect"
            id="redirect"
          />
          <label for="redirect">В карточку в отдельном окне</label>
        </div>
        <div class="input-group">
          <input
            v-model="form.redirecttarget"
            value="2"
            type="radio"
            name="redirect"
            id="source"
          />
          <label for="source">На источник</label>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card__name">Прочие настройки</div>
      <div class="card__content">
        <div class="timezone">
          <label for="timezone" id="timezone">Часовой пояс</label>
          <div class="timezone-container">
            <v-select
              v-model="form.timezone"
              class="select"
              label="name"
              :options="this.timezones"
              name="timezone"
            >
            </v-select>
          </div>
        </div>
        <div class="additional-settings">
          <div v-tooltip="'Лента будет автоматически обновляться 1 раз в 3 секунды'" class="additional-settings__container">
            <input v-model="form.locklentaupdate" type="checkbox" />
            <div class="check">
              <img
                class="checkmark"
                src="~/assets/img/check.png"
                alt="checkmark"
              />
            </div>
            <label for="">Автоматически переходить к новым объявлениям</label>
          </div>
          <div v-tooltip="'Включение зеленого/желтого цвета'" class="additional-settings__container">
            <input v-model="form.colorlenta" type="checkbox" />
            <div class="check">
              <img
                class="checkmark"
                src="~/assets/img/check.png"
                alt="checkmark"
              />
            </div>
            <label for="">Включить цвета в ленте</label>
          </div>
        </div>
        <button @click="saveEmail">Сохранить</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "settings",
  data() {
    return {
      timezones: [
        {
          name: "Калининград",
          value: "-1",
        },
        {
          name: "Москва",
          value: "0",
        },
        {
          name: "Самара",
          value: "1",
        },
        {
          name: "Екатеринбург",
          value: "2",
        },
        {
          name: "Омск",
          value: "3",
        },
        {
          name: "Красноярск",
          value: "4",
        },
        {
          name: "Иркутск",
          value: "5",
        },
        {
          name: "Якутск",
          value: "6",
        },
        {
          name: "Владивосток",
          value: "7",
        },
        {
          name: "Магадан",
          value: "8",
        },
        {
          name: "Камчатка",
          value: "9",
        },
      ],
      form: {},
      isEditing: {
        email: false,
        telegram: false,
      },
      email: "",
      telegram: "",
    };
  },

  async fetch() {
    const headers = {
      "X-Api-Key": this.$config.apiToken,
      "X-Device-OS": "f",
      "X-User-Token": this.$config.userToken,
    };

    try {
      const res = await this.$axios.get(this.$config.baseUrl + "/user", {
        headers,
      });
      this.$store.dispatch('setUser', res.data)
      this.form = {...this.$store.getters.getUser}
      this.form.locklentaupdate = !this.form.locklentaupdate
      this.form.timezone = this.getTimezone(this.form.timezone);
      this.email = this.form.email;
    } catch (err) {
      throw new Error(err);
    }
  },

  methods: {
    getTimezone(index) {
      return this.timezones.filter((item) => item.value === index)[0];
    },

    editEmail() {
      this.isEditing.email = true;
    },

    editTelegram() {
      this.isEditing.telegram = true;
    },

    async saveEmail() {
      const headers = {
        "X-Api-Key": this.$config.apiToken,
        "X-Device-OS": "f",
        "X-User-Token": this.$config.userToken,
      };

      await this.$axios.put(
        this.$config.baseUrl + "/user/" + this.form.id,
        {
          email: this.email,
        },
        { headers }
      );

      this.$fetch();

      this.isEditing.email = false;
    },
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap");

:root {
  --vs-dropdown-option--active-bg: #22a860;
  --vs-dropdown-option-color: #fff;
  --vs-dropdown-bg: #2dc574;
}

* {
  font-family: "Montserrat", Helvetica, Arial, sans-serif;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.input_field {
  padding: 8px 10px;
  min-width: 240px;
  max-height: 33px;
  outline: none;
  border: 1px solid #e1e1e3;
  border-radius: 3px;
  transition: border-color 0.4s ease;

  &:focus {
    border-color: #2dc574;
  }
}

.container {
  padding: 20px 15px;
}

.card {
  display: flex;
  margin-right: auto;
  margin-bottom: 20px;

  &__name {
    .sip {
      .custom-checkbox {
        position: absolute;
        width: 45px;
        height: 25px;
        border: 2px solid #bababa;
        z-index: 1;
        border-radius: 15px;
        transform: translateX(15px);
        transition: all 0.2s ease-in-out;

        .circle {
          height: 100%;
          width: 50%;
          border-radius: 50%;
          background-color: #bababa;
          transition: all 0.2s ease-in-out;
          position: absolute;
          left: 0;
        }
      }

      input {
        position: absolute;
        opacity: 0;
        width: 45px;
        height: 25px;
        z-index: 2;
        cursor: pointer;
        transform: translateX(15px);
      }

      input:checked + .custom-checkbox {
        border-color: #2dc574;

        .circle {
          background-color: #2dc574;
          left: unset;
          left: 50%;
        }
      }
    }
    font-size: 18px;
    font-weight: 600;
    margin-right: 20px;
    line-height: 21px;
    width: 250px;
    display: flex;

    @media (max-width: 768px) {
      margin-bottom: 20px;
    }
  }
  &__content {
    color: #686869;
    font-size: 14px;
    max-width: 490px;
    line-height: 21px;

    &-header {
      margin: 20px 0px;
      color: #000;
      font-size: 15px;
      font-weight: 600;
    }

    .input-container {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;

      label {
        text-overflow: clip;
        font-weight: 500;
        flex-basis: 120px;
        color: #000;

        @media (max-width: 768px) {
          flex-basis: unset;
        }
      }

      .extra-field {
        color: #a3a3a3;
        font-size: 12px;
        margin-top: 5px;
      }

      @media (max-width: 768px) {
        flex-direction: column;
      }
    }
    .input-group {
      display: flex;
      padding-bottom: 15px;
      margin-bottom: 15px;
      align-items: center;
      gap: 5px;

      .edit-container {
        margin-left: auto;
        display: flex;
        gap: 5px;
        align-items: center;
      }

      p {
        color: #000;
        font-weight: 500;
      }

      label {
        color: #000;
      }

      img {
        margin-left: auto;
        cursor: pointer;
      }

      &:not(:last-child) {
        border-bottom: 1px solid #e1e1e3;
      }

      &:first-child {
        margin-top: 20px;
      }
    }
    .timezone {
      margin-bottom: 20px;
      position: relative;
      display: flex;
      .timezone-container {
        position: relative;
      }

      label {
        color: #000;
        font-size: 14px;
        margin-right: 25px;
        font-weight: 500;
      }
    }
    .additional-settings {
      &__container {
        margin-bottom: 20px;
        display: flex;

        &:last-child {
          border-bottom: 1px solid #e1e1e3;
          padding-bottom: 20px;
        }

        label {
          color: #000;
          padding-left: 25px;
        }

        .check {
          position: absolute;
          width: 18px;
          height: 18px;
          border: 1px solid #2dc574;
          z-index: 1;
          border-radius: 2px;
          display: flex;
          justify-content: center;
          align-items: center;

          .checkmark {
            width: 14px;
            height: 14px;
            opacity: 0;
          }
        }

        input {
          position: absolute;
          opacity: 0;
          cursor: pointer;
          height: 18px;
          width: 18px;
          z-index: 2;
        }

        input:checked + .check {
          background-color: #2dc574;
          .checkmark {
            opacity: 1;
          }
        }
      }
    }
  }
  button {
    cursor: pointer;
    width: 100%;
    padding: 13px 20px;
    color: #fff;
    background: #2dc574;
    border: none;
    outline: none;
    border-radius: 4px;
    font-weight: 600;
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
}
.vs__dropdown-toggle {
  width: 214px;
  height: 28px;
  outline: none;
  border: 1px solid #e1e1e3;
  border-radius: 3px;
  transition: border-color 0.4s ease;
}
.vs__clear {
  display: none;
}
.vs__open-indicator {
  fill: #2dc574;
}
.vs__selected {
  margin: 0;
  padding: 0;
  padding-left: 10px;
  position: static !important;
}
.vs__dropdown-menu {
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #ededed;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #bdc2d3;
    border-radius: 20px;
  }

  max-height: 270px;
  overflow-y: auto;

  li {
    height: 30px;
  }
}
.w-100 {
  width: 100%;
}
.email_field {
  margin-left: auto;
  margin-bottom: 0;
}

</style>
