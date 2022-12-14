import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Seo from "../components/Seo";

export default function Home({ results }) {
  const router = useRouter();

  //라우팅하는 방법
  //1.Link 사용하기
  //2.router.push, (유저가 form제출하고 난 뒤 자동으로 이동하게끔 하는 )
  const onClick = (id, title) => {
    //as는 브라우저의 url을 마스킹한다.
    router.push(`/movies/${title}/${id}`);
  };
  return (
    <div className="container">
      <Seo title="Home" />
      {results?.map((movie) => (
        <div
          className="movie"
          key={movie.id}
          onClick={() => onClick(movie.id, movie.original_title)}
        >
          <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
          <h4>
            <Link href={`/movies/${movie.original_title}/${movie.id}`} key={movie.id}>
              {movie.original_title}{" "}
            </Link>
          </h4>
        </div>
      ))}
      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 20px;
          gap: 20px;
        }
        .movie {
          cursor: pointer;
        }
        .movie img {
          max-width: 100%;
          border-radius: 12px;
          transition: transform 0.2s ease-in-out;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }
        .movie:hover img {
          transform: scale(1.05) translateY(-10px);
        }
        .movie h4 {
          font-size: 18px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}

//index 페이지 가지고 있는것 아니라, / 페이지로 이동
//jsx, import React 없이 jsx 요소 사용가능
//nextjs -> 앱에 있는 페이지들 미리 렌더링 됨 (정적으로 생성됨)
export async function getServerSideProps() {
  //여기에 작성한 코드는 client가 아니라 server쪽에서만 작동함
  //api키 여기 작성하면 client에게 보여지지 않을것
  const { results } = await (await fetch(`http://localhost:3000/api/movies`)).json();
  //리턴하는 것을 props로써 page에 준다
  return {
    props: {
      results,
    },
  };
}
