import Problem from "../models/SheetProblems.js";
export const getRevision = async (req, res) => {
  try {
    const { sheet_id } = req.query;
    const Problems = await Problem.find({ sheet_id: sheet_id });
    const revisionProblems = Problems.filter(problem => problem.isInrevision === true )
    return res.status(200).json(revisionProblems);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error" });
  }
};