import MockResults from "../models/MockResults.js";

export const mockResults = async (req, res) => {
  try {
    const { user_id, name, questions, total_q, attempted_q, correct_q } = req.body;
    
    if (!user_id || !name || !questions || !total_q || !attempted_q || !correct_q) {
      return res.status(400).json({ "message": "There is something missing" });
    }

    const Questions = questions.map(question => ({
      problem: question.question,
      answer: question.correctAns,
    }));

    const result = new MockResults({
      user_id,
      name,
      total_q,
      attempted_q,
      correct_q,
      questions: Questions,
    });
    await result.save();
    return res.status(201).json({ "message": "Mock results saved successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ "message": "Internal server error" });
  }
};
