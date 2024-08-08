import Problem from "../models/SheetProblems.js";
export const addNotes = async (req,res) => {
    const {problem_id, notes} = req.body;
    try {
        const problem = await Problem.findById(problem_id);
        problem["notes"] = notes;
        const updatedProblem = await Problem.findByIdAndUpdate(
          problem_id,
          problem,
          { new: true }
        );
        res
          .status(200)
          .json({
            message: "Notes Updated successfully",
            updatedProblem: updatedProblem
          });
      } catch (error) {
        console.error(error);
        res.status(500).json({
          message: "Internal server error",
        });
      }
};
