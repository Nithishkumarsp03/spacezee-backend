export const getFullProgramAggregation = [
  {
    $match: { isDeleted: false },
  },
  {
    $sort: { defaultSelected: -1 },
  },
  {
    $lookup: {
      from: "learningmaterials",
      localField: "learningMaterials.learningMaterial",
      foreignField: "_id",
      as: "learningMaterialsDetails",
    },
  },
  {
    $unwind: {
      path: "$learningMaterialsDetails",
      preserveNullAndEmptyArrays: true,
    },
  },
  {
    $set: {
      "learningMaterialsDetails.courseContents": {
        $filter: {
          input: "$learningMaterialsDetails.courseContents",
          as: "courseContent",
          cond: { $eq: ["$$courseContent.isDeleted", false] },
        },
      },
    },
  },
  {
    $set: {
      "learningMaterialsDetails.courseContents": {
        $map: {
          input: "$learningMaterialsDetails.courseContents",
          as: "courseContent",
          in: {
            $mergeObjects: [
              "$$courseContent",
              {
                contentDetails: {
                  $filter: {
                    input: "$$courseContent.contentDetails",
                    as: "contentDetail",
                    cond: { $eq: ["$$contentDetail.isDeleted", false] },
                  },
                },
              },
            ],
          },
        },
      },
    },
  },
  {
    $group: {
      _id: "$_id",
      name: { $first: "$name" },
      practicals: { $first: "$practicals" },
      learningMaterials: { $push: "$learningMaterialsDetails" },
      assignments: { $first: "$assignments" },
      defaultSelected: { $first: "$defaultSelected" },
      isDeleted: { $first: "$isDeleted" },
    },
  },
  {
    $set: {
      practicals: {
        $filter: {
          input: "$practicals",
          as: "practical",
          cond: { $eq: ["$$practical.isDeleted", false] },
        },
      },
      learningMaterials: {
        $filter: {
          input: "$learningMaterials",
          as: "learningMaterial",
          cond: { $eq: ["$$learningMaterial.isDeleted", false] },
        },
      },
      assignments: {
        $filter: {
          input: "$assignments",
          as: "assignment",
          cond: { $eq: ["$$assignment.isDeleted", false] },
        },
      },
    },
  },
  {
    $project: {
      createdAt: 0,
      updatedAt: 0,
      __v: 0,
      isDeleted: 0,
    },
  },
];

export const getProgramDetailsAggregation = [
  {
    $match: { isDeleted: false },
  },
  {
    $sort: { defaultSelected: -1 },
  },
  {
    $lookup: {
      from: "learningmaterials",
      localField: "learningMaterials.learningMaterial",
      foreignField: "_id",
      as: "learningMaterialsDetails",
    },
  },
  {
    $lookup: {
      from: "taskmaterials",
      localField: "practicals.practical",
      foreignField: "_id",
      as: "practicalsDetails",
    },
  },
  {
    $unwind: {
      path: "$learningMaterialsDetails",
      preserveNullAndEmptyArrays: true,
    },
  },
  {
    $unwind: {
      path: "$practicalsDetails",
      preserveNullAndEmptyArrays: true,
    },
  },
  {
    $set: {
      "learningMaterialsDetails.courseContents": {
        $filter: {
          input: "$learningMaterialsDetails.courseContents",
          as: "courseContent",
          cond: { $eq: ["$$courseContent.isDeleted", false] },
        },
      },
      "practicalsDetails.courseContents": {
        $filter: {
          input: "$practicalsDetails.courseContents",
          as: "courseContent",
          cond: { $eq: ["$$courseContent.isDeleted", false] },
        },
      },
    },
  },
  {
    $set: {
      "learningMaterialsDetails.courseContents": {
        $map: {
          input: "$learningMaterialsDetails.courseContents",
          as: "courseContent",
          in: {
            $mergeObjects: [
              "$$courseContent",
              {
                contentDetails: {
                  $filter: {
                    input: "$$courseContent.contentDetails",
                    as: "contentDetail",
                    cond: { $eq: ["$$contentDetail.isDeleted", false] },
                  },
                },
              },
            ],
          },
        },
      },
      "practicalsDetails.courseContents": {
        $map: {
          input: "$practicalsDetails.courseContents",
          as: "courseContent",
          in: {
            $mergeObjects: [
              "$$courseContent",
              {
                contentDetails: {
                  $filter: {
                    input: "$$courseContent.contentDetails",
                    as: "contentDetail",
                    cond: { $eq: ["$$contentDetail.isDeleted", false] },
                  },
                },
              },
            ],
          },
        },
      },
    },
  },
  {
    $group: {
      _id: "$_id",
      name: { $first: "$name" },
      practicals: { $push: "$practicalsDetails" },
      learningMaterials: { $push: "$learningMaterialsDetails" },
      assignments: { $first: "$assignments" },
      defaultSelected: { $first: "$defaultSelected" },
      isDeleted: { $first: "$isDeleted" },
    },
  },
  {
    $set: {
      practicals: {
        $filter: {
          input: "$practicals",
          as: "practical",
          cond: { $eq: ["$$practical.isDeleted", false] },
        },
      },
      learningMaterials: {
        $filter: {
          input: "$learningMaterials",
          as: "learningMaterial",
          cond: { $eq: ["$$learningMaterial.isDeleted", false] },
        },
      },
      assignments: {
        $filter: {
          input: "$assignments",
          as: "assignment",
          cond: { $eq: ["$$assignment.isDeleted", false] },
        },
      },
    },
  },
  {
    $project: {
      "learningMaterials.courseContents": 0,
      "learningMaterials.description": 0,
      "learningMaterials.isDeleted": 0,
      "learningMaterials.createdAt": 0,
      "learningMaterials.updatedAt": 0,
      "learningMaterials.__v": 0,
      "practicals.courseContents": 0,
      "practicals.description": 0,
      "practicals.isDeleted": 0,
      "practicals.createdAt": 0,
      "practicals.updatedAt": 0,
      "practicals.__v": 0,
      createdAt: 0,
      updatedAt: 0,
      __v: 0,
      isDeleted: 0,
    },
  },
];
