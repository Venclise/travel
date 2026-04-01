import { connectDB } from "@/lib/db"
import { Tour } from "@/models/tour"
import { connect } from "http2"
import { NextResponse } from "next/server"

export async function GET(req:Request) {
    try {
await connectDB()
const {searchParams} = new URL(req.url)
const category = searchParams.get("category")
const id = searchParams.get("productId")

if (!id || !category) {
          return NextResponse.json(
        { error: "Missing params: category or productId" },
        { status: 400 }
      );
}

const products = await Tour.find({
    category,
  _id:{ $ne:id}
}
).limit(6).sort({sold: -1}).lean()

return NextResponse.json(products,{status: 200})
    }catch(error){
        console.log(error)
            return NextResponse.json(
      { error: "Failed to fetch related products" },
      { status: 500 }
    );
    }
}