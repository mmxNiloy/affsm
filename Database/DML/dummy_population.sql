-- Populate the sample database
INSERT INTO MY_Teachers
VALUES
(101, 'Joan', 'Crawford', 'Foreinsic and Autopsy'),
(105, 'Hector', 'Cabello', 'Ballistics Physics'),
(203, 'Victoria', 'Livingstone', 'Neurology'),
(204, 'Kyle', 'Cook', 'Web engineering and development'),
(302, 'Mika', 'Nakashima', 'Japanese 101'),
(303, 'Steve', 'Perry', 'Advanced vocal techniques');

INSERT INTO MY_Students
VALUES
(1001, 'Bob', 'Maroon', 1, 101),
(1002, 'Alice', 'Wonder', 2, 203),
(1003, 'Lucy', 'Luck', 1, 101),
(1004, 'Harry', 'Rafferty', 3, 105),
(1005, 'Triss', 'Varinsdottir', 2, 105),
(1006, 'Percy', 'Jackson', 1, 303),
(1007, 'Edward', 'Freeman', 4, 101),
(1008, 'Henry', 'Peterson', 2, 203),
(1009, 'Kyle', 'Smith', 3, 203),
(1010, 'Cris', 'Cross', 1, 204),
(1011, 'Amy', 'Woods', 5, 204),
(1012, 'Barbara', 'Gunnhildr', 3, 204),
(1013, 'Aaron', 'White', 4, 203),
(1014, 'Victor', 'Polyakov', 2, 302),
(1015, 'Michael', 'Jackson', 5, 302),
(1016, 'Gabriel', 'Hererra', 5, 303);

-- Commit the dummy data
COMMIT;