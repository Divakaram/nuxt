<template>
    <div>
        <p>{{ result.message }}</p>
    </div>
  </template>
  
  <script>
  export default {
    async asyncData({$axios, params}) { 
        const response = await $axios.post('http://localhost:3000/api/testpage', {id: params.id});
        const result = response.data;
        return {result};
      
    },
  };
  </script>