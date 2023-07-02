import ajax from '@/Apis/adminAuth';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ProductList() {
  const [list, setList] = useState<ProductInfo[]>();
  const [offset, setOffset] = useState(0);
  const [totalNum, setTotalNum] = useState();
  const [pagination, setPagination] = useState([1]);

  async function getList() {
    try {
      const res = await ajax.get('/products', {
        params: {
          limit: 10,
          offset: offset * 10,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return res;
    } catch (err) {
      console.log(err);
    }
  }
  async function getTotalNum() {
    try {
      const res = await ajax.get('/products/count');
      setTotalNum(res.data.count);
      setPagination(new Array(Math.ceil(res.data.count / 10)).fill(1));
    } catch (err) {
      console.log(err);
    }
  }
  async function deleteItem(productNo: string) {
    try {
      const res = await ajax.delete(`/products/${productNo}`);
      console.log(res.data);
      alert(`상품번호 ${productNo}이 삭제되었습니다.`);
      location.reload();
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    (async () => {
      const res = await getList();
      console.log(res);
      setList(res?.data.products);
      getTotalNum();
    })();
  }, []);
  useEffect(() => {
    (async () => {
      const res = await getList();
      setList(res?.data.products);
    })();
  }, [offset]);

  return (
    <>
      <h1>상품 리스트</h1>
      <div className="container">
        <h3>{totalNum}개의 상품이 있습니다.</h3>
        <table>
          <thead>
            <tr>
              <th>상품코드</th>
              <th>상품명</th>
              <th>판매가</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody
            onClick={(e) => {
              if (e.target instanceof HTMLButtonElement) {
                console.log(e.target.value);
                if (e.target.id === 'delete') {
                  confirm('정말 삭제하시겠습니까?') &&
                    deleteItem(e.target.value);
                }
              }
            }}
          >
            {list &&
              list.map((v) => (
                <tr key={v.product_code}>
                  <td>{v.product_code}</td>
                  <td className="name">
                    <div>
                      {v.tiny_image ? (
                        <img src={v.tiny_image} alt="" />
                      ) : (
                        <div className="empty" />
                      )}
                      <p>{v.product_name}</p>
                    </div>
                  </td>
                  <td>{v.price.slice(0, -3)}원</td>
                  <td className="manage">
                    <Link to={`/edit/${v.product_no}`}>
                      <button id="edit">수정</button>
                    </Link>
                    <button id="delete" value={v.product_no}>
                      삭제
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="list-footer">
          <ul
            onClick={(e) => {
              if (e.target instanceof HTMLLIElement) {
                setOffset(e.target.value);
              }
            }}
          >
            {pagination.map((_, i) => (
              <li key={i} value={i}>
                {i + 1}
              </li>
            ))}
          </ul>
          <div>
            <Link to="/add">
              <button value="" className="btn">
                상품 등록
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
