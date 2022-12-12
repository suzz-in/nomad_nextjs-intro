import { useRouter } from "next/router";
import Seo from "../../components/Seo";

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
