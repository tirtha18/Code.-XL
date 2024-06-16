import Sheets from "../models/Sheet.js";
export const togglestatus = async (req, res) => {
  const { problem_id, sheet_id, sheets_id } = req.body;
  try {
    const sheets = await Sheets.findById(sheets_id);
    if (!sheets) {
      return res.status(400).json({ message: "Sheets not found" });
    }
    let flag = false;
    for (let i = 0; i < sheets.sheets.length; i++) {
      if (sheets.sheets[i]._id.toString() === sheet_id) {
        for (let j = 0; j < sheets.sheets[i].sheet.length; j++) {
          if (sheets.sheets[i].sheet[j]._id.toString() === problem_id) {
            flag = true;
            sheets.sheets[i].sheet[j].status =
              sheets.sheets[i].sheet[j].status === "PENDING"
                ? "DONE"
                : "PENDING";
            break;
          }
        }
        if(flag)
        break;
      }
    }
    if (flag) {
      await sheets.save();
      res.json({
        message: "Problem status toggled successfully",
        sheets,
      });
    } else {
      return res
        .status(400)
        .json({ message: "Invalid sheet, problem or sheet ids" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
