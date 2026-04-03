"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { ArrowLeft, ArrowLeftSquareIcon, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Image from "next/image";

import { toast } from "sonner";
import { title } from "process";
import { Spinner } from "../ui/spinner";
import { category, Tourtypes } from "@/lib/constants";

interface ItineraryItem {
  day: number;
  title: string;
  activities: string;
}

export default function AddProduct() {
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [productInfo, setProductInfo] = useState<{
    title: string;
    price: string;
    description: string;
    category: string;
    cutprice: string;
    nights: string;
    days: string;
    location: string;
    tourtype:string;
  }>({
    title: "",
    price: "",
    description: "",
    category: "",
    cutprice: "",
    nights: "",
    days: "",
    location: "",
        tourtype:""
  });

  const [itinerary, setItinerary] = useState<ItineraryItem[]>([]);

  const [tempDay, setTempDay] = useState({ title: "", activities: "" });

  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const router = useRouter();

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !productInfo.title ||
      !productInfo.description ||
      !productInfo.category ||
      itinerary.length === 0 ||
      !productInfo.nights ||
      !productInfo.days ||
      !productInfo.location
    ) {
      toast.error("Please fill in the required feild");
      return;
    }

    if (productInfo.cutprice) {
      if (
        productInfo.cutprice < productInfo.price ||
        productInfo.cutprice === productInfo.price
      ) {
        toast.error("Cut price can't be less or equal to price");
        return;
      }
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("title", productInfo.title);
    formData.append("description", productInfo.description);
    formData.append("price", productInfo.price);
    formData.append("cutprice", productInfo.cutprice);
    formData.append("category", productInfo.category);
    formData.append("tourtype", productInfo.tourtype);
    formData.append("itinerary", JSON.stringify(itinerary));
    formData.append("days", productInfo.days);
    formData.append("nights", productInfo.nights);
    formData.append("location", productInfo.location);

    console.log(productInfo.tourtype)

    images.forEach((img) => {
      formData.append("images", img);
    });

    try {
      const res = await fetch(`${baseUrl}/api/tour`, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        toast.error("Something went wrong");
        setLoading(false);
        return;
      }

      setProductInfo({
        title: "",
        price: "",
        cutprice: "",
        description: "",
        category: "",
        nights: "",
        days: "",
        location: "",
        tourtype: ""
      });

      setPreviews([]);
      const fileInput = document.getElementById("img") as HTMLInputElement;
      if (fileInput) fileInput.value = "";
      toast.success("Product has been add successfully!");
    } catch (e) {
      toast.error("Failed to submit the product");
    } finally {
      setLoading(false);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));

    setActiveIndex((prev) => {
      if (prev > index) prev - 1;
      if (prev === index) return Math.max(0, prev - 1);
      return prev;
    });

    setTimeout(() => {
      swiperRef.current?.slideTo(Math.max(0, index - 1));
    }, 0);
  };
  return (
    <div className="w-full">
      <div className="flex items-center  gap-4">
        <Button
          className="rounded-full "
          variant="secondary"
          size="icon-lg"
          onClick={() => router.back()}
        >
          <ArrowLeft />
        </Button>
        <h1 className="font-semibold text-2xl lg:text-4xl  ">Add a product</h1>
      </div>
      <div className="w-full flex lg:flex-row flex-col-reverse ">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-8 p-5 flex-1 "
        >
          <div className="flex flex-col">
            <label
              htmlFor="name"
              className="capitalize p-2  text-md font-semibold"
            >
              name product
            </label>
            <Input
              placeholder="Enter the product name"
              id="name"
              required
              onChange={(e) =>
                setProductInfo({ ...productInfo, title: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="desc"
              className="capitalize p-2  text-md font-semibold"
            >
              Product Description
            </label>
            <Textarea
              placeholder="Enter description"
              id="desc"
              required
              onChange={(e) =>
                setProductInfo({ ...productInfo, description: e.target.value })
              }
            />
          </div>
          <div className="w-full flex gap-2 items-center flex-wrap flex-col   justify-center">
            <div className="flex items-center">
              <div className="flex flex-col flex-1 ">
                <label
                  htmlFor="price"
                  className="capitalize p-2  text-md font-semibold    "
                >
                  Enter price
                </label>
                <Input
                  placeholder="Enter the product name"
                  id="price"
                  type="number"
                  required
                  onChange={(e) =>
                    setProductInfo({ ...productInfo, price: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col flex-1 ">
                <label
                  htmlFor="price"
                  className="capitalize p-2  text-md font-semibold    "
                >
                  Enter cut price
                </label>
                <Input
                  placeholder="Enter the product name"
                  id="price"
                  type="number"
                  onChange={(e) =>
                    setProductInfo({ ...productInfo, cutprice: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="flex">
              <div className="flex flex-col">
                <label
                  htmlFor="days"
                  className="capitalize p-2  text-md font-semibold    "
                >
                  Days
                </label>
                <Input
                  placeholder="Enter days"
                  id="days"
                  type="number"
                  onChange={(e) =>
                    setProductInfo({ ...productInfo, days: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="nights"
                  className="capitalize p-2  text-md font-semibold    "
                >
                  Nights
                </label>
                <Input
                  placeholder="Enter nights"
                  id="nights"
                  type="number"
                  onChange={(e) =>
                    setProductInfo({ ...productInfo, nights: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="location"
                  className="capitalize p-2  text-md font-semibold    "
                >
                  Location
                </label>
                <Input
                  placeholder="Fairy Meadow,Hunza"
                  id="location"
                  onChange={(e) => {

                    setProductInfo({ ...productInfo, location: e.target.value })
                    console.log(e.target.value)
                  }
                  }
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="cat"
                className="capitalize p-2  text-md font-semibold    "
              >
                Select Category
              </label>
              <Select
                required
                onValueChange={(e) =>
                  setProductInfo({ ...productInfo, category: e })
                }
              >
                <SelectTrigger className="flex-1" id="cat">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {category.map(
                      ({ id, title }: { id: number; title: string }) => (
                        <SelectItem
                          key={id}
                          value={title}
                          className="capitalize"
                        >
                          {title}
                        </SelectItem>
                      ),
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
             <div className="flex flex-col">
              <label
                htmlFor="cat"
                className="capitalize p-2  text-md font-semibold    "
              >
                Select Tour type
              </label>
              <Select
                
                onValueChange={(e) =>
                  setProductInfo({ ...productInfo, tourtype: e })
              
                }
              >
                <SelectTrigger className="flex-1" id="cat">
                  <SelectValue placeholder="Select Tour type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {Tourtypes.map(
                      ({ id, title }: { id: number; title: string }) => (
                        <SelectItem
                          key={id}
                          value={title}
                          className="capitalize"
                        >
                          {title}
                        </SelectItem>
                      ),
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <div>
              <div className="mb-4 space-y-2">
                {itinerary.map((item, idx) => (
                  <div key={idx} className="p-2 border rounded">
                    Day {item.day}: {item.title}
                  </div>
                ))}
              </div>

              <Dialog>
                {/* 1. Trigger now does NOTHING but open the dialog */}
                <DialogTrigger asChild>
                  <Button variant="outline">
                    Add Day {itinerary.length + 1}
                  </Button>
                </DialogTrigger>

                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      Details for Day {itinerary.length + 1}
                    </DialogTitle>
                  </DialogHeader>

                  <div className="space-y-4 py-4">
                    <Input
                      placeholder="Title"
                      value={tempDay.title}
                      onChange={(e) =>
                        setTempDay({ ...tempDay, title: e.target.value })
                      }
                    />
                    <Input
                      placeholder="Activities (comma separated)"
                      value={tempDay.activities}
                      onChange={(e) =>
                        setTempDay({ ...tempDay, activities: e.target.value })
                      }
                    />
                  </div>

                  <DialogFooter>
                    <DialogClose asChild>
                      <Button
                        type="button"
                        onClick={() => {
                          setItinerary([
                            ...itinerary,
                            {
                              day: itinerary.length + 1,
                              title: tempDay.title,
                              activities: tempDay.activities,
                            },
                          ]);

                          setTempDay({ title: "", activities: "" });
                        }}
                      >
                        Confirm Add
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <Button
            type="submit"
            className={`${loading ? "bg-neutral-600" : "bg-black"} p-5 disabled:bg-neutral-700 `}
            disabled={!productInfo || loading}
          >
            {loading && <Spinner />}
            Add Product
          </Button>
        </form>

        {/*  img */}
        <div onSubmit={handleSubmit} className=" flex-1 flex flex-col gap-2">
          <div className="w-full ">
            <h1 className="font-semibold text-2xl p-5 text-neutral-800 ">
              Add image
            </h1>

            <input
              type="file"
              className="hidden"
              id="img"
              multiple
              accept="image/*"
              onChange={(e) => {
                const files = Array.from(e.target.files || []);

                setImages((prev) => [...prev, ...files]);
                setPreviews((prev) => [
                  ...prev,
                  ...files.map((file) => URL.createObjectURL(file)),
                ]);
              }}
            />
          </div>
          <div
            className={`${images.length ? "w-full h-full relative p-5 bg-gray-50 rounded-2xl" : "hidden"}`}
          >
            <Swiper
              className="w-full h-full   min-w-0 "
              modules={[Navigation, Pagination]}
              spaceBetween={0}
              slidesPerView={1}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              onSlideChange={(swiper) => {
                setActiveIndex(swiper.activeIndex);
              }}
            >
              {previews.map((src, i) => {
                return (
                  <SwiperSlide
                    className="!w-full h-full flex items-center justify-center "
                    key={i}
                  >
                    <Image
                      src={src}
                      key={i}
                      alt={`Image${i}`}
                      height={50}
                      width={50}
                      className="w-full h-full object-contain max-w-full max-h-full rounded-xl"
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>

          <div className="flex items-center gap-4 px-5">
            {previews.map((src, i) => {
              return (
                <div
                  className="h-[5rem] w-[5rem] relative "
                  onClick={() => swiperRef.current?.slideTo(i)}
                  key={i}
                >
                  <Button
                    variant="ghost"
                    className="cursor-pointer transition-all hover:bg-red-200 absolute top-0 right-0  text-red-500 hover:text-red-500 bg-transparent"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeImage(i);
                    }}
                  >
                    <Trash className="text-red-500 w-5 h-5  " />
                  </Button>
                  <Image
                    src={src}
                    alt={`Image${i}`}
                    height={50}
                    width={50}
                    className={`${activeIndex === i ? "border-2 border-blue-400 opacity-100" : "border-0 opacity-70"} h-full w-full object-cover rounded-md`}
                  />
                </div>
              );
            })}
            <label
              htmlFor="img"
              className={` ${images.length ? "w-[5rem]" : "w-full"}  bg-gray-50 border-2 border-dashed border-neutral-200 rounded-xl  flex items-center justify-center gap-2 h-[5rem] w-[5rem]`}
            >
              <span className="font-bold text-4xl">+</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
