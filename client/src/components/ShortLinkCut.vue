<template>
    <div class="d-flex justify-center w-100 my-5">
        <div class="short-link-subtitle">
            Превращаем длинный URL в лаконичный адрес, который удобно говорить вслух, отправлять в чат или печатать.
        </div>
    </div>
    <div class="d-flex align-center justify-center link-shortener-block">
        <input 
        class="inp-link" 
        ref="url" 
        v-model.trim="longUrl"
        @keyup.enter="shortenLink"
        placeholder="https://very-long-link.ru/example">
        <button 
        class="short-link-btn ms-2"
        @click="shortenLink"
        :disabled="shortening || !longUrl"
        :aria-busy="shortening ? 'true' : 'false'">
            Сократить ссылку
        </button>
    </div>
</template>

<script>
export default {
    name: "ShortLinkCut",

    data() {
        return {
            activeTab: "link",
            longUrl: "",
            shortUrl: "",
            shortening: false,
            error: ""
        }
    },

    methods: {
        async shortenLink() {
            const url = this.longUrl?.trim() || this.$refs.url?.value?.trim() || "";

            if (!url) {
                this.error = "Пожалуйста, введите URL для сокращения.";
                return;
            }

            this.error = "";
            this.shortUrl = "";
            this.shortening = true;

            try {
                const { data } = await this.$api.post('/create/short_link', { url });

                console.log(data)

                if (!data) {
                    this.error = "Сервис вернул неожиданный ответ. Не удалось получить короткую ссылку.";
                }
            } catch (e) {
                this.error =
                    e?.response?.data?.message ||
                    e?.message ||
                    "Не удалось сократить ссылку. Попробуйте позже.";
            } finally {
                this.shortening = false;
            }
        }
    }
}
</script>

<style>
.tab-switcher {
    display: flex;
    position: relative;
    background: #e9e9e9;
    padding: 4px;
    border-radius: 2rem;
    width: 270px;
    min-width: 170px;
    height: 45px;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
}

.inp-link{
    padding: 14px 20px;
    border-radius: 10px;
    width: 100%;
    border: 1.25px solid #FFFFFF;
    transition: all 0.3s ease;
    background-color: #FFFFFF;

    &:hover{
        border: 1.25px solid #bfcae6;
        outline: none;
        transition: all 0.2s ease;
    }

    &:focus {
        border: 1.25px solid #bfcae6;
        outline: none;
        transition: all 0.2s ease;
    }
}

.tab-btn {
    z-index: 1;
    min-width: 110px;
    width: 50%;
    font-weight: 600;
    color: #7b7b7b;
    transition: color 0.15s;
    background: transparent;
}

.tab-btn.active {
    color: #000;
    /* Optionally: font-weight: bold; */
}

.short-link-btn{
    text-wrap: nowrap;
    padding: 14px 20px;
    background-color: #034EEE;
    color: #FFFFFF;
    font-weight: 500;
    border-radius: 10px;
    transition: all 0.3s ease;

    &:hover {
        background-color: #0246d7;
        transition: all 0.3s ease;
    }
}

.short-link-subtitle {
    font-weight: 400;
    line-height: 1.5;
    letter-spacing: 0.25px;
    color: #7b7b7b;
}

.tab-highlight {
    position: absolute;
    top: 4px;
    left: 4px;
    width: 50%;
    height: 37px;
    background: #fff;
    border-radius: 1.7rem;
    box-shadow: 0 2px 10px #0001;
    transition: left 0.3s cubic-bezier(.52, .15, .38, .72);
    z-index: 0;
}

.tab-highlight.link-active {
    left: 5px;
}

.tab-highlight.qr-active {
    left: calc(50% - 5px);
}
</style>