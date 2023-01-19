CREATE TABLE MY_Teachers(
	-- Attributes
    instructor_id INT PRIMARY KEY,
    first_name VARCHAR(128),
    last_name VARCHAR(128),
    teaches VARCHAR(256)
);

CREATE TABLE MY_Students(
	-- Attributes
    student_id INT PRIMARY KEY,
    last_name VARCHAR(128),
    first_name VARCHAR(128),
    semester INT,
    instructor_id INT,
    
    -- FK Constraints
    -- Planetscape does not support FKs
    -- Use keys instead
	KEY instructor_id_idx (instructor_id)
);
