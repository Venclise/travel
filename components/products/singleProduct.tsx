"use client";

import Image from "next/image";
import { Button } from "../ui/button";

import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { usePathname, useRouter } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useRef, useState } from "react";
import {
  Bus,
  ChevronLeft,
  ChevronRight,
  Clock,
  HandPlatter,
  MapPin,
  Pin,
  Plane,
} from "lucide-react";
import BookFrom from "./BookFrom";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

type itinerary = {
  _id: string;
  title: string;
  day: number;
  activities: string;
};

type Product = {
  _id: any;
  title: string;
  description: string;
  price: number;
  cutprice: number;
  image: string[];
  category: string;
  subcategory: string;
  itinerary: itinerary[];
  days: number;
  nights: number;
  location: string;
};
export default function SingleProduct({ product }: { product: Product }) {

  const router = useRouter();
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [length,setLength] = useState(200)

console.log(product)

  return (
    <div className="w-full   h-max   mt-24  flex flex-col gap-12  overflow-hidden ">
      {product.image && (
        <div className={` relative w-full  flex  flex-col `}>
          <div className="w-full  lg:w-[100%] h-[85vh] lg:h-screen  overflow-hidden ">
            <Swiper
              className="w-full h-full"
              modules={[Navigation, Pagination]}
              spaceBetween={5}
              breakpoints={{
                576: {
                  slidesPerView: product.image.length > 1 ? 1.1 : 1,
                },
                1024: {
                  slidesPerView: product.image.length > 1 ? 1.1 : 1,
                },
              }}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              onSlideChange={(swiper) => {
                setActiveIndex(swiper.activeIndex);
              }}
            >
              {product.image.map((img, i) => (
                <SwiperSlide
                  key={i}
                  className="w-full h-full flex items-center justify-center"
                >
                  <Image
                    alt={img}
                    fill
                    src={img}
                    className="w-full h-full object-cover  max-w-full max-h-full "
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div
            className={`w-[95%] left-2     flex justify-between  items-center absolute top-[50%]    z-10 ${product.image.length === 1 ? "hidden" : "flex"}`}
          >
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="
            h-10 w-10 rounded-full
             bg-transparent
             backdrop-filter backdrop-blur-sm   
            flex items-center justify-center
            
           
           text-blue-500   
          "
            >
              <ChevronLeft size={35} />
            </button>

            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="
    h-10 w-10 rounded-full
             bg-transparent
             backdrop-filter backdrop-blur-sm   
            flex items-center justify-center
            shadow-xl
            transition-all
           text-blue-500  
         
                    "
            >
              <ChevronRight size={35} />
            </button>
          </div>

          {product.image.length > 1 && (
            <div className=" absolute bottom-[1%] w-full  flex items-center justify-center z-50     gap-1">
              {product.image.map((img, i) => (
                <div
                  onClick={() => {
                    swiperRef.current?.slideTo(i);
                  }}
                  key={i}
                  className={`w-[.5rem] h-[.5rem]  

                 
bg-neutral-700

            rounded-full  relative cursor-pointer overflow-hidden transition-all ${activeIndex === i && "bg-white"}`}
                />
              ))}
            </div>
          )}
        </div>
      )}

      <div className={`flex  justify-between   flex-col lg:flex-row w-full lg:p-10 p-5  `}>
        <div className="flex  flex-col gap-8 mt-8 w-full lg:w-[50%]  overflow-hidden">
          <h1 className="text-5xl  font-semibold text-neutral-800 leading-15 ">
            {product.title}
          </h1>

          <p  className="flex items-center gap-2 w-max  capitalize bg-gray-100 text-neutral-800 rounded-full p-3 ">
             <MapPin /> {product.location ?? product.category}</p>

          <div className="w-full h-max  flex-col  flex gap-5 p-5 rounded-4xl ">
            <h1 className=" text-lg">What's included</h1>  
            <div className="flex items-center gap-4 lg:flex-row flex-wrap">
              <span className="flex items-center gap-2  capitalize bg-gray-100 text-neutral-800 rounded-full p-3 ">
                <Clock size={15} />
                {product.days} days, {product.nights} nights
              </span>
              <span className="flex items-center gap-2 capitalize  bg-gray-100 text-neutral-800 rounded-full p-3">
                <div className="flex gap-1 items-center">
                  <Bus size={15} />
                  <Plane size={15}/>
                </div>
                Transport Included
              </span>
              <span className="flex items-center gap-2 capitalize  bg-gray-100 text-neutral-800 rounded-full p-3 ">
                <HandPlatter size={15} />
                Meals Included
              </span>
            </div>
          </div>
          <div className="flex  flex-col  p-5">
            <div className="flex flex-col p-5 relative w-max">
              <div className="flex items-center text-neutral-700  gap-4 absolute right-0 top-0">
           
              {product.cutprice > product.price && (
                <span className="text-lg line-through  ">
                  Rs.{product.cutprice.toLocaleString()}
                </span>
              )}

              </div>
            <div className="flex items-center gap-8 mt-8">
          
              <p className=" text-5xl lg:text-5xl font-bold ">
                Rs.{product.price.toLocaleString()}
              </p>
            </div>
            </div>

            <div className="flex flex-col gap-2 bg-gray-50 hover:bg-gray-100 cursor-pointer lg:p-5 p-2  w-max rounded-4xl" onClick={() => { setLength(0); length === -1 ? setLength(200) : setLength(-1)  } }>
              <h1 className="font-semibold text-lg lg:text-xl max-w-md">
                {product.title} Higlights
              </h1>
              <p className="text-sm text-neutral-800 leading-6 max-w-lg" >
                {product.description.length > 200 ? product.description.slice(0,length) : product.description}
                {product.description.length > 55 && <Button  variant="ghost" className="hover:bg-gray-200">{length === -1 ? "...show less" : "...show more"}</Button>}
              </p>
            </div>
            <div className="p-5">
              <Accordion
                type="single"
                collapsible
                defaultValue={`items-1`}
                className="flex flex-col  gap-4"
              >
                <h1 className=" text-lg"> Tour Itinerary</h1>

                {product.itinerary.map(({ _id, day, title, activities }) => (
                  <AccordionItem
                    value={`item-${_id}  `}
                    key={_id}
                    className="w-full  md:w-lg bg-neutral-100 border py-2 px-5 rounded-xl "
                  >
                    <AccordionTrigger className="text-gray-800 text-md">
                      Day {day}: {title}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-800 text-sm">
                      {activities}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>

        <div className="w-full  lg:w-[30%] h-max  flex justify-center">
          <div className="hidden w-full lg:flex">
            <BookFrom price={product.price} title={product.title} />
          </div>
          <div className="flex lg:hidden">
            <>
            <div className="w-full fixed bottom-0 left-0 px-5 py-2 z-50">

              <Dialog>
             
                <DialogTrigger asChild className="w-full">
                  <Button className="py-5 bg-yellow-500">Book now</Button>

                </DialogTrigger>

                <DialogContent className="overflow-y-scroll">
                  <DialogHeader>
                    <DialogTitle>
                      <BookFrom price={product.price} title={product.title} />
                    </DialogTitle>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
            </>
          </div>
        </div>
      </div>
    </div>
  );
}
