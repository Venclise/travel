import cloudinary from "@/lib/cloudinary";
import { connectDB } from "@/lib/db";
import { Tour } from "@/models/tour";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const price = Number(formData.get("price"));
    const cutprice = Number(formData.get("cutprice"));
    const category = formData.get("category") as string;
    const rawItinerary = formData.get("itinerary") as string;
    const location = formData.get("location") as string;
    let parsedData = JSON.parse(rawItinerary);
    const nights = Number(formData.get("nights"));
    const days = Number(formData.get("days"));

    const files = formData
      .getAll("images")
      .filter((f): f is File => f instanceof File);

    if (
      !title ||
      !description ||
      isNaN(price) ||
      !category ||
      files.length === 0 ||
      !parsedData ||
      isNaN(days) ||
      isNaN(nights) ||
      !location
    ) {
      return NextResponse.json({ error: "Missing Fields" }, { status: 400 });
    }
    const imagesUrls: string[] = [];
    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());

      const result: any = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "products" }, (err, res) => {
            if (err) return reject(err);
            resolve(res);
          })
          .end(buffer);
      });
      imagesUrls.push(result.secure_url);
    }

    const tour = await Tour.create({
      title,
      description,
      price,
      cutprice,
      category,
      nights,
      days,
      image: imagesUrls,
      itinerary: parsedData,
      location,
    });
    return NextResponse.json(tour, { status: 201 });
  } catch (e) {
    console.error("POST /api/products error:", e);
    return NextResponse.json(
      { error: "Failed to make a Post request" },
      { status: 500 },
    );
  }
}

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const category = searchParams.get("category");
    const sort = searchParams.get("sort");
    const limit = searchParams.get("limt");
    const sale = searchParams.get("sale");
    const search = searchParams.get("search");

    const query: any = {};

    if (category && category !== "all") query.category = category;

      if (search) query.title = { $regex: search, $options: "i" };
    if (sale === "true") {
      query.$expr = { $gt: ["cutprice", "price"] };
    }

    let mongooseQuery = Tour.find(query);

    if (sort === "newest") {
      mongooseQuery = mongooseQuery.sort({ createdAt: -1 });
    }
    if (limit) {
      mongooseQuery = mongooseQuery.limit(Number(limit));
    }

    const tour = await mongooseQuery.lean();
    return NextResponse.json(tour, { status: 200 });
  } catch (e) {
    console.error("POST /api/products error:", e);
    return NextResponse.json(
      { error: "Failed to fetch Products" },
      { status: 500 },
    );
  }
}
