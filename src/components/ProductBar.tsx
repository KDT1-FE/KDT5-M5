import { DICTIONARY_SHOES, PRODUCT_BRAND } from '@/constants/constants';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import SectionTitle from '@/components/ui/SectionTitle';
import Button from './ui/Button';
import SortOptions from '@/components/SortOptions';

interface ProductBarProps {
  searchText?: string;
  category?: string;
  productNumber?: number;
  handleBrand?: (brandValue: string) => void;
  selectedBrand?: string;
  handleSortByPrice: (brandValue: string) => void;
  brand?: string;
}

export default function ProductBar({
  searchText,
  category,
  productNumber,
  handleBrand,
  selectedBrand,
  handleSortByPrice,
  brand,
}: ProductBarProps) {
  return (
    <div className="mb-10">
      {searchText ? (
        <SectionTitle text={`'${searchText}' 검색결과`} />
      ) : (
        <>
          <SectionTitle
            text={category ? DICTIONARY_SHOES[category] : '모든제품'}
          />
        </>
      )}

      <div className="flex justify-between text-xs">
        <Breadcrumbs category={category} brand={brand?.toUpperCase()} />
        <div className="flex gap-3">
          <SortOptions handleSortByPrice={handleSortByPrice} />
          <span>총 {productNumber ?? '0'} 개</span>
        </div>
      </div>
      <div className="divider my-0 mt-2" />
      {searchText ? (
        <></>
      ) : (
        <div className="flex gap-10">
          {PRODUCT_BRAND.map((brand) => (
            <Button
              key={brand.value}
              text={brand.name}
              secondary={brand.value === selectedBrand ? false : true}
              onClick={() => handleBrand?.(brand.value)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
