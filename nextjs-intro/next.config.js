/** @type {import('next').NextConfig} */

const API_KEY = process.env.API_KEY;

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: "/contact", //유저가 contact로 이동하면
        destination: "/form", //유저를 form이라는 destination으로 보냄
        permanent: false, //리다이렉션이 영구적인지 아닌지에 따라서 브라우저 검색엔진이 이 정보를 기억하는 여부 결정
      },
    ];
  },

  //rewirtes는 유저를 redirect시키지만 url은 변하지 않음 !
  //유저에게 url 변화 보여주지 않음 -> api키 숨기기 가능
  async rewrites() {
    return [
      {
        source: "/api/movies",
        destination: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
      },
      {
        source: "/api/movies/:id",
        destination: `https://api.themoviedb.org/3/movie/:id?api_key=${API_KEY}`,
      },
    ];
  },
};

module.exports = nextConfig;
