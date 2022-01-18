import { createHOC } from 'vue-hoc';
import { Table as BaseTable } from 'element-ui';
import { injectSearchListMixin } from '../searchList/utils'
import { Loading } from 'element-ui';

const options = {
  name: 'ef-table',
  mixins: [injectSearchListMixin],
  data() {
    return {
      loadingInstances: []
    }
  },
  computed: {
    innerTable(){
      return this.$children[0]
    },
  },
  methods: Object.keys(BaseTable.methods).reduce((acc, name) => {
    acc[name] = function (...args) {
      return this.innerTable[name](...args)
    }
    return acc
  }, {}),
  watch: {
    'searchList.loading'(value) {
      while (this.loadingInstances.length > 0) {
        const instance = this.loadingInstances.pop()
        if (instance) {
          instance.close()
        }
      }

      if (value && this.innerTable?.$el) {
        this.loadingInstances.push(Loading.service({
          target: this.innerTable.$el
        }))
      }
    }
  }
};

const renderWith = {
  props(props) {
    let { data } = props
    const searchList = this.searchList
    const { propsData } = this.$options

    if (searchList) {
      if (propsData.data === undefined) {
        data = searchList.data
      }
    }

    return {
      ...props,
      data,
    }
  },
};

const Table = createHOC(BaseTable, options, renderWith);

export default Table
