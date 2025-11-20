import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

// AuthContext에서 session 받아온다고 가정
import { useAuth } from '../../store/useAuthStore';
import Lottie from 'lottie-react';
import animationData from '../../../public/BouncingBall.json';
import logo from '/icon.svg';

const LoginPage = () => {
  const [isClient, setIsClient] = useState(false);
  const { session, status } = useAuth(); // Next-auth 대체
  const navigate = useNavigate();

  useEffect(() => {
    setIsClient(true);
  }, []);

  // 로그인된 상태면 홈으로 redirect
  useEffect(() => {
    if (status === 'authenticated') {
      navigate('/home');
    }
  }, [status, navigate]);

  if (status === 'authenticated') {
    return null;
  }

  return (
    <div className="w-full h-screen bg-black-90 flex flex-col md:flex-row">
      {/* 왼쪽 영역 */}
      <div className="text-white w-full">
        {/* 로고 */}
        <div className="fixed py-8 px-8">
          <Link to="/home">
            <img src={logo} alt="logo" width={100} height={100} />
          </Link>
        </div>

        {/* 안내 문구 */}
        <div className="h-full flex flex-col justify-center px-8 items-start">
          <div className="flex flex-col relative justify-start items-start">
            {isClient && (
              <div className="h-[50px] w-[50px] md:h-[70px] md:w-[70px] z-10 ml-[-10px] md:ml-[-20px]">
                <Lottie animationData={animationData} loop />
              </div>
            )}

            <section className="overflow-auto md:overflow-hidden">
              <div className="animate-[textAnimation_8s_infinite] md:whitespace-nowrap">
                <p className="font-Pretendard font-normal text-[20px] md:text-[28px] block">
                  녹화한 강의 영상을 업로드 해보세요!
                </p>
                <p className="font-Pretendard font-normal text-[20px] md:text-[28px] block">
                  1단계 : 학생들에게 제공할 문제 유형을 선택해보세요
                </p>
                <p className="font-Pretendard font-normal text-[20px] md:text-[28px] block">
                  2단계 : 생성될 문제를 확인하고 수정해보세요
                </p>
                <p className="font-Pretendard font-normal text-[20px] md:text-[28px] block">
                  3단계 : 마지막으로 생성된 문제와 요약문을 학습자에게
                  전달해보세요!
                </p>
                <p className="font-Pretendard font-normal text-[20px] md:text-[28px] block">
                  이제 AI Tutor와 함께 질문 및 요약문을 생성하러 가볼까요?
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* 오른쪽 영역 */}
      <div className="flex flex-col justify-center items-center bg-black-90 w-full md:w-1/3">
        <div className="text-white font-Pretendard font-normal text-xl md:text-[24px] px-4 py-4 whitespace-nowrap">
          <p>자기주도학습 시작하기</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
