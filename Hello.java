select student.stuId,student.stuName
from teacher,curse,student,scores
where teacher.id = course.teacherId and
    student.stuId = scores.stuId and course.courseId = scores.courseId
    and teacher.teacherName != '叶平'
