import { ref } from 'vue'

export const usePostsStore = () => {
  // Здесь буду хранить массивы постов, пользователей, комментариев, а не только посты как сначала
  const posts = ref([])
  const users = ref([])
  const comments = ref([])

  const isLoaded = ref(false)
  const error = ref(null)

  // Тут сделал общий метод, тоже не только для постов
  const loadAllData = async () => {
    if (isLoaded.value) return

    try {
      const [postsRes, usersRes, commentsRes] = await Promise.all([
        fetch('https://dummyjson.com/posts?limit=150'),
        fetch('https://dummyjson.com/users?limit=150'),
        fetch('https://dummyjson.com/comments?limit=150')
      ])

      const postsData = await postsRes.json()
      const usersData = await usersRes.json()
      const commentsData = await commentsRes.json()

      posts.value = postsData.posts || []
      users.value = usersData.users || []
      comments.value = commentsData.comments || []

      // Чтобы можно было легко найти пользователя по id
      const usersMap = {}
      for (const user of users.value) {
        usersMap[user.id] = user
      }

      // У поста будет поле user, с нужной инфой
      posts.value = posts.value.map(post => {
        const author = usersMap[post.userId] || {}
        return {
          ...post,
          user: author
        }
      })

      // Здесь комменты будут по айди поста + инфа пользователя
      const commentsGroupedByPostId = {}

      for (const c of comments.value) {
        const commentUser = usersMap[c.user.id] || {}

        // Здесь соберу полное имя
        let fullName = 'Неизвестный пользователь'
        if (commentUser.firstName && commentUser.lastName) {
          fullName = `${commentUser.firstName} ${commentUser.lastName}`
        }

        // тут будет полный юзер у коммента
        const fullComment = {
          ...c,
          user: {
            ...commentUser,
            fullName,
            image: commentUser.image || 'https://thumb.ac-illust.com/b1/b170870007dfa419295d949814474ab2_t.jpeg'
          }
        }

        // Коммент в массив нужного поста
        if (!commentsGroupedByPostId[c.postId]) {
          commentsGroupedByPostId[c.postId] = []
        }
        commentsGroupedByPostId[c.postId].push(fullComment)
      }

      // к посту коммент
      posts.value = posts.value.map(post => {
        return {
          ...post,
          comments: commentsGroupedByPostId[post.id] || []
        }
      })

      isLoaded.value = true
    } catch (err) {
      error.value = err.message || 'Неизвестная ошибка'
    }
  }

  // Нужны пост по айди
  const getPostById = (id) => {
    return posts.value.find(p => p.id === Number(id)) || null
  }

  return {
    posts,
    users,
    comments,
    isLoaded,
    error,
    loadAllData,
    getPostById
  }
}