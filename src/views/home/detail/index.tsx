import * as React from 'react';
import './detail.css'
import Editor from 'for-editor'

interface Props {
    getdetail: any,
    location:any
}

 
class Detail extends React.Component<Props>{
  
    public render() {
        const item=this.props.location.state.item
        console.log(this.props.location.state.item)
        const {user_name,exam_name,questions_type_text,subject_text,questions_stem,questions_answer,title}=item
        return (
            <div className="detail_box">
         <h2>试题详情</h2>
                <div className="detail_content">
                    <div className="detail_left">
                       <ul className="left_detail">
                           <li>出题人：{user_name}</li>
                           <li>题目信息：</li>
                           <li>
                               <span>{questions_type_text}</span>
                               <span>{subject_text}</span>
                               <span>{exam_name}</span>
                           </li>
                           <li>{title}</li>
                           <li>{questions_stem}</li>
                       </ul>
                    </div>
                    <div className="detail_right">
                        答案信息：
                        {/* {questions_answer} */}
                        <Editor value={questions_answer}/>
                    </div>
                </div>

            </div>
        );
    }
}
export default Detail