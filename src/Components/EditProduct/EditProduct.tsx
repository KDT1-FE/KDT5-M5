import SetMark from '../CreateProduct/Component/SetMark';
import SetPrice from '../CreateProduct/Component/SetPrice';
import SetProductInfo from '../CreateProduct/Component/SetProductInfo';

import ajax from '@/Apis/adminAuth';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { editProduct } from '@/Apis/createProduct';

import '@/Product.scss';

export default function EditProduct() {
  const [price, setPrice] = useState<Price>({} as Price);
  const [info, setInfo] = useState<Info>({} as Info);
  const [mark, setMark] = useState<Mark>({} as Mark);
  const { productNo } = useParams();
  const navigate = useNavigate();
  const [a, setA] = useState<Price>({} as Price);
  const [b, setB] = useState<Info>({} as Info);
  const [c, setC] = useState<Mark>({} as Mark);

  async function getItem() {
    const res = await ajax.get(`/products/${productNo}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(res);
    const data: ProductInfo = res.data.product;
    setA({
      price: data.price,
      retail: data.retail_price,
      supply: data.supply_price,
    });
    setB({
      product_name: data.product_name,
      internal_product_name: data.internal_product_name,
      supply_product_name: data.supply_product_name,
      summary_description: data.summary_description,
      simple_description: data.simple_description,
      description: data.description,
      product_tag: data.product_tag,
    });
    const category = data.category as Category[];
    setC({
      display: data.display as string,
      selling: data.selling as string,
      exposure: data.exposure_limit_type as string,
      category: category[0].category_no + '',
      recommand: category[0].recommend,
      newProduct: category[0].new,
    });
  }
  useEffect(() => {
    getItem();
  }, []);

  async function editItem() {
    console.log(mark.category);
    try {
      const res = await editProduct(
        {
          display: mark.display,
          selling: mark.selling,
          exposure_limit_type: mark.exposure,
          add_category_no: [
            {
              category_no: +mark.category,
              recommend: mark.recommand,
              new: mark.newProduct,
            },
          ],
          product_name: info.product_name,
          internal_product_name: info.internal_product_name,
          supply_product_name: info.supply_product_name,
          summary_description: info.summary_description,
          simple_description: info.simple_description,
          description: info.description,
          product_tag: info.product_tag,
          price: price.price,
          retail_price: price.retail,
          supply_price: price.supply,
          //detail_image: `https://teamwink/web/${imageURL}`,
          //image_upload_type: 'A',
        },
        productNo as string
      );
      console.log(res);
      if (res.code) throw new Error(res.message);
      alert(`상품이 수정 되었습니다. ${info.product_name}`);
      navigate('/');
    } catch (err) {
      alert(err);
      console.log(err);
    }
  }
  return (
    <>
      <h1>상품 수정</h1>
      <div className="info-container">
        <table>
          <SetMark setMark={setMark} res={c} />
          <SetProductInfo setInfo={setInfo} res={b} />
          <SetPrice setPrice={setPrice} res={a} />
        </table>
        <div style={{ textAlign: 'right', padding: '10px' }}>
          <button
            className="btn"
            onClick={() => {
              editItem();
            }}
          >
            수정 완료
          </button>
        </div>
      </div>
    </>
  );
}
