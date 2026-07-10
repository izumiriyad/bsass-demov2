import { NextRequest, NextResponse } from "next/server";
export async function POST(req:NextRequest){const body=await req.json().catch(()=>({})); return NextResponse.json({status:"accepted",promotionId:body.promotionId??"unknown",message:"Promotion claim request queued for eligibility checks"},{status:202})}
