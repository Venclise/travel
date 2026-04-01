import { connectDB } from "@/lib/db";
import { Tour } from "@/models/tour";
import { NextResponse } from "next/server";


export async function GET(req: Request,  { params }: { params: Promise<{ tourid: string }> }){
    try {
await connectDB()

const {tourid} = await params
const tour = await Tour.findById(tourid)

if(!tour) {
       return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
}

       return NextResponse.json(
       tour,
        { status: 201 }
      );

    }catch(e){
         return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );

    }
}

export async function DELETE(req: Request,  { params }: { params: Promise<{ tourid: string }> }) {

  try {
    await connectDB()
    const {tourid} = await params

    const tour = await Tour.findByIdAndDelete(tourid)

   

    if(!tour) {
       return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
}

     return NextResponse.json(
           { message: "Product deleted successfully" },
        { status: 201 }
      );





  }catch(e) {
    return NextResponse.json({message:"Failed to delete the product"},{status: 404})
  }
  
}