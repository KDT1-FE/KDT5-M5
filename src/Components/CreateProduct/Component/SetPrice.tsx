import { useEffect, useState } from 'react';
import './SetPrice.scss';

interface Props {
  setPrice: (param: Price) => void;
  res?: Price;
}

export default function SetPrice({ setPrice, res }: Props) {
  const [productPrice, setProductPrice] = useState<Price>({} as Price);

  useEffect(() => {
    if (res) {
      setProductPrice(res);
      console.log(res);
    }
  }, [res]);
  useEffect(() => {
    setPrice(productPrice);
  }, [productPrice]);

  return (
    <tbody
      onBlur={(e) => {
        const name = e.target.getAttribute('name') as string;
        const property = {} as Price;

        if (e.target instanceof HTMLInputElement) {
          if (isNaN(+e.target.value)) {
            alert('숫자만 입력하세요!');
            e.target.value = '';
            return;
          }
          property[name] = e.target.value;

          setProductPrice({ ...productPrice, ...property });
        }
      }}
    >
      <tr>
        <th>소비자가</th>
        <td>
          <input
            type="text"
            name="retail"
            pattern="[0-9]"
            defaultValue={productPrice.retail}
            className="text-left"
          />
          KRW
        </td>
      </tr>

      <tr>
        <th>
          공급가<span className="required">필수</span>
        </th>
        <td>
          <input
            type="text"
            name="supply"
            defaultValue={productPrice.supply}
            className="text-left"
          />
          KRW
        </td>
      </tr>

      <tr>
        <th>
          판매가<span className="required">필수</span>
        </th>
        <td>
          <table>
            <tbody className="table">
              <tr>
                <th>판매가</th>
                <td>
                  <input
                    type="text"
                    name="price"
                    defaultValue={productPrice.price}
                    className="text-left"
                  />
                  KRW
                </td>
              </tr>
              <tr>
                <th>상품가</th>
                <td>
                  {productPrice.price && (+productPrice.price * 0.9).toFixed(0)}
                  KRW
                </td>
              </tr>
              <tr>
                <th>과세금액</th>
                <td>
                  {productPrice.price && (+productPrice.price * 0.1).toFixed(0)}
                  KRW
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  );
}
