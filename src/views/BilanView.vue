<script setup>
import { EnseignantApi } from '@/service/api';
import { ref , reactive } from 'vue';

const testMessage = ref('');

async function testApi ()
{
  alert("clicked")
  // testMessage = await EnseignantApi.getAll();
  // alert("testMessage")
}

</script>

<template>
  <div>
    <h3>Bilan</h3>

    <div class="container-lg">

      <!-- ROW 1 — pleine largeur -->
      

      <!-- ROW 2 — 3 + 6 + 3 = 12 -->
      <div class="row">

        <div class="col-lg-3 mb-2 text-center">
          <p class="box bg-primary">3</p>
        </div>

        <div class="col-lg-3 text-center">
          <p class="box">6</p>
        </div>

        <div class="col-lg-3 text-center">
          <p class="box">3</p>
        </div>

        <div class="col-lg-3 text-center">
          <p class="box">3</p>
        </div>

      </div>

      <div class="row">
        <div class="col-md-8 mb-1 text-center">
          <p class="box-tall">4</p>
        </div>
        <div class="col-md-4 mb-1 text-center">
          <p @click.stop="testApi()" class="box-tall bg-secondary"> Message : {{ testMessage }}</p>
        </div>
        <!-- <div class="col-md-4 mb-1 text-center">
          <p class="box-tall">4</p>
        </div> -->
        
<div class="container-fluid">
        <div class="row">
          <div class="col-lg-12 text-center">
            <p class="box bg-success">Footer</p>
          </div>
</div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.container-lg {
  border-radius: 5px;
  height: 85dvh;
}

.box {
  height: 200px;
  width: 100%;   
  border: 1px solid;
  margin: 0;
  border-radius: 6px;
}

.box-tall{

  height: 400px;
  width: 100%; 
  border: 1px solid;
  border-radius: 6px;
  margin: 0;

}

</style>