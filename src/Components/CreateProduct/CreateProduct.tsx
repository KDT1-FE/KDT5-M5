import SetMark from './Component/SetMark';
import SetProductInfo from './Component/SetProductInfo';
import SetPrice from './Component/SetPrice';
import { ChangeEvent, useEffect, useState } from 'react';
import { createProduct } from '@/Apis/createProduct';
import { getImgLink } from '@/Apis/uploadImg';
import { useNavigate } from 'react-router-dom';

import '@/Product.scss';

export default function CreateProduct() {
  const [price, setPrice] = useState<Price>({} as Price);
  const [info, setInfo] = useState<Info>({} as Info);
  const [mark, setMark] = useState<Mark>({} as Mark);
  const [imageURL, setImageURL] = useState('');
  const navigate = useNavigate();

  async function upload(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) {
      return;
    }
    const url = URL.createObjectURL(e.target.files[0]);
    const formData = new FormData();
    formData.append('image', e.target.files[0]);

    const res = await getImgLink(formData);
    setImageURL(res?.data.data.link);
    console.log(url);
  }

  async function createItem() {
    try {
      const res = await createProduct({
        display: mark.display,
        selling: mark.selling,
        exposure_limit_type: mark.exposure,
        add_category_no: [
          {
            category_no: parseInt(mark.category),
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
      });
      console.log(res);
      if (res.code) throw new Error(res.message);
      alert(`상품이 등록 되었습니다. ${info.product_name}`);
      navigate('/');
    } catch (err) {
      alert(err);
      console.log(err);
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <h1>상품 등록</h1>
      <div className="info-container">
        <table>
          <thead>
            <tr>
              <th className="setting" colSpan={2}>
                표시설정
              </th>
            </tr>
          </thead>
          <SetMark setMark={setMark} />
          <SetProductInfo setInfo={setInfo} />
          <SetPrice setPrice={setPrice} />
        </table>
        <div>
          <img
            src={imageURL}
            alt=""
            style={{ aspectRatio: 'auto', height: '110px' }}
          />
          <input type="file" accept="image/*" onChange={upload} />
          <button
            className="btn"
            onClick={() => {
              createItem();
            }}
          >
            상품 등록하기
          </button>
        </div>
      </div>
    </>
  );
}
