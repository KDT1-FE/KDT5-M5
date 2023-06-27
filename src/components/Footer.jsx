import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
         <div className="footer-upp">
          <ul>
            <li><a href="#" onClick={(e) => { e.preventDefault(); }}>회사소개 ㅣ 채용안내 ㅣ 상품입점 및 제휴문의 ㅣ 고객센터</a></li>                 
          </ul>
        </div>

        <div className="footer-section1">
          <h3>씨제이아보카도영주식회사</h3>
          <p>대표이사 : 이선정 | 사업자등록번호 : 809-81-01574</p>
          <p>주소 : (04323) 서울특별시 용산구 한강대로 372, 24층 (동자동, KDB타워)</p>
          <p>호스팅사업자 : CJ 아보카도네트웍스</p>
          <p>통신판매업신고번호 : 2019-서울용산-1428</p>
          <ul>
            <li><a href="#" onClick={(e) => { e.preventDefault(); }}>git : </a></li> 
            <li><a href="#" onClick={(e) => { e.preventDefault(); }}>사업자정보확인 </a></li>        
          </ul>
        </div>
      
        <div className="footer-section2">
        <ul>
          <a href="#" onClick={(e) => { e.preventDefault(); }}>이용약관 . 법적고지</a>
          <a href="#" onClick={(e) => { e.preventDefault(); }}>개인정보처리방침</a>
          <a href="#" onClick={(e) => { e.preventDefault(); }}>청소년보호방침</a>
          <a href="#" onClick={(e) => { e.preventDefault(); }}>영상정보처리기기운영/관리 방침</a>
          <a href="#" onClick={(e) => { e.preventDefault(); }}>이메일무단수집거부</a>
        </ul>
        </div>

        <div className="footer-section3">
        <h3>하나은행 구매안전 서비스</h3>
          <p>아보카도영은 현금 결제한 금액에 대해 하나은행과 채무지급보증 계약을 체결하여 안전한 거래를 보장하고 있습니다</p>
          <ul>
          <a href="#" onClick={(e) => { e.preventDefault(); }}>서비스 가입사실확인</a>
        </ul>
        </div>

        <div className="footer-part">
        <p>
          올리브영 홈페이지에서 판매되는 상품 중에는 올리브영에 입점한 개별 판매자가 판매하는 상품이 포함되어 있습니다. 개별 판매자의 판매 상품의 경우
          올리브영은 통신판매중개자로서 통신판매의 당사자가 아니며 판매자가 등록한 상품정보 및 거래 정보 등에 대하여 책임을 부담하지 않습니다
        </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>Copyright ⓒ CJ AbcadoYoung. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
