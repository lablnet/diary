<template>
    <div :class="divClass">
        <router-link
        :to="link"
        :class="
            disable
            ? `${_class} opacity-25 cursor-not-allowed`
            : `${_class} cursor-pointer`
        "
        >
        {{ text }}
        </router-link>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    name: "LinkButton",
    props: {
        divClass: {
            type: String,
            default: ""
        },
        _class: {
            type: String,
            default: "text-sm font-medium text-primary hover:underline dark:text-primary"
        },
        text: {
            type: String,
            default: "Button"
        },
        link: {
            type: String,
            default: null
        },
        disable: {
            type: Boolean,
            default: false
        }
    },
});
</script>
