<script>
// import AnchoredHeading from './jsx-demo.vue'
export default {
  props: {
    level: Number
  },
  render (c) {
    return c(
      'h' + this.level,
      {
        'class': {
          foo: true,
          bar: 0
        }
      },
      [
        'ddd',
        c('span', this.$slots.default)
      ]
    )
  }
}
</script>
