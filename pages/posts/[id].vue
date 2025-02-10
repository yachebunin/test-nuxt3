<template>
  <div v-if="post" class="post-page">
    <h2 class="post-page__title">{{ post.title }}</h2>

    <div class="post-page__image-wrapper">
      <img
        :src="post.user?.image || 'https://thumb.ac-illust.com/b1/b170870007dfa419295d949814474ab2_t.jpeg'"
        alt="user-image"
      />
    </div>

    <div class="post-page__info">
      <div class="post-page__likes">
        <strong>Likes:</strong> {{ post.reactions.likes }}
      </div>
      <div class="post-page__dislikes">
        <strong>Dislikes:</strong> {{ post.reactions.dislikes }}
      </div>
      <div class="post-page__views">
        <strong>Views:</strong> {{ post.views }}
      </div>
    </div>

    <div class="post-page__body">
      <strong>Описание:</strong>
      <p>{{ post.body }}</p>
    </div>

    <div class="post-page__tags">
      <strong>Теги:</strong>
      <span
        v-for="(tag, index) in post.tags"
        :key="index"
        class="post-page__tag"
      >
        {{ tag }}
      </span>
    </div>

    <div class="comments">
      <h3 class="comments__title">Комментарии</h3>
      <div
        v-for="comment in post.comments"
        :key="comment.id"
        class="comment"
      >
        <div class="comment__image-wrapper">
          <img
            :src="comment.user?.image || 'https://via.placeholder.com/60x60'"
            alt="user-image"
          />
        </div>
        <div class="comment__main-info">
          <div class="comment__author">
            {{ comment.user?.fullName }}
          </div>
          <div class="comment__mail">
            {{ comment.user?.email }}
          </div>
        </div>
        <div class="comment__text">
          {{ comment.body }}
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <h2>Ничего не найдено...</h2>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { usePostsStore } from '~/composables/usePostsStore'

const route = useRoute()
const { isLoaded, loadAllData, getPostById } = usePostsStore()

const post = ref(null)

onMounted(async () => {
  if (!isLoaded.value) {
    await loadAllData()
  }

  const postId = route.params.id
  post.value = getPostById(postId)
})
</script>

<style scoped>
.post-page {
  max-width: 800px;
  margin: 20px auto;
  padding: 16px;
  background-color: #fff;
  color: #000;
  border-radius: 8px;

  .post-page__title {
    font-size: 24px;
    margin-bottom: 16px;
  }

  .post-page__image-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
    border-radius: 8px;
    background: rgba(0, 0, 0, 0.5);
    object-fit: cover;
    overflow: hidden;

    img {
      width: 200px;
      height: 200px;
      border-radius: 4px;
      object-fit: cover;
    }
  }

  .post-page__info {
    display: flex;
    gap: 16px;
    margin-bottom: 16px;

    & > div {
      font-size: 14px;
    }
  }

  .post-page__body {
    margin-bottom: 16px;

    p {
      margin: 0;
    }
  }

  .post-page__tags {
    margin-bottom: 16px;

    strong {
      margin-right: 12px;
    }

    .post-page__tag {
      display: inline-block;
      margin-right: 8px;
      background-color: #000;
      color: #fff;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 14px;
    }
  }
}

.comments {
  margin-top: 24px;

  .comments__title {
    font-size: 18px;
    margin-bottom: 12px;
  }

  .comment {
    display: flex;
    gap: 12px;
    margin-bottom: 16px;
    padding: 8px;
    border-radius: 6px;
    background-color: #f9f9f9;

    .comment__main-info {
      display: flex;
      flex-direction: column;
    }

    .comment__image-wrapper img {
      width: 60px;
      height: 60px;
      object-fit: cover;
      border-radius: 50%;
    }

    .comment__author {
      font-weight: bold;
    }

    .comment__mail {
      font-size: 13px;
      color: #666;
    }

    .comment__text {
      flex: 1;
      background: black;
      border-radius: 12px;
      padding: 4px 8px;
      color: #fff;
      overflow: auto;
    }
  }
}
</style>
