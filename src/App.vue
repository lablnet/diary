<template>
  <main v-if="$route.path.includes('/auth')">
      <router-view />
  </main>
  <main v-else>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <router-view />
  </main>
</template>
