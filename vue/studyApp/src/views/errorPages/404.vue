<template>
    <div class="err-page">
        <div class="err-block">
            <img class="err-img" src="../../assets/images/500.png">
            <p class="err-info">你要找的页面不存在</p>

            <p class="nav-links">
                <a href="javascript:void(0)" class="nav-link" @click="toPrev">返回上一页</a>
                <a href="javascript:void(0)" class="nav-link" @click="toHome">回到首页</a>
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
            }
        },
        mounted() {

        },
        methods: {
            toPrev() {
                this.$router.go(-1);
            },
            toHome() {
                this.$router.push({
                    path: '/Home'
                });
            }
        }
    }
</script>

<style scoped>
    .err-page {
        height: 100%;
        width: 100%;
        background: #f7f7f7;

        position: relative;
    }
    .err-block {
        width: 100%;
        text-align: center;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .err-block .err-img {
        width: 4.0rem;
    }

    .txt-404 {
        font-size: 1rem;
    }
    .err-block .err-info {
        font-size: 0.35rem;
        color: #666;
        text-align: center;
        margin-top: 0.8rem;
    }
    .nav-links {
        margin-top: 0.2rem;
    }
    .nav-link {
        font-size: 0.32rem;
    }
</style>