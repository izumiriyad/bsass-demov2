import { NextResponse } from "next/server";
export async function GET(){return NextResponse.json({status:'ok',currency:'BDT',markets:[{id:'bd-ind-cricket',name:'Bangladesh vs India',type:'match_winner',back:[1.82,1.86,1.91],lay:[1.84,1.89,1.95],liquidity:143500}]})}
