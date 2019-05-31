<template>
    <div class="minput">
        <b class="minput-l" @click="preClick">&nbsp;&nbsp;&nbsp;</b><div ref="mbody" @focus="mBodyFocus($event)" @blur="mBodyBlur($event)" class="minput-body" contenteditable onkeydown="if(event.keyCode==13){event.keyCode=0;event.returnValue=false;}"></div><b class="minput-r" @click="pre2Click($event)">&nbsp;&nbsp;&nbsp;</b>
    </div>
</template>

<script>
    export default {
        name: 'minput',
        data() {
            return {
                timer: null, // 定时器
                value: '', // 输入框的值
                clickStatus:'',//输入框状态
            }
        },
        props: ['index', 'ak'],
        mounted() {
        },
        beforeDestroy() {
            this.stopInterval();
        },
        methods: {
            startInterval() {
                this.timer = setInterval(() => {
                    let v = this.getValue();
                    if (v != this.value) { // 输入框的值有变化，触发事件
                        this.value = v;
                        this.$emit('mchange', {index: this.index, ak: this.ak, value: this.getValue()});
                    }
                }, 500);
            },
            stopInterval() {
                this.timer && clearInterval(this.timer);
            },
            mBodyFocus(event) {
                // console.log('focus methods',event)
                this.clickStatus = event.type;
                this.$emit('getStatus',event.type)
                this.startInterval();
            },
            mBodyBlur(event) {
                // console.log('blur methods',event)
                this.clickStatus = event.type;
                this.$emit('getStatus',event.type)
                this.stopInterval();
            },
            preClick() {
                this.$refs.mbody.focus();
            },
            pre2Click(event) { // 定位光标到输入框
                console.log(event)
                let mbody = this.$refs.mbody;
                if (mbody.innerHTML.length == 0) {
                    mbody.focus();
                } else {
                    if (document.createRange && window.getSelection) {
                        mbody.focus();
                        let range = document.createRange();
                        range.selectNodeContents(mbody);
                        range.collapse(false);
                        let sel = window.getSelection();
                        //判断光标位置，如不需要可删除
                        if(sel.anchorOffset != 0){
                            return;
                        };
                        sel.removeAllRanges();
                        sel.addRange(range);
                    }
                }
            },
            getValue() {
                return this.$refs.mbody.innerHTML;
            }
        }
    }
</script>

<style lang="less">
    @border-color: #5480fe;
    .minput {
        display: inline;
        .minput-l{
            display: none!important;
        }
        .minput-l, .minput-r, .minput-body {
            display: inline;
            outline: none;
            max-width: 100%;
            white-space: pre-wrap;
            word-break: break-all;
            border-bottom:solid 1px @border-color;
            color: @border-color;
        }
        .minput-body {
            -webkit-user-select: auto;
            padding-left: .4rem;
        }
    } 
</style>