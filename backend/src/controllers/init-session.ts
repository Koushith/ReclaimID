import express, { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler";

import { reclaimprotocol } from "@reclaimprotocol/reclaim-sdk";
import { user } from "../models/user";

//initilize the session

const reclaim = new reclaimprotocol.Reclaim();
const callbackUrl = "http://192.168.68.109:8000";
console.log("callback url----", callbackUrl);

export const initSession = async (req: Request, res: Response) => {
  console.log("request was here--- new one");

  try {
    console.log("start---------------------");
    const request = reclaim.requestProofs({
      title: "Verify with Aadar",
      baseCallbackUrl: callbackUrl,
      requestedProofs: [
        new reclaim.CustomProvider({
          provider: "uidai-aadhar",
          payload: {},
        }),
      ],
    });
    console.log("before-------------");
    const reclaimUrl = await request.getReclaimUrl();
    const { callbackId } = request;
    console.log("after-------------");

    const record = await user.create({
      callbackId: callbackId,
      callbackUrl: reclaimUrl,
      status: "PENDING",
    });

    if (record) {
      res.status(200).json({
        callbackId: record.callbackId,
        callbackUrl: record.callbackUrl,
      });
    }
  } catch (error: any) {
    console.log("something went wrong", error);
  }
};

// verify the correctness of the proof

export const verifyTheProof = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    console.log("id---", id);

    const query = await user.findOne({ callbackId: id });
    console.log("query----", query);
    if (query) {
      res.status(200).json({
        status: query.status,
      });
    } else {
      throw new Error("No Record found!!");
    }
  }
);

// get the status for FE
export const getStatus = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id;

  console.log("id---", id);

  const query = await user.findOne({ callbackId: id });
  console.log("query-------", query);
  if (query) {
    res.status(200).json({
      callbakId: query.callbackId,
      status: query.status,
    });
  } else {
    throw new Error("No Record found!!");
  }
});
