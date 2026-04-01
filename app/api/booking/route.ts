import { connectDB } from "@/lib/db";
import { Booking } from "@/models/booking";
import { Tour } from "@/models/tour";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const { booking } = body;

    const order = Booking.create({
        booking: {
            name: booking.name,
            email: booking.email,
            phone: booking.phone,
            date: booking.date,
            city: booking.city,
            people: booking.people,
        }
     
    });



    return NextResponse.json(
      { message: "Order created successfully", order },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { message: "Error creating order" },
      { status: 500 },
    );
  }
}

export async function GET(req: Request) {
  try {
    await connectDB();

    const booking = await Booking.find().sort({
      createdAt: -1,
    });

    return NextResponse.json(booking, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { message: "Error Fetching Order" },
      { status: 500 },
    );
  }
}


export async function PATCH(req:Request) {
    try {
await connectDB()
const {id} = await req.json()


    if (!id) {
      return NextResponse.json(
        { message: "Booking id is required" },
        { status: 400 }
      );
    }

const booking = await Booking.findById(id)

    if (!booking) {
      return NextResponse.json(
        { message: "Order not found" },
        { status: 404 }
      );
    }

    // if(booking.status === "delivered") {
    //     await Promise.all(
    //         booking.booking.map((item: any) => 
    //             Tour.findByIdAndUpdate(item.id)
    //         )
    //     )
    // }


booking.status = 'delivered'
await booking.save()
   return NextResponse.json(booking, { status: 200 });
    } catch (error) {
    console.error("PATCH error:", error);
    return NextResponse.json(
      { message: "Failed to update Booknig" },
      { status: 500 }
    );
  }
}