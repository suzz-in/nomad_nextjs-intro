import NavBar from "../components/NavBar";

export default function Home() {
  return (
    <div>
      <h1>Hello</h1>
      <style jsx global>
        {`
          a {
            color: white;
          }
        `}
      </style>
    </div>
  );
}

//index 페이지 가지고 있는것 아니라, / 페이지로 이동
//jsx, import React 없이 jsx 요소 사용가능
//nextjs -> 앱에 있는 페이지들 미리 렌더링 됨 (정적으로 생성됨)
