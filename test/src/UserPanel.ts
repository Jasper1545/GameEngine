class UserPanel extends engine.DisplayObjectContainer{

private background : engine.Bitmap;
private heroPicture : engine.Bitmap;
private weaponIconBitmap : engine.Bitmap;
private helmentIconBitmap : engine.Bitmap;
private corselerIconBitmap : engine.Bitmap;
private shoesIconBitmap : engine.Bitmap;
private heroInformationTextField : engine.TextField;
private heroInformationText : string;
private hero : Hero;
public equipmentInformationPanel : EquipmentInformationPanel;

constructor(){
        super();
        this.width = 480;
        this.height = 600;

        this.background = this.createBitmapByName("UserPanelBackGround.png");
        this.addChild(this.background);
        this.background.x = 0;
        this.background.y = 0;
        this.background.setWidth(480);
        this.background.setHeight(600);
        this.background.touchEnabled = true;
        this.background.addEventListener(engine.TouchEventsType.CLICK,(e : engine.TouchEvents)=>{
             this.equipmentInformationPanel.alpha = 0;
        },this)

        this.weaponIconBitmap = new engine.Bitmap();
        this.weaponIconBitmap.setWidth(50);
        this.weaponIconBitmap.setHeight(50);
        this.addChild(this.weaponIconBitmap);
        this.weaponIconBitmap.x = this.width * 7 / 9;
        this.weaponIconBitmap.y = this.height / 8;
        this.weaponIconBitmap.touchEnabled = true;
        this.weaponIconBitmap.addEventListener(engine.TouchEventsType.CLICK,(e : engine.TouchEvents)=>{
            if(this.hero.__weaponsOnEquip[0]){
            this.hero.__weaponsOnEquip[0].getEquipmentInformations();
            this.equipmentInformationPanel.showEquipmentInformation(this.hero.__weaponsOnEquip[0]);
            this.equipmentInformationPanel.alpha = 1;
            }else
                engine.RES.getRes("NoEquipment.png").then((value) => {
                    this.weaponIconBitmap.texture = value;
                    this.weaponIconBitmap.setWidth(this.weaponIconBitmap.texture.width);
                    this.weaponIconBitmap.setHeight(this.weaponIconBitmap.texture.height);
                    });
        },this)
        

        this.helmentIconBitmap = new engine.Bitmap();
        this.helmentIconBitmap.setWidth(50);
        this.helmentIconBitmap.setHeight(50);
        this.addChild(this.helmentIconBitmap);
        this.helmentIconBitmap.x = this.width * 7 / 9;
        this.helmentIconBitmap.y = this.weaponIconBitmap.y + this.height / 6;
        this.helmentIconBitmap.touchEnabled = true;
        this.helmentIconBitmap.addEventListener(engine.TouchEventsType.CLICK,(e : engine.TouchEvents)=>{
            if(this.hero.__armorOnEquip[0]){
            this.hero.__armorOnEquip[0].getDefence();
            this.hero.__armorOnEquip[0].getAglie();
            this.equipmentInformationPanel.showEquipmentInformation(this.hero.__armorOnEquip[0]);
            this.equipmentInformationPanel.alpha = 1;
            }else
                engine.RES.getRes("NoEquipment.png").then((value) => {
                    this.helmentIconBitmap.texture = value;
                    this.helmentIconBitmap.setWidth(this.helmentIconBitmap.texture.width);
                    this.helmentIconBitmap.setHeight(this.helmentIconBitmap.texture.height);
                    });
        },this)

        this.corselerIconBitmap = new engine.Bitmap();
        this.corselerIconBitmap.setWidth(50);
        this.corselerIconBitmap.setHeight(50);
        this.addChild(this.corselerIconBitmap);
        this.corselerIconBitmap.x = this.width * 7 / 9;
        this.corselerIconBitmap.y = this.helmentIconBitmap.y + this.height / 7;
        this.corselerIconBitmap.touchEnabled = true;
        this.corselerIconBitmap.addEventListener(engine.TouchEventsType.CLICK,(e : engine.TouchEvents)=>{
            if(this.hero.__armorOnEquip[1]){
            this.hero.__armorOnEquip[1].getDefence();
            this.hero.__armorOnEquip[1].getAglie();
            this.equipmentInformationPanel.showEquipmentInformation(this.hero.__armorOnEquip[1]);
            this.equipmentInformationPanel.alpha = 1;
            }else
                 engine.RES.getRes("NoEquipment.png").then((value) => {
                    this.helmentIconBitmap.texture = value;
                    this.helmentIconBitmap.setWidth(this.helmentIconBitmap.texture.width);
                    this.helmentIconBitmap.setHeight(this.helmentIconBitmap.texture.height);
                    });
        },this)

        this.shoesIconBitmap = new engine.Bitmap();
        this.shoesIconBitmap.setWidth(50);
        this.shoesIconBitmap.setHeight(50);
        this.addChild(this.shoesIconBitmap);
        this.shoesIconBitmap.x = this.width * 7 / 9;
        this.shoesIconBitmap.y = this.corselerIconBitmap.y + this.height / 6;
        this.shoesIconBitmap.touchEnabled = true;
        this.shoesIconBitmap.addEventListener(engine.TouchEventsType.CLICK,(e : engine.TouchEvents)=>{
            if(this.hero.__armorOnEquip[2]){
            this.hero.__armorOnEquip[2].getDefence();
            this.hero.__armorOnEquip[2].getAglie();
            this.equipmentInformationPanel.showEquipmentInformation(this.hero.__armorOnEquip[2]);
            this.equipmentInformationPanel.alpha = 1;
            }
            else
                engine.RES.getRes("NoEquipment.png").then((value) => {
                    this.shoesIconBitmap.texture = value;
                    this.shoesIconBitmap.setWidth(this.shoesIconBitmap.texture.width);
                    this.shoesIconBitmap.setHeight(this.shoesIconBitmap.texture.height);
                    });
        },this)

        this.heroPicture = new engine.Bitmap();
        this.heroPicture.setWidth(323);
        this.heroPicture.setHeight(400);
        this.addChild(this.heroPicture);
        this.heroPicture.x = 0 ;
        this.heroPicture.y = 50;

        this.heroInformationText = "";

        this.heroInformationTextField = new engine.TextField();
        this.heroInformationTextField.setWidth(400);
        this.heroInformationTextField.setHeight(100);
        this.addChild(this.heroInformationTextField);
        this.heroInformationTextField.x = (this.getWidth() - this.heroInformationTextField.getWidth()) / 2;
        this.heroInformationTextField.y = 460;
        this.heroInformationTextField.size = 16;

        this.equipmentInformationPanel = new EquipmentInformationPanel();
        this.addChild(this.equipmentInformationPanel);
        this.equipmentInformationPanel.x = (this.getWidth() - this.equipmentInformationPanel.getWidth()) / 2; 
        this.equipmentInformationPanel.y = (this.getHeight() - this.equipmentInformationPanel.getHeight()) / 2;
        this.equipmentInformationPanel.alpha = 0;

    }

    public showHeroInformation(hero : Hero){
        this.hero = hero;
        this.getHeroInformations(hero);
        engine.RES.getRes(hero.heroBitemapID).then((value) => {
                    this.heroPicture.texture = value;
                    this.heroPicture.setWidth(this.heroPicture.texture.width);
                    this.heroPicture.setHeight(this.heroPicture.texture.height);
                    });

        if(hero.__weaponsOnEquip[0]){
            engine.RES.getRes(hero.__weaponsOnEquip[0].equipmentBitmapID).then((value) => {
                    this.weaponIconBitmap.texture = value;
                    this.weaponIconBitmap.setWidth(this.weaponIconBitmap.texture.width);
                    this.weaponIconBitmap.setHeight(this.weaponIconBitmap.texture.height);
                    });
        }
        else{
                    engine.RES.getRes("NoEquipment.png").then((value) => {
                    this.weaponIconBitmap.texture = value;
                    this.weaponIconBitmap.setWidth(this.weaponIconBitmap.texture.width);
                    this.weaponIconBitmap.setHeight(this.weaponIconBitmap.texture.height);
                    });
        }
        if(hero.__armorOnEquip[0]){
         engine.RES.getRes(hero.__armorOnEquip[0].equipmentBitmapID).then((value) => {
                    this.helmentIconBitmap.texture =value;
                    this.helmentIconBitmap.setWidth(this.helmentIconBitmap.texture.width);
                    this.helmentIconBitmap.setHeight(this.helmentIconBitmap.texture.height);
                    });
        }
        else{
        engine.RES.getRes("NoEquipment.png").then((value) => {
                    this.helmentIconBitmap.texture =value;
                    this.helmentIconBitmap.setWidth(this.helmentIconBitmap.texture.width);
                    this.helmentIconBitmap.setHeight(this.helmentIconBitmap.texture.height);
                    });
        }
        if(hero.__armorOnEquip[1]){
        engine.RES.getRes(hero.__armorOnEquip[1].equipmentBitmapID).then((value) => {
                    this.corselerIconBitmap.texture = value;
                    this.corselerIconBitmap.setWidth(this.corselerIconBitmap.texture.width);
                    this.corselerIconBitmap.setHeight(this.corselerIconBitmap.texture.height);
                    });
        }
        else{
        engine.RES.getRes("NoEquipment.png").then((value) => {
                    this.corselerIconBitmap.texture = value;
                    this.corselerIconBitmap.setWidth(this.corselerIconBitmap.texture.width);
                    this.corselerIconBitmap.setHeight(this.corselerIconBitmap.texture.height);
                    });
        }

        if(hero.__armorOnEquip[2]){
        engine.RES.getRes(hero.__armorOnEquip[2].equipmentBitmapID).then((value) => {
                    this.shoesIconBitmap.texture = value;
                    this.shoesIconBitmap.setWidth(this.shoesIconBitmap.texture.width);
                    this.shoesIconBitmap.setHeight(this.shoesIconBitmap.texture.height);
                    });
        }
        else{
        engine.RES.getRes("NoEquipment.png").then((value) => {
                    this.shoesIconBitmap.texture = value;
                    this.shoesIconBitmap.setWidth(this.shoesIconBitmap.texture.width);
                    this.shoesIconBitmap.setHeight(this.shoesIconBitmap.texture.height);
                    });
        }
        //this.heroInformationTextField.text = this.heroInformationText;
        this.heroInformationTextField.textColor = hero.color;
    }

    public getHeroInformations(hero : Hero){
        this.heroInformationText = "";
        this.heroInformationText = "英雄 : " + hero.name + "\n";
        hero.getDefence();
        hero.getAttack();
        hero.getMaxHP();
        hero.getAglie();
        for(let i = 0; i < hero.properties.length; i++){
            this.heroInformationText = this.heroInformationText + hero.properties[i].name + " : " + hero.properties[i].value.toFixed(0) + "\n";
        }
        this.heroInformationText = this.heroInformationText + "战斗力 : " + hero.getFightPower().toFixed(0);
        this.heroInformationTextField.text = this.heroInformationText;
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


class EquipmentInformationPanel extends engine.DisplayObjectContainer{
    public backGround : engine.Bitmap;
    private equipmentIconBitmap : engine.Bitmap;
    private nameField : engine.TextField;
    private propertiesField : engine.TextField;
    private jewelInformationField : engine.TextField;
    //private jewelFields : egret.TextField[] = [];

    constructor(){
        super();
        this.width = 250;
        this.height = 400;

        this.backGround = new engine.Bitmap();
        engine.RES.getRes("BlackBackground.png").then((value) => {
                    this.backGround.texture = value;
                    this.backGround.setWidth(this.backGround.texture.width);
                    this.backGround.setHeight(this.backGround.texture.height);
                    });
        this.backGround.setWidth(250);
        this.backGround.setHeight(400);
        this.addChild(this.backGround);
        this.backGround.x = 0;
        this.backGround.y = 0;
        this.backGround.alpha = 0.8;


        this.equipmentIconBitmap = new engine.Bitmap();
        this.equipmentIconBitmap.setWidth(60);
        this.equipmentIconBitmap.setHeight(60);
        this.addChild(this.equipmentIconBitmap);
        this.equipmentIconBitmap.x = 30;
        this.equipmentIconBitmap.y = 30;

        this.nameField = new engine.TextField();
        this.nameField.setWidth(200);
        this.nameField.setHeight(50);
        this.addChild(this.nameField);
        this.nameField.size = 24;
        this.nameField.x = 30;
        this.nameField.y = this.equipmentIconBitmap.y + this.equipmentIconBitmap.getHeight() + 50;

        this.propertiesField = new engine.TextField();
        this.propertiesField.setWidth(200);
        this.propertiesField.setHeight(300);
        this.addChild(this.propertiesField);
        this.propertiesField.textColor = "#ffffff";
        this.propertiesField.size = 20;
        this.propertiesField.x = 30;
        this.propertiesField.y = this.nameField.y + 55;

        this.jewelInformationField = new engine.TextField();
        this.jewelInformationField.setWidth(200);
        this.jewelInformationField.setHeight(300);
        this.addChild(this.jewelInformationField);
        this.jewelInformationField.size = 20;
        this.jewelInformationField.x = 30;
        this.jewelInformationField.y = this.propertiesField.y + 110;
    }

    public showEquipmentInformation(equipment : Equipment){
        this.nameField.text = equipment.name;
        this.nameField.textColor = equipment.color;
        
        engine.RES.getRes(equipment.equipmentBitmapID).then((value) => {
                    this.equipmentIconBitmap.texture = value;
                    this.equipmentIconBitmap.setWidth(this.equipmentIconBitmap.texture.width);
                    this.equipmentIconBitmap.setHeight(this.equipmentIconBitmap.texture.height);
                    });
        var information : string = "";

        for(let i = 0; i < equipment.properties.length; i++){
            information = information + equipment.properties[i].name + " : " + equipment.properties[i].value.toFixed(0) + "\n" + "\n" + "\n";
        }
        this.propertiesField.text = information;

        information = "镶嵌宝石 ： \n\n";
        for(let i = 0; i < equipment.__jewelOnEquip.length; i++){
            information = information + equipment.__jewelOnEquip[i].name +"\n\n" 
            //this.jewelInformationField.textColor = equipment.__jewelOnEquip[i].color;
        }
        this.jewelInformationField.text = information;
    }
}