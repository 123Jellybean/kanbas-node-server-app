// import Database from "../Database/index.js";

// export function enrollUserInCourse(userId, courseId) {
//   const { enrollments } = Database;
//   const newEnrollment = { _id: Date.now().toString(), user: userId, course: courseId };
//   Database.enrollments = [...enrollments, newEnrollment];
//   return newEnrollment;
// }

// export function unenrollUserFromCourse(userId, courseId) {
//   const { enrollments } = Database;
//   Database.enrollments = enrollments.filter(
//     (enrollment) => !(enrollment.user === userId && enrollment.course === courseId)
//   );
// }

// export function findEnrollmentsForUser(userId) {
//   const { enrollments } = Database;
//   return enrollments.filter((enrollment) => enrollment.user === userId);
// }


import model from "./model.js";
export async function findCoursesForUser(userId) {
 const enrollments = await model.find({ user: userId }).populate("course");
 return enrollments.map((enrollment) => enrollment.course);
}
export async function findUsersForCourse(courseId) {
 const enrollments = await model.find({ course: courseId }).populate("user");
 return enrollments.map((enrollment) => enrollment.user);
}
export function enrollUserInCourse(user, course) {
 return model.create({ user, course });
}
export function unenrollUserFromCourse(user, course) {
 return model.deleteOne({ user, course });
}
