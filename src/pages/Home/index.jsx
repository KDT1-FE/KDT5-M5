import React, { useState } from "react";
import Banner from "../../components/main/banner";
import ProductEffectMenu from "../../components/main/ProductEffectMenu";
import EventMenu from "../../components/main/EventMenu";
import NewProduct from "../../components/main/NewProduct";
import ProductMenu from "../../components/main/ProductMenu";

const Home = () => {
    const [cleansing, setCleansing] = useState("cleansing");
    const [makeUp, setMakeUp] = useState("makeUp");
    const [skinCare, setSkinCare] = useState("skinCare");

    return (
        <div>
            <div>
                <Banner />
                <ProductEffectMenu />
                <EventMenu />
                <NewProduct />
                <ProductMenu category={cleansing} />
                <ProductMenu category={makeUp} />
                <ProductMenu category={skinCare} />
            </div>
        </div>
    );
};

export default Home;
