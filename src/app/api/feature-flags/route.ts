import { NextResponse } from "next/server";
export async function GET(){return NextResponse.json({status:"ok",flags:{betSlip:true,pwaInstall:true,kyc:true,responsibleGaming:true,adminConsole:true,maintenanceMode:false}})}
