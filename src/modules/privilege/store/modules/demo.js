export default {
  state: {
    title: 'title'
  },
  getters: {
    _title: state => "BY" + state.title
  }
}
