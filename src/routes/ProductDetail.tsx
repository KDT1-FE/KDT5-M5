/* eslint-disable react-hooks/exhaustive-deps */
import { getProductDetail } from '@/api/adminApi';
import SectionTitle from '@/components/ui/SectionTitle';
import { priceBeforeDiscount } from '@/constants/library';
import { useEffect, useMemo, useState } from 'react';
import { getAccountListAndBalance } from '@/api/bankApi';
import { userStore } from '@/store';
import { buyProduct } from '@/api/transactionApi';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '@/components/ui/Button';
import toast from 'react-hot-toast';
import CrazyLoading from '@/components/ui/CrazyLoading';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Select from '@/components/ui/Select';

export default function ProductDetail() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState<ProductDetail>();
  const [accounts, setAccounts] = useState<UserAccount[]>([]);
  const { userInfo } = userStore();
  const [selectedAccount, setSelectedAccount] = useState<string>('');

  useEffect(() => {
    const fetchProductDetail = async () => {
      setIsLoading(true);
      const res = await getProductDetail(productId as string);
      if (res.statusCode === 200) {
        setProduct(res.data as ProductDetail);
        setIsLoading(false);
        return;
      }
      toast.error(res.message, { id: 'getProduct' });
      navigate('/');
      setIsLoading(false);
    };
    fetchProductDetail();
  }, [productId]);

  useEffect(() => {
    async function fetchData() {
      const res = await getAccountListAndBalance(
        userInfo?.accessToken as string
      );
      if (res.statusCode === 200) {
        setAccounts((res.data as AccountsAndBalance).accounts);
      }
    }
    fetchData();
  }, [userInfo?.accessToken]);

  const accountOptions = useMemo(
    () => [
      { name: '결제할 계좌 선택', value: '' },
      ...accounts.map((account) => ({
        name: `${account.bankName} / ${account.accountNumber} / 잔액 : ${account.balance}`,
        value: account.id,
      })),
    ],
    []
  );

  const handlePurchase = async () => {
    const purchaseResult = await buyProduct(
      productId as string,
      selectedAccount,
      userInfo?.accessToken as string
    );
    if (purchaseResult.data) {
      console.log('Purchase success');
    } else {
      console.log('Purchase failed');
    }
  };

  return (
    <div className="my-10">
      {isLoading ? (
        <CrazyLoading />
      ) : (
        <div className="container mx-auto px-20">
          <Breadcrumbs
            category={product?.tags[0]}
            brand={product?.tags[1].toUpperCase()}
            name={product?.title}
          />
          <div className="flex gap-10">
            <div className="flex-1">
              <img
                src={product?.thumbnail || '/defaultThumb.jpg'}
                alt="썸네일 이미지"
                className="pl-[140px]"
              />
            </div>
            <div className="flex flex-1 flex-col gap-5">
              <div className="py-10 text-2xl font-bold">{product?.title}</div>
              <div className="flex-1 text-gray-700">{product?.description}</div>
              <div className="flex items-center gap-8">
                <span className="text-3xl text-red-500 ">
                  {product?.price.toLocaleString('ko-KR')}원
                </span>
                <span className="text-xl text-gray-500 line-through">
                  {priceBeforeDiscount(
                    product?.price as number,
                    product?.discountRate as number
                  )}
                  원
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-full ring-1 ring-gray-400">
                  {product?.discountRate}%
                </span>
              </div>
              <div>
                <Select
                  name="account"
                  onChange={(e) => setSelectedAccount(e.target.value)}
                  options={accountOptions}
                  value={selectedAccount}
                />
              </div>
              <Button onClick={handlePurchase} text="결제하기" />
            </div>
          </div>
          <div className="divider" />
          <SectionTitle text="상세 이미지" />
          <img
            src={product?.photo || '/defaultThumb.jpg'}
            alt="상세 이미지"
            className="mx-auto"
          />
        </div>
      )}
    </div>
  );
}
