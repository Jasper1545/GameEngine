class NPC  extends engine.DisplayObjectContainer implements Observer {
    public NPCId : string;
    private NPCBitmap : engine.Bitmap;
    private emoji : engine.Bitmap;
    private dialogue : string[] = [];
    private taskAcceptDialogue : string[] = [];
    private taskSubmitDialogue : string[] = [];
    public static npcIsChoose : NPC;
    //private canFinishedTaskId : string = null;
    private taskList:{
        [index : string]:Task
    } = {};

    private canAcceptTaskList:{
        [index : string]:Task
    } = {};

    private canSumbitTaskList:{
        [index : string]:Task
    } = {};

    

    constructor(npcId : string ,npcCode : string,dialogue : string[]){
        super();

        for( var i = 0 ; i < dialogue.length; i++){
            this.dialogue[i] = dialogue[i];
        }
        //console.log(npcCode);

        this.NPCId = npcId;
        this.width = 64;
        this.height = 64;


        this.NPCBitmap = this.createBitmapByName(npcCode);
        this.addChild(this.NPCBitmap);
        this.NPCBitmap.x = 0;
        this.NPCBitmap.y = 0;
        this.NPCBitmap.touchEnabled = true;

        
        //this.onNPCClick();
        

        this.touchEnabled = true;

         this.NPCBitmap.addEventListener(engine.TouchEventsType.CLICK,()=>{
            NPC.npcIsChoose = this;
        },this)

        this.emoji = new engine.Bitmap();

        let rule = (taskList) => {
            for(var taskId in taskList){
                if( taskList[taskId].fromNpcId == this.NPCId || taskList[taskId].toNpcId == this.NPCId){
                this.taskList[taskId] = taskList[taskId];
                }
                if(taskList[taskId].fromNpcId == this.NPCId){
                   this.canAcceptTaskList[taskId] = taskList[taskId];
                }
                if(taskList[taskId].toNpcId == this.NPCId){
                    this.canSumbitTaskList[taskId] = taskList[taskId];
                }


                if(taskList[taskId].fromNpcId == this.NPCId && taskList[taskId].status == TaskStatus.ACCEPTABLE){
                   engine.RES.getRes("tanhao_yellow.png").then((value) => {
                    this.emoji.texture = value;
                    this.emoji.setWidth(this.emoji.texture.width);
                        this.emoji.setHeight(this.emoji.texture.height);
                    });
                   this.taskList[taskId] = taskList[taskId];
                }

                if(this.NPCId  == taskList[taskId].toNpcId && taskList[taskId].status == TaskStatus.CAN_SUBMIT){
                   engine.RES.getRes("wenhao_yellow.png").then((value) => {
                    this.emoji.texture = value;
                    this.emoji.setWidth(this.emoji.texture.width);
                        this.emoji.setHeight(this.emoji.texture.height);
                    });
                   this.taskList[taskId] = taskList[taskId];
                }
            }
        }
        TaskService.getInstance().getTaskByCustomRule(rule);

        this.addChild(this.emoji);
        this.emoji.x = 20;
        this.emoji.y = 20;
    }

    public setTaskAcceptDialogue(acceptDialogue : string[]){
        this.taskAcceptDialogue = acceptDialogue;
    }

    public setTaskSubmitDialogue(submitDialogue : string[]){
        this.taskSubmitDialogue = submitDialogue;
    }

    onChange(task : Task){

            if(this.NPCId == task.fromNpcId && task.status == TaskStatus.ACCEPTABLE){
               this.emoji.alpha = 1;
               engine.RES.getRes("tanhao_yellow.png").then((value) => {
                    this.emoji.texture = value;
                    this.emoji.setWidth(this.emoji.texture.width);
                        this.emoji.setHeight(this.emoji.texture.height);
                    });
               this.taskList[task.id].status = TaskStatus.ACCEPTABLE;
               return;
            }

            if(this.NPCId == task.toNpcId && task.status == TaskStatus.CAN_SUBMIT){
                this.emoji.alpha = 1;
               engine.RES.getRes("wenhao_yellow.png").then((value) => {
                    this.emoji.texture = value;
                    this.emoji.setWidth(this.emoji.texture.width);
                        this.emoji.setHeight(this.emoji.texture.height);
                    });
               this.taskList[task.id].status = TaskStatus.CAN_SUBMIT;
               this.canSumbitTaskList[task.id] = task;
               //this.canFinishedTaskId = task.id;
               return;
            }

            // if(this.NPCId == task.toNpcId && task.status == TaskStatus.CAN_SUBMIT){
            //     this.canFinishedTaskId = task.id;
            //     return;
            // }

            // if(this.NPCId == task.toNpcId && task.status == TaskStatus.SUBMITTED){
            //     this.canFinishedTaskId = null;
            //     return;
            // }

            if(this.NPCId == task.fromNpcId && task.status != TaskStatus.ACCEPTABLE && task.status != TaskStatus.SUBMITTED){
                this.emoji.alpha = 0;
                this.taskList[task.id].status = task.status;
                for(var taskId in this.canSumbitTaskList){
                    if(this.NPCId == this.canSumbitTaskList[taskId].toNpcId 
                    && this.canSumbitTaskList[taskId].status == TaskStatus.CAN_SUBMIT){
                        this.emoji.alpha = 1;
                    engine.RES.getRes("wenhao_yellow.png").then((value) => {
                    this.emoji.texture = value;
                    this.emoji.setWidth(this.emoji.texture.width);
                        this.emoji.setHeight(this.emoji.texture.height);
                    });
                        return;
                    }
                }
                for(var taskId in this.taskList){
                    if(this.NPCId == this.taskList[taskId].fromNpcId 
                    && this.taskList[taskId].status == TaskStatus.ACCEPTABLE){
                       this.emoji.alpha = 1;
                    engine.RES.getRes("tanhao_yellow.png").then((value) => {
                    this.emoji.texture = value;
                    this.emoji.setWidth(this.emoji.texture.width);
                        this.emoji.setHeight(this.emoji.texture.height);
                    });
                       return;
                    }
                }
                return;
            }

            if(this.NPCId == task.toNpcId && task.status != TaskStatus.CAN_SUBMIT){
                this.emoji.alpha = 0;
                this.taskList[task.id].status = task.status;
                for(var taskId in this.canSumbitTaskList){
                    if(this.NPCId == this.canSumbitTaskList[taskId].toNpcId 
                    && this.canSumbitTaskList[taskId].status == TaskStatus.CAN_SUBMIT){
                        this.emoji.alpha = 1;
                        engine.RES.getRes("wenhao_yellow.png").then((value) => {
                        this.emoji.texture = value;
                        this.emoji.setWidth(this.emoji.texture.width);
                        this.emoji.setHeight(this.emoji.texture.height);
                        });
                        return;
                    }
                }
                for(var taskId in this.taskList){
                    if(this.NPCId == this.taskList[taskId].fromNpcId 
                    && this.taskList[taskId].status == TaskStatus.ACCEPTABLE){
                       this.emoji.alpha = 1;
                    engine.RES.getRes("tanhao_yellow.png").then((value) => {
                    this.emoji.texture = value;
                    this.emoji.setWidth(this.emoji.texture.width);
                    this.emoji.setHeight(this.emoji.texture.height);
                    });
                       return;
                    }
                }
                return;
            }

            


        
    }

    public onNPCClick(){
            var x = 0;
            //console.log(this.canFinishedTaskId);
            // if(this.canFinishedTaskId != null){
            //         if(this.NPCId == this.taskList[this.canFinishedTaskId].toNpcId && this.taskList[this.canFinishedTaskId].status == TaskStatus.DURING){
            //         DialoguePanel.getInstance().alpha = 0.8;
            //         DialoguePanel.getInstance().buttonTouchEnable(true);
            //         DialoguePanel.getInstance().setButtonBitmap("wancheng_png");
            //         DialoguePanel.getInstance().setIfAccept(false);
            //         DialoguePanel.getInstance().setDuringTaskId(this.canFinishedTaskId);
            //         DialoguePanel.getInstance().setDialogueText(this.dialogue);
            //         DialoguePanel.getInstance().setBackgroundBitmap("duihuakuang_png");
            //         TaskService.getInstance().canFinish(this.canFinishedTaskId);
            //     }
            // }

            //if( this.canFinishedTaskId == null){
                //console.log("233NPC");
            for(var taskId in this.canSumbitTaskList){
                if(this.NPCId == this.canSumbitTaskList[taskId].toNpcId && this.canSumbitTaskList[taskId].status == TaskStatus.CAN_SUBMIT){
                    DialoguePanel.getInstance().alpha = 0.8;
                    //console.log("Give me dialogue");
                    // DialoguePanel.getInstance().buttonTouchEnable(true);
                    DialoguePanel.getInstance().button.touchEnabled = true;
                    DialoguePanel.getInstance().setButtonBitmap("wancheng.png");
                    DialoguePanel.getInstance().setIfAccept(false);
                    DialoguePanel.getInstance().setDuringTask(this.canSumbitTaskList[taskId]);
                    //DialoguePanel.getInstance().setDuringTaskConditionType(this.canSumbitTaskList[taskId].conditionType);
                    //DialoguePanel.getInstance().setDuringTaskCondition(this.taskList[taskId].getCondition());
                    DialoguePanel.getInstance().setDialogueText(this.taskSubmitDialogue);
                    DialoguePanel.getInstance().setBackgroundBitmap("duihuakuang.png");
                    TaskService.getInstance().canFinish(taskId);
                    return;
                }
            }


            for(var taskId in this.taskList){
                //console.log(taskId);
                


                if(this.NPCId == this.taskList[taskId].fromNpcId && this.taskList[taskId].status == TaskStatus.ACCEPTABLE){
                    DialoguePanel.getInstance().alpha = 0.8;
                    // DialoguePanel.getInstance().buttonTouchEnable(true);
                    DialoguePanel.getInstance().button.touchEnabled = true;
                    DialoguePanel.getInstance().setButtonBitmap("jieshou.png");
                    DialoguePanel.getInstance().setIfAccept(true);
                    DialoguePanel.getInstance().setDuringTask(this.taskList[taskId]);
                    //DialoguePanel.getInstance().setDuringTaskConditionType(this.taskList[taskId].conditionType);
                    //DialoguePanel.getInstance().setDuringTaskCondition(this.taskList[taskId].getCondition());
                    DialoguePanel.getInstance().setDialogueText(this.taskAcceptDialogue);
                    DialoguePanel.getInstance().setBackgroundBitmap("duihuakuang.png");
                    //TaskService.getInstance().canAccept(taskId);
                    x++;
                    break;
                }

                if(this.NPCId == this.taskList[taskId].toNpcId && this.taskList[taskId].status == TaskStatus.CAN_SUBMIT){
                    DialoguePanel.getInstance().alpha = 0.8;
                    //console.log("Give me dialogue");
                    // DialoguePanel.getInstance().buttonTouchEnable(true);
                     DialoguePanel.getInstance().button.touchEnabled = true;
                    DialoguePanel.getInstance().setButtonBitmap("wancheng.png");
                    DialoguePanel.getInstance().setIfAccept(false);
                    DialoguePanel.getInstance().setDuringTask(this.taskList[taskId]);
                    //DialoguePanel.getInstance().setDuringTaskConditionType(this.taskList[taskId].conditionType);
                    //DialoguePanel.getInstance().setDuringTaskCondition(this.taskList[taskId].getCondition());
                    DialoguePanel.getInstance().setDialogueText(this.taskSubmitDialogue);
                    DialoguePanel.getInstance().setBackgroundBitmap("duihuakuang.png");
                    //TaskService.getInstance().canFinish(taskId);
                    x++;
                    break;
                }
               // }

                
            }
            if(x <= 0)
            TalkCommand.canFinish = true;
    }

    public getNPC(){
        this.NPCBitmap.addEventListener(engine.TouchEventsType.CLICK,()=>{
            NPC.npcIsChoose = this;
        },this)
    }



    private createBitmapByName(name:string):engine.Bitmap {
        var result = new engine.Bitmap();
        engine.RES.getRes(name).then((value) => {
                    result.texture = value;
                    result.setWidth(result.texture.width);
                    result.setHeight(result.texture.height);
                    });
        return result;
    }
}

class DialoguePanel extends engine.DisplayObjectContainer{

    private textField : engine.TextField;
    public button : engine.Bitmap;
    private dialogue : string[] = [];
    private background : engine.Bitmap;
    private ifAccept : boolean = false;
    private duringTask : Task;
    private duringTaskConditionType : string;
    private duringTaskCondition : TaskCondition;
    private _tmain : Main;

    private static instance = new DialoguePanel();

    static getInstance():DialoguePanel{
        if(DialoguePanel.instance == null){
            DialoguePanel.instance = new DialoguePanel();
            //DialoguePanel.instance.alpha = 1;
        }
        
            return DialoguePanel.instance;
    }


    constructor(){
        super();
        this.width = 300;
        this.height = 300;
        this.touchEnabled = true;
        

        this.background = this.createBitmapByName("duihuakuang.png");
        this.addChild(this.background);
        this.background.x = 0;
        this.background.y = 0;
        this.background.setWidth(300);
        this.background.setHeight(300);


        this.button = this.createBitmapByName("jieshou_gray.png");
        this.addChild(this.button);
        this.button.setWidth(100);
        this.button.setHeight(50);
        this.button.x = 100;
        this.button.y = 200;
        this.button.touchEnabled = false;

        this.textField = new engine.TextField();
        this.addChild(this.textField);
        //this.textField.text = dialogue[0];
        //this.textField.text = "233"
        this.textField.setWidth(200);
        this.textField.x = 40;
        this.textField.y = 40;
        this.textField.size = 20;
        this.textField.textColor = "#ffffff";

        //this.alpha = 1;
        this.alpha = 0;

        this.onClick();
    
        
    }

    public SetMain(main : Main){
        this._tmain = main;
    }

    public setButtonBitmap(buttonBitmapCode : string){
        engine.RES.getRes(buttonBitmapCode).then((value) => {
                    this.button.texture = value;
                    this.button.setWidth(this.button.texture.width);
                    this.button.setHeight(this.button.texture.height);
                    });
        // console.log(texture);
        // console.log(this.button.texture);
    }

    public setDuringTaskCondition(taskCondition : TaskCondition){
        this.duringTaskCondition = taskCondition;
    }

    public setDialogueText(dialogue : string[]){
        this.dialogue = [];
        for( var i = 0 ; i < dialogue.length; i++){
            this.dialogue[i] = dialogue[i];
        }
        for(var j = 0 ; j < this.dialogue.length;j++){
        this.textField.text = this.dialogue[j] + "\n";
        }
    }

    public setIfAccept(b : boolean){
        this.ifAccept = b;
        //console.log(this.ifAccept);
    }

    public buttonTouchEnable(b : boolean){
        this.button.touchEnabled = b;
    }

    public setDuringTask(task : Task){
        this.duringTask = task;
    }

    public setDuringTaskConditionType(taskConditionType : string){
        this.duringTaskConditionType = taskConditionType;
    }

    public setBackgroundBitmap(backgroundCode :string){
                engine.RES.getRes("duihuakuang.png").then((value) => {
                    this.background.texture = value;
                    this.background.setWidth(this.background.texture.width);
                    this.background.setHeight(this.background.texture.height);
                    });
    }

    private onClick(){
        this.button.addEventListener(engine.TouchEventsType.CLICK,()=>{
            console.log("dialogue on click");
            if(this.ifAccept){
               //TaskService.getInstance().accept(this.duringTask.id);
               this.duringTask.accept();
               this.button.touchEnabled = false;
                engine.RES.getRes("wancheng_gray.png").then((value) => {
                    this.button.texture = value;
                    this.button.setWidth(this.button.texture.width);
                    this.button.setHeight(this.button.texture.height);
                    });
                if(this.duringTask.conditionType == "npctalk"){
                    this.duringTask.updateProccess(1);
                    //TaskService.getInstance().canFinish(this.duringTask.id);
                    //this.duringTask.setCurrent(1);
                }
                //egret.Tween.get(this).to({alpha : 0},1000);
                this.alpha = 0;
                //console.log("1");
                TalkCommand.canFinish = true;

            }

            if(!this.ifAccept){
                //TaskService.getInstance().finish(this.duringTask.id);
                this.duringTask.submit();
                 engine.RES.getRes("jieshou_gray.png").then((value) => {
                    this.button.texture = value;
                    this.button.setWidth(this.button.texture.width);
                    this.button.setHeight(this.button.texture.height);
                    });
                
                //egret.Tween.get(this).to({alpha : 0},1000);
                this.alpha = 0;
                //console.log("2");
                TalkCommand.canFinish = true;
            }
        },this)
    }

    private createBitmapByName(name:string):engine.Bitmap {
        var result = new engine.Bitmap();
        engine.RES.getRes(name).then((value) => {
                    result.texture = value;
                    result.setWidth(result.texture.width);
                    result.setHeight(result.texture.height);
                    });
        return result;
    }
}