import { NextFunction,Request,Response } from 'express';
// import { Request,Response,NextFunction/ } from "openai/_shims/registry.mjs";
// import CodingQuestion from '../models/CodingQue';
import CodingTest from '../models/codingTest';

export const getcodingtest = async (req:Request,res:Response,next : NextFunction) => {
    try{
        const codingtest = await CodingTest.find({});

        return res.status(200).json({
            codingtest
        })
    }
    catch(error){
        console.log(error);
    }
};

export const getSingleCodingTest = async (req:Request,res:Response,next : NextFunction) => {
    try{
        const {id} = req.params;
        const codingtest = await CodingTest.findById(id);

        return res.status(200).json({
            codingtest
        })

    }
    catch(error){
        console.log(error);
    }

}

export const createCodingTest = async (req:Request,res:Response,next : NextFunction) => {
    try{
     const {test_name , Test_questions} = req.body;

     const newCodingQuestion = new CodingTest({
        Test_name: test_name,
        Test_questions,
     })

     const isexist = await CodingTest.find({Test_name:test_name})

     if(isexist.length > 0){
         return res.json("Cannot Duplicate test name")
     }

      await newCodingQuestion.save();
      return res.status(200).json({
        message : "Test created successfully"
      })

    }
    catch(error){
        console.log(error);
    }
    
} ;

export const deleteCodingTest = async (req:Request , res:Response , next : NextFunction) => {
    try{
        const {test_id} = req.body;
        const deleteTest = await CodingTest.findByIdAndDelete(test_id);

        return res.status(200).json({
            message : "Test deleted successfully"
        })
    }
    catch(error){
        console.log(error);
    }
}