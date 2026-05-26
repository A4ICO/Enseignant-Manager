<script setup>
import { RouterLink } from 'vue-router'
</script>


<template>
     <nav class="navbar navbar-expand-lg navbar-dark bg-dark w-100">
    <div class="container-fluid px-4">
      <a class="navbar-brand" href="#"><b>Gestion Enseignants</b></a>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <RouterLink class="nav-link" to="/">Accueil</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/liste">Liste</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/ajout">Ajouter</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/login">Login</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar-brand {
  font-size: 2rem;
}
</style>