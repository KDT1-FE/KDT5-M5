import { useSwiper } from 'swiper/react'
import btnprev from '../../public/assets/btnprev.png'

export default function SlidePrevButton() {
  const swiper = useSwiper()

  return (
    <button onClick={() => swiper.slidePrev()}><img src={btnprev} /></button>
  )
}