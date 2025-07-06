import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work",
  description: "A summary of my work",
};

export default function WorkPage() {
  return (
    <section className={`mt-0 overflow-hidden pb-10 tablet:pb-16 laptop:pb-20`}>
      <div
        className="content-container"
      >
        <div className={`@container`}>
          <h2
            className={`my-8 text-[24px] font-bold @[576px]:text-[28px] @[653px]:text-[32px]`}
          >
            &nbsp;나의 이력
          </h2>
        </div>
        <div className={`prose prose-neutral`}>
          <p>
            금융을 IT로 구현하고 운영하는 일을 하고 있습니다. 아래는 지금까지
            해왔던 일에 대한 간단한 요약입니다.
          </p>
          <hr className="my-6 border-neutral-100" />
          <h2 className="font-medium text-xl mb-1 tracking-tighter">
            롯데캐피탈
          </h2>
          <p className="text-neutral-600 text-sm">
            대리(Senior Associate), 2020.12 ~ 현재
          </p>
          <p>
            비대면 채널 개발과 관련된 계정계 개발 및 운영을 담당하고 있습니다.
          </p>
          <ul>
            <li>
              2021년, 제휴사와 연계하여 비대면 채널에서 대출 실행하는 프로세스를
              개발하였습니다.
            </li>
            <li>
              2022년, 대출비교 서비스를 인터넷은행, 카드사, 핀테크사 등과
              연계하여 오픈하였습니다. 1원 인증, 토스인증서 등 새로운 인증방식을
              대출 프로세스에 적용하였습니다.
            </li>
            <li>
              2023년, 롯데캐피탈 차세대 대응 채널 개발 및 대출이동시스템
              프로세스 개발에 참여하였습니다.
            </li>
          </ul>
          <hr className="my-6 border-neutral-100" />
          <h2 className="font-medium text-xl mb-1 tracking-tighter">
            롯데정보통신
          </h2>
          <p className="text-neutral-600 text-sm">
            사원(Associate), 2018.08 ~ 2020.12
          </p>
          <p>
            롯데캐피탈로 파견되어 리테일 계정계 프로그램 개발 및 운영을
            담당하였습니다.
          </p>
          <ul>
            <li>
              2019년, 모바일 환경에 맞는 간편 로그인 프로세스를 개발하였습니다.
              NICE 휴대폰인증, 카드인증 등 다양한 인증방식을 적용하였습니다.
            </li>
            <li>
              2020년, 채널 리뉴얼 프로젝트에 참여하여 모바일 앱, 웹, PC 웹과
              연동하는 계정계 프로그램을 개발하였습니다.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
