import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";
import "../app.css";
import { EffectCube, Pagination } from "swiper/modules";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";

export default function Swipper() {
  let { country } = useParams();

  const [singleCc, setSingleCc] = useState([]);

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/region/${country}`)
      .then((res) => setSingleCc(res.data))
      .catch((err) => console.log(err));
  }, [country]);

  return (
    <>
      <h1 className="text-center">{country}</h1>
      <Swiper
        effect={"cube"}
        grabCursor={true}
        cubeEffect={{
          shadow: true,
          slideShadows: false,
          shadowOffset: 40,
          shadowScale: 0.46,
        }}
        pagination={false}
        modules={[EffectCube, Pagination]}
        className="mySwiper my-5"
      >
        {singleCc.map((cc) => (
          <SwiperSlide key={cc.name.common}>
            <NavLink to={`/card/${cc.name.common}`}>
              <h3 className="text-center">{cc.name.common}</h3>
            </NavLink>

            <div className="image-wrapper">
              <img
                src={cc.flags.png}
                className="swipper__image"
                alt={cc.flags.alt}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
