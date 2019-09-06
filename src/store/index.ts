    
import User from './moudles/user'
import Question from './moudles/question'
import Allquestion from './moudles/allquestion'
import Subject from './moudles/subject'
import getDetail from './moudles/allquestion'
import getRoom from './moudles/grade'
import getClass from './moudles/grade'
const user =new User()
const question= new Question()
const allquestion =new Allquestion()
const subject=new Subject()
const getdetail=new getDetail()
const getroom=new getRoom()
const getclass=new getClass()
export default {
    user,
    question,
    allquestion,
    subject,
    getdetail,
    getroom,
    getclass
}