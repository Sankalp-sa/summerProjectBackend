import { NextFunction, Response, Request } from "express";

import OpenAI from "openai";

export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_SECRET_KEY, // This is the default and can be omitted
  });

  const { message } = req.body;


  const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: message}],
      model: 'gpt-3.5-turbo',
    });

    res.json(chatCompletion.choices[0].message);
};
