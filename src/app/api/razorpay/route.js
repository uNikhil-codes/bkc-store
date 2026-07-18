import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { client } from '@/sanity/lib/client';

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(request) {
  try {
    const { slug } = await request.json();

    // 1. SECURE FETCH: Look up the real price in Sanity! Never trust the frontend.
    const product = await client.fetch(`*[_type == "product" && slug.current == $slug][0]`, { slug });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const realPrice = product.prepaidPrice;

    // 2. Generate Razorpay order using the REAL price
    const options = {
      amount: realPrice * 100, // Amount in paise
      currency: "INR",
      receipt: "rcpt_" + Math.random().toString(36).substring(7),
    };

    const order = await razorpay.orders.create(options);
    return NextResponse.json(order);
  } catch (error) {
    console.error("Razorpay Error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
