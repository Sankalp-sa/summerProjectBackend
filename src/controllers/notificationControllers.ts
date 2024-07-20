import { getApplication } from "./applicationControllers";
// import { deNotification } from './notificationControllers';
import { NextFunction, Request, Response } from "express";
import Notification from "../models/Notification";
import { io } from "../app";
import Application from "../models/Application";
import StudentResponse from "../models/response";

export const getAllNotifications = async (req: Request, res: Response) => {
  const notifications = await Notification.find();

  res.status(200).json({
    notifications,
  });
};

export const createNotification = async (req: Request, res: Response) => {
  const { status, message, recipient } = req.body;

  console.log(req.body);

  const notification = new Notification({
    status,
    message,
    recipient,
  });

  await notification.save();

  res.status(201).json({
    notification,
    message: "Notification created successfully",
  });
};

export const updateNotification = async (req: Request, res: Response) => {
  const { id, status, message, recipient } = req.body;

  const notification = await Notification.findByIdAndUpdate(id, {
    status,
    message,
    recipient,
  });

  res.status(200).json({
    notification,
    message: "Notification updated successfully",
  });
};

export const deleteNotification = async (req: Request, res: Response) => {
  const { id } = req.body;

  const notification = await Notification.findByIdAndDelete(id);

  res.status(200).json({
    notification,
    message: "Notification deleted successfully",
  });
};

export const sendNotification = async (req: Request, res: Response) => {
  const { userId, message } = req.body;
  io.to(userId).emit("receiveNotification", message);
  res.status(200).send("Notification sent");
};

export const sendTest = async (req: Request, res: Response) => {
  const { userArray, testId } = req.body;

  console.log(userArray);

  for (let i = 0; i < userArray.length; i++) {
    // check if the Student Response already exists

    const response = await StudentResponse.findOne({
      studentId: userArray[i],
      testId,
    });

    if (response) {
      continue;
    }

    const newResponse = new StudentResponse({
      studentId: userArray[i],
      testId,
    });

    await newResponse.save();

    io.to(userArray[i]).emit(
      "receiveNotification",
      "You have a new test available"
    );
  }

  res.status(200).send({
    message: "Test sent",
  });
};

export const pending_appli_noti = async (req: Request, res: Response) => {
  const { id } = req.body;

  try {
    const findid = await Application.findOne({ Student_id: id });
    console.log(findid);

    if (!findid) {
      io.to(id).emit(
        "Pending_application_Notification",
        "Your application is remaining, please fill it"
      );
    }

    // Send the response only once after the above operations
    res.status(200).json({
      message: "Send Notification successfully",
    });
  } catch (error) {
    if (!res.headersSent) {
      res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    } else {
      console.error("Error after response sent:", error);
    }
  }
};
