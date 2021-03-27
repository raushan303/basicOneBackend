// for deleting the field subtopicId
let tmpObj = await subtopic.find({}).distinct('subtopicId');
await subtopic.updateMany({ subtopicId: { $in: tmpObj } }, { $unset: { subjectName: '' } });
// .aggregate([{ $project: { _id: 0 } }]);

// .select(
//   'subtopicId commentId authorId likeCount disLikeCount replyCount imageList date title description priority'
// );

// let tup = await comment
//   .find(
//     { subtopicId: req.params.subtopicId },
//     { userLikeStatus: { $elemMatch: { userId: req.session.userId } } }
//   )
//   .select(
//     'subtopicId commentId authorId likeCount disLikeCount replyCount imageList date title description priority'
//   );
