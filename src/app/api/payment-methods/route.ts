import { NextResponse } from "next/server";
import { PAYMENT_OPTIONS } from "@/lib/catalog";
export async function GET(){return NextResponse.json({status:"ok",currency:"BDT",methods:PAYMENT_OPTIONS})}
