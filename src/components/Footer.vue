<template>
    <MDBFooter :text="['center', 'lg-start']">
      <!-- Copyright -->
      <div class="text-center p-3" style="background-color: rgba(140, 197, 59, 0.9) ; border-radius: 5px;" >
        © 2024 Copyright:
        <a class="text-dark text-bold">www.com</a>
      </div>
      <!-- Copyright -->
    </MDBFooter>
  </template>


<script>
  import { MDBFooter } from 'mdb-vue-ui-kit';

  export default {
    components: {
      MDBFooter
    },
  };
</script>