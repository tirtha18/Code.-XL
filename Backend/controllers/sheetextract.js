import exceljs from "exceljs";
import fs from "fs";
import Sheets from "../models/Sheet.js";
import { getVideoLink } from "./getVideoLink.js";
export const extract = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const workbook = new exceljs.Workbook();
    const filePath = req.file.path;
    await workbook.xlsx.readFile(filePath);
    const sheet = workbook.getWorksheet(1);
    const csvRows = [];
    const convertObjectToString = (obj) => {
      if (typeof obj === "object" && obj !== null) {
        return Object.values(obj)
          .map((val) => (val !== undefined && val !== null ? val : ""))
          .join(";");
      }
      return obj;
    };
    sheet.eachRow((row) => {
      const rowValues = row.values.slice(1);
      const rowString = rowValues
        .map((cell) => {
          if (typeof cell === "object" && cell !== null) {
            return convertObjectToString(cell).toLowerCase();
          }
          return cell !== undefined && cell !== null && cell != "~"
            ? cell.toLowerCase()
            : null;
        })
        .join(",");
      csvRows.push(rowString);
    });
    const csvData = csvRows.join(",");
    const rawData = csvData.split(",");
    const topics = [
      "arrays",
      "array",
      "list",
      "vector",
      "strings",
      "string",
      "character array",
      "text",
      "matrix problems",
      "matrix",
      "2D array",
      "grid problems",
      "mathematical problems",
      "math problems",
      "arithmetic problems",
      "number theory",
      "sorting and searching",
      "sorting",
      "searching",
      "sort",
      "search",
      "linked list",
      "singly linked list",
      "doubly linked list",
      "stacks and queues",
      "stack",
      "queue",
      "stacks",
      "queues",
      "trees",
      "tree",
      "binary tree",
      "binary search tree",
      "BST",
      "graphs",
      "graph",
      "network",
      "graph theory",
      "tries",
      "trie",
      "prefix tree",
      "heaps",
      "heap",
      "binary heap",
      "priority queue",
      "heaps/pq",
      "pq",
      "dynamic programming",
      "DP",
      "2d arrays",
      "searching & sorting",
      "stacks & queues",
      "binary trees",
      "bit manipulation",
      "dynamic program",
      "two pointer approach",
      "two pointers",
      "two pointer technique",
      "greedy algorithms",
      "greedy",
      "greedy approach",
      "backtracking",
      "backtrack",
      "backtrack algorithm",
      "segment tree",
      "range query tree",
    ];
    const difficulty = ["easy", "medium", "hard"];
    let temp = { name: "", link: "", tag: "" },
      topic = "",
      flag = false,
      extractedData = [];
    for (let i = 0; i < rawData.length; i++) {
      if (topics.includes(rawData[i].trim()) && rawData != topic) {
        if (temp != { name: "", link: "", tag: "" }) {
          temp["tag"] = topic;

          extractedData.push(temp);
          temp = { name: "", link: "", tag: "" };
        }
        topic = rawData[i].trim();
        flag = true;
      }
      if (flag) {
        const leetstr = "https://leetcode.com/problems/";
        const gfgstr = "https://www.geeksforgeeks.org/";

        if (
          rawData[i].indexOf(leetstr) !== -1 ||
          rawData[i].indexOf(gfgstr) !== -1
        ) {
          let url = leetstr;
          if (rawData[i].indexOf(gfgstr) !== -1) {
            url = gfgstr;
          }
          let startind = rawData[i].indexOf(url);
          let name = "";
          for (let j = startind + 30; j < rawData[i].length; j++) {
            url += rawData[i][j];
            if (rawData[i][j] == "/") break;
            name += rawData[i][j];
          }
          temp["name"] = name;
          temp["link"] = url;
          temp["tag"] = topic;
          extractedData.push(temp);
          temp = { name: "", link: "", tag: "" };
        }
      }
    }

    const finalData = [];
    for (let i = 0; i < extractedData.length; i++) {
      if (
        extractedData[i].name !== "" &&
        extractedData[i].tag !== "" &&
        extractedData[i].link !== ""
      ) {
        const videoUrl = "";
        getVideoLink("JavaScript Tutorial")
          .then((link) => (videoUrl = link))
          .catch((error) => console.error("Error:", error));
      }
      extractedData[i]["videoLink"] = videoUrl;
      finalData.push(extractedData[i]);
    }
    for (let i = 0; i < finalData.length; i++)
      finalData[i]["status"] = "PENDING";
    let newSheet = { name: req.file.originalname, sheet: [] };
    for (let i = 0; i < finalData.length; i++)
      newSheet.sheet.push(finalData[i]);
    const user_id = req.body.user_id;
    if (!user_id)
      return res.status(400).json({ Message: "User not logged in" });
    Sheets.findOneAndUpdate({ user_id }, { $push: { sheets: newSheet } })
      .then((sheets) => {
        if (sheets) console.log("New Sheet added");
        else {
          const sheets = new Sheets({ user_id: user_id, sheets: [newSheet] });
          console.log("First sheet is inserted into sheets");
          sheets.save();
        }
      })
      .catch((error) => console.log(error));
    fs.unlinkSync(filePath);
    return res.json({
      message: "Excel sheet extracted succefully!",
      finalData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error extracting Excel sheet" });
    throw error;
  }
};
