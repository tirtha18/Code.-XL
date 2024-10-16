import Problem from "../models/SheetProblems.js";
export const toggleRevision = async (req, res) => {
  try {
    const { problem_id } = req.body;
    console.log(problem_id);
    if (!problem_id)
      return res.status(404).json({ message: "Problem not found" });
    const toggledProblem = await Problem.findById(problem_id);
    toggledProblem["isInrevision"] = !toggledProblem["isInrevision"];
    await toggledProblem.save();
    return res.status(200).json({toggledProblem, message : "Problem Revision status toggled successfully!"});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error" });
  }
};
