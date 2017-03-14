class ScreenService extends EventEmitter{
     private taskList:{
        [index : string]:Task
     } = {};

     constructor(){
         super();
         let rule = (taskList) => {
            for (var taskId in taskList) {
                //console.log(taskId);
                if(taskList[taskId].conditionType == "killmonster"){
                this.taskList[taskId] = taskList[taskId];
                this.addObserver(taskList[taskId]);
                }
            }
        }
        TaskService.getInstance().getTaskByCustomRule(rule);
     }

     public monsterBeenKilled(taskId : string){
         this.notify(this.taskList[taskId]);
     }
}
