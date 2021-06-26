export default {
    props: {
        item: {
            type: Object,
            default: () => {
                return {}
            }
        },
        formData: {
            type: Object,
            default: () => {
                return {}
            }
        }
    }
}
