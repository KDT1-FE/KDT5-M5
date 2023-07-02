import { useEffect, useState } from "react";
import MainTaggedCard from "../../../components/main/Card/MainTaggedCard";
import { IProduct, productsList } from "../../../lib/API/adminAPI";

function ShipPage() {
  const title = "우주선";
  const [list, setList] = useState<IProduct[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const shipList = list.filter((value) => value.tags?.includes("우주선"));

  useEffect(() => {
    async function fetchList() {
      setIsFetching(true);
      try {
        const res = await productsList();
        setList(res);
        setIsFetching(false);
      } catch (error) {
        console.log("error", error);
      }
    }
    fetchList();
  }, []);

  return (
    <MainTaggedCard
      isFetching={isFetching}
      title={title}
      list={shipList}
    ></MainTaggedCard>
  );
}

export default ShipPage;
