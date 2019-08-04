<template>
    <div style="color: #12123C;">
        <div>
            <div>
                <div>
                    <h4>欢迎</h4>
                    <p>这是平台名字</p>
                    <p>从这里开始</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  export default {
    name: 'Board',
    computed: {},
    methods: {
      goCase() {
        this.$router.push({ path: '/active' })
      }
    }
  }
</script>
