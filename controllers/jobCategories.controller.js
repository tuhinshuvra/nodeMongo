const { ObjectId } = require("mongodb");
const { getDb } = require("../utils/dbConnect");



///////////show all job Category////////////////
module.exports.getAllCategories = async (req, res, next) => {
  try {
    const { limit, page } = req.query;
    const db = getDb();

    // cursor => toArray(), forEach()
    const categories = await db
      .collection("careersBangladeshDB")
      .find({})
      // .project({ _id: 0 })
      // .skip(+page * limit)
      // .limit(+limit)
      .toArray();

    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    next(error);
  }
};



///////////Save a new job Category////////////////
module.exports.saveACategories = async (req, res, next) => {
  try {
    const db = getDb();
    const category = req.body;

    const result = await db.collection("careersBangladeshDB").insertOne(category);
    console.log(result);

    if (!result.insertedId) {
      return res.status(400).send({ status: false, error: "Something went wrong!" });
    }
    res.send({ success: true, message: `Tool added with id: ${result.insertedId}` });
  } catch (error) {
    next(error);
  }
};



///////////show a job category by its id////////////////
module.exports.getACategoryDetail = async (req, res, next) => {
  try {
    const db = getDb();
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: "Not a valid category id." });
    }

    const category = await db.collection("careersBangladeshDB").findOne({ _id: ObjectId(id) });

    if (!category) {
      return res.status(400).json({ success: false, error: "Couldn't find a category with this id" });
    }

    res.status(200).json({ success: true, data: category });

  } catch (error) {
    next(error);
  }
};



///////////update a job category by its id////////////////
module.exports.updateACategory = async (req, res, next) => {
  try {
    const db = getDb();
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: "Not a valid category id." });
    }

    const tool = await db.collection("careersBangladeshDB").updateOne({ _id: ObjectId(id) }, { $set: req.body });

    if (!tool.modifiedCount) {
      return res.status(400).json({ success: false, error: "Couldn't update the category" });
    }

    res.status(200).json({ success: true, message: "Successfully updated the category" });
  } catch (error) {
    next(error);
  }
};



///////////delete a job category by its id////////////////
module.exports.deleteACategory = async (req, res, next) => {
  try {
    const db = getDb();
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: "Not a valid job category id." });
    }

    const tool = await db.collection("careersBangladeshDB").deleteOne({ _id: ObjectId(id) });

    if (!tool.deletedCount) {
      return res.status(400).json({ success: false, error: "Couldn't delete the job category" });
    }

    res.status(200).json({ success: true, message: "Successfully deleted the job category" });
  } catch (error) {
    next(error);
  }
};


module.exports.test = async (req, res, next) => {
  for (let i = 0; i < 100000; i++) {
    const db = getDb();
    db.collection("careersBangladeshDB").insertOne({ name: `Betaga ${i}`, age: i });
  }
};

module.exports.testGet = async (req, res, next) => {
  const db = getDb();

  const result = await db.collection("careersBangladeshDB").find({ name: "Betaga 99999" }).toArray();
  res.json(result);
};