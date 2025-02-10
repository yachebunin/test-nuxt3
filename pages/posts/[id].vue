<template>
    <div>
        <div v-if="post" class="post">
            <div class="post__title">{{ post.title }}</div>

            <div class="post__image-wrapper">
                <img src="https://via.placeholder.com/600x400" alt="">
            </div>

            <div class="post__info">
                <div class="post__likes">{{ post.likes }}</div>
                <div class="post__dislikes">{{ post.dislikes }}</div>
                <div class="post__views">{{ post.views }}</div>
            </div>

            <div class="post__body">
                {{ post.body }}
            </div>

            <div class="post__tags">
                <span
                    v-for="tag in post.tags"
                    :key="tag.id"
                    class="post__tag"
                >
                    {{ tag }}
                </span>
            </div>

            <div class="comments">
                <h2 class="comments__title">Комментарии</h2>

                <div
                    v-for="comment in post.comments"
                    :key="comment.id"
                    class="comment"
                >
                    <div class="comment__image-wrapper">
                        <img :src="comment.user?.avatar || 'https://via.placeholder.com/60x60'" alt="">
                    </div>
                    <div class="comment__author">
                        {{ comment.user?.firstName }} {{ comment.user?.lastName }}
                    </div>
                    <div class="comment__text">{{ comment.text }}</div>
                    <div class="comment__mail">{{ comment.user?.email }}</div>
                </div>
            </div>
        </div>
        <div v-else>Ничего не найдено..</div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
const route = useRoute()

const post = ref(null)

onMounted(async () => {

})
</script>

<style>

</style>