import { NextResponse } from "next/server";
export async function GET(){return NextResponse.json({status:'ok',results:[{league:'BPL',event:'Dhaka vs Chattogram',score:'172/6 - 168/8',settlement:'settled'},{league:'Premier League',event:'Sheikh Jamal vs Bashundhara',score:'1 - 2',settlement:'settled'}]})}
