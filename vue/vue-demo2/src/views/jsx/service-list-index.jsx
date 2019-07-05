import PageHeader from '../../components/page-header.vue'
import ServiceScopeHeader from './service-scope-header.jsx'
import ListComponent from './service-list-component.jsx'
import '../../scss/_service_scope.scss'

export default {
  name: 'apply-list-index',
  data  () {
    return {
      list: [11, 22, 33, 44, 55, 66],
      title: 'jsx-角色与服务范围申请-jsx',
      text: 'v-model'
    }
  },
  render () {
    return (
      <div class="list-wrap">
        <PageHeader left-icon={ 'left-arrow' } title={ this.title } />
        <div class="list-content">
          <ServiceScopeHeader toggleTabEvent={ this.handleToggleTab } />
          <ListComponent />
        </div>
      </div>
    )
  },
  methods: {
    // handleOnInput
    handleToggleTab (value) {
      console.log('value...:', value)
    }
  }
}
