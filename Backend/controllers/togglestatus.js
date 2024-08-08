import Problem from "../models/SheetProblems.js";
export const togglestatus = async (req, res) => {
  const { problem_id } = req.body;
  try {
    const problem = await Problem.findById(problem_id);
    problem["status"] = problem["status"] === "PENDING" ? "DONE" : "PENDING";
    console.log(problem);
    const updatedProblem = await Problem.findByIdAndUpdate(
      problem_id,
      problem,
      { new: true }
    );
    res
      .status(200)
      .json({
        message: "Problem status toggled successfully",
        updatedProblem: updatedProblem
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
