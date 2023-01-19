-- Test Dummy data
SELECT *
FROM MY_Teachers;

SELECT *
FROM MY_Students;

SELECT *
FROM MY_Students
JOIN MY_Teachers USING(instructor_id);