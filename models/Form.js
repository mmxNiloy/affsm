module.exports = class Form {
    constructor() {
        this.form_id = 0
        this.student_id = 0
        this.department_name = ''
        this.time_stamp = new Date()
        this.permanent_address = ''
        this.current_address = ''
        this.contact = ''
        this.semester = 0
        this.clearance_level = 0
        this.department_id = ''
        this.session = 0
        this.name_of_father = ''
        this.name_of_mother = ''
        this.name_of_guardian = ''
        this.religion = ''
        this.date_of_birth = new Date()
        this.ethnicity = ''
        this.nationality = ''
        this.allotted_hall = ''
        this.first_name = ''
        this.last_name = ''
        this.email = ''
        this.hall_name = ''
        this.courses = []
    }

    buildFromRows = (rows) => {
        const commonData = rows[0]
        this.form_id = commonData.form_id,
        this.student_id = commonData.student_id,
        this.first_name = commonData.first_name,
        this.last_name = commonData.last_name,
        this.name_of_father = commonData.name_of_father,
        this.name_of_mother = commonData.name_of_mother,
        this.name_of_guardian = commonData.name_of_guardian,
        this.religion = commonData.religion,
        this.date_of_birth = commonData.date_of_birth,
        this.ethnicity = commonData.ethnicity,
        this.nationality = commonData.nationality,
        this.allotted_hall = commonData.allotted_hall,
        this.hall_name = commonData.hall_name,
        this.email = commonData.email,
        this.semester = commonData.semester,
        this.session = commonData.session,
        this.department_id = commonData.department_id,
        this.department_name = commonData.department_name,
        this.time_stamp = commonData.time_stamp,
        this.clearance_level = commonData.clearance_level,
        this.permanent_address = commonData.permanent_address,
        this.current_address = commonData.current_address,
        this.contact = commonData.contact
        
        for(let i = 0 ; i < rows.length ; i++) {
            this.courses.push({
                id: `${rows[i].course_code}_${this.form_id}`,
                course_title: rows[i].course_title,
                course_code: rows[i].course_code,
                type: rows[i].type,
                course_semester: rows[i].course_semester,
                course_department_id: rows[i].course_department_id
            })
        }
    }
}

    