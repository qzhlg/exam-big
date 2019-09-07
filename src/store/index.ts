    
import User from './moudles/user'
import Question from './moudles/question'
import addText from './moudles/question'
import Allquestion from './moudles/allquestion'
import Subject from './moudles/subject'
import getDetail from './moudles/allquestion'
import getRoom from './moudles/grade'
import getClass from './moudles/grade'
import getMessage from './moudles/grade'
import Getexam from './moudles/exam'
const user =new User()
const question= new Question()
const addtext=new addText()
const allquestion =new Allquestion()
const subject=new Subject()
const getdetail=new getDetail()
const getroom=new getRoom()
const getclass=new getClass()
const getmessage=new getMessage()
const getexam=new Getexam()
export default {
    user,
    question,
    addtext,
    allquestion,
    subject,
    getdetail,
    getroom,
    getclass,
    getmessage,
    getexam
}