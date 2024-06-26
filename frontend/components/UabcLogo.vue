<template>
  <img class="UABC-LOGO" alt="UABC Logo" src="/logo.png" />
</template>

<style>
.UABC-LOGO {
  height: 200px;
  width: 440px;
  transform: rotateX(720deg);
  animation: turn 3.5s ease-out forwards 1s;
}

@keyframes turn {
  100% {
    transform: rotateX(0deg);
  }
}
</style>

