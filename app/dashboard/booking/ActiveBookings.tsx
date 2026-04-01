"use client";
import { useEffect, useState } from "react";

import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ActiveOrders() {
  const [booking, setBooking] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/booking", {
          cache: "no-store",
        });
        const data = await res.json();
        setBooking(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
    const interval = setInterval(fetchOrders, 5000);

    return () => clearInterval(interval);
  }, []);

  const pendingOrders = booking.filter(
    (booking) => booking.status === "pending",
  );


  console.log(pendingOrders)

  return (
    <div className="flex items-center gap-4 overflow-x-scroll mt-5">
      {pendingOrders.map((item) => {
      
        return (
          <div className=" w-[25rem] relative p-5 border" key={item._id}>
            <Button
              onClick={async () => {
                await fetch("/api/booking", {
                  method: "PATCH",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ id: item._id }),
                });

                setBooking((prev) =>
                  prev.map((o) =>
                    o._id === item._id ? { ...o, status: "delivered" } : o,
                  ),
                );
              }}
              className=" h-10 w-10 absolute top-3 right-3 rounded-full bg-green-700 hover:bg-green-700 text-white flex items-center justify-center cursor-pointer"
            >
              <Check size={18} />
            </Button>
            <div className="flex  justify-around mt-5">
              <div className="flex flex-col">
                <span className="text-sm">Order id:</span>
                <span className="text-sm">Name:</span>
                <span className="text-sm">Phone:</span>
                <span className="text-sm">City:</span>
                <span className="text-sm">People:</span>
           
              </div>

              <div className="flex flex-col">
                <span className="text-sm">{item._id}</span>
                <span className="text-sm">{item.booking.name}</span>
                <span className="text-sm">{item.booking.phone}</span>
                <span className="text-sm">{item.booking.city}</span>
                <span className="text-sm">{item.booking.people}</span>

              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
