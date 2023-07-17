// 날짜를 문자열로 받아서 날짜 형식으로 변환하는 함수
export const formatDate = (date: string) => {
  const targetDate = new Date(date);
  const fullDate = targetDate.toLocaleString("ko-KR", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return fullDate;
};
