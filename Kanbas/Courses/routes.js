import * as dao from "./dao.js";
import * as modulesDao from "../Modules/dao.js";
import * as assignmentsDao from "../Assignments/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";

export default function CourseRoutes(app) {
  app.get("/api/courses", async (req, res) => {
    const courses = await dao.findAllCourses();
    res.send(courses);
  });

  app.post("/api/courses", async (req, res) => {
    const course = await dao.createCourse(req.body);
    const currentUser = req.session["currentUser"];
    if (currentUser) {
      await enrollmentsDao.enrollUserInCourse(currentUser._id, course._id);
    }
    res.json(course);
  });

  app.get("/api/courses/:courseId/modules", async (req, res) => {
    const { courseId } = req.params;
    const course = await dao.findCourseById(courseId);
    const modules = await modulesDao.findModulesForCourse(course.number);
    res.json(modules);
  });

  app.post("/api/courses/:courseId/modules", async (req, res) => {
    const { courseId } = req.params;
    const course = await dao.findCourseById(courseId);
    const module = {
      ...req.body,
      course: course.number,
    };
    const newModule = await modulesDao.createModule(module);
    res.send(newModule);
  });

  app.delete("/api/courses/:courseId", async (req, res) => {
    const { courseId } = req.params;
    const status = await dao.deleteCourse(courseId);
    const removeEnrollments = await enrollmentsDao.removeEnrollmentsForCourse(courseId);
    res.send(status);
  });

  app.put("/api/courses/:courseId", async (req, res) => {
    const { courseId } = req.params;
    const courseUpdates = req.body;
    const status = await dao.updateCourse(courseId, courseUpdates);
    res.send(status);
  });

  app.get("/api/courses/:courseId/assignments", async (req, res) => {
    const { courseId } = req.params;
    const course = await dao.findCourseById(courseId);
    const assignments = await assignmentsDao.findAssignmentsForCourse(course.number);
    res.json(assignments);
  });

  app.post("/api/courses/:courseId/assignments", async (req, res) => {
    const { courseId } = req.params;
    const course = await dao.findCourseById(courseId);
    const assignment = {
      ...req.body,
      course: course.number,
    };
    const newAssignment = await assignmentsDao.createAssignment(assignment);
    res.send(newAssignment);
  });

  app.get("/api/courses/:cid/users", async (req, res) => {
    const { cid } = req.params;
    const course = await dao.findCourseById(cid);
    const users = await enrollmentsDao.findUsersForCourse(course._id);
    res.json(users);
  });
}