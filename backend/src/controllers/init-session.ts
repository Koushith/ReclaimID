import { Proof, reclaimprotocol } from "@reclaimprotocol/reclaim-sdk";

import express, { Request, Response } from "express";

import { asyncHandler } from "../middlewares/asyncHandler";
import { user } from "../models/user";

const reclaim = new reclaimprotocol.Reclaim();
const callbackUrl = "http://192.168.68.109:8000";
console.log("callback url----", callbackUrl);

export const initSession = async (req: Request, res: Response) => {
  console.log("request was here--- new one");
  console.log("Reclaim idddddd", req.body.tempReclaimId);
  try {
    const isReclaimIdExist = await user.findOne({
      reclaimId: req.body.tempReclaimId,
    });

    console.log(isReclaimIdExist);

    if (isReclaimIdExist?.reclaimId === req.body.tempReclaimId) {
      res.json({
        code: "TAKEN",
        message: "This ID already taken. please try with diffrent one",
      });
      throw new Error("This ID already taken. please try with diffrent one");
      return;
    } else {
      console.log("start---------------------");
      const request = reclaim.requestProofs({
        title: "Link other Platforms",
        baseCallbackUrl: callbackUrl,
        requestedProofs: [
          new reclaim.CustomProvider({
            provider: "uidai-aadhar",
            payload: {},
          }),

          new reclaim.CustomProvider({
            provider: "google-login",
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
        reclaimId: req.body.tempReclaimId,
        status: "PENDING",
      });

      if (record) {
        res.status(200).json({
          callbackId: record.callbackId,
          callbackUrl: record.callbackUrl,
        });
      }
    }
  } catch (error: any) {
    console.log("something went wrong", error);
  }
};

// verify the correctness of the proof

export const verifyTheProof = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.params.callbackId) {
      res.status(400).send(`400 - Bad Request: callbackId is required`);
      return;
    }

    if (!req.body) {
      res.status(400).send(`400 - Bad Request: body is required`);
      return;
    }

    let reqBody: any;

    reqBody = JSON.parse(decodeURIComponent(req.body));

    if (!reqBody.proofs || !reqBody.proofs.length) {
      res.status(400).send(`400 - Bad Request: proofs are required`);
      return;
    }

    const callbackId = req.params.callbackId;
    const proofs = reqBody.proofs as Proof[];

    console.log("proofs array", proofs);
    console.log("callback id", callbackId);

    // verify the proof
    const isValidProofs = reclaim.getOnChainClaimIdsFromProofs(proofs);

    if (isValidProofs) {
      await user.findByIdAndUpdate(
        { callbackId },
        {
          status: "VERIFIED",
        }
      );
      res.json({ success: true });
    } else {
      res.status(400).json({ success: false });
      console.log("Proof verification failed");
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

// get the status for FE
export const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id;

  console.log("id---", id);

  const query = await user.findOne({ reclaimId: id });
  console.log("query-------", query);
  if (query) {
    res.status(200).json({
      query,
    });
  } else {
    throw new Error("No Record found!!");
  }
});
