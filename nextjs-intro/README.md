# Next.js intro

nomadcode Next JS 시작하기
</br>

## Next Js 시작하기

```
npx create-next-app@latest
npm run dev
```

</br>

## pages

- 파일이름의 url을 만들어 자동으로 라우팅 (컴포넌트 이름 관계없음)
- import React 할 필요 없음
  </br>
  </br>
  </br>

## Static Pre Rendering

</br>

### SPA(CSR)

- 브라우저가 UI 그리는 작업은 JavaScript를 통해서만 함
- JS 로드 전에는, 비어있는 html 받아옴.
- UI 그려 내는 것은 오래걸리는 일, 따라서 네트워크 환경이 느리면 처음 빈화면 보게됨

</br>

### Static Pre Rendering

- 프론트서버에서 react js 실행, 완성 된 뒤 보내기 때문에 채워진 화면을 보게 됨
  👉 페이지가 초기 상태로 pre-render 되어서 전달
  </br>
  </br>
  </br>

## Routing

1.Link

- 라이브러리 없이 Link 사용, CSR 가능
- `href` 에 객체 전달하면 pathname과 query 지정가능

* 
```` javascript
<Link
    href={{
     pathname: `/movies/${movie.id}`,
  	 query: {
  		 title: movie.title,
  	 },
    }}
  	as={`/movies/${movie.id}`}
  >
  ````
* as는 브라우저의 url을 마스킹한다.

2. useRouter

- nextjs 내장 훅
- location 정보 얻을 수 있음
- pathname 으로 현재 url 정보 얻을 수 있음

3. router.push

- onClick 시 url 변경하도록 push 함수 호출

``` javascript
 const router = useRouter();
 const onClick = (id) => {
   router.push(`/movies/${id}`);
 };

// ...

<div onClick={() => onClick(movie.id)} className="movie" key={movie.id}>
				// ...
```

- query 부분을 as를 사용해 숨길 수 있음

``` javascript
 const router = useRouter();
  const onClick = (id) => {
    router.push(
      {
        pathname: `/movies/${id}`,
        query: {
          id,
          title: "hello",
        },
      },
      `/movies/${id}`
    );
  };
```

</br>

## Custom App

- `layout` 과 같이 모든 페이지에서 공통으로 사용하는 컴포넌트 등을 `_app.js` 파일에서 한 번에 적용 가능

``` javascript
export default function App({ Component, pageProps }) {
 return (
   <div>
     <Layout>
       <Component {...pageProps} />
     </Layout>
   </div>
 );
}

```

- \_app.js 크기 커지는 것 지양
- `global style`은 `_app.js` 에서 적용

 </br>

## Redirect and Rewrite

 </br>

### Redirect

``` javascript
async redirects() {
   return [
     {
       source: "/contact", //유저가 contact로 이동하면
       destination: "/form", //유저를 form이라는 destination으로 보냄
       permanent: false, //리다이렉션이 영구적인지 아닌지에 따라서 브라우저 검색엔진이 이 정보를 기억하는 여부 결정
     },
   ];
 },
```

- redirects 함수는 비동기적으로 동작함 = async 작성 필

  </br>

### Rewirtes

- API KEY 숨기기 가능
- 유저 리다이렉트 하지만 url 변경 x

``` javascript
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
```

</br>

## Server Side Rendering

``` javascript
export default function Detail({ params }) {
  const router = useRouter();
  const [title, id] = params || [];

  return (
    <div>
      <Seo title={title} />
      <h4>{title}</h4>
    </div>
  );
}
export function getServerSideProps({ params: { params } }) {
  return {
    props: {
      params,
    },
  };
}

//컴포넌트 내부에서 router 사용시 router는 프론트에서만 실행됨
//위 경우 getServerSideProps 함수 사용하여 영화제목만 가져옴
// server side에서 받아온 정보를 페이지로 넘겨주면 프리렌더 된 것

```

</br>

## Dynamic Routes

- movies 폴더 내의 [...params].js
- /movies/:id
