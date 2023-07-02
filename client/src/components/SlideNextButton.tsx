import { useSwiper } from 'swiper/react'
import btnnext from '../../public/assets/btnnext.png'

export default function SlideNextButton() {
  const swiper = useSwiper()

  return (
    <button onClick={() => swiper.slideNext()}><img src={btnnext} /></button>
  )
}