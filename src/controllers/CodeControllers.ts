import { LANGUAGE_VERSIONS } from "./../constants/language";
// rest of the code
import { Request, Response } from "express";
import axios from "axios";

const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});

export const runCodeController = async (req: Request, res: Response) => {
  const { language } = req.params;

  const response = await API.post("/execute", {
    language: language,
    version: LANGUAGE_VERSIONS[language],
    files: [
      {
        content: req.body.code,
      },
    ],
    stdin: req.body.input,
  });

  console.log(response.data);

  res.json(response.data);
};
