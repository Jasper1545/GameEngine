let TIME = 0;

class Main extends engine.DisplayObjectContainer {


    stage;
    touchEvnetSetvice;

    constructor(stage:engine.DisplayObjectContainer,touchEventService : engine.TouchEventService){
        super();
        this.stage = stage;
        this.touchEvnetSetvice = touchEventService;
    }

    private textfield:engine.TextField;
    private EventPoint : engine.Point = new engine.Point(0,0);
    public Player : Person;
    private GoalPoint : engine.Point = new engine.Point(-1,-1);
    private DistancePoint : engine.Point = new engine.Point(-1,-1);
    private Stage01Background : engine.Bitmap;
    private MoveTime = 0;
    private map01 : TileMap;
    private astar : AStar;
    private tileX : number;
    private tileY : number;
    private tileSize = 64;
    public ifFindAWay : boolean = false;
    private currentPath : number = 0;
    private movingTime = 32;
    private ifOnGoal = false;
    public ifStartMove = false;
    public playerx : number;
    public playery : number;
    private playerBitX : number;
    private playerBitY : number;
    private task01 : Task;
    private task02 : Task;
    private taskService : TaskService /*= TaskService.getInstance() */;
    private taskPanel : TaskPanel;
    private NPC01 : NPC;
    private NPC02 : NPC;
    private Npc01Dialogue : string[] = ["你好我是NPC01"]
    private Npc01AcceptDialogue : string[] = ["你好我这里有个很简单的对话任务，完成以后就能拿到传说装备yo~,考虑一下吧"]

    private Npc02Dialogue : string[] = ["你好我是NPC02"]
    private Npc02AcceptDialogue : string[] = ["你好我这里有个很简单的杀怪任务，完成以后也能拿到传说装备yo~,考虑一下吧"]
    private Npc02SubmitDialogue : string[] = ["你变强了！！！\n点击完成任务后，奖励道具已经自动为您装备，请打开任务面板检查"]
    private dialoguePanel : DialoguePanel; 
    public screenService :ScreenService;

    private user : User ;
    private hero : Hero;
    private sword : Weapon;
    private lance : Weapon;
    private helment : Armor;
    private corseler : Armor;
    private shoes : Armor;
    private weaponJewel : Jewel;
    private armorJewel : Jewel;
    private userPanelButton : engine.Bitmap;
    
    private commandList : CommandList;

    private userPanel : UserPanel;

    private npcList : NPC[] = [];

    private monsterIdList : string [] = ["slime01","slime02"];

    public canMove : boolean;

    public equipmentServer : EquipmentServer;

    public userPanelIsOn : boolean;

    public ifFight : boolean;

    private slime : Monster;

    public monsterAttacking : Monster;

    private disx = 0;
    private disy = 0;

    private monsterService : MonsterService;

    /**
     * 创建游戏场景
     * Create a game scene
     */
     createGameScene():void {

        this.commandList = new CommandList();

        this.canMove = true;
        this.userPanelIsOn = false;
        this.ifFight = false;
        this.Player  = new Person();
        var stageW:number = this.stage.stageWidth;
        var stageH:number = this.stage.stageHeight;

        this.map01 = new TileMap();
        this.stage.addChild(this.map01);

        TaskService.getInstance();

        this.task01 = creatTask("task_00");
        this.task01.setMain(this);
        TaskService.getInstance().addTask(this.task01);
        this.task02 = creatTask("task_01");
        this.task02.setMain(this);
        TaskService.getInstance().addTask(this.task02);
        this.taskPanel = new TaskPanel();
        TaskService.getInstance().addObserver(this.taskPanel);
    
        this.stage.addChild(this.taskPanel);
        this.taskPanel.x = this.stage.width - this.taskPanel.getWidth();
        this.taskPanel.y = 0;

        this.NPC01 = new NPC("npc_0","NPC_Man_01.png",this.Npc01Dialogue);
        this.NPC01.setTaskAcceptDialogue(this.Npc01AcceptDialogue);
        this.npcList.push(this.NPC01);

        this.NPC02 = new NPC("npc_1","NPC_Man_02.png",this.Npc02Dialogue);
        this.NPC02.setTaskAcceptDialogue(this.Npc02AcceptDialogue);
        this.NPC02.setTaskSubmitDialogue(this.Npc02SubmitDialogue);
        this.npcList.push(this.NPC02);
        TaskService.getInstance().addObserver(this.NPC01);
        TaskService.getInstance().addObserver(this.NPC02);

        this.screenService = new ScreenService();
        //this.slime = new Monster("Slime01","slime","Slime_png",100);
        for(var id of this.monsterIdList){
        var temp = creatMonster(id);
        this.stage.addChild(temp);
        temp.x = temp.posX;
        temp.y = temp.posY;
        MonsterService.getInstance().addMonster(temp);
        }

        this.stage.addChild(this.NPC01);
        this.NPC01.x = 128;
        this.NPC01.y = 128;

        this.stage.addChild(this.NPC02);
        this.NPC02.x = 256;
        this.NPC02.y = 320;

        this.dialoguePanel = DialoguePanel.getInstance();
        this.dialoguePanel.SetMain(this);
        this.stage.addChild(this.dialoguePanel);
        this.dialoguePanel.x = 200;
        this.dialoguePanel.y = 200;

        this.userPanelButton = new engine.Bitmap();
        engine.RES.getRes("userPanelButton.png").then((value) =>{
            this.userPanelButton.texture = value;
            this.userPanelButton.setWidth(this.userPanelButton.texture.width);
            this.userPanelButton.setHeight(this.userPanelButton.texture.height);
            this.userPanelButton.x = 10 * 64 - this.userPanelButton.getWidth();
            this.userPanelButton.y = 0;
        })
        // this.userPanelButton = new engine.Bitmap("userPanelButton.png");
        this.stage.addChild(this.userPanelButton);
        
         this.stage.addChild(this.Player.PersonBitmap);
         this.Player.PersonBitmap.x = 0;
         this.Player.PersonBitmap.y = 0;

         this.map01.startTile = this.map01.getTile(0,0);
         this.map01.endTile = this.map01.getTile(0,0);
         //this.map01.setEndTile(2,1);

         this.astar = new AStar();

         this.user = new User("Player01",1);
         this.hero = new Hero("H001","FemaleSaberHero01",Quality.ORAGE,1,"FemaleSaberHero01.png",HeroType.SABER);
         this.sword = new Weapon("W001","LeagendSword01",Quality.ORAGE,WeaponType.HANDSWORD,"OrangeSword01.png");
         this.lance = new Weapon("W002","LeagendLance01",Quality.ORAGE,WeaponType.LANCE,"OrageLance01.png")
         this.helment = new Armor("A001","Purplrhelment01",Quality.PURPLE,ArmorType.LIGHTARMOR,"PurpleHelmet01.png");
         this.corseler = new Armor("A002","GreenCorseler01",Quality.GREEN,ArmorType.LIGHTARMOR,"GreenCorseler01.png");
         this.shoes = new Armor("A003","BlueShoes01",Quality.BLUE,ArmorType.LIGHTARMOR,"BlueShoes01.png");
         this.weaponJewel = new Jewel("J001","传说武器宝石",Quality.ORAGE);
         this.armorJewel = new Jewel("J002","普通防具宝石",Quality.WHITE);
         
         this.sword.addJewl(this.weaponJewel);
         this.helment.addJewl(this.armorJewel);
         this.corseler.addJewl(this.armorJewel);
         this.shoes.addJewl(this.armorJewel);
         //this.hero.addWeapon(this.sword);
         this.hero.addHelment(this.helment);
         this.hero.addCorseler(this.corseler);
         this.hero.addShoes(this.shoes);
         this.user.addHeroInTeam(this.hero);
         this.user.addHeros(this.hero);

         EquipmentServer.getInstance();
         EquipmentServer.getInstance().addWeapon(this.sword);
         EquipmentServer.getInstance().addWeapon(this.lance);
         EquipmentServer.getInstance().addArmor(this.helment);
         EquipmentServer.getInstance().addArmor(this.corseler);
         EquipmentServer.getInstance().addArmor(this.shoes);


         this.userPanel = new UserPanel();
         //this.stage.addChild(this.userPanel);
         this.userPanel.showHeroInformation(this.hero);
         this.userPanel.x = (this.stage.width - this.userPanel.getWidth()) / 2;
         this.userPanel.y = (this.stage.height - this.userPanel.getHeight()) / 2;

         //this.userPanel.equipmentInformationPanel.showEquipmentInformation(this.sword);

         this.userPanelButton.addEventListener(engine.TouchEventsType.CLICK,(e : engine.TouchEvents)=>{
            this.stage.addChild(this.userPanel);
            this.userPanel.showHeroInformation(this.hero);
            //console.log("upbdown");
        },this)
         

         
       

        //根据name关键字，异步获取一个json配置文件，name属性请参考resources/resource.json配置文件的内容。
        // Get asynchronously a json configuration file according to name keyword. As for the property of name please refer to the configuration file of resources/resource.json.
        //RES.getResAsync("description_json", this.startAnimation, this)
            this.stage.addEventListener(engine.TouchEventsType.MOUSEDOWN,(e : engine.TouchEvents)=>{
            //egret.Tween.removeTweens(this.Player.PersonBitmap);
            //this.ifStartMove = true;
            //var tempTile : Tile;
            NPC.npcIsChoose = null;
            this.ifFight = false;
            if(this.userPanelIsOn && (engine.TouchEventService.stageX < this.userPanel.x || engine.TouchEventService.stageX > this.userPanel.x + this.userPanel.getWidth() || engine.TouchEventService.stageY < this.userPanel.y || engine.TouchEventService.stageY > this.userPanel.y + this.userPanel.getHeight()) ){
            this.stage.removeChild(this.userPanel);
            this.userPanelIsOn = false;
            }
            this.playerx = Math.floor(this.Player.PersonBitmap.x / this.tileSize);
            this.playery = Math.floor(this.Player.PersonBitmap.y / this.tileSize);
            this.playerBitX = this.Player.PersonBitmap.x;
            this.playerBitY = this.Player.PersonBitmap.y;
            //console.log(this.playerx + "," + this.playery);
            this.map01.startTile = this.map01.getTile(this.playerx,this.playery);
            
            this.Player.PersonBitmap.x = this.playerx * 64;
            this.Player.PersonBitmap.y = this.playery * 64;
            
            this.currentPath = 0;
            //console.log(playerx + " And " + playery);
            this.EventPoint.x = engine.TouchEventService.stageX;
            this.EventPoint.y = engine.TouchEventService.stageY;
            this.tileX = Math.floor(this.EventPoint.x / this.tileSize);
            this.tileY = Math.floor(this.EventPoint.y / this.tileSize);

            for(var npc of this.npcList){
                if(npc.x / 64 == this.tileX && npc.y /64 == this.tileY)
                NPC.npcIsChoose = npc;
            }

            for(var monsterId of this.monsterIdList){
                var monster = MonsterService.getInstance().getMonster(monsterId);
                if(monster.x / 64 == this.tileX && monster.y / 64 == this.tileY){
                this.ifFight = true;
                this.monsterAttacking = monster;
                }
            }
            
            this.map01.endTile = this.map01.getTile(this.tileX,this.tileY);
            this.ifFindAWay = this.astar.findPath(this.map01);
            if(this.ifFindAWay){
                this.currentPath = 0;
            }

            for(let i = 0 ; i < this.astar.pathArray.length ; i++){
                console.log(this.astar.pathArray[i].x + " And " + this.astar.pathArray[i].y);
            }
            if(this.astar.pathArray.length > 0){
            this.disx = Math.abs(this.playerx * this.tileSize - this.Player.PersonBitmap.x);
            this.disy = Math.abs(this.playery * this.tileSize - this.Player.PersonBitmap.y);
            }


            if(this.ifFindAWay)
            this.map01.startTile = this.map01.endTile;

            if(this.EventPoint.x >= this.userPanelButton.x && this.EventPoint.y <= this.userPanelButton.getHeight()){
                this.stage.addChild(this.userPanel);
                this.userPanel.showHeroInformation(this.hero);
                this.userPanelIsOn = true;
            }

            if(this.commandList._list.length > 0)
            this.commandList.cancel();

            if(this.canMove && !this.userPanelIsOn)
            this.commandList.addCommand(new WalkCommand(this));

            if(NPC.npcIsChoose != null && !this.userPanelIsOn)
            this.commandList.addCommand(new TalkCommand(this,NPC.npcIsChoose))

            if(this.ifFight)
            this.commandList.addCommand(new FightCommand(this.Player,this,this.monsterAttacking,this.hero.getAttack()));

            this.commandList.execute();
        },this)
        
            this.PlayerMove();
        
            
            this.PlayerAnimation();
            
        
            
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

   public PlayerMove(){
       var self:any = this;
       var getDistance;
       
    engine.Ticker.getInstance().register(()=>{
    if(this.ifStartMove && self.ifFindAWay){
       if(self.currentPath < self.astar.pathArray.length - 1){ 
            var distanceX = self.astar.pathArray[self.currentPath + 1].x - self.astar.pathArray[self.currentPath].x ;
            var distanceY = self.astar.pathArray[self.currentPath + 1].y - self.astar.pathArray[self.currentPath].y ;
            if(distanceX < 0)
            distanceX = distanceX - this.disx;
            else
            distanceX = distanceX + this.disx;
            if(distanceY < 0)
            distanceY = distanceY - this.disy;
            else
            distanceY = distanceY + this.disy;

            //console.log(this.disx + "And" + this.disy);

            if(distanceX > 0){
            self.Player.SetRightOrLeftState(new GoRightState(),self);
            }
            if(distanceX <= 0){
            self.Player.SetRightOrLeftState(new GoLeftState(),self);
            }
            if(!self.IfOnGoal(self.astar.pathArray[self.currentPath + 1])){
               self.Player.PersonBitmap.x += distanceX / self.movingTime;
               self.Player.PersonBitmap.y += distanceY / self.movingTime;
            }
            else{
               self.currentPath += 1;
            }
            // if(self.IfOnGoal(self.map01.endTile)){
            //     self.Player.SetState(new IdleState(),self);
            //     this.ifStartMove = false;
            //     WalkCommand.canFinish = true;
            //     console.log("PM");
            // }
          }
          if(self.IfOnGoal(self.map01.endTile)){
                self.Player.SetState(new IdleState(),self);
                this.ifStartMove = false;
                WalkCommand.canFinish = true;
                console.log("PM");
          }
    }
    if(this.ifStartMove && !self.ifFindAWay){
        var distanceX = self.map01.startTile.x - self.playerBitX;
        var distanceY = self.map01.startTile.y - self.playerBitY;
        if(distanceX > 0){
            self.Player.SetRightOrLeftState(new GoRightState(),self);
        }
        if(distanceX <= 0){
            self.Player.SetRightOrLeftState(new GoLeftState(),self);
        }
        if(!self.IfOnGoal(self.map01.startTile)){
               self.Player.PersonBitmap.x += distanceX / self.movingTime;
               self.Player.PersonBitmap.y += distanceY / self.movingTime;
        }
        else{
            self.Player.SetState(new IdleState(),self);
            this.ifStartMove = false;
            WalkCommand.canFinish = true;
            console.log("PM");
        }
    }
        })


    //    for( self.currentPath = 0 ; self.currentPath < self.astar.pathArray.length - 1; self.currentPath++){
    //         var distanceX = self.astar.pathArray[self.currentPath + 1].x - self.astar.pathArray[self.currentPath].x;
    //         var distanceY = self.astar.pathArray[self.currentPath + 1].y - self.astar.pathArray[self.currentPath].y;
    //         if(distanceX < 0){
    //         self.Player.SetRightOrLeftState(new GoRightState(),self);
    //         }
    //         if(distanceX >= 0){
    //         self.Player.SetRightOrLeftState(new GoLeftState(),self);
    //         }
    //         egret.Tween.get(self.Player.PersonBitmap).to({x : self.Player.PersonBitmap.x + distanceX,y : self.Player.PersonBitmap.y + distanceY} , Math.abs(distanceX) * 3 + Math.abs(distanceY) * 3);
    //         self.MoveTime = Math.abs(distanceX) * 3 + Math.abs(distanceY) * 3;
    //    }
      
   }



    // public PictureMove(pic : engine.Bitmap):void{
    //     var self:any = this;
    //     var MapMove:Function = function (){
    //         egret.Tween.removeTweens(pic);
    //         var dis = self.Player.PersonBitmap.x - self.EventPoint.x;
    //     if(self.Player.GetIfGoRight() && pic.x >= - (pic.width - self.stage.stageWidth) ){
    //         egret.Tween.get(pic).to({x : pic.x - Math.abs(dis)},self.MoveTime);
    //     }

    //     if(self.Player.GetIfGoLeft() && pic.x <= 0){
    //         egret.Tween.get(pic).to({x : pic.x + Math.abs(dis)},self.MoveTime);
    //     }
    //     //egret.Tween.get(pic).call(MapMove,self);
    //     }
    //     MapMove();
    // }


    public IfOnGoal(tile : Tile) : any{
        var self:any = this;
        if(self.Player.PersonBitmap.x == tile.x && self.Player.PersonBitmap.y == tile.y)
        this.ifOnGoal = true;
        else 
        this.ifOnGoal = false;
        //console.log(Math.floor(self.Player.PersonBitmap.x - 42 / tile.x) + " And " + Math.floor(self.Player.PersonBitmap.y - 64 / tile.y));
        return this.ifOnGoal;

    }


    public PlayerAnimation():void{
        var self:any = this;
        var n = 0;
        var GOR = 0;
        var GOL = 0;
        var fight = 0;
        var zhen = 0;
        var zhen2 = 0;
        var zhen3 = 0;
        var standArr = ["08","09","10","11","12","13","14","15","16","17","18","19"];
        var walkRightArr = ["24","25","26","27","28","29","30","31","32","33","34",];
        var fightArr = ["0","1","2","3","4","5","6","7","8"];

        var MoveAnimation:Function = function (){
            //var playerBitmap = egret.Tween.get(self.Player.PersonBitmap);
               
                
                engine.Ticker.getInstance().register(()=>{
                if(zhen % 4 == 0){
                    
                    if(self.Player.GetIfIdle() && !self.Player.GetIfWalk() && !self.Player.GetIfFight()){
                    GOR = 0;
                    GOL = 0;
                    fight = 0;
                    var textureName = "00" + standArr[n] + ".png";
                    //var texture : egret.Texture = RES.getRes(textureName);
                    engine.RES.getRes(textureName).then((value) => {
                    self.Player.PersonBitmap.texture = value;
                    self.Player.PersonBitmap.setWidth(self.Player.PersonBitmap.texture.width);
                    self.Player.PersonBitmap.setHeight(self.Player.PersonBitmap.texture.height);
                    });
                    n++;
                    if(n >= standArr.length){
                          n=0;
                          }
                        }
                          



                    if(self.Player.GetIfWalk() && self.Player.GetIfGoRight() && !self.Player.GetIfIdle() && !self.Player.GetIfFight()){
                        n = 0;
                        GOL = 0;
                        fight = 0;
                    var textureName = "00" + walkRightArr[GOR] + ".png";
                    //var texture : egret.Texture = RES.getRes(textureName);
                    engine.RES.getRes(textureName).then((value) => {
                    self.Player.PersonBitmap.texture = value;
                    self.Player.PersonBitmap.setWidth(self.Player.PersonBitmap.texture.width);
                    self.Player.PersonBitmap.setHeight(self.Player.PersonBitmap.texture.height);
                    });
                    GOR++;
                    if(GOR >= walkRightArr.length){
                          GOR=0;
                          }
                          }

                    if(self.Player.GetIfWalk() && self.Player.GetIfGoLeft() && !self.Player.GetIfIdle() && !self.Player.GetIfFight()){
                              n = 0;
                              GOR = 0;
                              fight = 0;
                    var textureName = "00" + walkRightArr[GOL] + "_2.png";
                    //var texture : egret.Texture = RES.getRes(textureName);
                    engine.RES.getRes(textureName).then((value) => {
                    self.Player.PersonBitmap.texture = value;
                    self.Player.PersonBitmap.setWidth(self.Player.PersonBitmap.texture.width);
                    self.Player.PersonBitmap.setHeight(self.Player.PersonBitmap.texture.height);
                    });
                    GOL++;
                    if(GOL >= walkRightArr.length){
                          GOL=0;
                          }
                    }



                    if(self.Player.GetIfFight() && !self.Player.GetIfWalk() && !self.Player.GetIfIdle()){
                        GOR = 0;
                        GOL = 0;
                        n = 0;
                        
                        var textureName = "020" + fightArr[fight] + ".png";
                        //var texture : egret.Texture = RES.getRes(textureName);
                    engine.RES.getRes(textureName).then((value) => {
                    self.Player.PersonBitmap.texture = value;
                    self.Player.PersonBitmap.setWidth(self.Player.PersonBitmap.texture.width);
                    self.Player.PersonBitmap.setHeight(self.Player.PersonBitmap.texture.height);
                    });
                        fight++;
                        if(fight >= fightArr.length){
                            fight = 0;
                        }
                    }



                    }


                    // if(self.IfOnGoal(self.map01.endTile)){
                    //  self.Player.SetState(new IdleState(),self);
                    //  WalkCommand.canFinish = false;
                    //  //console.log("PA");
                    // }

                });

                // var texture : egret.Texture = self.IdlePictures[n];
                // self.PlayerPic.texture = texture;

                       
                //        egret.Tween.get(self.PlayerPic).to(self.IdlePictures[n],0);
                //        egret.Tween.get(self.PlayerPic).wait(42);
                //        n++;
                //        if(n >= self.IdlePictures.length){
                //           n=0;
                //           }
            
            //egret.Tween.get(self.Player.PersonBitmap).call(IdleAnimation,self);
        }

        

        

        

        var FramePlus : Function = function(){
            engine.Ticker.getInstance().register(()=>{
            zhen++;
            if(zhen == 400)
            zhen = 0;
            })
        }




        MoveAnimation();
        
        FramePlus();
    }

    /**
     * 切换描述内容
     * Switch to described content
     */
    // private changeDescription(textfield:egret.TextField, textFlow:Array<egret.ITextElement>):void {
    //     textfield.textFlow = textFlow;
    // }

    public HeroEquipWeapon(weaponId : string){
        var temp = this.hero.getEquipment(EquipementType.WEAPON)
        if(temp){
        this.user.package.InPackage(temp);
        }
        this.hero.addWeapon(EquipmentServer.getInstance().getWeapon(weaponId));
        console.log(weaponId);
    }

    public HeroEquipHelement(helmentId : string){
        var temp = this.hero.getEquipment(EquipementType.HELMENT)
        if(temp){
        this.user.package.InPackage(temp);
        }
        this.hero.addHelment(EquipmentServer.getInstance().getHelement(helmentId));
    }

    public HeroEquipArmor(Id : string){
        var temp = this.hero.getEquipment(EquipementType.CORSELER)
        if(temp){
        this.user.package.InPackage(temp);
        }
        this.hero.addCorseler(EquipmentServer.getInstance().getArmor(Id));
    }

    public HeroEquipShoes(Id : string){
        var temp = this.hero.getEquipment(EquipementType.SHOES)
        if(temp){
        this.user.package.InPackage(temp);
        }
        this.hero.addShoes(EquipmentServer.getInstance().getShoe(Id));
    }
}


class Person{
    public PersonBitmap : engine.Bitmap;
    private IsIdle : boolean;
    private IsWalking : boolean;
    private GoRight : boolean = false;
    private GoLeft : boolean = false;
    private IsFight : boolean;
    private IdleOrWalkStateMachine : StateMachine;
    private LeftOrRightStateMachine : StateMachine;

    constructor(){
        this.PersonBitmap = new engine.Bitmap();
        this.PersonBitmap.setWidth(49);
        this.PersonBitmap.setHeight(64);
        // this.PersonBitmap.anchorOffsetX = 2 * this.PersonBitmap.width / 3;
        // this.PersonBitmap.anchorOffsetY = this.PersonBitmap.height;
        this.IsIdle = true;
        this.IsWalking = false;
        this.IsFight = false;
        this.IdleOrWalkStateMachine = new StateMachine();
        this.LeftOrRightStateMachine = new StateMachine();

    }

    public SetPersonBitmap(picture:engine.Bitmap){
        this.PersonBitmap = picture;
    }


    public SetIdle(set : boolean){
        this.IsIdle = set;
    }

    public GetIfIdle(): boolean{
        return this.IsIdle;
    }

    public SetWalk(set : boolean){
        this.IsWalking = set;
    }

    public GetIfWalk(): boolean{
        return this.IsWalking
    }

    public SetFight(set : boolean){
        this.IsFight = set;
    }

    public GetIfFight():boolean{
        return this.IsFight;
    }

    public SetGoRight(){
        this.GoRight = true;
        this.GoLeft = false;
    }

    public GetIfGoRight(): boolean{
        return this.GoRight;
    }

    public SetGoLeft(){
        this.GoLeft = true;
        this.GoRight = false;
    }

    public GetIfGoLeft() : boolean{
        return this.GoLeft;
    }

    private createBitmapByName(name:string):engine.Bitmap {
        var result = new engine.Bitmap(name);
        return result;
    }

    public SetState(e : State , _tmain : Main){
        this.IdleOrWalkStateMachine.setState(e,_tmain);
    }

    public SetRightOrLeftState(e : State , _tmain : Main){
        this.LeftOrRightStateMachine.setState(e,_tmain);
    }


}

interface State{
    OnState(_tmain : Main);

    ExitState(_tmain : Main);

}

class PeopleState implements State{
      OnState(_tmain : Main){};

      ExitState(_tmain : Main){};
}

class StateMachine{
     CurrentState : State;

     setState( e : State , _tmain : Main){
        if( this.CurrentState != null){
           this.CurrentState.ExitState(_tmain);
        }
        this.CurrentState = e;
        this.CurrentState.OnState(_tmain);
     }
}


class IdleState implements PeopleState{

    OnState(_tmain : Main){
        _tmain.Player.SetIdle(true);
        _tmain.Player.SetWalk(false);
        _tmain.Player.SetFight(false);
    };

    ExitState(_tmain : Main){
        _tmain.Player.SetIdle(false);
    };

}

class WalkingState implements PeopleState{
      OnState(_tmain : Main){
        _tmain.Player.SetIdle(false);
        _tmain.Player.SetWalk(true);
        _tmain.Player.SetFight(false);
    };

    ExitState(_tmain : Main){
        _tmain.Player.SetWalk(false);
    };
}

class FightState implements PeopleState{
    OnState(_tmain : Main){
        _tmain.Player.SetFight(true);
        _tmain.Player.SetIdle(false);
        _tmain.Player.SetWalk(false);
    }

    ExitState(_tmain : Main){
        _tmain.Player.SetFight(false);
    }
}

class GoRightState implements PeopleState{
    OnState(_tmain : Main){
        _tmain.Player.SetGoRight();
    };

    ExitState(_tmain : Main){};

}

class GoLeftState implements PeopleState{
    OnState(_tmain : Main){
        _tmain.Player.SetGoLeft();
    };

    ExitState(_tmain : Main){};

}



