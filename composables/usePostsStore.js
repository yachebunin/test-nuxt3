export const usePostsStore = () => {
    const posts = ref([])
    const isLoaded = ref(false)

    const error = ref(null)

    const loadAllPosts = async () => {
        if (isLoaded.value) return

        try {
            fetch('https://dummyjson.com/posts')
                .then(res => res.json())
                .then(data => {
                    posts.value = data?.posts || []
                    isLoaded.value = true
                });
        } catch (error) {
            error.value = error.message || 'Unexpected Error'
        }
    }

    return {
        posts,
        isLoaded,
        error,
        loadAllPosts
    }
}