import express from 'express';
const app = express();
const port = 5000;
app.use(express.json());

//temporaray memory db
let students = [];

//create a student
app.post('/students',(req,res)=>{
    const {name,age,gender} =req.body;
    if(!name || !age || !gender){
        return res.status(400).json({message:'All fields are required'});
    }
    const newStudent = {
        id:students.length+1,
        name,
        age,
        gender
    };
    students.push(newStudent);
    console.log(newStudent);
    res.status(201).json(newStudent);
});

//get all students
app.get('/students',(req,res)=>{
    res.json(students)
});

//get a student
app.get('/students/:id',(req,res)=>{
    const student = students.find(student=>student.id === parseInt(req.params.id));
    if(!student){
        return res.status(404).json({message:'Student not found'});
    }
    res.json(student);
});

//update a student
app.put('/student/:id',(req,res)=>{
    const updateingStudent = students.find(student=>student.id === parseInt(req.params.id));
    if(!updateingStudent){
        return res.status(404).json({message:'Student not found'});
    }
    const {name,age,gender} = req.body;
    updateingStudent.name = name || updateingStudent.name;
    updateingStudent.age = age || updateingStudent.age;
    updateingStudent.gender = gender || updateingStudent.gender;

    res.json(updateingStudent);
});

//delete a student
app.delete('/students/:id',(req,res)=>{
    const studentIndex = students.findIndex(student=>student.id === parseInt(req.params.id));
    if(studentIndex === -1){
        return res.status(404).json({message:'Student not found'});
    };
    students.splice(studentIndex,1);
    res.status(204).send();
})


app.get('/',(req,res)=>{
    res.send('Hello World');
});

app.listen(port,(()=>{
    console.log(`Server is running on port ${port}`);
}))