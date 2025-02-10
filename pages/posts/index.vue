<template>
    <div class="posts-page">
        <h1 class="posts-page__title">Каталог постов</h1>

        <div class="posts">
            <div
                v-for="post in posts"
                :key="post.id"
                class="post"
                @click="goToPost(post.id)"
            >
                <div class="post__image-wrapper">
                    <img :src="post.image" alt="">
                </div>
                <h3 class="post__title">{{ post.title }}</h3>
                <div class="post__info">
                    <div class="post__reactions">
                        <div class="post__like">Likes: <span>{{ post.reactions.likes }}</span></div>
                        <div class="post__dislike">Dislikes: <span>{{ post.reactions.dislikes }}</span></div>
                    </div>
                    <div class="post__views">Views: <span>{{ post.views }}</span></div>
                </div>
            </div>
        </div>

        <div class="posts-page__footer">
            <UPagination v-model="page" :page-count="5" :total="posts.length" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { usePostsStore } from '~/composables/usePostsStore'

const router = useRouter()

const goToPost = (id: number) => {
    router.push(`/posts/${id}`)
}

const { posts, loadAllPosts } = usePostsStore()

const currentPagination = ref(1)
const pageSize = ref(6)

onMounted(async () => {
    await loadAllPosts()
})
</script>

<style lang="scss">
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
            padding: 12px;
            background: #fff;
            color: #000;
            border-radius: 6px;
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
                .post__reactions, .post__views {
                    span {
                        color: rgb(98, 11, 11);
                        font-weight: bold;
                    }
                }
            }
        }
    }
}
</style>