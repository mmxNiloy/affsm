module.exports = class User {
    constructor() {
        this.user_id = 0 
        this.student_id = 0
        this.evaluator_id = 0
        this.evaluator_role = ''
        this.clearance_level = 0 
        this.department_id = '' 
        this.session = '' 
        this.semester = 0
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
        this.password = '' 
        this.department_name = '' 
        this.hall_id = '' 
        this.hall_name = ''
        this.isAdmin = false
    }

    buildFromRow = (row) => {
        this.user_id = row.user_id 
        this.student_id = row.student_id
        this.evaluator_id = row.evaluator_id 
        this.evaluator_role = row.evaluator_role
        this.clearance_level = row.clearance_level 
        this.department_id = row.department_id 
        this.session = row.session 
        this.semester = row.semester 
        this.name_of_father = row.name_of_father 
        this.name_of_mother = row.name_of_mother 
        this.name_of_guardian = row.name_of_guardian
        this.religion = row.religion
        this.date_of_birth = new Date(row.date_of_birth) 
        this.ethnicity = row.ethnicity
        this.nationality = row.nationality
        this.allotted_hall = row.allotted_hall 
        this.first_name = row.first_name
        this.last_name = row.last_name
        this.email = row.email
        this.password = row.password
        this.department_name = row.department_name
        this.hall_id = row.hall_id
        this.hall_name = row.hall_name
        this.isAdmin = row.isAdmin
    }
}