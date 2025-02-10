<template>
  <div class="posts-page">
    <h1 class="posts-page__title">Каталог постов</h1>

    <div class="posts">
      <div
        v-for="post in paginatedPosts"
        :key="post.id"
        class="post"
        @click="goToPost(post.id)"
      >
        <div class="post__image-wrapper">
          <img
            :src="post.user?.image || 'https://thumb.ac-illust.com/b1/b170870007dfa419295d949814474ab2_t.jpeg'"
            alt=""
          />
        </div>
        <div>
          <h3 class="post__title">
            {{ post.title }}
          </h3>
          <div class="post__info">
            <div class="post__reactions">
              <div class="post__like">
                Likes: <span>{{ post.reactions.likes }}</span>
              </div>
              <div class="post__dislike">
                Dislikes: <span>{{ post.reactions.dislikes }}</span>
              </div>
            </div>
            <div class="post__views">
              Views: <span>{{ post.views }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="posts-page__footer">
      <UPagination
        v-model="currentPage"
        :page-count="pageCount"
        :total="posts.length"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { usePostsStore } from '~/composables/usePostsStore'

const router = useRouter()
const { posts, loadAllData, isLoaded } = usePostsStore()

const currentPage = ref(1)
const pageSize = 6

onMounted(async () => {
  if (!isLoaded.value) {
    await loadAllData()
  }
})

const goToPost = (id) => {
  router.push(`/posts/${id}`)
}

const pageCount = computed(() => {
  return Math.ceil(posts.value.length / pageSize)
})

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return posts.value.slice(start, end)
})
</script>

<style scoped lang="scss">
.posts-page {
  max-width: 960px;
  margin: 20px auto;

  .posts-page__title {
    margin-bottom: 20px;
    font-size: 32px;
    font-weight: bold;
    text-align: center;
  }

  .posts {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    margin-bottom: 12px;

    .post {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 12px;
      background: #fff;
      color: #000;
      border-radius: 6px;
      cursor: pointer;
      transition: box-shadow 0.2s;

      &:hover {
        box-shadow: 0 0 5px rgba(0,0,0,0.3);
      }

      .post__image-wrapper {
        margin-bottom: 8px;

        img {
          width: 100%;
          height: auto;
          object-fit: cover;
          border-radius: 4px;
        }
      }

      .post__title {
        max-width: 200px;
        margin-bottom: 12px;
        font-size: 18px;
        font-weight: bold;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }

      .post__info {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .post__reactions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .post__reactions,
        .post__views {
          span {
            color: rgb(98, 11, 11);
            font-weight: bold;
          }
        }
      }
    }
  }

  .posts-page__footer {
    margin-top: 12px;
    display: flex;
    justify-content: center;
  }
}
</style>
