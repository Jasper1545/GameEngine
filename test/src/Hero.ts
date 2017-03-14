var Cache: MethodDecorator = (target : any,propertyKey,descriptor : PropertyDescriptor) => {
    const method = descriptor.value;
    descriptor.value = function(){
        var cacheKey = "__cache" + propertyKey;
        if(!target[cacheKey]){
            target[cacheKey] = method.apply(this);
        }
            return target[cacheKey];
    }
}

enum Quality {
    WHITE = 1,
    GREEN = 1.1,
    BLUE = 1.2,
    PURPLE = 1.4,
    ORAGE = 1.8
}

enum WeaponType {
    HANDSWORD = 1,
    LANCE = 1.8,
    AXE = 2,
    KATANA = 1.5,
    HAMMER = 2.5
}

enum ArmorType{
    LIGHTARMOR = 1,
    LEATHERARMOR = 1.4,
    PLATEARMOR = 2,
    HEAVYARMOR = 2.4,
    NOTHINGTOWEAR = 0.2
}

enum EquipementType{
    WEAPON = 1,
    HELMENT = 2,
    CORSELER = 3,
    SHOES = 4
}

enum JewelPromotion{
    ATTACKPRMOTE = 1,
    DEFENCEPRMOTE = 2,
    AGILEPRMOTE = 3,
}

enum HeroType{
    SABER = 0,
    LANCER = 1,
    ARCHER = 2,
    CASTER = 3,
    BASERKER = 4,
    ASSASIN = 5,
    RIDER = 6
}



class User{
    currentExp : number = 0;
    totalExp = 0;
    level : number = 1;
    diamonds : number = 0;
    gold : number = 0;
    __heros : Hero [] = [];
    __herosInTeam : Hero[] = [];
    userName : string = "";
    package : Package;

    constructor(name : string , level : number){
       this.userName = name;
       this.level = level;
       this.package = new Package();
    }

    @Cache
     getTotalExp(){
         this.totalExp = (this.level + 60) * this.level;
         return this.totalExp;
     }

    public addHeros(hero : Hero){
       this.__heros.push(hero);
    }


    public addHeroInTeam(hero : Hero){
       this.__herosInTeam.push(hero);
    }

    @Cache
    getFightPower(){
        var result = 0;
        this.__herosInTeam.forEach(hero => result += hero.getFightPower());
        return result;
    }

    changeHeroTeam(heroToUp , heroToDown){

    }

    
}

class Hero{
    heroID : string;
    isInTeam : boolean = false;
    name : string = "";
    quality  = 0;
    maxHP = 0;
    currentHP = 0;
    attack = 0;
    defence = 0;
    agile = 0;
    level = 1;
    currentExp = 0;
    totalExp = 0;
    properties : Property[] = [];
    heroBitemapID : string;
    //__equipmentsOnEquip : Equipment[] = [];
    __weaponsOnEquip : Weapon[] = [];
    __armorOnEquip : Armor[] = [];
    heroType = -1;
    color;

    constructor(heroID : string,name : string, quality : Quality, level : number,heroBitmapID : string,heroType : HeroType){
       this.heroID = heroID;
       this.name = name;
       this.quality = quality;
       this.level = level;
       this.heroBitemapID = heroBitmapID;
       this.heroType = heroType;
       this.color = GetColor.getColor(quality);
    }

     //@Cache
     getTotalExp(){
         this.totalExp = (this.level + 50) * this.level;
         return this.totalExp;
     }

    public addWeapon(weapon : Weapon){
       this.__weaponsOnEquip[0] = weapon;
    }

    public addHelment(helment : Armor){
       this.__armorOnEquip[0] = helment;
    }

    public addCorseler(corseler : Armor){
       this.__armorOnEquip[1] = corseler;
    }

    public addShoes(shoes : Armor){
        this.__armorOnEquip[2] = shoes;
    }

    public getEquipment(type : EquipementType){
        var temp;
        switch(type){
            case EquipementType.WEAPON:
                if(this.__weaponsOnEquip[0])
                temp =  this.__weaponsOnEquip[0];
                else temp = null;
            case EquipementType.HELMENT:
                if(this.__armorOnEquip[0])
                temp = this.__armorOnEquip[0];
                else temp = null;
            case EquipementType.CORSELER:
                if(this.__armorOnEquip[1])
                temp = this.__armorOnEquip[1];
                else temp = null;
            case EquipementType.SHOES:
                if(this.__armorOnEquip[2])
                temp = this.__armorOnEquip[2];
                else temp = null;
        }
        return temp;
    }

    //@Cache
    getMaxHP(){
        var result = 0;
        this.__weaponsOnEquip.forEach(weapon => result += weapon.getFightPower() * 0.2);
        this.__armorOnEquip.forEach(armor => result += armor.getFightPower() * 0.8);
        result += this.level * 10 * this.quality;
        this.properties[0]=new Property("最大生命值",result,false);
        return result;
    }
    
    //@Cache
    getAttack(){
        var result = 0;
        this.__weaponsOnEquip.forEach(weapon => result += weapon.getAttack() * 0.5);
        result += this.level * 5 * this.quality;
        this.properties[1]=new Property("攻击力",result,false);
        return result;
    }

    //@Cache
    getDefence(){
        var result = 0;
        this.__armorOnEquip.forEach(armor => result += armor.getDefence() * 0.2);
        result += this.level * 2 * this.quality;
        this.properties[2]=new Property("防御力",result,false);
        return result;
    }

    //@Cache
    getAglie(){
        var result = 0;
        this.__weaponsOnEquip.forEach(weapon => result += weapon.getAglie() * 0.4);
        this.__armorOnEquip.forEach(armor => result += armor.getAglie() * 0.4);
        result += this.level * 4 * this.quality;
        this.properties[3]=new Property("敏捷",result,false);
        return result;
    }

    //@Cache
    getFightPower(){
        var result = 0;
        this.__weaponsOnEquip.forEach(weapon => result += weapon.getFightPower());
        this.__armorOnEquip.forEach(armor => result += armor.getFightPower());
        result += (10 + this.getAttack() * 10 + this.getDefence() * 8 + this.getAglie() * 6) * this.level * this.quality;
        return result;
    }
}

class Equipment{
    equipmentID :string;
    quality  = 0;
    //level = 1;
    currentExp = 0;
    //totalExp = 0;
    //agile = 0;
    isWeapon = false;
    name : string = "";
    __jewelOnEquip : Jewel[] = [];
    equipmentBitmapID : string;
    properties : Property[] = [];
    color;
    numInPackage : number;
    //  @Cache
    //  getTotalExp(){
    //      this.totalExp = (this.level + 20) * this.level;
    //      return this.totalExp;
    //  }

    @Cache
    getFightPower(){
        return 0;
    }


    public addJewl(jewel : Jewel){
        this.__jewelOnEquip.push(jewel);
    }

}

class Weapon extends Equipment{
     //attack = 0;
     static weaponNum = 0;
     weaponID : string;
     isWeapon = true;
     weaponType = 0;

     constructor(equipmentID :string,name : string ,quality : number , weaponType : WeaponType,weaponIconId : string){
         super();
         this.equipmentID = equipmentID;
         this.name = name;
         this.quality = quality;
         //this.level = level;
         this.weaponType = weaponType;
         this.equipmentBitmapID = weaponIconId;
         this.color = GetColor.getColor(quality);
         this.weaponID = Weapon.weaponNum.toString();
         Weapon.weaponNum++;

     }



     getAttack(){
         var result = 0;
         this.__jewelOnEquip.forEach(jewel => result += jewel.getFightPower() * 0.4);
         result += 10 * this.weaponType * this.quality; 
         this.properties[0]=new Property("攻击力",result,false);
         return result;
     }


     getAglie(){
         var result = 0;
         this.__jewelOnEquip.forEach(jewel => result += jewel.getFightPower() * 0.4);
         result += 5 * this.quality / this.weaponType; 
         this.properties[1]=new Property("敏捷",result,false);
         return result;
     }
    

     getEquipmentInformations(){
         this.getAttack();
         this.getAglie();
     }



     getFightPower(){
         var result = 0;
         this.__jewelOnEquip.forEach(jewel => result += jewel.getFightPower());
         result += this.getAttack() * this.quality * 10 + this.getAglie() * this.quality * 5;
         return result;
     }
}

class Armor extends Equipment{
     //defence = 0;
     static armorNum = 0;
     armorID : string;
     armorType = 0;
     isWeapon = false;

     constructor(equipmentID : string,name : string,quality : number , armorType : ArmorType,armorIconId : string){
         super();
         this.equipmentID = equipmentID;
         this.name = name;
         this.quality = quality;
         this.armorType = armorType;
         this.equipmentBitmapID = armorIconId;
         this.color = GetColor.getColor(quality);
         this.armorID = Armor.armorNum.toString();
         Armor.armorNum++;
     }

     


     getDefence(){
         var result = 0;
         this.__jewelOnEquip.forEach(jewel => result += jewel.getFightPower() * 0.4);
         result += 6 * this.armorType * this.quality; 
         this.properties[0]=new Property("防御力",result,false);
         return result;
     }


     getAglie(){
         var result = 0;
         this.__jewelOnEquip.forEach(jewel => result += jewel.getFightPower() * 0.4);
         result += 5 * this.quality / this.armorType; 
         this.properties[1]=new Property("敏捷",result,false);
         return result;
     }


     getFightPower(){
         var result = 0;
         this.__jewelOnEquip.forEach(jewel => result += jewel.getFightPower());
         result += this.getDefence() * this.quality * 10 + this.getAglie() * this.quality * 5;
         return result;
     }


     getEquipmentInformations(){
         this.getDefence();
         this.getAglie();
     }
}

class Jewel{
    jewelID : string;
    static num : number = 0;
    name : string;
    quality  = 0;
    color;
    //promotionType = 0;

    constructor(jewelID : string,name : string,quality : number){
        this.jewelID = jewelID;
        this.name = name;
        this.quality = quality;
        this.color = GetColor.getColor(quality);
    }

    @Cache
    getFightPower(){
        var result = 0;
        result = this.quality * 10;
        return result;
    }
}

class Property{
    name : string;
    value : number;
    isRate : boolean;
    constructor(name : string, value : number,isRate:boolean){
        this.name = name;
        this.value = value;
        this.isRate = isRate;
    }

    getDescription(){
        if(this.isRate){
            return this.name + ": +" +(this.value / 10).toFixed(2) + "%";
        }else{
            return this.name + ": +" + this.value;
        }
    }
}

class Properties{
    public all:string[] = [
        "攻击力",
        "防御力",
        "敏捷",
        "品质"
    ]

    public getpropertieName(){

    }
}


class GetColor{
    static getColor(quality : Quality){
        var color;
        if(quality == Quality.WHITE)
        color = 0xffffff;
        if(quality == Quality.BLUE)
        color = 0x0000dd;
        if(quality == Quality.GREEN)
        color = 0x00dd00;
        if(quality == Quality.PURPLE)
        color = 0x9a30d7;
        if(quality == Quality.ORAGE)
        color = 0xf4a315;
        return color;
    }
}

class EquipmentServer{
    private static instance;
    private weaponList: {
        [index: string]: Weapon
    } = {};
    private helmentList: {
        [index: string]: Armor
    } = {};
    private armorList: {
        [index: string]: Armor
    } = {};
    private shoesList: {
        [index: string]: Armor
    } = {};

    static getInstance(): EquipmentServer {
        if (EquipmentServer.instance == null) {
            EquipmentServer.instance = new EquipmentServer();
        }

        return EquipmentServer.instance;
    }

     public addWeapon(weapon: Weapon) {
        this.weaponList[weapon.equipmentID] = weapon;
    }

    public getWeapon(id : string):Weapon{
        return this.weaponList[id];
    }

    public addHelement(armor : Armor){
        this.helmentList[armor.armorID] = armor;
    }

    public getHelement(id : string):Armor{
        return this.helmentList[id];
    }

    public addArmor(armor : Armor){
        this.armorList[armor.armorID] = armor;
    }

    public getArmor(id : string):Armor{
        return this.armorList[id];
    }

    public addShoe(armor : Armor){
        this.shoesList[armor.armorID] = armor;
    }

    public getShoe(id : string):Armor{
        return this.shoesList[id];
    }
}