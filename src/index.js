import ReactDOM from 'react-dom';
import React from 'react';
import './index.css'


class AddTask extends React.Component{
    constructor(props){
        super(props);
        this.state={
            taskDesc:''
        };
    }
    handleTaskTextChange(e){
        this.setState({
            taskDesc: e.target.value
        });
    }
    handleAddTaskClick(){
        this.props.handlerToCollectTaskClickInfo(this.state.taskDesc);
        this.setState({
            taskDesc:''
        });
    }


    render(){
        return(// we will create the form section inside this section(Add-Task)
            <form>
                <input type="text" value={this.state.taskDesc} onChange={(e) => this.handleTaskTextChange(e)} />

                <input type="button" value="Add Task" onClick={()=>this.handleAddTaskClick()} />
            </form>
                // <div> Add a task </div>
        )
    }
}

class TaskList extends React.Component{
    // constructor(props){
    //     super(props);
    // }
    handleTaskClick(taskDesc){
        this.props.handlerToCollectTaskClickInfo(taskDesc);
    }
    render(){
        // console.log(this.props.purpose);
        // console.log(this.props.tasks); 
        let list = [];
        for(let i=0;i<this.props.tasks.length;i++){
            let task = this.props.tasks[i];
            let spanAction;

            if(task.isFinished){
                spanAction=(
                    <span class="material-icons" onClick={()=> this.handleTaskClick(task.desc)}>close</span>
                );                
            }else{
                spanAction=(
                    <span class="material-icons" onClick={()=> this.handleTaskClick(task.desc)}>done</span>
                );
            }
            let li = (
                <li key={i}>
                    <span>{task.desc}</span>
                    {spanAction}
                </li>);
            list.push(li);
        }
        return(
            
                /* <div>{this.props.purpose}</div>
                <div>{this.props.desc}</div> */
                //(applied list-container and title div to apply small borders)
                <div className={this.props.forStyling}>
                    <div className='list-container'>
                        <div className='title'>{this.props.purpose}</div>
                        <ul>
                            {list}
                        </ul>
                    </div>
                    
                    </div>// basically this will apply specific class for our to lists 1. todo 2. finished
        )
    }
}
class App extends React.Component{
    //we will make a constructor
    constructor(props){//we should have to pass super as compulsory with the constructor
        super(props);

        this.state={
            tasks:[{
                desc:'Switch off the light',
                isFinished:false
            },{
                desc:'Turn on fan',
                isFinished:true
            },{
                desc:'Make tea',
                isFinished:false
            },{
                desc:'Make dinner',
                isFinished:true
            }]
        }
    }
    handleNewTask(task){
        let oldTasks = this.state.tasks.slice();
        oldTasks.push({
            desc:task,
            isFinished:false
        });
        this.setState({
            tasks:oldTasks
        })
    }

    //to handle task update on todo or finished
    handleTaskStatusUpdate(taskDesc, newStatus){
        let oldTasks=this.state.tasks.slice();

        let taskItem = oldTasks.find(ot => ot.desc == taskDesc);
        taskItem.isFinished=newStatus;

        this.setState({
            tasks: oldTasks
        })
    }
    render(){
        // const name="Avi";

        let tasks = this.state.tasks;// inside render we have seperated tasks from state
        let todoTasks = tasks.filter( t => t.isFinished == false);//we have fetched  tasks (we will provide this to task-lists below)
        let doneTasks = tasks.filter( t => t.isFinished == true);

        return(//basically the first add-task will create a section of add-task on the top 
        //the second class of name task-lists will create twoo todo lists  below the upper class
            <>  
            <div className="add-task">
                <AddTask handlerToCollectTaskClickInfo={(taskDesc) => this.handleNewTask(taskDesc)} />
            </div>
                <div className='task-lists'>
                <TaskList handlerToCollectTaskClickInfo={(taskDesc) => this.handleTaskStatusUpdate(taskDesc,true)} tasks={todoTasks} purpose="Todo " forStyling="todo" />
                 <TaskList handlerToCollectTaskClickInfo={(taskDesc) => this.handleTaskStatusUpdate(taskDesc,false)} tasks={doneTasks} purpose="Finished" forStyling="finished" />
                </div>
            </>
            
        );
    }
}
ReactDOM.render(<App />,document.getElementById("root"));

