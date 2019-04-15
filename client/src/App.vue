<template>
  <div>
    <div class="container p-4">
      <div class="row">
        <div class="col-md-4" v-for="article in displayedArticles" :key="article._id">
          <div class="card mb-2 box-shadow post-cards">
            <img v-bind:src="article.imageURL" class="card-img-top">
            <div class="card-body">
              <h5 class="capitalize">{{article.title}}</h5>
              <p class="card-text">{{article.description.slice(0, 120)}}...</p>
            </div>
          </div>
        </div>
      </div>
      <!--     Loop through the pages array to display each page number       -->
      <div class="btn-group col-md-2 offset-md-5">
        <button
          type="button"
          class="btn btn-sm btn-outline-secondary"
          v-if="page != 1"
          @click="page--"
        ><<</button>
        <button
          type="button"
          class="btn btn-sm btn-outline-secondary"
          v-for="pageNumber in pages.slice(page-1, page+5)"
          @click="page = pageNumber"
          :key="pageNumber"
        >{{pageNumber}}</button>
        <button
          type="button"
          @click="page++"
          v-if="page < pages.length"
          class="btn btn-sm btn-outline-secondary"
        >>></button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      articles: [],
      baseURL: "http://localhost:3000",
      page: 1,
      perPage: 9,
      pages: []
    };
  },
  created() {
    this.getPosts();
  },
  methods: {
    async getPosts() {
      const res = await this.axios.get(`${this.baseURL}/articles`);
      this.articles = res.data.articles;
    },
    setArticles() {
      let numberOfPages = Math.ceil(this.articles.length / this.perPage);
      for (let i = 1; i <= numberOfPages; i++) {
        this.pages.push(i);
      }
    },
    paginate(articles) {
      let page = this.page;
      let perPage = this.perPage;
      let from = (page * perPage) - perPage;
      let to = (page * perPage);
      return articles.slice(from, to);
    }
  },
  watch: {
    articles(){
      this.setArticles();
    }
  },
  computed: {
    displayedArticles: function () {
      return this.paginate(this.articles);
    }
  }
};
</script>