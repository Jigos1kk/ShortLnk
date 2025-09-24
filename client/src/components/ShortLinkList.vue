<template>
    <div v-for="short_link in short_links">
        <ShortLinkPanel :data="short_link"/>
    </div>
</template>

<script>
    export default {
        name: "ShortLinkList",

        data() {
            return {
                short_links: []
            }
        },
        mounted() {
            this.ShortLinksList();
            console.log(this.short_links);  
        },
        methods: {
            async ShortLinksList() {
                try {
                    const response = await this.$api.get('/short_link');
                    this.short_links = response.data.short_links;
                } catch (error) {
                    console.error(`Ошибка получения сокращенных ссылок`);
                }
            },
        },
    }
</script>