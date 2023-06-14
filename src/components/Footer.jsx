import './footer.css'

const Footer = () => {
return (
<footer>
  <div className="container">
    <div className="row">
    <div className="col-md-3">
        <ul>
          <li><a href="#">회사소개</a></li>
          <li><a href="#">채용안내</a></li>
          <li><a href="#">고객센터</a></li>
        </ul>
      </div>
      <div className="col-md-6">
        <h3>Avcado young</h3>
        <p>대표이사 : 애자일 | 사업자등록번호 : 809-81-01574</p>
        <p>주소 : (04323) 서울특별시 용산구 한강대로 372, 24층(동자동, KDB타워)</p>
        <p>호스팅사업자 : CJ 올리브네트웍스</p>
        <p>통신판매업신고번호 : 2019-서울용산-1428</p>
        <p>이메일 : oliveweb@cj.net</p>
      </div>
      
      <div className="col-md-3">
        <h3>Contact Us</h3>
        <p>1234 Main Street, City</p>
        <p>info@example.com</p>
        <p>(123) 456-7890</p>
      </div>
    </div>
  </div>
</footer>
  )
}

export default Footer