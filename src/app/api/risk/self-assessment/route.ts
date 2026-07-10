import { NextResponse } from "next/server";
export async function GET(){return NextResponse.json({status:'ok',questions:6,actions:['set_limits','cooling_off','self_exclusion','support']})}
