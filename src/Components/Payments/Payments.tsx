import getPayments from '@/Apis/getPayments';
import { useEffect, useState } from 'react';
import './Payments.scss';

export default function Payments() {
  const [payments, setPayments] = useState<PaymentsList[]>();
  const [pagination, setPagination] = useState<number[]>();
  const [status, setStatus] = useState('all');
  const [page, setPage] = useState(0);
  useEffect(() => {
    (async () => {
      const res = await getPayments(status);
      if (!res) {
        return;
      }
      const len = Math.ceil(res.response.total / 20);
      setPagination(new Array(len).fill(0));
      setPage(0);
      setPayments(res?.response.list);
    })();
  }, [status]);
  useEffect(() => {
    const li = document.querySelector('li');
    if (page) {
      (async () => {
        const res = await getPayments(status, page);
        if (!res) {
          return;
        }
        setPayments(res?.response.list);
        window.scrollTo(0, 0);
      })();
      page !== 1 && li?.classList.remove('selected');
    } else {
      li?.classList.add('selected');
    }
  }, [page]);

  return (
    <>
      <h1>물건 구매내역</h1>
      <div className="container">
        <select
          id="status"
          onChange={(e) => {
            setStatus(e.target.value);
          }}
        >
          <option value="all">all</option>
          <option value="ready">ready</option>
          <option value="paid">paid</option>
          <option value="cancelled">cancelled</option>
          <option value="failed">failed</option>
        </select>
        <table>
          <thead>
            <tr>
              <th>imp_uid</th>
              <th>상품 이름</th>
              <th>결제 금액</th>
              <th>구매자</th>
              <th>결제 방법</th>
              <th>상태</th>
            </tr>
          </thead>
          <tbody>
            {payments &&
              payments.map((payment) => (
                <tr key={payment.imp_uid}>
                  <td>{payment.imp_uid}</td>
                  <td>{payment.name}</td>
                  <td>{`${payment.amount} ${payment.currency}`}</td>
                  <td>{payment.buyer_name}</td>
                  <td>{payment.pay_method}</td>
                  <td className={payment.status}>{payment.status}</td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="list-footer pagination">
          <ul
            onClick={(e) => {
              if (e.target instanceof HTMLLIElement) {
                setPage(e.target.value);
              }
            }}
          >
            {pagination &&
              pagination.map((_, i) => (
                <li
                  key={i}
                  value={i + 1}
                  className={`${i + 1 === page ? 'selected' : ''}`}
                >
                  {i + 1}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
}
