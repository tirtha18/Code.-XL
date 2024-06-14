import Sheets from "../models/Sheet.js";

export const togglestatus = async (req, res) => {
  const problem_id = req.body.problem_id;
  const sheet_id = req.body.sheet_id;
  const sheets_id = req.body.sheets_id;
  try {
    let flag = false;
    const sheets = await Sheets.findById(sheets_id);
    let updated_sheets = sheets.sheets;
    console.log(updated_sheets[2]._id);
    for (let i = 0; i < updated_sheets.length; i++) {
      if (updated_sheets[i]._id.toString() === sheet_id) {
        for (let j = 0; j < updated_sheets[i].sheet.length; j++) {
          if (updated_sheets[i].sheet[j]._id.toString() === problem_id) {
            flag = true;
            if (updated_sheets[i].sheet[j].status == "PENDING")
              updated_sheets[i].sheet[j].status = "DONE";
            else updated_sheets[i].sheet[j].status = "PENDING";
          }
          if (flag) break;
        }
      }
    }
    console.log(flag);
    if (flag) {
      try {
        const getupsheed = async () => {
          const updSheet = await Sheets.findByIdAndUpdate(sheets_id, {
            $set: { sheets: updated_sheets },
          });
          res.json({
            message: "Problem status toggled successfully",
            updSheet,
          });
        };
        getupsheed();
      } catch (error) {
        console.log(error);
      }
    } else {
      return res
        .status(400)
        .json({ messaga: "Invalid sheet, problem or sheet ids" });
    }
  } catch (error) {
    console.log(error);
  }
};
