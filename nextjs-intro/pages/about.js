import NavBar from "../components/NavBar";

export default function Potato() {
  return (
    <div>
      <NavBar />
      <h1>About</h1>
    </div>
  );
}

// 함수이름 관계없이 about page로 라우팅 됨. 파일이름으로 라우팅 됨.
// 프레임워크 : 적절한 곳에 코드 넣어줘야하는 것, 기본적인 수정 x, 프레임워크가 내 코드를 호출할 것 (라이브러리와 다른점)
