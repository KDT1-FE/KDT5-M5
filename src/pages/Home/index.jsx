import React, { useState } from 'react'
import Banner from '../../components/main/banner'
import ProductEffectMenu from '../../components/main/ProductEffectMenu'
import ProductMenu from '../../components/main/ProductMenu'

const Home = () => {
  const [cleansing, setCleansing] = useState('cleansing')
  const [makeUp, setMakeUp] = useState('makeup')
  const [skinCare, setSkinCare] = useState('skincare')

  return (
    <div>
      <div>
        <Banner />
        <ProductEffectMenu />
        <ProductMenu category={cleansing} />
        <ProductMenu category={makeUp} />
        <ProductMenu category={skinCare} />
      </div>
    </div>
  )
}

export default Home
